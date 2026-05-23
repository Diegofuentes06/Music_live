# Historial de Prompts - MUSIC LIVE

## 1. Definición propia del problema

Crear una aplicación llamada **MUSIC LIVE**, pensada para que los usuarios puedan agregar canciones a una lista de espera y reproducirlas respetando el orden de llegada.

---

## 2. Refinamiento del problema

- Prompt: "Tengo la idea de crear una aplicación de música compartida llamada MUSIC LIVE, donde varias canciones puedan agregarse a una cola y reproducirse en el orden en que fueron ingresadas. Ayúdame a reformular este problema de forma clara para un proyecto académico de estructuras de datos."

- Objetivo: Explicar con mayor claridad el problema, los usuarios afectados y la relación entre una playlist compartida y la estructura de datos Cola FIFO.

- Decisión tomada: Definir el proyecto como una aplicación web para administrar una cola de reproducción musical, donde la primera canción agregada sea la primera en reproducirse, aplicando el principio **FIFO: First In, First Out**.

---

## 3. Estructura del proyecto

- Prompt: "Crea un proyecto web llamado MUSIC LIVE para representar una API de Cola de Reproducción de Música Compartida. La aplicación debe incluir frontend interactivo, API funcional, diseño visual moderno, documentación académica y el archivo AGENTS.md. Organiza el proyecto con HTML, CSS, JavaScript, Node.js y Express, de manera que pueda ejecutarse en GitHub Codespaces con npm install y npm start."

- Objetivo: Definir la arquitectura general de la aplicación, los archivos necesarios y la tecnología que permitiría tener una página web conectada a una API.

- Decisión tomada: Construir el proyecto como una aplicación web con:
  - `package.json` para configuración y ejecución;
  - `server.js` para el servidor y los endpoints;
  - `src/playlistQueue.js` para la estructura de datos Cola FIFO;
  - `public/index.html` para la interfaz;
  - `public/app.js` para la interacción del usuario;
  - `public/styles.css` para el diseño visual;
  - `README.md`, `AGENTS.md`, `documento-analisis.md` e `historial-prompts.md` para la documentación.

---

## 4. Desarrollo de la cola y API

- Prompt: "Implementa la estructura de datos principal como una Cola FIFO para canciones. La aplicación debe tener los endpoints académicos POST /playlist para Enqueue, POST /playlist/next para Dequeue, GET /playlist/current para Peek y GET /playlist para mostrar el recorrido completo de la cola. Cada canción debe tener datos como id, nombre, artista, duración, usuario que la agregó y fecha de ingreso."

- Objetivo: Implementar la lógica académica principal del proyecto y conectar las operaciones de la cola con una API funcional.

- Decisión tomada: Usar una clase `PlaylistQueue` con una colección interna de canciones y un índice frontal `_head`. La operación `enqueue()` agrega canciones al final mediante `push()`, `dequeue()` avanza el frente de la cola, `peek()` consulta la canción actual sin retirarla y `toArray()` muestra las canciones pendientes en orden FIFO.

---

## 5. Soporte de MP3 local y reproductor

- Prompt: "Agregar soporte para seleccionar archivos MP3 desde el computador, agregarlos a la cola FIFO y reproducirlos en el navegador usando URL.createObjectURL(file). Mantener endpoints académicos en el servidor."

- Objetivo: Permitir al usuario cargar MP3 reales y reproducirlos dentro de la web sin guardar archivos en el servidor o repositorio.

- Decisión tomada: Mantener la información principal de las canciones en el servidor, por ejemplo `id`, `name` y `addedBy`, mientras que el archivo de audio se conserva temporalmente en el navegador mediante `URL.createObjectURL(file)`. El servidor no almacena permanentemente archivos MP3.

### Corrección realizada en esta etapa

- Prompt: "Corrige únicamente la funcionalidad de carga y visualización de la cola de reproducción de MUSIC LIVE. Actualmente la aplicación solo me deja agregar o visualizar una canción. Necesito poder agregar varias canciones MP3 y ver claramente toda la cola FIFO en pantalla. El input debe permitir seleccionar varias canciones o agregar canciones una por una sin reemplazar las anteriores. Al presionar Next, la canción actual debe salir de la cola y la siguiente debe pasar a Sonando ahora."

- Objetivo: Corregir la aplicación para que pudiera demostrar realmente una cola con varias canciones, en lugar de mostrar únicamente una canción.

- Decisión tomada: Permitir cargar múltiples MP3 y conservarlos en el orden de llegada, mostrando la primera canción como actual y las demás como canciones en espera.

---

## 6. Interfaz visual

