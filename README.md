# Zocay Project — Sitio Web Oficial & Rediseño Editorial

> **Iniciativa científica de investigación, conservación y protección de la biodiversidad de los Llanos Orientales de Colombia.**  
> Fundada en 2004 por la bióloga, primatóloga y ecóloga del paisaje **Dra. Xyomara Carretero-Pinzón** (Ph.D. The University of Queensland).

---

## 🌿 Concepto y Filosofía Visual

Este proyecto implementa el rediseño editorial, natural y cinematográfico del **Home** de Zocay Project. La experiencia prioriza:

$$\text{IMAGEN} > \text{MENSAJE} > \text{NAVEGACIÓN}$$

En lugar de sobrecargar el Home con tarjetas, listados densos o catálogos, la página de inicio funciona como una **experiencia de inmersión visual en 4 capítulos consecutivos**:

1. **01 — INICIO:** Hero visual dominante del Mono Socai (*Plecturocebus ornatus*) en el dosel del Meta, con tipografía editorial a la izquierda y coordenadas geográficas.
2. **02 — INVESTIGACIÓN:** Composición asimétrica dedicada a la ciencia de campo, monitoreo biológico en fragmentos de bosque y el papel de las cercas vivas como corredores biológicos.
3. **03 — EL PROYECTO:** Composición panorámica del paisaje de la Orinoquia colombiana, introduciendo la trayectoria rigurosa de la Dra. Carretero-Pinzón desde 2004.
4. **04 — APOYA LA CONSERVACIÓN:** Llamada a la acción enfocada y emotiva con dos botones diferenciados: acceso a la Tienda Oficial y Donaciones directas.

---

## 🏛️ Arquitectura del Sitio

```text
HOME (/)
│
├── 01 — Inicio (Hero y bienvenida visual)
├── 02 — Investigación (Presentación visual de la ciencia)
│   └── /investigacion (Líneas de investigación, metodología de campo, métricas)
├── 03 — El Proyecto (Territorio y dirección científica)
│   └── /el-proyecto (Historia desde 2004, Dra. Carretero-Pinzón, especies focales, matrices productivas)
├── 04 — Tienda / Donaciones (Llamado a la acción)
│   ├── /tienda (Indumentaria y accesorios de campo oficiales)
│   └── /donaciones (Aportes directos para financiar monitoreo y restauración)
└── /blog (Notas de campo, comportamiento y divulgación)
```

---

## 🧬 Rigor Científico y Fuentes

Todos los datos institucionales, biográficos y ecológicos provienen estrictamente de la documentación oficial contenida en la carpeta `Informacion relevante`:

* **Investigadora Principal:** Dra. Xyomara Carretero-Pinzón
* **Títulos y Afiliaciones:**
  * Ph.D. en Ecología del Paisaje y Gestión Ambiental — *The University of Queensland* (Australia)
  * Vinculación a *School of Geography, Planning and Environmental Management* & *ARC Centre of Excellence for Environmental Decisions*
  * Pregrado en Biología y Maestría en Ciencias Biológicas — *Pontificia Universidad Javeriana* (Bogotá, Colombia)
* **Especies Focales:**
  1. Tití del Meta / Mico Zocay (*Plecturocebus ornatus* / *Callicebus ornatus*)
  2. Mono nocturno de Brumback (*Aotus brumbacki*)
  3. Mono ardilla (*Saimiri cassiquiarensis albigena*)
* **Líneas Focales:** Dinámica de paisajes fragmentados, parches de bosque, cercas vivas como corredores biológicos, matrices ganaderas y ordenamiento territorial.

---

## 🚀 Stack Tecnológico

* **Frontend:** React 18 + TypeScript + Vite
* **Estilos & Tipografía:** Tailwind CSS con paleta *obsidian jungle* y tipografía editorial (`Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`)
* **Iconografía:** `lucide-react`
* **Base de Datos & Backend:** Supabase (ID: `ohvhombvnrnvykxonrzd`)
* **Hosting & Despliegue:** Preparado para Vercel (`vercel.json` con soporte SPA y caché optimizada)

---

## 🛠️ Instalación y Desarrollo Local

1. Clonar el repositorio:
   ```bash
   git clone git@github.com:alexis2487/ZocayProject-Page.git
   cd ZocayProject-Page
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Variables de entorno (opcional):
   Copiar `.env.example` a `.env` y configurar las claves de Supabase si se desea:
   ```bash
   cp .env.example .env
   ```

4. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Compilar para producción:
   ```bash
   npm run build
   ```

---

## ☁️ Despliegue en Vercel

El proyecto incluye el archivo `vercel.json` preconfigurado:
1. Conectar el repositorio de GitHub `alexis2487/ZocayProject-Page` en la consola de [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. En las variables de entorno de Vercel (opcional), configurar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. El despliegue se ejecutará automáticamente en cada `git push`.
