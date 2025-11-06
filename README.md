# 🎲 Generador de Equipos Aleatorios

Una aplicación web interactiva para generar equipos aleatorios con gestión de roles (Técnico/Funcional) y límites configurables.

## ✨ Características

- **Gestión de lista de personas con roles**: Agrega personas con su rol (Técnico o Funcional)
- **Datos por defecto**: 15 personas precargadas automáticamente al iniciar
- **Límites configurables por rol**: Define límites separados para técnicos y funcionales
- **Generación aleatoria inteligente**: Respeta los límites de roles al generar equipos
- **Personas fijadas**: Marca personas que DEBEN estar en el resultado final
- **Reroll individual por rol**: Regenera miembros manteniendo su rol
- **Persistencia de datos**: Tus datos se guardan automáticamente en el navegador
- **Interfaz intuitiva**: Diseño moderno con badges de colores por rol

## 🚀 Cómo usar

### 1. Inicio automático
- Al abrir la aplicación por primera vez, se cargan automáticamente 15 personas con sus roles
- Los datos se guardan en localStorage y persisten entre sesiones

### 2. Agregar personas manualmente
- Escribe el nombre de una persona en el campo de texto
- Selecciona el rol (Técnico o Funcional)
- Presiona el botón "➕ Agregar" o pulsa Enter
- La persona aparecerá en la lista con un badge de color:
  - 🔵 Azul para Técnicos
  - 🟠 Naranja para Funcionales

### 3. Configurar límites
Hay tres límites que puedes configurar:

- **Límite total**: Número máximo de personas en el equipo
- **Límite técnicos**: Número máximo de técnicos en el equipo
- **Límite funcionales**: Número máximo de funcionales en el equipo

**Importante**: La suma de límites de técnicos y funcionales no debe exceder el límite total.

**Ejemplo válido**:
- Límite total: 5
- Límite técnicos: 3
- Límite funcionales: 2

### 4. Fijar personas (opcional)
- Haz clic en el botón "📍 Fijar" junto a cualquier persona
- Las personas fijadas aparecerán SIEMPRE en el equipo generado
- El botón cambiará a "📌 Fijado" para indicar que está fijada
- Las personas fijadas también respetan los límites de roles

### 5. Generar equipo
- Presiona el botón "🎯 Generar Equipo Aleatorio"
- Se generará un equipo aleatorio que:
  - Incluye todas las personas fijadas
  - Respeta el límite de técnicos configurado
  - Respeta el límite de funcionales configurado
  - Completa hasta el límite total si es necesario
- El mensaje mostrará: "Equipo generado: X personas (Y técnicos, Z funcionales)"

### 6. Rerollear miembros
- Una vez generado el equipo, verás un botón "🔄 Rerollear" junto a cada persona no fijada
- Haz clic para reemplazar esa persona con otra del **mismo rol**
- Las personas fijadas no pueden ser rerolleadas

## 📋 Validaciones

La aplicación incluye las siguientes validaciones:

- No puedes agregar personas con nombres duplicados
- No puedes agregar personas con nombres vacíos
- El límite total no puede ser mayor al número de personas disponibles
- La suma de límites de técnicos y funcionales no puede exceder el límite total
- El número de personas fijadas no puede exceder el límite total
- El número de técnicos fijados no puede exceder el límite de técnicos
- El número de funcionales fijados no puede exceder el límite de funcionales
- Solo puedes rerollear personas que no estén fijadas
- Al rerollear, solo se eligen personas del mismo rol

## 👥 Personas por defecto

La aplicación viene con 15 personas precargadas:

**Técnicos**: María García, Ana López, Laura Fernández, Pedro Sánchez, Miguel Torres, Francisco Jiménez, David Álvarez, Antonio Navarro

**Funcionales**: Juan Martínez, Carlos Rodríguez, Carmen Díaz, Isabel Ruiz, Elena Moreno, Sara Romero, Lucía Gutiérrez

Puedes modificar, eliminar o agregar más personas según tus necesidades.

## 💾 Almacenamiento

Los datos se guardan automáticamente en el localStorage del navegador, incluyendo:
- Lista de personas con sus roles
- Personas fijadas
- Límite total configurado
- Límite de técnicos configurado
- Límite de funcionales configurado

Esto significa que tus datos permanecerán aunque cierres o refresques la página.

## 🛠️ Tecnologías

- HTML5
- CSS3 (con gradientes, grid layout y animaciones)
- JavaScript vanilla (sin dependencias)
- LocalStorage API

## 📱 Responsive

La aplicación es totalmente responsive y se adapta a diferentes tamaños de pantalla (móvil, tablet, desktop).

## 🎨 Características visuales

- Diseño moderno con gradientes
- Badges de colores por rol (Azul=Técnico, Naranja=Funcional)
- Animaciones suaves
- Indicadores visuales claros para personas fijadas
- Colores diferenciados para distintos estados
- Interfaz intuitiva y fácil de navegar
- Grid layout para mejor organización

## 🚦 Comenzar

Simplemente abre el archivo `index.html` en tu navegador favorito. No requiere instalación ni servidor.

```bash
# Abre directamente el archivo
open index.html
```

**No necesitas servidor local** - toda la funcionalidad está embebida en el código JavaScript.

## 💡 Casos de uso

Esta aplicación es ideal para:

- Formar equipos de trabajo balanceados por roles
- Asignar proyectos con requisitos técnicos y funcionales
- Rotar responsabilidades en equipos
- Distribuir tareas entre diferentes especialidades
- Cualquier escenario donde necesites equipos aleatorios con restricciones de roles

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso libre.
