# 🎲 Generador de Equipos Aleatorios

Una aplicación web interactiva para generar equipos aleatorios con funcionalidades avanzadas de selección y personalización.

## ✨ Características

- **Gestión de lista de personas**: Agrega y elimina personas fácilmente
- **Límite configurable**: Define cuántas personas quieres en tu equipo
- **Generación aleatoria**: Crea equipos de forma aleatoria con un solo clic
- **Personas fijadas**: Marca personas que DEBEN estar en el resultado final
- **Reroll individual**: Regenera cualquier miembro del equipo (excepto los fijados)
- **Persistencia de datos**: Tus datos se guardan automáticamente en el navegador
- **Interfaz intuitiva**: Diseño moderno y fácil de usar

## 🚀 Cómo usar

### 1. Agregar personas
- Escribe el nombre de una persona en el campo de texto
- Presiona el botón "➕ Agregar" o pulsa Enter
- La persona aparecerá en la lista de personas disponibles

### 2. Configurar el límite
- Ajusta el número en el campo "Límite de personas a seleccionar"
- Este será el tamaño máximo de tu equipo generado

### 3. Fijar personas (opcional)
- Haz clic en el botón "📍 Fijar" junto a cualquier persona
- Las personas fijadas aparecerán SIEMPRE en el equipo generado
- El botón cambiará a "📌 Fijado" para indicar que está fijada
- Puedes volver a hacer clic para desfijar

### 4. Generar equipo
- Presiona el botón "🎯 Generar Equipo Aleatorio"
- Se generará un equipo aleatorio que incluirá:
  - Todas las personas fijadas
  - Personas aleatorias hasta completar el límite

### 5. Rerollear miembros
- Una vez generado el equipo, verás un botón "🔄 Rerollear" junto a cada persona no fijada
- Haz clic para reemplazar esa persona con otra aleatoria de la lista
- Las personas fijadas no pueden ser rerolleadas

## 📋 Validaciones

La aplicación incluye las siguientes validaciones:

- No puedes agregar personas con nombres duplicados
- No puedes agregar personas con nombres vacíos
- El límite no puede ser mayor al número total de personas disponibles
- El número de personas fijadas no puede exceder el límite configurado
- Solo puedes rerollear personas que no estén fijadas

## 💾 Almacenamiento

Los datos se guardan automáticamente en el localStorage del navegador, incluyendo:
- Lista de personas
- Personas fijadas
- Límite configurado

Esto significa que tus datos permanecerán aunque cierres o refresques la página.

## 🛠️ Tecnologías

- HTML5
- CSS3 (con gradientes y animaciones)
- JavaScript vanilla (sin dependencias)
- LocalStorage API

## 📱 Responsive

La aplicación es totalmente responsive y se adapta a diferentes tamaños de pantalla (móvil, tablet, desktop).

## 🎨 Características visuales

- Diseño moderno con gradientes
- Animaciones suaves
- Indicadores visuales claros para personas fijadas
- Colores diferenciados para distintos estados
- Interfaz intuitiva y fácil de navegar

## 🚦 Comenzar

Simplemente abre el archivo `index.html` en tu navegador favorito. No requiere instalación ni servidor.

```bash
# Opción 1: Abre directamente el archivo
open index.html

# Opción 2: Usa un servidor local simple (Python)
python -m http.server 8000
# Luego visita http://localhost:8000

# Opción 3: Usa live-server (si tienes Node.js)
npx live-server
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso libre.
