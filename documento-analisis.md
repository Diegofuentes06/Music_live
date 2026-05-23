# Documento de Análisis - MUSIC LIVE

## Problema real
Varias personas comparten una sala de reproducción donde cada participante puede proponer canciones. El reto es mantener un orden justo y predecible para la reproducción.

## Usuarios
- Estudiantes que participan en una actividad colaborativa.
- Un moderador o DJ que controla la cola.
- Cualquier asistente que desea ver qué canción sigue.

## Por qué se usa una cola y no otra estructura
- Una cola FIFO garantiza que la primera canción agregada sea la primera en sonar.
- Una lista sin reglas podría permitir inserciones arbitrarias y romper el orden.
- Una pila LIFO invertiría el orden y haría sonar primero la última canción añadida.
- Árboles o grafos son estructuras complejas innecesarias para una secuencia lineal de reproducción.

## Qué representa una canción en la cola
Cada canción es un objeto con:
- id generado por el sistema.
- title, artist, duration, addedBy y addedAt.

## Explicación de FIFO
FIFO significa First In, First Out: el primer elemento que se inserta es el primero que se retira. En la cola de reproducción, la canción agregada primero será la próxima en sonar.

## Operaciones clave
- Enqueue: agregar canción al final de la cola.
- Dequeue: retirar la primera canción para reproducirla.
- Peek: consultar la primera canción sin eliminarla.
- Recorrido: listar todas las canciones en orden de reproducción.

## Complejidad de operaciones
- Enqueue: O(1) - añadimos al final del arreglo.
- Dequeue: O(1) amortizado - usamos un índice head para evitar desplazar todo el arreglo.
- Peek: O(1) - leemos el primer elemento pendiente.
- Recorrido: O(n) - devolvemos todos los elementos pendientes en orden.

## Requisitos funcionales
- Agregar canciones a la cola.
- Reproducir la siguiente canción.
- Ver la canción actual y la siguiente sin eliminarla.
- Mostrar la cola numerada en orden FIFO.
- API REST con endpoints para cada operación.
 - Cargar y reproducir archivos MP3 reales desde el computador del usuario usando `URL.createObjectURL(file)` y el elemento `<audio>`.

## Requisitos no funcionales
- Aplicación en Node.js + Express.
- Frontend en HTML, CSS y JavaScript puro.
- Datos en memoria, sin base de datos.
- Servidor en 0.0.0.0 y puerto 3000.

## Casos de prueba
- Agregar tres canciones y comprobar el orden.
- Ejecutar Dequeue y verificar que sale la primera canción.
- Ejecutar Peek y comprobar que no elimina.
- Ejecutar recorrido y comprobar el orden completo.
- Ejecutar Dequeue con cola vacía y manejarlo correctamente.
- Probar interfaz con carga demo y limpieza de cola.

## Reflexión sobre el apoyo de IA
El proyecto fue desarrollado con apoyo inicial de una herramienta de IA para construir la estructura y los archivos base. El estudiante debe revisar el código, entender cada parte y adaptar el contenido para la sustentación.

## Reflexión sobre la carga de MP3 reales
- Decisión: los archivos MP3 se mantienen en la sesión del navegador y no se suben al servidor ni al repositorio. Esto evita cuestiones de privacidad y licencias.
- Ventajas: reproducción inmediata, sin necesidad de almacenamiento en servidor, cumplimiento con la restricción de no incluir contenido protegido en el repositorio.
- Limitaciones: si el usuario recarga la página pierde las referencias locales y debe volver a seleccionar los archivos; no hay persistencia entre sesiones.

## Endpoints y cómo interactúa el frontend
- `POST /playlist` (Enqueue): recibe metadatos mínimos `{ id, name, addedBy }` enviados por el cliente cuando agrega un MP3 local. El servidor guarda metadata en memoria.
- `GET /playlist`: (Recorrido) devuelve la lista completa en orden FIFO.
- `GET /playlist/current`: (Peek) devuelve la canción en el frente sin eliminarla.
- `POST /playlist/next`: (Dequeue) retira la canción del frente y devuelve la nueva cola.

En el cliente, cada archivo MP3 se mapea por `id` a un `ObjectURL` generado con `URL.createObjectURL(file)`. Cuando el servidor indica qué `id` está en `current`, el frontend busca el `ObjectURL` local y lo asigna al `<audio>` para reproducir.
