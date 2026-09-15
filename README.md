# Zocay Project — Plataforma Científica & Ecosistema Digital de Conservación

> **Iniciativa de investigación científica de largo plazo, monitoreo biológico y conservación del Mono Zocay (*Plecturocebus ornatus*) en los paisajes fragmentados de los Llanos Orientales de Colombia.**  
> Fundada en 2004 por la bióloga, primatóloga y ecóloga del paisaje **Dra. Xyomara Carretero-Pinzón** (Ph.D. *The University of Queensland*, Australia).

---

## 🐒 1. Acerca del Zocay Project

El **Zocay Project** es una iniciativa científica, educativa y comunitaria nacida en 2004 en una finca ganadera del departamento del Meta, Colombia. A lo largo de más de dos décadas de monitoreo cuantitativo ininterrumpido, el proyecto ha investigado cómo la fragmentación del hábitat y las actividades antrópicas afectan a las poblaciones silvestres de primates neotropicales, transformando el conocimiento ecológico en soluciones tangibles de conservación del paisaje.

### La Especie Protagonista: Mono Zocay (*Plecturocebus ornatus*)
El foco biológico y protagonista exclusivo del proyecto es el **Mono Zocay** (anteriormente catalogado como *Callicebus ornatus*), primate endémico de Colombia restringido al departamento del Meta y áreas adyacentes de la Orinoquia:
* **Estado de Conservación:** Vulnerable (VU) según la Lista Roja de la UICN.
* **Estructura Social:** Familias monógamas con lazos de pareja permanentes, caracterizadas por entrelazar sus colas en reposo y emitir duetos vocales territoriales coordinados al amanecer.
* **Comportamiento Paternal:** El macho ejerce como cuidador y transportador primario de la cría durante el primer año de vida.
* **Rol Ecológico:** Consumidor frugívoro y dispersor clave de semillas nativas, esencial para la regeneración natural de los bosques de galería.

### Cercas Vivas: Autopistas en el Dosel
El descubrimiento central de las investigaciones de la Dra. Carretero-Pinzón demostró que las **cercas vivas** (hileras de árboles nativos sembrados tradicionalmente como linderos de potreros ganaderos) actúan como corredores estructurales y funcionales indispensables. Estas franjas vegetales permiten a las tropas de zocay transitar, forrajear y mantener el flujo genético entre parches boscosos aislados sin descender al pastizal abierto, donde quedarían expuestos a la depredación y el atropellamiento.

---

## 🎨 2. Filosofía y Diseño Editorial

La plataforma digital abandona el formato tradicional de portales genéricos para adoptar una **estética cinematográfica y editorial** inspirada en las publicaciones científicas de alta gama (*National Geographic*, *Nature Ecology*).

$$\text{INMERSIÓN VISUAL} \longrightarrow \text{RIGOR CIENTÍFICO} \longrightarrow \text{ACCIÓN CON CAUSA}$$

### Estructura de la Página de Inicio (Home)
El Home funciona como un recorrido secuencial organizado en **4 capítulos narrativos continuos**:
1. **01 — Inicio / Hero:** Impacto visual dominante del Mono Zocay en su dosel natural con tipografía serif clásica, coordenadas geográficas del Meta y estado de conservación.
2. **02 — Investigación:** Composición asimétrica dedicada a la ciencia demográfica, etología y el rol de los corredores biológicos.
3. **03 — El Proyecto & Dirección:** Presentación panorámica del paisaje llanero, trayectoria académica de la Dra. Carretero-Pinzón y acuerdos de conservación con fincas ganaderas.
4. **04 — Apoya la Conservación:** Llamado enfocado a la acción que canaliza el respaldo público hacia la Tienda Oficial y el Fondo de Donaciones.

### Sistema de Diseño (Design System)
* **Paleta *Obsidian Jungle*:** Fondos profundos en escala de negros y verdes selva oscuros (`#040705`, `#060a08`, `#090f0c`, `#0d1512`), que realzan la fotografía de campo y reducen la fatiga visual.
* **Acentos:** Verde esmeralda bioluminiscente (`#10b981`, `#34d399`) para métricas e interactividad, junto a tonos crema editorial (`#e8e2d8`) para textos legibles.
* **Tipografía:** Fusión de fuentes clásicas con serifas de alta legibilidad para titulares editoriales y familias sans-serif geométricas para datos técnicos.

