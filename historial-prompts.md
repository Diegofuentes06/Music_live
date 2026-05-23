# Historial de Prompts - MUSIC LIVE

Este documento es una plantilla editable para registrar los prompts reales utilizados durante el desarrollo del proyecto.

## 1. Definición propia del problema
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 2. Refinamiento del problema
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 3. Estructura del proyecto
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 4. Desarrollo de la cola y API
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 8. Soporte de MP3 local y reproductor
- Prompt: "Agregar soporte para seleccionar archivos MP3 desde el computador, agregarlos a la cola FIFO y reproducirlos en el navegador usando URL.createObjectURL(file). Mantener endpoints académicos en el servidor."
- Objetivo: Permitir al usuario cargar MP3 reales y reproducirlos dentro de la web sin guardar archivos en el servidor o repositorio.
- Decisión tomada: Mantener metadata en el servidor (id, name, addedBy) y guardar el archivo en memoria del navegador mediante ObjectURL. El servidor no almacena archivos.

## 5. Interfaz visual
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 6. Pruebas y correcciones
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 7. Uso del agente
- Prompt: 
- Objetivo: 
- Decisión tomada: 

## 9. Historial del chat actual
- Fecha: 2026-05-23
- Prompt del usuario: "Corrige únicamente la funcionalidad de carga y visualización de la cola de reproducción de MUSIC LIVE..."
  - Objetivo: permitir seleccionar varias canciones MP3, mantener la cola FIFO y mostrar la cola completa en pantalla.
  - Decisión tomada: actualizar el input para `multiple`, procesar todos los archivos seleccionados, encolar cada canción sin reemplazar la cola existente, y mostrar la cola completa con la primera canción como actual.
- Prompt del usuario: "Necesito que guardes todo el historial de este chat en historial-prompts.md. Después guarda el proyecto."
  - Objetivo: documentar la conversación y confirmar que los cambios se guardan en disco.
  - Decisión tomada: añadir un resumen de este chat en `historial-prompts.md` y confirmar que los archivos se mantienen guardados en el proyecto.

> Nota: Completa este historial con los prompts reales que uses y explica por qué elegiste cada uno.
