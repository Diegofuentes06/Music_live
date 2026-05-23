const { randomUUID } = require('crypto');

/**
 * PlaylistQueue implementa una cola FIFO para la reproducción compartida.
 * Utiliza un arreglo con índices front/rear para mantener operaciones O(1).
 */
class PlaylistQueue {
  constructor() {
    this._items = [];
    this._head = 0;
  }

  /**
   * Agrega una canción al final de la cola.
   * Acepta metadatos flexibles: puede recibir `id` y `name` desde el cliente
   * cuando se trabaja con archivos locales (MP3). Si no recibe `id`, se
   * genera uno con `randomUUID()`.
   * @param {{id?:string, title?:string, name?:string, artist?:string, duration?:string, addedBy?:string}} song
   * @returns {object} La canción agregada con metadatos.
   */
  enqueue(song) {
    const entry = {
      id: song.id || randomUUID(),
      title: song.title || song.name || 'Sin título',
      name: song.name || song.title || 'Sin título',
      artist: song.artist || '',
      duration: song.duration || '',
      addedBy: song.addedBy || 'Anónimo',
      addedAt: new Date().toISOString()
    };
    this._items.push(entry);
    return entry;
  }

  /**
   * Retira la canción del frente de la cola y la retorna.
   * Retirar incrementa el índice head sin desplazar todo el arreglo.
   * @returns {object|null}
   */
  dequeue() {
    if (this.size() === 0) {
      return null;
    }
    const item = this._items[this._head];
    this._head += 1;
    // Si la cola queda vacía, reiniciamos los indices y liberamos memoria.
    if (this._head * 2 >= this._items.length) {
      this._items = this._items.slice(this._head);
      this._head = 0;
    }
    return item;
  }

  /**
   * Devuelve la canción del frente sin retirarla.
   * @returns {object|null}
   */
  peek() {
    return this.size() === 0 ? null : this._items[this._head];
  }

  /**
   * Retorna todas las canciones pendientes en orden FIFO.
   * @returns {Array<object>}
   */
  toArray() {
    return this._items.slice(this._head).map((song, index) => ({
      position: index + 1,
      ...song
    }));
  }

  /**
   * Retorna la cantidad de canciones en espera.
   * @returns {number}
   */
  size() {
    return this._items.length - this._head;
  }

  /**
   * Reinicia la cola para la demo. No forma parte del modelo FIFO básico.
   */
  clear() {
    this._items = [];
    this._head = 0;
  }
}

module.exports = PlaylistQueue;
