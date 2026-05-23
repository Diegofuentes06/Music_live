const form = document.getElementById('song-form');
const queueList = document.getElementById('queue-list');
const queueCount = document.getElementById('queue-count');
const nowPlayingMessage = document.getElementById('now-playing-message');
const nowPlayingDetails = document.getElementById('now-playing-details');
const nextDetails = document.getElementById('next-details');
const nextCard = document.getElementById('next-card');
const playNextButton = document.getElementById('play-next');
const loadDemoButton = document.getElementById('load-demo');
const clearQueueButton = document.getElementById('clear-queue');

const fileInput = document.getElementById('file-input');
const addFileButton = document.getElementById('add-file');
const addedByInput = document.getElementById('added-by');
const addMetadataBtn = document.getElementById('add-metadata');
const historyList = document.getElementById('history-list');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const vinyl = document.getElementById('vinyl');

// Map local file objects by id so we can play them with createObjectURL
const filesById = {};
const history = [];

function uniqueId() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

async function fetchQueue() {
  const response = await fetch('/playlist');
  return response.json();
}

async function fetchCurrent() {
  const response = await fetch('/playlist/current');
  return response.json();
}

async function addSong(data) {
  const response = await fetch('/playlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function playNext() {
  const response = await fetch('/playlist/next', { method: 'POST' });
  return response.json();
}

async function clearQueue() {
  const response = await fetch('/playlist/clear', { method: 'POST' });
  return response.json();
}

async function loadDemo() {
  const response = await fetch('/playlist/demo', { method: 'POST' });
  return response.json();
}

function renderQueue(queue) {
  queueList.innerHTML = '';
  if (!queue || queue.length === 0) {
    queueList.innerHTML = '<li class="queue-item"><strong>No hay canciones en la cola.</strong></li>';
    queueCount.textContent = '0 canciones';
    return;
  }
  queue.forEach(song => {
    const item = document.createElement('li');
    item.className = 'queue-item';
    const isFirst = song.position === 1;
    item.innerHTML = `
      <div>
        <strong>${song.position}. ${song.name || song.title}</strong>
        <span>${song.artist || ''} ${song.duration ? '· ' + song.duration : ''}</span>
      </div>
      <div>
        <span>${isFirst ? '<strong>Sonando</strong>' : 'En espera'} · Añadido por ${song.addedBy || 'Anónimo'}</span>
      </div>
    `;
    if (isFirst) item.style.border = '2px solid rgba(78,255,140,0.18)';
    queueList.appendChild(item);
  });
  queueCount.textContent = `${queue.length} canción${queue.length === 1 ? '' : 'es'}`;
}

function loadCurrentToPlayer(current) {
  if (!current) {
    nowPlayingMessage.textContent = 'No hay canción reproduciéndose.';
    nowPlayingDetails.textContent = '';
    audioPlayer.src = '';
    vinyl.classList.remove('spinning');
    return;
  }
  nowPlayingMessage.textContent = 'Ahora suena:';
  nowPlayingDetails.textContent = `${current.name || current.title} — agregado por ${current.addedBy || 'Anónimo'}`;

  const local = filesById[current.id];
  if (local) {
    audioPlayer.src = local.url;
    audioPlayer.dataset.currentId = current.id;
  } else {
    audioPlayer.src = '';
    audioPlayer.dataset.currentId = '';
    nowPlayingDetails.textContent += ' (archivo MP3 local no disponible en esta sesión — vuelve a seleccionar el archivo)';
  }
}

function renderNext(nextSong) {
  if (!nextSong) {
    nextCard.querySelector('.status-text').textContent = 'No hay canción siguiente.';
    nextDetails.textContent = '';
    return;
  }
  nextCard.querySelector('.status-text').textContent = 'Siguiente en sonar:';
  nextDetails.textContent = `${nextSong.name || nextSong.title} — agregado por ${nextSong.addedBy || 'Anónimo'}`;
}

async function refreshUI() {
  const [queueData, currentData] = await Promise.all([fetchQueue(), fetchCurrent()]);
  renderQueue(queueData.queue);
  renderNext(queueData.queue[1] || null);
  loadCurrentToPlayer(currentData.current);
}

async function addLocalFilesToQueue(files) {
  if (!files || files.length === 0) {
    return alert('Selecciona al menos un archivo MP3 antes de agregar.');
  }

  const addedBy = (addedByInput && addedByInput.value.trim()) || 'Anónimo';
  const invalidFiles = [];

  for (const file of Array.from(files)) {
    if (!file.type.includes('mpeg') && !file.name.toLowerCase().endsWith('.mp3')) {
      invalidFiles.push(file.name);
      continue;
    }
    const id = uniqueId();
    const url = URL.createObjectURL(file);
    filesById[id] = { file, url, name: file.name };
    const result = await addSong({ id, name: file.name, addedBy });
    if (result.error) {
      return alert(result.error);
    }
  }

  fileInput.value = '';
  await refreshUI();

  if (invalidFiles.length > 0) {
    alert(`Se omitieron los archivos no válidos: ${invalidFiles.join(', ')}`);
  }
}

addFileButton.addEventListener('click', async () => {
  await addLocalFilesToQueue(fileInput.files);
});

// Mostrar y usar el formulario de metadatos manual cuando el usuario lo desea
addMetadataBtn.addEventListener('click', () => {
  const formEl = document.getElementById('song-form');
  formEl.style.display = formEl.style.display === 'none' ? 'block' : 'none';
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(form);
  const song = {
    title: formData.get('title')?.trim(),
    artist: formData.get('artist')?.trim(),
    duration: formData.get('duration')?.trim(),
    addedBy: formData.get('addedBy')?.trim() || 'Anónimo'
  };
  if (!song.title) return alert('El título es obligatorio para agregar manualmente.');
  const result = await addSong(song);
  if (result.error) return alert(result.error);
  alert('Canción agregada a la cola.');
  form.reset();
  renderQueue(result.queue);
  renderNext(result.queue[1] || null);
});

// Play / Pause / Next handlers
playBtn.addEventListener('click', async () => {
  try {
    await audioPlayer.play();
  } catch (e) {
    // Autoplay puede ser bloqueado; el usuario debe interactuar.
  }
});

pauseBtn.addEventListener('click', () => {
  audioPlayer.pause();
});

nextBtn.addEventListener('click', async () => {
  await doNext();
});

playNextButton.addEventListener('click', async () => {
  await doNext();
});

async function doNext() {
  const result = await playNext();
  if (result.message) {
    // si no hay canciones, limpiar reproductor
    if (result.queue && result.queue.length === 0) {
      loadCurrentToPlayer(null);
    }
  }
  if (result.song) {
    // mover a historial local si teníamos el archivo
    const removedId = result.song.id;
    if (filesById[removedId]) {
      history.unshift({ ...result.song, url: filesById[removedId].url });
      delete filesById[removedId];
    } else {
      history.unshift({ ...result.song });
    }
  }
  renderHistory();
  renderQueue(result.queue || []);
  renderNext(result.queue?.[1] || null);
  // cargar nuevo current si existe
  const currentResp = await fetchCurrent();
  loadCurrentToPlayer(currentResp.current);
  try { await audioPlayer.play(); } catch (e) {}
}

function renderHistory() {
  historyList.innerHTML = '';
  if (history.length === 0) {
    historyList.innerHTML = '<li class="queue-item"><strong>No hay historial aún.</strong></li>';
    return;
  }
  history.forEach((song, idx) => {
    const item = document.createElement('li');
    item.className = 'queue-item';
    item.innerHTML = `<div><strong>${song.name || song.title}</strong><span> ${song.addedBy || ''}</span></div>`;
    historyList.appendChild(item);
  });
}

// audio player events to control vinyl animation and auto-next
audioPlayer.addEventListener('play', () => vinyl.classList.add('spinning'));
audioPlayer.addEventListener('pause', () => vinyl.classList.remove('spinning'));
audioPlayer.addEventListener('ended', async () => {
  vinyl.classList.remove('spinning');
  // al terminar, pasar a la siguiente
  await doNext();
});

window.addEventListener('load', refreshUI);
