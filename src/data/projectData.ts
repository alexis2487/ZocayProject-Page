export interface Species {
  name: string;
  scientificName: string;
  category: string;
  status: string;
  description: string;
  image: string;
}

export interface ResearchPillar {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectMilestone {
  year: string;
  title: string;
  description: string;
}

export const projectData = {
  name: "Zocay Project",
  tagline: "El Mono Socai y la conservación de paisajes fragmentados en el Meta",
  foundationYear: 2004,
  location: "Meta, Colombia — Llanos Orientales & Orinoquia",
  coordinates: "3.6225° N, 73.9828° W",
  
  summary: {
    heroTitle: "El Mono Socai y su hogar en el Meta",
    heroSubtitle: "Ciencia, naturaleza y acción en los Llanos Orientales",
    heroDescription: "Iniciativa de investigación de largo plazo para comprender y proteger las comunidades de primates neotropicales y la dinámica de los bosques en paisajes productivos.",
    
    researchTitle: "Investigación Científica",
    researchHeadline: "Evidencia técnica para comprender y conectar la biodiversidad",
    researchDescription: "Estudios, observaciones demográficas y análisis cuantitativos sobre el comportamiento de primates en parches de bosque y cercas vivas.",
    
    projectTitle: "El Proyecto Zocay",
    projectHeadline: "Más que primates: conservación en paisajes vivos",
    projectDescription: "Desde 2004 en una finca ganadera del Meta, transformamos la ciencia en estrategias reales de conectividad y ordenamiento ambiental.",
    
    supportTitle: "Apoya la conservación",
    supportHeadline: "Tu aporte contribuye a la ciencia y a la vida silvestre",
    supportDescription: "Cada contribución financia directamente el monitoreo biológico en campo, el estudio de primates amenazados y la restauración ecológica.",
  },

  director: {
    name: "Dra. Xyomara Carretero-Pinzón",
    title: "Bióloga, Primatóloga y Ecóloga del Paisaje",
    role: "Fundadora e Investigadora Principal",
    doctorate: "Ph.D. en Ecología del Paisaje y Gestión Ambiental — The University of Queensland (Australia)",
    doctorateAffiliation: "School of Geography, Planning and Environmental Management & ARC Centre of Excellence for Environmental Decisions",
    graduate: "Maestría en Ciencias Biológicas — Pontificia Universidad Javeriana (Bogotá, Colombia)",
    undergraduate: "Bióloga — Pontificia Universidad Javeriana (Bogotá, Colombia)",
    bio: `La Dra. Xyomara Carretero-Pinzón es bióloga, investigadora y especialista en conservación de fauna silvestre, con una trayectoria enfocada en el estudio de las comunidades de primates neotropicales y la dinámica de paisajes fragmentados en Colombia, particularmente en la región de los Llanos Orientales y la Orinoquia.

Es fundadora e investigadora principal de Zocay Project, iniciativa científica dedicada al monitoreo biológico a largo plazo y a la conservación de especies amenazadas y sus ecosistemas. Cuenta con un Doctorado (Ph.D.) en Ecología del Paisaje y Gestión Ambiental por The University of Queensland (Australia), donde estuvo vinculada a la School of Geography, Planning and Environmental Management y al ARC Centre of Excellence for Environmental Decisions. Obtuvo su título de pregrado en Biología y su Maestría en Ciencias Biológicas en la Pontificia Universidad Javeriana (Bogotá, Colombia).

Su investigación examina los efectos de la pérdida y fragmentación del hábitat sobre la demografía, el comportamiento y la distribución espacial de los primates, abordando variables clave como el tamaño de los parches de bosque, el papel de las cercas vivas como corredores biológicos y la influencia de las matrices productivas (como la agricultura y la ganadería) en la conectividad del paisaje. Ha liderado estudios sobre especies focales como el tití del Meta o mico zocay (Plecturocebus ornatus / Callicebus ornatus), el mono nocturno de Brumback (Aotus brumbacki) y el mono ardilla (Saimiri cassiquiarensis albigena).

A través de su producción científica y trabajo de campo, la Dra. Carretero-Pinzón articula la investigación ecológica cuantitativa con la evaluación del estado de conservación de especies y el análisis del ordenamiento territorial ambiental, generando evidencia técnica para la formulación de estrategias de conservación y conectividad en paisajes transformados por actividades antrópicas.`,
  },

  history: {
    origin: "El Zocay Project comenzó en 2004 en una finca ganadera de los Llanos colombianos.",
    evolution: "Ha evolucionado desde el estudio de primates dentro de fragmentos boscosos hacia la ecología del paisaje, el monitoreo de biodiversidad de largo plazo y la conservación de paisajes humanizados.",
    timeline: [
      {
        year: "2004",
        title: "Nacimiento en finca ganadera del Meta",
        description: "Inicio de las primeras observaciones sistemáticas del mono socai en parches de bosque inmersos en matrices ganaderas."
      },
      {
        year: "2010",
        title: "Expansión hacia la Ecología del Paisaje",
        description: "Incorporación de estudios cuantitativos sobre el rol de las cercas vivas como corredores biológicos vitales."
      },
      {
        year: "2016",
        title: "Monitoreo multiespecífico de largo plazo",
        description: "Ampliación de las líneas de investigación para abarcar al mono nocturno de Brumback y al mono ardilla."
      },
      {
        year: "Presente",
        title: "Ordenamiento territorial y conservación aplicada",
        description: "Articulación con comunidades locales y propietarios de tierras para conectar fragmentos boscosos en la Orinoquia."
      }
    ]
  },

  focalSpecies: [
    {
      name: "Tití del Meta / Mico Zocay",
      scientificName: "Plecturocebus ornatus / Callicebus ornatus",
      category: "Especie Sombrilla & Emblema",
      status: "Vulnerable / Endémica regional",
      description: "Primate emblemático de los bosques de galería del Meta. Reconocible por su llamativo pelaje castaño rojizo y su distintiva franja blanca sobre la frente. Su estudio es el núcleo fundacional del proyecto.",
      image: "/images/hero-mono-socai.jpg"
    },
    {
      name: "Mono Nocturno de Brumback",
      scientificName: "Aotus brumbacki",
      category: "Primate Nocturno",
      status: "Vulnerable (UICN)",
      description: "Especie nocturna clave en los ecosistemas de los Llanos. Sus grandes ojos adaptados a la oscuridad y su conducta monógama ofrecen valiosa información sobre la conectividad nocturna del dosel.",
      image: "/images/mono-nocturno-brumback.jpg"
    },
    {
      name: "Mono Ardilla",
      scientificName: "Saimiri cassiquiarensis albigena",
      category: "Primate Social",
      status: "En Monitoreo Poblacional",
      description: "Primate ágil y muy gregario que forma tropas extensas. Su desplazamiento revela cómo los animales sortean las barreras creadas por carreteras, pastizales y cultivos.",
      image: "/images/investigacion-campo.jpg"
    }
  ],

  scientificThemes: [
    {
      title: "Fragmentación de Hábitat",
      description: "Análisis del efecto del tamaño, forma y aislamiento de los parches de bosque sobre la supervivencia y demografía de los primates."
    },
    {
      title: "Cercas Vivas & Corredores",
      description: "Investigación pionera sobre cómo las hileras de árboles en linderos ganaderos funcionan como puentes biológicos para el movimiento de fauna."
    },
    {
      title: "Matrices Productivas",
      description: "Evaluación del impacto de la ganadería y la agricultura sobre la conectividad funcional de los paisajes llaneros."
    },
    {
      title: "Ordenamiento Ambiental",
      description: "Generación de datos científicos rigurosos para orientar políticas de conservación, zonificación territorial y manejo sostenible."
    }
  ],

  metrics: [
    { value: "2004", label: "Año de fundación", detail: "Investigación continua" },
    { value: "20+", label: "Años de monitoreo", detail: "Datos longitudinales" },
    { value: "3", label: "Especies focales", detail: "Primates del Meta" },
    { value: "Llanos", label: "Territorio", detail: "Orinoquia Colombiana" }
  ]
};
