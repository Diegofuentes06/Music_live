const assert = require('assert');
const PlaylistQueue = require('../src/playlistQueue');

function runTests() {
  const queue = new PlaylistQueue();

  // Agregar canciones en orden y verificar el recorrido FIFO.
  const first = queue.enqueue({ title: 'Uno', artist: 'A', duration: '03:00', addedBy: 'Alice' });
  const second = queue.enqueue({ title: 'Dos', artist: 'B', duration: '02:45', addedBy: 'Bob' });
  const third = queue.enqueue({ title: 'Tres', artist: 'C', duration: '04:10', addedBy: 'Carla' });

  const list = queue.toArray();
  assert.strictEqual(list.length, 3, 'La cola debe contener 3 canciones.');
  assert.strictEqual(list[0].id, first.id, 'La primera canción debe ser la primera en la cola.');
  assert.strictEqual(list[1].id, second.id, 'La segunda canción debe ser la segunda en la cola.');
  assert.strictEqual(list[2].id, third.id, 'La tercera canción debe ser la tercera en la cola.');

  // Peek no debe eliminar la canción.
  const current = queue.peek();
  assert.strictEqual(current.id, first.id, 'Peek debe devolver la primera canción sin quitarla.');
  assert.strictEqual(queue.size(), 3, 'Peek no debe cambiar el tamaño de la cola.');

  // Dequeue retira la primera canción.
  const removed = queue.dequeue();
  assert.strictEqual(removed.id, first.id, 'Dequeue debe retirar la primera canción agregada.');
  assert.strictEqual(queue.size(), 2, 'Después de dequeue la cola debe tener 2 canciones.');

  const next = queue.peek();
  assert.strictEqual(next.id, second.id, 'Después de dequeue, la siguiente canción debe ser la segunda agregada.');

  // Recorrido completa en orden.
  const remaining = queue.toArray();
  assert.deepStrictEqual(
    remaining.map(song => song.id),
    [second.id, third.id],
    'El recorrido debe devolver las canciones restantes en orden FIFO.'
  );

  queue.dequeue();
  queue.dequeue();
  assert.strictEqual(queue.dequeue(), null, 'Dequeue con cola vacía debe retornar null.');
  assert.strictEqual(queue.peek(), null, 'Peek con cola vacía debe retornar null.');

  console.log('Todos los tests de PlaylistQueue pasaron correctamente.');
}

runTests();
