# MUSIC LIVE

MUSIC LIVE es una aplicación web que simula una cola de reproducción de música compartida usando una estructura FIFO. Los usuarios pueden agregar canciones a una sala, ver la canción que suena, la siguiente en la cola y el orden completo de la reproducción.

## Problema que resuelve
Cuando varias personas agregan canciones a una sala compartida, es necesario mantener un orden justo de reproducción. MUSIC LIVE asegura que la primera canción agregada sea la primera en sonar.

## Cola FIFO
FIFO significa "First In, First Out". La primera canción que entra en la cola es la primera que sale. Esto garantiza un orden estable y transparente para todos los usuarios.

## Endpoints de la API
| Método | Ruta | Operación | Descripción |
| --- | --- | --- | --- |
| POST | /playlist | Enqueue | Agrega una canción al final de la cola. |
| POST | /playlist/next | Dequeue | Retira la canción del frente y la marca como "Ahora suena". |
| GET | /playlist/current | Peek | Devuelve la canción que sigue sin eliminarla. |
| GET | /playlist | Recorrido | Devuelve todas las canciones pendientes en orden. |
| POST | /playlist/clear | Auxiliar | Limpia la cola para reiniciar la demo. |
| POST | /playlist/demo | Auxiliar | Carga canciones de prueba en la cola. |

## Operaciones clave
- **Enqueue:** agregar una canción al final de la cola.
- **Dequeue:** retirar la canción del frente para reproducirla.
- **Peek:** ver la primera canción pendiente sin quitarla.
- **Recorrido:** listar todas las canciones en orden FIFO.

## Complejidad de operaciones
- Enqueue: O(1)
- Dequeue: O(1) amortizado
- Peek: O(1)
- Recorrido: O(n)

## Estructura de carpetas
- `package.json` - configuración de npm.
- `server.js` - servidor Express y endpoints.
- `src/playlistQueue.js` - implementación de la cola FIFO.
- `public/index.html` - interfaz visual.
- `public/styles.css` - estilos y diseño.
- `public/app.js` - lógica frontend y consumo de API.
- `tests/playlistQueue.test.js` - pruebas de la cola.
- `AGENTS.md` - roles y funciones del equipo.
- `historial-prompts.md` - plantilla para registrar prompts.
- `documento-analisis.md` - análisis académico del proyecto.
- `.gitignore` - archivos ignorados por git.

## Instalación y ejecución
1. Abrir una terminal en el directorio del proyecto.
2. Ejecutar:
   ```bash
   npm install
   ```
3. Iniciar la aplicación:
   ```bash
   npm start
   ```
4. Abrir el navegador en:
   ```bash
   http://localhost:3000
   ```

## Cargar y reproducir MP3 desde tu computador

1. En la interfaz principal hay un control para seleccionar archivos MP3 (`Seleccionar archivo MP3`).
2. Selecciona un archivo `.mp3` desde tu computador y presiona `Agregar a la cola`.
3. El archivo se mantendrá en memoria del navegador y se reproducirá usando `URL.createObjectURL(file)`.
4. Los archivos MP3 **no** se suben al servidor ni se guardan en el repositorio; funcionan solo durante la sesión del navegador.

Si recargas la página deberás volver a seleccionar los archivos locales.

## Ejecución en GitHub Codespaces
1. Inicia el servidor con `npm start`.
2. Si Codespaces no abre automáticamente, abre la pestaña **PUERTOS**.
3. Asegúrate de reenviar el puerto `3000` y marcarlo como público.
4. Usa la URL de reenvío generada por Codespaces para ver `http://localhost:3000`.

En Codespaces: selecciona el puerto `3000` en la vista PUERTOS y marca como público para abrir la aplicación.

## Pruebas
Ejecuta:
```bash
npm test
```

## Guion breve de demostración para sustentación
1. Explica el problema de la cola compartida y la necesidad de FIFO.
2. Muestra el formulario de `Agregar canción`.
3. Agrega varias canciones y destaca el orden numerado.
4. Usa `Reproducir siguiente` y señala la transferencia del frente.
5. Muestra `Sonando ahora`, `Siguiente en sonar` y la cola actualizada.
6. Carga la demo y limpia la cola para validar las funciones auxiliares.
7. Muestra la carga de archivos MP3 desde el computador: selecciona un MP3, agrégalo a la cola y presiona Play para escucharlo. Demuestra Next y el historial de reproducidas.
