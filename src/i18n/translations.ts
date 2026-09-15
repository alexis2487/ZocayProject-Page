export type Language = 'es' | 'en';

export interface Translations {
  nav: {
    home: string;
    research: string;
    project: string;
    shop: string;
    blog: string;
    donate: string;
    speciesSubtitle: string;
    navigationTitle: string;
  };
  hero: {
    chapterTag: string;
    headlineMain: string;
    headlineSub1: string;
    headlineSub2: string;
    description: string;
    ctaProject: string;
    location: string;
    protagonistSpecies: string;
    explore: string;
  };
  research: {
    chapterTag: string;
    headline: string;
    headlineAccent: string;
    description: string;
    badge1Title: string;
    badge1Sub: string;
    badge2Title: string;
    badge2Sub: string;
    badge3Title: string;
    badge3Sub: string;
    cta: string;
  };
  project: {
    chapterTag: string;
    headline: string;
    headlineAccent: string;
    description: string;
    cta: string;
  };
  support: {
    chapterTag: string;
    headline: string;
    headlineAccent: string;
    description: string;
    shopBtn: string;
    donateBtn: string;
    reassurance: string;
  };
  footer: {
    description: string;
    navTitle: string;
    scienceTitle: string;
    directorTitle: string;
    rights: string;
    location: string;
    contactLabel: string;
  };
  investigacionPage: {
    bannerTag: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    linesHeading: string;
    methodologyHeading: string;
    methodologyText: string;
    principalInvestigator: string;
    focalSpecies: string;
    location: string;
    backHome: string;
    metrics: {
      value: string;
      label: string;
      detail: string;
    }[];
    researchLines: {
      code: string;
      title: string;
      description: string;
    }[];
  };
  elProyectoPage: {
    bannerTag: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    backHome: string;
    sec1Tag: string;
    sec1Title: string;
    sec1Quote: string;
    sec1Text: string;
    sec2Tag: string;
    sec2Title: string;
    doctorateLabel: string;
    affiliationLabel: string;
    graduateLabel: string;
    undergradLabel: string;
    socialsLabel: string;
    directorBio: string;
    sec3Tag: string;
    sec3Title: string;
    speciesScientific: string;
    speciesCommon: string;
    speciesStatus: string;
    speciesEndemism: string;
    sec3Col1Title: string;
    sec3Col1Text: string;
    sec3Col2Title: string;
    sec3Col2Text: string;
    sec3Col3Title: string;
    sec3Col3Text: string;
    sec4Tag: string;
    sec4Title: string;
    sec5Tag: string;
    sec5Title: string;
    impactCards: {
      title: string;
      desc: string;
    }[];
    ctaDonate: string;
    ctaShop: string;
  };
  tiendaPage: {
    bannerTag: string;
    title: string;
    subtitle: string;
    backHome: string;
    inStockBadge: string;
    outOfStockBadge: string;
    impactLabel: string;
    requestBtn: string;
    outOfStockBtn: string;
    transparencyTitle: string;
    transparencyText: string;
    directDonationBtn: string;
    modalTag: string;
    modalOutOfStockNote: string;
    modalChannelSelect: string;
    modalWhatsAppBtn: string;
    modalEmailBtn: string;
    modalShippingNote: string;
    modalFundsNote: string;
  };
  donacionesPage: {
    bannerTag: string;
    title: string;
    subtitle: string;
    backHome: string;
    step1Label: string;
    customAmountPlaceholder: string;
    step2Label: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    submitBtn: string;
    reassuranceText: string;
    successTitle: string;
    successMessage: string;
    bankChannelsTitle: string;
    bank1Title: string;
    bank1Sub: string;
    bank1Holder: string;
    bank2Title: string;
    bank2Sub: string;
    bank2Holder: string;
    internationalNote: string;
    whatsappConfirmBtn: string;
    emailConfirmBtn: string;
    backHomeBtn: string;
    errorName: string;
    errorEmail: string;
    errorMinAmount: string;
    tiers: {
      amount: number;
      label: string;
      usd: string;
      impact: string;
    }[];
  };
  blogPage: {
    bannerTag: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    backHome: string;
    allCategory: string;
    readArticleBtn: string;
    readTimePrefix: string;
    footerReviewedBy: string;
    closeReadingBtn: string;
    noArticles: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      research: 'Investigación',
      project: 'El Proyecto',
      shop: 'Tienda / Donaciones',
      blog: 'Blog',
      donate: 'Donar',
      speciesSubtitle: 'Meta · Colombia',
      navigationTitle: 'Navegación del Proyecto',
    },
    hero: {
      chapterTag: '01 — INICIO · PROYECTO DE PRESERVACIÓN',
      headlineMain: 'El Mono Zocay',
      headlineSub1: 'y su hogar en el',
      headlineSub2: 'Meta',
      description: 'Ciencia, naturaleza y acción. Una iniciativa de investigación a largo plazo dedicada a dar visibilidad, estudiar y proteger al mono zocay (Plecturocebus ornatus), especie protagonista y endémica en los bosques fragmentados de los Llanos Orientales.',
      ctaProject: 'Conoce el proyecto',
      location: 'Meta, Colombia · 3°20\'N, 73°40\'W',
      protagonistSpecies: 'Especie Protagonista: Plecturocebus ornatus',
      explore: 'Explorar',
    },
    research: {
      chapterTag: '02 — INVESTIGACIÓN CIENTÍFICA',
      headline: 'Ciencia y monitoreo para comprender y proteger al',
      headlineAccent: 'Mono Zocay',
      description: 'Más de dos décadas de estudios etológicos y demográficos sobre el mono zocay (Plecturocebus ornatus). Investigamos el impacto de la fragmentación del hábitat en sus grupos familiares y el papel vital de las cercas vivas como autopistas en el dosel.',
      badge1Title: 'Monitoreo',
      badge1Sub: 'Demografía',
      badge2Title: 'Cercas Vivas',
      badge2Sub: 'Corredores',
      badge3Title: 'Preservación',
      badge3Sub: 'Dosel llanero',
      cta: 'Ver investigaciones',
    },
    project: {
      chapterTag: '03 — EL PROYECTO & TERRITORIO',
      headline: 'Una misión científica dedicada al',
      headlineAccent: 'Mono Zocay',
      description: 'Iniciado en 2004 en una finca ganadera del Meta por la bióloga y primatóloga Dr. Xyomara Carretero-Pinzón (Ph.D. The University of Queensland), Zocay Project investiga, protege y visibiliza al mono zocay (Plecturocebus ornatus), generando evidencia para conectar bosques fragmentados mediante cercas vivas en la Orinoquia colombiana.',
      cta: 'Conoce la historia y el proyecto',
    },
    support: {
      chapterTag: '04 — APOYA LA CONSERVACIÓN',
      headline: 'Tu apoyo protege al',
      headlineAccent: 'Mono Zocay',
      description: 'Tu contribución financia directamente el monitoreo biológico de largo plazo, el censo de tropas familiares y la siembra de cercas vivas que conectan el dosel del mono zocay en el Meta.',
      shopBtn: 'Ir a la tienda',
      donateBtn: 'Hacer una donación',
      reassurance: 'Cada aporte, por pequeño que parezca, financia jornadas de campo y equipos de monitoreo para el zocay.',
    },
    footer: {
      description: 'Iniciativa de investigación científica, monitoreo de primates neotropicales y conservación de paisajes fragmentados en la Orinoquia colombiana.',
      navTitle: 'Navegación',
      scienceTitle: 'Ciencia & Territorio',
      directorTitle: 'Dirección Científica',
      rights: 'Todos los derechos reservados.',
      location: 'Llanos Orientales, Colombia',
      contactLabel: 'contacto@zocayproject.org',
    },
    investigacionPage: {
      bannerTag: 'INVESTIGACIÓN CIENTÍFICA DEL MONO ZOCAY',
      title: 'Ciencia y Monitoreo del',
      titleAccent: 'Mono Zocay',
      subtitle: 'Más de dos décadas de monitoreo cuantitativo en los Llanos Orientales. Generamos ciencia rigurosa orientada a la protección del mono zocay (Plecturocebus ornatus) y la conectividad de sus bosques.',
      linesHeading: 'Líneas de Investigación Centradas en el Mono Zocay',
      methodologyHeading: 'Metodología de Campo y Monitoreo Etológico',
      methodologyText: 'El trabajo se fundamenta en censos por transectos lineales, muestreo focal continuo del comportamiento de tropas de mono zocay (focal-animal sampling), fototrampeo en dosel arbóreo y análisis de conectividad del paisaje desarrollado por la Dra. Xyomara Carretero-Pinzón (The University of Queensland).',
      principalInvestigator: 'Investigadora Principal: Dra. Xyomara Carretero-Pinzón',
      focalSpecies: 'Especie Foco: Plecturocebus ornatus',
      location: 'Meta, Colombia',
      backHome: 'Volver al Inicio',
      metrics: [
        { value: '+20 Años', label: 'Monitoreo Continuo', detail: 'Desde 2004 en el Meta' },
        { value: '1 Especie', label: 'Especie Foco', detail: 'Plecturocebus ornatus' },
        { value: '+35', label: 'Publicaciones', detail: 'Papers & Capítulos de libros' },
        { value: '100%', label: 'Ciencia de Campo', detail: 'En comunidades y fincas' },
      ],
      researchLines: [
        {
          code: 'LÍNEA 01',
          title: 'Demografía y Dinámica Poblacional del Mono Zocay',
          description: 'Censos sistemáticos de grupos familiares, tasas de natalidad, supervivencia y densidad en fragmentos de bosque de galería rodeados de pastizales ganaderos.',
        },
        {
          code: 'LÍNEA 02',
          title: 'Cercas Vivas y Corredores de Conectividad Arbórea',
          description: 'Evaluación del uso de cercas vivas y franjas de vegetación nativa como autopistas de desplazamiento seguro para el mono zocay entre fragmentos aislados.',
        },
        {
          code: 'LÍNEA 03',
          title: 'Ecología del Comportamiento y Dieta Frugívora',
          description: 'Muestreo focal continuo (focal sampling) de tropas: presupuesto de actividades diarias, dispersión de semillas, interacciones sociales y selección de árboles dormitorio.',
        },
        {
          code: 'LÍNEA 04',
          title: 'Conservación Comunitaria y Ciencia Ciudadana',
          description: 'Vinculación activa con propietarios de fincas ganaderas, administradores y escuelas rurales para proteger los remanentes boscosos y evitar la cacería o tráfico.',
        },
      ],
    },
    elProyectoPage: {
      bannerTag: 'EL PROYECTO & LA ESPECIE PROTAGONISTA',
      title: 'El Zocay Project: ciencia para salvar al',
      titleAccent: 'Mono Zocay',
      subtitle: 'Una experiencia de investigación científica de largo plazo centrada en dar visibilidad, estudiar y proteger al mono zocay (Plecturocebus ornatus) en los bosques fragmentados y comunidades rurales de los Llanos Orientales de Colombia.',
      backHome: 'Volver al Inicio',
      sec1Tag: '01. Definición & Propósito',
      sec1Title: '¿Qué es el Zocay Project?',
      sec1Quote: '"El Zocay Project es una iniciativa de investigación, conservación, educación y protección de la biodiversidad de los Llanos Orientales de Colombia, fundada por la bióloga, primatóloga y ecóloga de paisaje Dr. Xyomara Carretero-Pinzón en 2004."',
      sec1Text: 'La narrativa del proyecto es una experiencia de investigación de largo plazo centrada en la relación entre el mono zocay, los ecosistemas fragmentados y las comunidades locales. El proyecto comenzó explícitamente en 2004 en una finca ganadera de los Llanos colombianos y ha evolucionado desde el estudio del mono zocay dentro de fragmentos boscosos hacia la ecología del paisaje, el monitoreo de biodiversidad y la conservación en paisajes humanizados.',
      sec2Tag: '02. Dirección & Liderazgo Científico',
      sec2Title: 'Dra. Xyomara Carretero-Pinzón',
      doctorateLabel: 'Doctorado (Ph.D.): Doctor of Philosophy en Conservación de la Biodiversidad y Ecología del Paisaje',
      affiliationLabel: 'Vinculación: The University of Queensland (Australia) · Landscape Ecology and Conservation Group',
      graduateLabel: 'Maestría: Magíster en Ciencias Biológicas (M.Sc.), Universidad de Los Andes',
      undergradLabel: 'Pregrado: Bióloga (B.Sc.), Universidad Nacional de Colombia',
      socialsLabel: 'Perfiles Oficiales:',
      directorBio: 'Ha dedicado más de 20 años continuos al estudio etológico, demográfico y ecológico del mono zocay. Su investigación pionera sobre cercas vivas como corredores de conectividad ha sido publicada en revistas internacionales de referencia primatológica y de conservación del paisaje.',
      sec3Tag: '03. La Especie Protagonista',
      sec3Title: 'El Mono Zocay (Plecturocebus ornatus)',
      speciesScientific: 'Plecturocebus ornatus (anteriormente Callicebus ornatus)',
      speciesCommon: 'Mono Zocay, Tití del Meta, Zocay titi',
      speciesStatus: 'Vulnerable (VU) - UICN Red List',
      speciesEndemism: 'Endémico de Colombia (Departamento del Meta)',
      sec3Col1Title: 'Monogamia y Lazos de Pareja',
      sec3Col1Text: 'Los monos zocay viven en pequeños grupos familiares monógamos (pareja reproductora y 1 a 3 crías). Se caracterizan por entrelazar sus colas cuando descansan juntos y realizar duetos vocales matutinos territoriales que resuenan en el bosque.',
      sec3Col2Title: 'Cuidado Paterno Ejemplar',
      sec3Col2Text: 'En el mono zocay, el padre es el cuidador principal del infante: lo transporta en su espalda la mayor parte del día y solo se lo entrega a la madre durante los periodos de lactancia.',
      sec3Col3Title: 'Arquitectos y Dispersores',
      sec3Col3Text: 'Con una dieta basada en frutos carnosos, hojas tiernas e insectos, el zocay es un dispersor clave de semillas para la regeneración natural de los bosques de galería.',
      sec4Tag: '04. Cronología de Hitos',
      sec4Title: 'Más de 20 Años de Trayectoria Científica',
      sec5Tag: '05. Impacto Tangible en el Territorio',
      sec5Title: 'Resultados que Transforman el Meta',
      impactCards: [
        { title: 'Conectividad Real', desc: 'Siembra y mantenimiento de cercas vivas con especies arbóreas nativas que permiten el paso seguro de tropas de zocay entre parches aislados.' },
        { title: 'Ciencia con Propietarios', desc: 'Acuerdos directos de conservación con ganaderos y fincas de la región para preservar remanentes boscosos sin frenar la actividad productiva.' },
        { title: 'Educación y Sentido de Pertenencia', desc: 'Talleres con escuelas rurales y comunidades donde el mono zocay se ha convertido en el símbolo de orgullo y biodiversidad de los Llanos.' },
      ],
      ctaDonate: 'Apoyar el Proyecto',
      ctaShop: 'Ver Tienda con Causa',
    },
    tiendaPage: {
      bannerTag: 'TIENDA OFICIAL CON CAUSA',
      title: 'Productos que financian la conservación',
      subtitle: 'El 100% de los excedentes generados por la tienda oficial se destina a expediciones científicas, adquisición de insumos de campo y siembra de cercas vivas para el Mono Zocay en el departamento del Meta.',
      backHome: 'Volver al Inicio',
      inStockBadge: 'En Stock',
      outOfStockBadge: 'Agotado',
      impactLabel: 'Impacto directo:',
      requestBtn: 'Solicitar / Reservar',
      outOfStockBtn: 'Consultar Disponibilidad',
      transparencyTitle: 'Transparencia y Trazabilidad',
      transparencyText: 'Cada adquisición recibe un certificado digital de apoyo a la conservación del Mono Zocay y un reporte semestral de impacto.',
      directDonationBtn: 'Hacer donación directa',
      modalTag: 'Adquisición Oficial con Causa',
      modalOutOfStockNote: 'Este artículo se encuentra temporalmente agotado. Puedes contactar al equipo para reservarlo en la próxima tirada artesanal.',
      modalChannelSelect: 'Selecciona tu canal preferido para coordinar:',
      modalWhatsAppBtn: 'Coordinar Pedido vía WhatsApp',
      modalEmailBtn: 'Solicitar por Correo Electrónico',
      modalShippingNote: 'Envíos a toda Colombia',
      modalFundsNote: '100% fondos de conservación',
    },
    donacionesPage: {
      bannerTag: 'FONDO DE INVESTIGACIÓN & CONSERVACIÓN',
      title: 'Apoya directamente al Zocay Project',
      subtitle: 'Tu generosidad garantiza la continuidad del monitoreo biológico de largo plazo y la protección de los bosques de galería en el Meta.',
      backHome: 'Volver al Inicio',
      step1Label: '1. Selecciona el aporte',
      customAmountPlaceholder: 'O ingresa otro valor en COP (ej: 300000)',
      step2Label: '2. Datos del donante',
      namePlaceholder: 'Nombre completo o Institución',
      emailPlaceholder: 'Correo electrónico',
      submitBtn: 'Confirmar Aporte a la Conservación',
      reassuranceText: 'Transparencia institucional · Reportes de impacto semestrales',
      successTitle: '¡Gracias por tu compromiso, ',
      successMessage: 'Hemos registrado tu intención de aporte por un valor de ',
      bankChannelsTitle: 'Canales Oficiales de Transferencia',
      bank1Title: 'Bancolombia (Ahorros)',
      bank1Sub: 'Consultar con el equipo',
      bank1Holder: 'Titular: Zocay Project / Dirección Científica',
      bank2Title: 'Nequi / Daviplata',
      bank2Sub: 'Disponible previa coordinación',
      bank2Holder: 'Comprobante de donación verificado',
      internationalNote: 'Para coordinar transferencias internacionales (SWIFT/IBAN) o solicitar certificado formal de donación, contáctanos directamente:',
      whatsappConfirmBtn: 'Confirmar vía WhatsApp',
      emailConfirmBtn: 'Enviar Comprobante por Correo',
      backHomeBtn: 'Volver al Inicio',
      errorName: 'Por favor ingresa tu nombre o el de tu institución.',
      errorEmail: 'Por favor introduce una dirección de correo electrónico válida.',
      errorMinAmount: 'El monto personalizado mínimo es de $10.000 COP.',
      tiers: [
        { amount: 50000, label: '$ 50.000 COP', usd: '~ $13 USD', impact: 'Siembra de 3 árboles nativos para cercas vivas y corredores biológicos.' },
        { amount: 100000, label: '$ 100.000 COP', usd: '~ $25 USD', impact: 'Financia 1 jornada completa de censo y monitoreo focal de tropas familiares.' },
        { amount: 250000, label: '$ 250.000 COP', usd: '~ $63 USD', impact: 'Baterías y mantenimiento para cámaras trampa en el dosel de los bosques.' },
        { amount: 500000, label: '$ 500.000 COP', usd: '~ $125 USD', impact: 'Beca de apoyo de campo para tesistas y estudiantes de biología locales.' },
      ],
    },
    blogPage: {
      bannerTag: 'BITÁCORA CIENTÍFICA & MONITOREO',
      title: 'Informes de Campo & Publicaciones del',
      titleAccent: 'Mono Zocay',
      subtitle: 'Divulgación científica rigurosa y actualizada sobre el comportamiento, demografía y conservación del mono zocay en los Llanos Orientales de Colombia.',
      backHome: 'Volver al Inicio',
      allCategory: 'Todos',
      readArticleBtn: 'Leer informe completo',
      readTimePrefix: 'min de lectura',
      footerReviewedBy: 'Publicaciones científicas revisadas y avaladas por la Dra. Xyomara Carretero-Pinzón (Zocay Project)',
      closeReadingBtn: 'Cerrar Lectura',
      noArticles: 'No se encontraron informes en esta categoría.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      research: 'Research',
      project: 'The Project',
      shop: 'Shop / Donations',
      blog: 'Blog',
      donate: 'Donate',
      speciesSubtitle: 'Meta · Colombia',
      navigationTitle: 'Project Navigation',
    },
    hero: {
      chapterTag: '01 — HOME · CONSERVATION INITIATIVE',
      headlineMain: 'The Zocay Monkey',
      headlineSub1: 'and its sanctuary in',
      headlineSub2: 'Meta',
      description: 'Science, nature, and action. A long-term scientific research initiative dedicated to raising awareness, studying, and protecting the zocay monkey (Plecturocebus ornatus), an endemic flagship species in the fragmented forests of the Colombian Llanos.',
      ctaProject: 'Discover the Project',
      location: 'Meta, Colombia · 3°20\'N, 73°40\'W',
      protagonistSpecies: 'Flagship Species: Plecturocebus ornatus',
      explore: 'Explore',
    },
    research: {
      chapterTag: '02 — SCIENTIFIC RESEARCH',
      headline: 'Science and monitoring to understand and protect the',
      headlineAccent: 'Zocay Monkey',
      description: 'Over two decades of ethological and demographic studies on the zocay monkey (Plecturocebus ornatus). We investigate the impact of habitat fragmentation on family troops and the vital role of living fences as canopy corridors.',
      badge1Title: 'Monitoring',
      badge1Sub: 'Demography',
      badge2Title: 'Living Fences',
      badge2Sub: 'Corridors',
      badge3Title: 'Preservation',
      badge3Sub: 'Llanos Canopy',
      cta: 'Explore Research',
    },
    project: {
      chapterTag: '03 — THE PROJECT & LANDSCAPE',
      headline: 'A scientific mission dedicated to the',
      headlineAccent: 'Zocay Monkey',
      description: 'Founded in 2004 on a cattle ranch in Meta by biologist and primatologist Dr. Xyomara Carretero-Pinzón (Ph.D. The University of Queensland), Zocay Project investigates, protects, and raises awareness for the zocay monkey (Plecturocebus ornatus), generating empirical evidence to connect fragmented forests through living fences in the Colombian Orinoquia.',
      cta: 'Discover our story & project',
    },
    support: {
      chapterTag: '04 — SUPPORT CONSERVATION',
      headline: 'Your support protects the',
      headlineAccent: 'Zocay Monkey',
      description: 'Your contribution directly funds long-term biological monitoring, family troop censuses, and the planting of living fences that connect the zocay monkey canopy in Meta.',
      shopBtn: 'Visit the Shop',
      donateBtn: 'Make a Donation',
      reassurance: 'Every contribution, no matter how modest, funds field expeditions and monitoring equipment for the zocay.',
    },
    footer: {
      description: 'Scientific research, neotropical primate monitoring, and fragmented landscape conservation initiative in the Colombian Orinoquia.',
      navTitle: 'Navigation',
      scienceTitle: 'Science & Landscape',
      directorTitle: 'Scientific Leadership',
      rights: 'All rights reserved.',
      location: 'Eastern Plains, Colombia',
      contactLabel: 'contacto@zocayproject.org',
    },
    investigacionPage: {
      bannerTag: 'SCIENTIFIC RESEARCH ON THE ZOCAY MONKEY',
      title: 'Science and Monitoring of the',
      titleAccent: 'Zocay Monkey',
      subtitle: 'Over two decades of quantitative monitoring in the Eastern Plains of Colombia. We produce rigorous science geared towards protecting the zocay monkey (Plecturocebus ornatus) and restoring its forest connectivity.',
      linesHeading: 'Research Lines Centered on the Zocay Monkey',
      methodologyHeading: 'Field Methodology and Ethological Monitoring',
      methodologyText: 'Our fieldwork is built on line-transect censuses, continuous focal-animal sampling of zocay troops, arboreal canopy camera trapping, and landscape connectivity modeling developed by Dr. Xyomara Carretero-Pinzón (The University of Queensland).',
      principalInvestigator: 'Principal Investigator: Dr. Xyomara Carretero-Pinzón',
      focalSpecies: 'Focal Species: Plecturocebus ornatus',
      location: 'Meta, Colombia',
      backHome: 'Back to Home',
      metrics: [
        { value: '+20 Years', label: 'Continuous Monitoring', detail: 'Since 2004 in Meta' },
        { value: '1 Species', label: 'Focal Species', detail: 'Plecturocebus ornatus' },
        { value: '+35', label: 'Publications', detail: 'Peer-reviewed papers & book chapters' },
        { value: '100%', label: 'Field Science', detail: 'Partnering with local ranches' },
      ],
      researchLines: [
        {
          code: 'LINE 01',
          title: 'Demography and Population Dynamics of the Zocay Monkey',
          description: 'Systematic censuses of family troops, birth rates, survival, and density in gallery forest fragments surrounded by cattle pastures.',
        },
        {
          code: 'LINE 02',
          title: 'Living Fences and Arboreal Connectivity Corridors',
          description: 'Assessment of how zocay troops utilize living fences and native tree strips as aerial highways between isolated forest fragments.',
        },
        {
          code: 'LINE 03',
          title: 'Behavioral Ecology and Frugivorous Diet',
          description: 'Continuous focal-animal sampling: daily activity budgets, seed dispersal roles, social interactions, and sleeping tree selection.',
        },
        {
          code: 'LINE 04',
          title: 'Community Conservation and Citizen Science',
          description: 'Active partnerships with cattle ranchers, farm managers, and rural schools to protect forest remnants and eliminate hunting and trafficking.',
        },
      ],
    },
    elProyectoPage: {
      bannerTag: 'THE PROJECT & THE FLAGSHIP SPECIES',
      title: 'The Zocay Project: science to save the',
      titleAccent: 'Zocay Monkey',
      subtitle: 'A long-term scientific research endeavor dedicated to highlighting, studying, and protecting the zocay monkey (Plecturocebus ornatus) within fragmented forests and rural communities of the Colombian Llanos.',
      backHome: 'Back to Home',
      sec1Tag: '01. Definition & Purpose',
      sec1Title: 'What is the Zocay Project?',
      sec1Quote: '"The Zocay Project is an initiative for research, conservation, environmental education, and biodiversity protection in the Eastern Plains of Colombia, founded in 2004 by biologist, primatologist, and landscape ecologist Dr. Xyomara Carretero-Pinzón."',
      sec1Text: 'The project narrative represents a long-term research journey centered on the symbiotic relationship between the zocay monkey, fragmented ecosystems, and local rural communities. The initiative explicitly began in 2004 on a cattle ranch in Meta and has evolved from analyzing monkey troops within isolated fragments to landscape ecology and human-modified landscape conservation.',
      sec2Tag: '02. Scientific Leadership & Direction',
      sec2Title: 'Dr. Xyomara Carretero-Pinzón',
      doctorateLabel: 'Doctorate (Ph.D.): Doctor of Philosophy in Biodiversity Conservation & Landscape Ecology',
      affiliationLabel: 'Affiliation: The University of Queensland (Australia) · Landscape Ecology and Conservation Group',
      graduateLabel: 'Master of Science (M.Sc.): Biological Sciences, Universidad de Los Andes',
      undergradLabel: 'Bachelor of Science (B.Sc.): Biologist, Universidad Nacional de Colombia',
      socialsLabel: 'Official Profiles:',
      directorBio: 'She has dedicated over 20 continuous years to the ethological, demographic, and ecological study of the zocay monkey. Her pioneering research on living fences as connectivity corridors has been published in premier international primatology and landscape ecology journals.',
      sec3Tag: '03. The Flagship Species',
      sec3Title: 'The Zocay Monkey (Plecturocebus ornatus)',
      speciesScientific: 'Plecturocebus ornatus (formerly Callicebus ornatus)',
      speciesCommon: 'Zocay monkey, Ornate titi monkey, Tití del Meta',
      speciesStatus: 'Vulnerable (VU) - IUCN Red List',
      speciesEndemism: 'Endemic to Colombia (Meta Department)',
      sec3Col1Title: 'Lifelong Monogamy & Pair Bonding',
      sec3Col1Text: 'Zocay monkeys live in small, tightly bonded monogamous family groups (breeding pair and 1 to 3 offspring). They are famous for intertwining their tails while resting and performing dawn territorial vocal duets that resonate across the forest.',
      sec3Col2Title: 'Exemplary Paternal Care',
      sec3Col2Text: 'Among zocay monkeys, the father is the primary infant carrier: he transports the baby on his back for most of the day, transferring the infant to the mother only for nursing.',
      sec3Col3Title: 'Canopy Architects & Dispersers',
      sec3Col3Text: 'With a diet rich in fleshy fruits, young tender leaves, and insects, the zocay is an essential seed disperser fostering natural forest regeneration.',
      sec4Tag: '04. Historical Milestones',
      sec4Title: 'Over 20 Years of Scientific Trajectory',
      sec5Tag: '05. Tangible Territorial Impact',
      sec5Title: 'Outcomes Transforming Meta',
      impactCards: [
        { title: 'Real Canopy Connectivity', desc: 'Planting and maintaining living fences with native tree species, enabling safe passage for zocay troops between disconnected forest patches.' },
        { title: 'Science with Ranchers', desc: 'Direct conservation agreements with local ranchers to preserve forest remnants without halting sustainable agricultural livelihoods.' },
        { title: 'Education & Community Pride', desc: 'Workshops with rural schools where the zocay monkey has become a proud regional emblem of biodiversity in the Llanos.' },
      ],
      ctaDonate: 'Support the Project',
      ctaShop: 'Visit Cause-Driven Shop',
    },
    tiendaPage: {
      bannerTag: 'OFFICIAL CAUSE-DRIVEN SHOP',
      title: 'Products funding wildlife conservation',
      subtitle: '100% of proceeds generated by our official shop directly fund scientific expeditions, field monitoring supplies, and living fence tree planting for the Zocay Monkey in Meta, Colombia.',
      backHome: 'Back to Home',
      inStockBadge: 'In Stock',
      outOfStockBadge: 'Sold Out',
      impactLabel: 'Direct Impact:',
      requestBtn: 'Order / Reserve',
      outOfStockBtn: 'Inquire Availability',
      transparencyTitle: 'Transparency & Traceability',
      transparencyText: 'Each purchase comes with a digital certificate supporting Zocay Monkey conservation and a biannual field impact report.',
      directDonationBtn: 'Make Direct Donation',
      modalTag: 'Official Cause-Driven Acquisition',
      modalOutOfStockNote: 'This handcrafted item is temporarily sold out. You can contact our team to reserve one from our next artisanal batch.',
      modalChannelSelect: 'Choose your preferred channel to coordinate:',
      modalWhatsAppBtn: 'Coordinate Order via WhatsApp',
      modalEmailBtn: 'Request via Email',
      modalShippingNote: 'Nationwide shipping across Colombia',
      modalFundsNote: '100% dedicated to conservation',
    },
    donacionesPage: {
      bannerTag: 'RESEARCH & CONSERVATION FUND',
      title: 'Support the Zocay Project Directly',
      subtitle: 'Your generosity ensures the continuation of long-term biological monitoring and the preservation of gallery forests in Meta, Colombia.',
      backHome: 'Back to Home',
      step1Label: '1. Select donation amount',
      customAmountPlaceholder: 'Or enter custom amount in COP (e.g. 300000)',
      step2Label: '2. Donor information',
      namePlaceholder: 'Full name or Institution',
      emailPlaceholder: 'Email address',
      submitBtn: 'Confirm Conservation Contribution',
      reassuranceText: 'Institutional transparency · Biannual impact reports',
      successTitle: 'Thank you for your commitment, ',
      successMessage: 'We have recorded your donation pledge for the amount of ',
      bankChannelsTitle: 'Official Transfer Channels',
      bank1Title: 'Bancolombia (Savings Account)',
      bank1Sub: 'Inquire with the team',
      bank1Holder: 'Account Holder: Zocay Project / Scientific Leadership',
      bank2Title: 'Nequi / Daviplata',
      bank2Sub: 'Available upon coordination',
      bank2Holder: 'Verified donation confirmation receipt',
      internationalNote: 'To coordinate international bank wires (SWIFT/IBAN) or request a formal donation tax receipt, contact us directly:',
      whatsappConfirmBtn: 'Confirm via WhatsApp',
      emailConfirmBtn: 'Send Receipt via Email',
      backHomeBtn: 'Back to Home',
      errorName: 'Please enter your name or institution.',
      errorEmail: 'Please enter a valid email address.',
      errorMinAmount: 'The minimum custom amount is $10,000 COP.',
      tiers: [
        { amount: 50000, label: '$ 50,000 COP', usd: '~ $13 USD', impact: 'Plants 3 native trees for living fences and arboreal corridors.' },
        { amount: 100000, label: '$ 100,000 COP', usd: '~ $25 USD', impact: 'Funds 1 full day of focal behavioral monitoring and family troop census.' },
        { amount: 250000, label: '$ 250,000 COP', usd: '~ $63 USD', impact: 'Supplies batteries and maintenance for canopy camera traps.' },
        { amount: 500000, label: '$ 500,000 COP', usd: '~ $125 USD', impact: 'Provides field stipend for local biology students and field assistants.' },
      ],
    },
    blogPage: {
      bannerTag: 'SCIENTIFIC LOGBOOK & MONITORING',
      title: 'Field Reports & Publications on the',
      titleAccent: 'Zocay Monkey',
      subtitle: 'Rigorous, up-to-date scientific outreach detailing the behavior, demography, and conservation status of the zocay monkey in the Colombian Eastern Plains.',
      backHome: 'Back to Home',
      allCategory: 'All',
      readArticleBtn: 'Read full report',
      readTimePrefix: 'min read',
      footerReviewedBy: 'Scientific publications reviewed and endorsed by Dr. Xyomara Carretero-Pinzón (Zocay Project)',
      closeReadingBtn: 'Close Reader',
      noArticles: 'No reports found in this category.',
    },
  },
};
