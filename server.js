const express = require('express');
const path = require('path');
const PlaylistQueue = require('./src/playlistQueue');

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';
const playlist = new PlaylistQueue();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint principal: obtener todas las canciones en la cola.
app.get('/playlist', (req, res) => {
  res.json({
    queue: playlist.toArray(),
    total: playlist.size()
  });
});

// Peek: ver la canción que está al frente sin retirarla.
app.get('/playlist/current', (req, res) => {
  const current = playlist.peek();
  if (!current) {
    return res.status(200).json({ message: 'La cola está vacía. No hay canción siguiente.' });
  }
  res.json({ current });
});

// Enqueue: agregar canción al final de la cola.
// Acepta metadatos desde el cliente. Para MP3 locales, el cliente puede
// enviar { id, name, addedBy } y mantener el archivo en el navegador.
app.post('/playlist', (req, res) => {
  const { id, name, title, artist, duration, addedBy } = req.body;
  if (!name && !title) {
    return res.status(400).json({
      error: 'Campos incompletos. Se requiere al menos `name` o `title`.'
    });
  }

  const newSong = playlist.enqueue({ id, name, title, artist, duration, addedBy });
  res.status(201).json({
    message: 'Canción agregada a la cola.',
    song: newSong,
    position: playlist.size(),
    queue: playlist.toArray()
  });
});

// Dequeue: retirar la canción del frente para reproducirla.
app.post('/playlist/next', (req, res) => {
  const nextSong = playlist.dequeue();
  if (!nextSong) {
    return res.status(404).json({
      message: 'La cola está vacía. No hay canción para reproducir.'
    });
  }

  res.json({
    message: 'Ahora suena la siguiente canción.',
    song: nextSong,
    queue: playlist.toArray(),
    total: playlist.size()
  });
});

// Endpoint auxiliar: limpiar la cola para reiniciar la demo.
app.post('/playlist/clear', (req, res) => {
  playlist.clear();
  res.json({ message: 'Cola reiniciada.', queue: playlist.toArray(), total: playlist.size() });
});

// Cargar datos demo en la cola.
app.post('/playlist/demo', (req, res) => {
  playlist.clear();
  const demoSongs = [
    { title: 'Ritmo del aula', artist: 'DJ Estudio', duration: '03:12', addedBy: 'Sofía' },
    { title: 'Beat compartido', artist: 'Bandada', duration: '04:05', addedBy: 'Mateo' },
    { title: 'Vibra en vivo', artist: 'Nexo', duration: '02:58', addedBy: 'Valentina' },
    { title: 'Cola ideal', artist: 'Loop Crew', duration: '03:44', addedBy: 'Luis' }
  ];

  demoSongs.forEach(song => playlist.enqueue(song));

  res.json({ message: 'Demo cargada con canciones ficticias.', queue: playlist.toArray(), total: playlist.size() });
});

app.listen(port, host, () => {
  console.log(`MUSIC LIVE escuchando en http://${host}:${port}`);
});
