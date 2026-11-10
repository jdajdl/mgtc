// Configuration du rallye. Aucun contenu pédagogique ici : les questions et
// corrigés restent dans Moodle (accès protégé par connexion).
window.RALLYE = {
  titre: "Coupe MGTC – Journées superviseurs 2027",

  // À renseigner : adresse de votre Moodle (sans "/" final), ex. "https://moodle.exemple.fr"
  moodleBase: "http://88.170.235.196:8443/",

  equipes: ["A", "B", "C", "D", "E"],

  // Durées en minutes
  briefing: 20,
  dureePoste: 30,
  transition: 5,
  pause: 10,
  pauseApresManche: 3, // la pause a lieu après la 3e manche
  dureeFinale: 35,

  // Barème provisoire (à valider)
  pointsMaxPoste: 20,
  pointsMaxFinale: 40,

  jours: {
    1: {
      titre: "Demi-journée 1 – Sécurité chantier HTB",
      postes: [
        { id: 1, nom: "Chantier piégé", lieu: "Atelier MGTC", moodle: "" },
        { id: 2, nom: "Conducteur tombé", lieu: "Atelier ou cour", moodle: "" },
        { id: 3, nom: "Secours sans suraccident", lieu: "Show-room", moodle: "" },
        { id: 4, nom: "Consignation et MALT", lieu: "Atelier MGTC", moodle: "" },
        { id: 5, nom: "Vrai/faux distances", lieu: "Show-room", moodle: "" }
      ],
      finale: { nom: "Finale : l'aléa en cours de chantier", moodle: "" }
    },
    2: {
      titre: "Demi-journée 2 – SF6, appareillage et hydraulique",
      postes: [
        { id: 1, nom: "SF6 : le bon matériel", lieu: "Zone SF6", moodle: "" },
        { id: 2, nom: "Anatomie d'un PSEM", lieu: "Espace maquettes PSEM", moodle: "" },
        { id: 3, nom: "Diagnostic hydraulique", lieu: "Plateau hydraulique", moodle: "" },
        { id: 4, nom: "Alarmes et interverrouillages", lieu: "Atelier MGTC", moodle: "" },
        { id: 5, nom: "SF6 : vrai/faux réglementaire", lieu: "Show-room", moodle: "" }
      ],
      finale: { nom: "Finale : le disjoncteur ne referme pas", moodle: "" }
    }
  },

  // Consignes générales visiteurs (affichées sur chaque fiche de poste)
  consignes: [
    "Badge visible en permanence",
    "Toujours accompagné d'un formateur",
    "Chaussures de sécurité et EPI dans les ateliers",
    "Utiliser les passages piétons, respecter les balisages",
    "Pas de photos sans autorisation",
    "Aucune manipulation du matériel sans le formateur",
    "Ne jamais courir : le temps ne compte jamais sur un geste technique"
  ]
};