---

## 🏗️ 3. Arquitectura del Sistema & Ingeniería de Software

La aplicación está construida como una Single Page Application (SPA) modular, escalable y reactiva, con persistencia en la nube y funcionamiento resiliente en entornos de baja conectividad.

```
Zocay Project Web Architecture
├── Frontend (Client-Side)
│   ├── React 18 & TypeScript (Arquitectura basada en componentes funcionales)
│   ├── Tailwind CSS (Diseño responsivo optimizado para móviles y escritorio)
│   ├── Lucide Icons (Iconografía vectorial coherente)
│   └── Vite (Compilación optimizada y empaquetado ultra-rápido)
│
├── Capa de Internacionalización (i18n)
│   ├── LanguageContext (Estado reactivo con persistencia local)
│   ├── LanguageSelector Boxlist (Componente desplegable de selección ES / EN)
│   ├── Translations Dictionary (Módulos estáticos bilingües de interfaz)
│   └── Dynamic Real-time Translator Engine (Auto-traducción en vivo de contenido CMS)
│
├── Capa de Datos, Persistencia & Resiliencia
│   ├── ContentContext (Gestión de estado global de artículos, productos y perfiles)
│   ├── Supabase PostgreSQL Cloud (Base de datos relacional y storage)
│   ├── 4-Tier Offline Fallback (Garantía de funcionamiento continuo sin caídas)
│   └── Multi-Level Cache (LocalStorage + Memoria RAM con hashes de invalidación)
│
├── Panel de Administración Científica (CMS)
│   ├── Autenticación estricta con Supabase Auth (JWT)
│   ├── Módulos CRUD: Informes, Productos, Líneas, Métricas, Trayectoria
│   └── Actualizaciones optimistas con sincronización en segundo plano
│
└── Infraestructura & Seguridad
    ├── Vercel Edge Network (Alojamiento serverless con cabeceras HTTP de seguridad)
    ├── Rate Limiting contra ataques de fuerza bruta en el Login
    ├── Sanitización contra Cross-Site Scripting (XSS Stored)
    └── Row Level Security (RLS) en PostgreSQL (Escrituras estrictas para autenticados)
```

---

## 🌐 4. Motor de Internacionalización Bilingüe en Tiempo Real

Para dar visibilidad al proyecto tanto en Colombia como ante universidades y centros de primatología internacionales (*The University of Queensland*, *IUCN Primate Specialist Group*), la plataforma cuenta con una arquitectura bilingüe de doble capa:

### Selector de Idioma (Boxlist)
* Componente interactivo desplegable accesible en la barra de navegación de escritorio y en el menú móvil.
* Permite alternar al instante entre **Español (ES)** e **Inglés (EN)** sin recargar la página.
* Recuerda la preferencia del visitante en el almacenamiento local y sincroniza los metadatos HTML (`lang="es"` / `lang="en"`).

### Motor de Auto-Traducción Dinámica de Contenido del CMS
A diferencia de los sistemas tradicionales donde los informes redactados en el CMS quedan estancados en el idioma de origen:
* Si la Dra. Xyomara redacta un informe de campo o añade un producto en español, el motor de traducción en vivo (`src/lib/translator.ts`) traduce de forma automática e instantánea el título, extracto, cuerpo completo, nombre de producto e impacto al inglés cuando el visitante activa el modo en inglés.
* **Caché Inteligente por Hash:** Cada traducción se almacena en memoria y en el almacenamiento local con un hash criptográfico de su texto original. Si el texto no cambia, la carga en inglés es inmediata (0 milisegundos). Si el texto se edita en el CMS, el hash se invalida y se genera una traducción fresca.

---

## 🛡️ 5. Blindaje de Seguridad y Protección de Datos

La plataforma fue sometida a auditorías de vulnerabilidad y pentesting defensivo, implementando las siguientes medidas de protección:

1. **Defensa contra Fuerza Bruta en el Acceso Administrativo:**
   * Limitador de tasa en el formulario de inicio de sesión: tras 5 intentos fallidos consecutivos, el sistema bloquea temporalmente las solicitudes por 60 segundos con un contador regresivo visible.
