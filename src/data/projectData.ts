export interface ZocaySpeciesProfile {
  name: string;
  scientificName: string;
  synonyms: string;
  category: string;
  status: string;
  endemic: string;
  habitat: string;
  description: string;
  keyTraits: {
    title: string;
    description: string;
  }[];
  threats: string[];
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
  tagline: "El Mono Zocay y la conservación de paisajes fragmentados en el Meta",
  foundationYear: 2004,
  location: "Meta, Colombia — Llanos Orientales & Orinoquia",
  coordinates: "3.6225° N, 73.9828° W",
  
  summary: {
    heroTitle: "El Mono Zocay y su hogar en el Meta",
    heroSubtitle: "Ciencia, naturaleza y acción para su preservación",
    heroDescription: "Iniciativa de investigación de largo plazo dedicada a dar visibilidad, generar evidencia científica y proteger al mono zocay (Plecturocebus ornatus) en los bosques y paisajes del Meta.",
    
    researchTitle: "Investigación Científica del Mono Zocay",
    researchHeadline: "Evidencia técnica para comprender y conectar las poblaciones de Zocay",
    researchDescription: "Más de 20 años de estudios demográficos, observaciones de comportamiento en el dosel y análisis cuantitativos sobre cómo el mono zocay sobrevive en bosques fragmentados y cercas vivas.",
    
    projectTitle: "El Proyecto Zocay",
    projectHeadline: "Dedicados a la preservación del Mono Zocay",
    projectDescription: "Desde 2004 en una finca ganadera del Meta, la Dra. Xyomara Carretero-Pinzón lidera la investigación para convertir el conocimiento del mono zocay en acciones reales de conectividad y conservación del paisaje.",
    
    supportTitle: "Apoya la conservación del Mono Zocay",
    supportHeadline: "Tu aporte protege su hábitat y financia la ciencia en campo",
    supportDescription: "Cada contribución se destina directamente al monitoreo biológico de las tropas de mono zocay, la compra de equipos de campo y el enriquecimiento de cercas vivas en el Meta.",
  },

  director: {
    name: "Dra. Xyomara Carretero-Pinzón",
    title: "Bióloga, Primatóloga y Ecóloga del Paisaje",
    role: "Fundadora e Investigadora Principal de Zocay Project",
    photo: "/images/xyomara-carretero.jpg",
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
    evolution: "Ha evolucionado desde el estudio de tropas de mono zocay dentro de fragmentos boscosos hacia la ecología del paisaje, el monitoreo de biodiversidad de largo plazo y la conservación de paisajes humanizados.",
    timeline: [
      {
        year: "2004",
        title: "Primeras observaciones del Mono Zocay en el Meta",
        description: "Inicio del censo y seguimiento etológico sistemático de tropas de Plecturocebus ornatus en fragmentos de bosque inmersos en matrices ganaderas."
      },
      {
        year: "2010",
        title: "Cercas Vivas como Corredores del Zocay",
        description: "Publicación y demostración cuantitativa de cómo las hileras de árboles en linderos permiten al mono zocay cruzar entre parches sin bajar al suelo."
      },
      {
        year: "2016",
        title: "Monitoreo Longitudinal del Dosel",
        description: "Consolidación de una de las bases de datos ecológicas más extensas sobre la demografía y supervivencia del mono zocay frente a la fragmentación."
      },
      {
        year: "Presente",
        title: "Conservación Aplicada y Reconexión",
        description: "Trabajo directo con comunidades rurales y ganaderos locales para sembrar y enriquecer corredores arbóreos que protejan al zocay."
      }
    ]
  },

  // La especie en conservación y protagonista absoluta de la web
  monoZocay: {
    name: "Mono Zocay / Tití del Meta",
    scientificName: "Plecturocebus ornatus",
    synonyms: "Callicebus ornatus",
    category: "Especie Protagonista & Sombrilla",
    status: "Vulnerable (Lista Roja UICN) — Poblaciones en declive",
    endemic: "Endémica de Colombia (Llanos Orientales & Piedemonte del Meta)",
    habitat: "Bosques de galería, fragmentos remanentes y cercas vivas arboladas",
    description: "El mono zocay (Plecturocebus ornatus) es el corazón y la razón de ser de Zocay Project. Este primate neotropical es endémico de Colombia, restringido a los bosques del departamento del Meta y la cuenca del río Guayabero/Ariari. Se distingue por su pelaje denso de tonalidades castaño rojizas, patas de color rojizo vivo y una inconfundible diadema de pelo blanco inmaculado sobre la frente.",
    keyTraits: [
      {
        title: "Comportamiento Monógamo y Lazos Estrechos",
        description: "Vive en grupos familiares nucleares muy unidos (pareja reproductora e hijos). Es característico ver a las parejas entrelazar sus colas mientras descansan en las ramas, reforzando vínculos de por vida."
      },
      {
        title: "Vocalizaciones Dúo Territoriales",
        description: "Al amanecer, la pareja interpreta cantos sincronizados en dúo que resuenan a través del dosel de la selva para marcar su territorio y comunicarse con grupos vecinos."
      },
      {
        title: "Especie Sombrilla del Dosel",
        description: "Al proteger los árboles frutales y los corredores biológicos necesarios para el mono zocay, se salvaguarda toda la biodiversidad de aves, polinizadores y flora del bosque de galería."
      },
      {
        title: "Vulnerabilidad a la Fragmentación",
        description: "Dado que es estrictamente arborícola y evita descender al suelo abierto donde es vulnerable a predadores y perros, depende críticamente de la continuidad del dosel y las cercas vivas."
      }
    ],
    threats: [
      "Pérdida acelerada y aislamiento de los bosques de galería por ganadería extensiva",
      "Expansión de monocultivos y carreteras que fragmentan el dosel continuo",
      "Disminución de árboles nativos de fructificación que componen su dieta",
      "Aislamiento genético de grupos familiares atrapados en parches pequeños"
    ],
    image: "/images/hero-mono-zocay.jpg"
  },

  scientificThemes: [
    {
      title: "Demografía del Mono Zocay",
      description: "Análisis del efecto del tamaño y aislamiento de los parches de bosque sobre las tasas de natalidad y supervivencia del zocay."
    },
    {
      title: "Cercas Vivas como Corredores",
      description: "Investigación pionera sobre cómo las hileras de árboles en fincas ganaderas permiten el tránsito seguro de tropas de mono zocay."
    },
    {
      title: "Matrices Ganaderas & Dosel",
      description: "Modelado del comportamiento de forrajeo del zocay en paisajes productivos y estrategias para minimizar el conflicto con actividades humanas."
    },
    {
      title: "Ordenamiento Territorial",
      description: "Generación de datos de campo para que las autoridades ambientales diseñen áreas protegidas y corredores específicos para el mono zocay."
    }
  ],

  metrics: [
    { value: "2004", label: "Año de fundación", detail: "Primeros censos del Zocay" },
    { value: "20+", label: "Años de monitoreo", detail: "Datos continuos de campo" },
    { value: "1", label: "Especie Protagonista", detail: "Mono Zocay (P. ornatus)" },
    { value: "Meta", label: "Territorio Exclusivo", detail: "Llanos de Colombia" }
  ]
};
