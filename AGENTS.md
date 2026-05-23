# Equipo de Agentes - Proyecto MUSIC LIVE

## A. Supervisor del Proyecto - Estudiante
- Cargo: Supervisor del Proyecto.
- Funciones:
  - Tomar decisiones finales de diseño y alcance.
  - Probar la aplicación localmente y validar la cola FIFO.
  - Solicitar correcciones y preparar la sustentación.
- Entregables:
  - Revisión final del proyecto.
  - Confirmación de que la solución cumple requisitos.
- Decisiones registradas:
  - Nombre visible: MUSIC LIVE.
  - Experiencia intuitiva y visual moderna.
  - Reproducción de MP3 locales en el navegador (no subidos al servidor).
  - Revisión de archivos creados y pruebas ejecutadas.

## B. Agente Analista del Problema
- Cargo: Analista del Problema.
- Funciones:
  - Definir el problema, los usuarios y el alcance.
  - Relacionar el problema con la estructura Cola FIFO.
- Entregable:
  - Especificación del problema y requisitos en documento-analisis.md.

## C. Agente Arquitecto del Proyecto
- Cargo: Arquitecto del Proyecto.
- Funciones:
  - Separar frontend y backend.
  - Definir carpetas, API y flujo de datos.
- Entregable:
  - Estructura del repositorio y arquitectura técnica.

## D. Agente de Estructuras de Datos
- Cargo: Especialista en Estructuras de Datos.
- Funciones:
  - Implementar PlaylistQueue y operaciones Enqueue, Dequeue, Peek y Recorrido.
  - Explicar las complejidades de cada operación.
- Entregable:
  - Archivo src/playlistQueue.js.
  - Pruebas en tests/playlistQueue.test.js.

## J. Agente Reproductor Multimedia
- Cargo: Especialista en reproducción de audio en navegador.
- Funciones:
  - Implementar reproducción con `audio` y `URL.createObjectURL`.
  - Controlar Play/Pause/Next y manejar el historial de reproducidas.
- Entregable:
  - Lógica en `public/app.js` y elementos en `public/index.html`.

## K. Agente Tester
- Cargo: QA y pruebas de usuario.
- Funciones:
  - Ejecutar el flujo de carga y reproducción de MP3 reales.
  - Verificar endpoints `/playlist`, `/playlist/current`, `/playlist/next`.
  - Validar que la cola conserve orden FIFO y que el historial muestre las canciones reproducidas.
 - Entregable: checklist de pruebas y reporte de resultados.

## E. Agente Backend API
- Cargo: Desarrollador Backend.
- Funciones:
  - Construir Express y exponer endpoints REST.
  - Validar entradas y generar respuestas JSON.
- Entregable:
  - Archivo server.js.

## F. Agente Frontend / UX
- Cargo: Desarrollador Frontend.
- Funciones:
  - Construir formulario, paneles y lista visual.
  - Consumir la API con fetch y actualizar la interfaz.
- Entregable:
  - Archivos public/index.html y public/app.js.

## G. Agente de Diseño Visual
- Cargo: Diseñador Visual.
- Funciones:
  - Crear el estilo oscuro y verde.
  - Añadir animación de disco y experiencia responsive.
- Entregable:
  - Archivo public/styles.css.

## H. Agente de Pruebas / QA
- Cargo: Especialista en QA.
- Funciones:
  - Comprobar orden FIFO, cola vacía, botones y endpoints.
  - Validar la ejecución local.
- Entregable:
  - Pruebas unitarias y checklist de verificación.

## I. Agente Documentador
- Cargo: Documentador académico.
- Funciones:
  - Crear README, historial de prompts y análisis editable.
  - Mantener honestidad sobre el apoyo de IA.
- Entregable:
  - README.md, documento-analisis.md, historial-prompts.md.


Este proyecto fue construido con apoyo inicial de una herramienta de IA para acelerar la implementación y la documentación. La IA ayudó a escribir código, generar la interfaz y la documentación. El estudiante supervisó, probó localmente y debe revisar y comprender todo el contenido para la sustentación.
