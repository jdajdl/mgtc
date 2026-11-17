# Boîte à déclics

Application installable (PWA) pour les formateurs : 22 ice-breakers, énergisants et reprises d'attention avec consignes, filtres, chronomètre, tirage au sort et constitution de groupes.

Adresse : `<site Pages>/declics/`. Sur téléphone, ouvrir l'adresse puis « Ajouter à l'écran d'accueil ».

Pensée pour des sessions de 10 à 12 stagiaires maximum : toutes les activités fonctionnent jusqu'à 12 personnes.

## Fichiers
- `index.html`, `app.css`, `app.js` : l'application (aucune dépendance externe)
- `manifest.webmanifest` : nom, icônes, mode plein écran
- `sw.js` : service worker, portée limitée à ce dossier. Le site fonctionne hors-ligne après une première visite
- `fonts/`, `icons/` : polices et icônes embarquées

## Modifier le contenu
Les activités sont la constante `ACTIVITES` en haut de `app.js` (titre, type, durée, effectif, moments, matériel, consignes, variantes, débrief).

## Publier une mise à jour
Après toute modification, changer `VERSION` dans `sw.js` (`declics-v1` → `declics-v2`) pour que les appareils déjà installés rechargent les fichiers.

## Données
Favoris, notes, dates d'utilisation et liste de participants sont enregistrés dans le navigateur de chaque appareil (stockage local). Rien n'est envoyé ailleurs.

## Contenu
Comme le reste du dépôt, le site est public : n'y mettre aucun contenu interne du MGTC.
