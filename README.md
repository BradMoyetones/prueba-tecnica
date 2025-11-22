# ✈️ SkyConnect Explorer

> Prueba Técnica: Buscador y Visualizador de Aeropuertos

Este proyecto es una aplicación web moderna desarrollada con **Next.js 16+** que permite a los usuarios buscar, explorar y ver detalles de aeropuertos alrededor del mundo consumiendo la API de **Aviationstack**.

El desarrollo se centró en una arquitectura modular, gestión de estado eficiente y una experiencia de usuario fluida con animaciones y modo oscuro.

## 🔗 Demo en Vivo

🚀 **Despliegue en Vercel:** [prueba-tecnica.itsbrad.dev](https://prueba-tecnica.itsbrad.dev)

---

## 📋 Características Implementadas

Cumplimiento total de los requerimientos y bonus opcionales:

### ✅ Funcionalidades Principales
- **Consumo de API:** Integración con Aviationstack API con manejo de errores y tipado estricto.
- **Listado Paginado:** Tabla/Lista de resultados con paginación desde el servidor y cliente.
- **Búsqueda:** Filtrado por nombre o código de aeropuerto.
- **Detalles del Aeropuerto:** Navegación dinámica a vista de detalles (Zona horaria, IATA/ICAO, ubicación).
- **Mapas:** Integración visual para mostrar la ubicación exacta del aeropuerto.
- **Gestión de Estado:** Uso de **Zustand** para manejar la data de la API, loading states, historial y filtros.

### 🚀 Bonus y UI/UX
- **Modo Oscuro:** Implementación completa de Dark Mode con Shadcn UI.
- **Animaciones:** Transiciones suaves y efectos de entrada usando **Framer Motion** y **Animate UI**.
- **Responsive Design:** Interfaz totalmente adaptada a móviles y escritorio.
- **Historial de Búsqueda:** Persistencia de las últimas búsquedas realizadas.
- **Testing:** Pruebas unitarias con **Jest** y **React Testing Library**.

---

## ⚠️ Consideración Importante: Modos de Búsqueda

Debido a las restricciones del plan gratuito de la API de **Aviationstack**, el endpoint de "Search" (`search query`) no está disponible para el plan FREE. Para solucionar esto y demostrar la funcionalidad, he implementado dos modos:

1.  **Modo API (Predeterminado):** Realiza peticiones directas paginadas.
    * ℹ️ *Instrucción:* Al iniciar, realiza una **búsqueda vacía** seleccionando el modo "API" en el toggle a la izquierda del buscador. Esto traerá los primeros resultados paginados.
2.  **Modo Cached:** Una vez se obtienen datos, permite filtrar localmente sobre los resultados obtenidos para simular la búsqueda por texto (ya que la API gratuita no permite el filtro `?search=` en el backend).

---

## 🛠️ Stack Tecnológico

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes:** [Shadcn/ui](https://ui.shadcn.com/)
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
* **Estado Global:** [Zustand](https://github.com/pmndrs/zustand)
* **Testing:** Jest + React Testing Library

---

## 🚀 Instalación y Configuración Local

Sigue estos pasos para correr el proyecto en tu máquina:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/BradMoyetones/prueba-tecnica.git](https://github.com/BradMoyetones/prueba-tecnica.git)
    cd prueba-tecnica
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Renombra el archivo `.env.example` a `.env` y completa las variables necesarias. Puedes obtener tu API Key gratis en [aviationstack.com](https://aviationstack.com/).

    ```env
    # .env
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    NEXT_PUBLIC_AVIATIONSTACK_API_KEY=tu_api_key_aqui
    NEXT_PUBLIC_AVIATIONSTACK_API_URL=[http://api.aviationstack.com/v1](http://api.aviationstack.com/v1)
    ```

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

## 📂 Estructura del Proyecto

El código está organizado de manera modular separando lógica de negocio, UI y servicios:

```text
tree /F
C:.
├───app
│   ├───airport
│   │   └───[id]        # Página de detalles (Ruta dinámica)
│   └───page.tsx        # Página principal (Buscador)
├───components
│   ├───animate         # Efectos Framer Motion
│   ├───ui              # Componentes base (Shadcn)
│   ├───search-bar.tsx  # Lógica de búsqueda
│   └───...
├───lib
│   ├───api             # Lógica de fetching (airports.ts)
│   └───utils.ts
├───store               # Estado global (Zustand)
├───types               # Definiciones de TypeScript
└───__tests__           # Pruebas unitarias (Jest)
````

-----

## 🧪 Testing

Se implementaron pruebas unitarias para asegurar la robustez de componentes clave como `SearchInterface`. Se mockearon librerías externas (Zustand, Motion) para aislar la lógica del componente.

Para ejecutar las pruebas:

```bash
npm test
```

**Cobertura principal:**

  * Renderizado inicial.
  * Manejo de estados de carga (Loading).
  * Manejo de errores de API.
  * Renderizado de lista y paginación.
  * Interacción de usuario (Clicks y navegación).

-----

## 📡 Detalles de la API

La función principal de consumo se encuentra en `lib/api/airports.ts`. Se implementó una estrategia de **Revalidación ISR** (Incremental Static Regeneration) de 1 hora para optimizar el rendimiento y reducir el consumo de la cuota de la API.

```typescript
// Ejemplo de la estrategia de caché utilizada
const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache por 1 hora
});
```

-----

Hecho con 🖤 por **Brad Moyetones**