2. **Mitigación de Enumeración de Usuarios:**
   * Mensajes de error unificados y neutros que impiden determinar si una dirección de correo existe o no en la base de datos de autenticación.
3. **Sanitización de Entradas y Prevención de XSS:**
   * Filtro de seguridad (`src/lib/security.ts`) que valida y bloquea esquemas de URLs peligrosos (`javascript:`, `data:`, `vbscript:`) en enlaces dinámicos y neutraliza etiquetas en campos de texto.
4. **Seguridad a Nivel de Filas en Base de Datos (Row Level Security - RLS):**
   * Políticas en PostgreSQL que restringen las operaciones de inserción, actualización y eliminación exclusivamente a usuarios con token JWT verificado (`TO authenticated`).
   * Protección de borradores: los visitantes anónimos solo tienen acceso a artículos con estado publicado (`status = 'published'`).
5. **Encabezados HTTP de Seguridad (Edge Headers):**
   * Configuración de cabeceras en el servidor para evitar Clickjacking (`X-Frame-Options: DENY`), protección de tipos MIME (`X-Content-Type-Options: nosniff`) y políticas de privacidad de procedencia (`Referrer-Policy: strict-origin-when-cross-origin`).

---

## ⚡ 6. Resiliencia y Estrategia de Fallback (Offline-First)

Para asegurar que la página web permanezca siempre disponible para visitantes y donantes, incluso ante cortes de red, problemas de latencia o mantenimientos en la nube de Supabase, la capa de datos opera bajo una estrategia de 4 niveles de contingencia:

* **Nivel 1 — Datos Semilla Científicos:** Inicialización con datos predefinidos rigurosos de informes, productos, líneas de investigación y biografía de la dirección científica.
* **Nivel 2 — Caché Local Persistente:** Cada cambio o lectura exitosa se guarda localmente en el navegador, permitiendo aperturas instantáneas con tiempos de carga de 0 ms.
* **Nivel 3 — Captura Silenciosa de Errores de Red:** Las interrupciones de conexión a la base de datos son absorbidas sin generar pantallas en blanco ni excepciones no controladas.
* **Nivel 4 — Fusión Inteligente (Smart Merge):** Si se registran informes o productos en modo local o durante una reconexión, el sistema fusiona los datos locales con los de la nube sin sobrescribir ni perder publicaciones.

---

## 🛍️ 7. Ecosistema de Sostenibilidad: Tienda Oficial & Donaciones

La plataforma integra canales de financiamiento directo para las expediciones biológicas y el mantenimiento de las cercas vivas en el Meta:

### Tienda Oficial con Causa
* Muestra de indumentaria de expedición y accesorios conmemorativos.
* Control de inventario en tiempo real con distintivos de estado (`En Stock` / `Agotado`).
* **Modal de Adquisición:** Canaliza los pedidos de forma directa y personalizada hacia el **WhatsApp oficial** o **correo electrónico institucional**, precargando el producto seleccionado, precio y el impacto ecológico específico que financia la compra.

### Fondo de Donaciones Directas
* Selección de aportes escalonados con equivalencias monetarias y detalle del impacto en campo (siembra de árboles nativos, jornadas de censo demográfico, mantenimiento de cámaras trampa en dosel, becas de investigación local).
* Opción de monto libre con validación numérica para evitar entradas no deseadas.
* Pantalla de confirmación con instrucciones de transferencia bancaria institucional (Bancolombia, Nequi/Daviplata) y canales de verificación para la emisión de certificados de donación.

---

## 📋 8. Estructura de Navegación Pública

```text
/                      Página principal con narrativa visual en 4 capítulos
├── /investigacion     Ciencia del zocay, métricas, líneas focales y metodología
├── /el-proyecto       Historia desde 2004, perfil de la Dra. Carretero y biología de la especie
├── /tienda            Tienda oficial con causa y canalización de pedidos
├── /donaciones        Fondo de aportes directos para expediciones y cercas vivas
├── /blog              Bitácora de campo, informes científicos y lector inmersivo
└── /admin             Acceso al CMS para la gestión científica y de contenidos
```

---

© Zocay Project · Conservación, Ciencia y Comunidad en el Meta, Colombia. Todos los derechos reservados.