- Prompt: "Diseña la interfaz de MUSIC LIVE con una apariencia moderna e intuitiva inspirada en plataformas musicales: fondo oscuro, verde llamativo, tarjetas visibles, sección Sonando ahora, cola de reproducción, historial de reproducidas y controles Play, Pause y Next. Agrega un elemento visual tipo disco o tocadiscos que muestre que la música está reproduciéndose."

- Objetivo: Hacer que la aplicación fuera fácil de usar y que el funcionamiento de la cola pudiera entenderse visualmente durante la sustentación.

- Decisión tomada: Mostrar en pantalla:
  - un área para cargar archivos MP3;
  - una sección destacada de **Sonando ahora**;
  - controles de reproducción;
  - una cola visible con posición y estado de cada canción;
  - un historial de canciones reproducidas;
  - explicaciones breves de Enqueue, Dequeue, Peek y Recorrido.

---

## 7. Pruebas y correcciones

- Prompt: "Verifica que el proyecto MUSIC LIVE funcione correctamente con este caso de prueba: agregar tres archivos MP3, confirmar que aparecen en la cola en el mismo orden, reproducir la primera canción, presionar Next, comprobar que la primera sale de la cola y que la segunda pasa a Sonando ahora. Revisa también que funcionen los endpoints GET /playlist, GET /playlist/current, POST /playlist y POST /playlist/next."

- Objetivo: Confirmar que la aplicación no solo se viera bien, sino que realmente aplicara las operaciones de una cola FIFO y permitiera reproducir música.

- Decisión tomada: Probar el proyecto con varias canciones reales y revisar que:
  - las canciones se agregaran al final;
  - la canción del frente fuera la actual;
  - `Next` retirara correctamente la primera canción;
  - el orden FIFO se conservara;
  - la interfaz actualizara la cola y el historial.

### Corrección de ejecución en Codespaces

- Prompt: "Necesito ejecutar y abrir la aplicación MUSIC LIVE en GitHub Codespaces. Verifica cuál es el comando correcto revisando package.json, instala dependencias con npm install si es necesario, inicia el servidor con npm start e indícame qué puerto debo abrir. No modifiques las funcionalidades ni el diseño de la aplicación."

- Objetivo: Lograr que la página y la API pudieran abrirse correctamente desde el puerto de Codespaces.

- Decisión tomada: Ejecutar la aplicación mediante Node.js con `npm start` y abrir el puerto generado por el servidor para interactuar con el frontend y la API.

---

## 8. Uso del agente y documentación del proyecto

- Prompt: "Crea y organiza la documentación académica del proyecto MUSIC LIVE. Deben existir README.md, AGENTS.md, documento-analisis.md e historial-prompts.md. En AGENTS.md no escribas solamente una explicación general del uso de IA; organízalo como si el proyecto fuera una empresa, mostrando las funciones de cada agente: Analista, Arquitecto, Backend/API, Frontend, Especialista en Cola FIFO, Reproductor Multimedia, Diseñador UI, Documentador, Tester y Estudiante como supervisora."

- Objetivo: Cumplir con los entregables solicitados en la actividad y mostrar de forma honesta cómo se utilizó la IA durante el desarrollo.

- Decisión tomada: Documentar el proyecto separando los roles del agente por funciones específicas y dejando claro que la IA apoyó la construcción y organización del proyecto, mientras que la estudiante revisó, probó, solicitó correcciones y preparó la sustentación.

### Corrección específica de AGENTS.md

- Prompt: "Corrige AGENTS.md para que represente el equipo de trabajo como una empresa de agentes. Cada agente debe tener función principal, tareas realizadas y decisiones apoyadas. Incluye a la estudiante como supervisora del proyecto, aclarando que revisó el funcionamiento, pidió correcciones y comprendió las operaciones principales de la Cola FIFO."

- Objetivo: Ajustar el archivo `AGENTS.md` al criterio solicitado por el docente.

- Decisión tomada: No afirmar que la estudiante escribió todo el proyecto desde cero, sino presentar de forma transparente el apoyo de la IA y las decisiones revisadas por la estudiante.

## 9. Historial del chat actual
- Fecha: 2026-05-23
- Prompt del usuario: "Corrige únicamente la funcionalidad de carga y visualización de la cola de reproducción de MUSIC LIVE..."
  - Objetivo: permitir seleccionar varias canciones MP3, mantener la cola FIFO y mostrar la cola completa en pantalla.
  - Decisión tomada: actualizar el input para `multiple`, procesar todos los archivos seleccionados, encolar cada canción sin reemplazar la cola existente, y mostrar la cola completa con la primera canción como actual.
- Prompt del usuario: "Necesito que guardes todo el historial de este chat en historial-prompts.md. Después guarda el proyecto."
  - Objetivo: documentar la conversación y confirmar que los cambios se guardan en disco.
  - Decisión tomada: añadir un resumen de este chat en `historial-prompts.md` y confirmar que los archivos se mantienen guardados en el proyecto.
