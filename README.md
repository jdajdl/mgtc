# Coupe MGTC – Journées superviseurs 2027

Site statique (GitHub Pages) qui organise le rallye : rotation des équipes, fiches de poste avec chronomètre, tableau de scores pour l'animateur et QR codes à imprimer.

**Ce dépôt ne contient aucun contenu pédagogique.** Les questions, scénarios et corrigés restent dans Moodle (accès protégé par connexion). Le site est public : n'y ajoutez ni question, ni réponse, ni document interne du MGTC.

## Pages
- `index.html` : accueil et liste des postes
- `planning.html` : tableau de rotation (5 équipes × 5 postes + finale), horaires recalculés
- `poste.html?j=1&p=3` : fiche d'un poste (lien Moodle, chronomètre, rappels sécurité)
- `scores.html` : scores par équipe, enregistrés uniquement dans le navigateur de l'animateur, export CSV, mode projection
- `qr.html` : QR codes imprimables, un par poste

## Configuration
Tout se règle dans `js/config.js` : adresse de Moodle (`moodleBase`), lien Moodle de chaque poste (`moodle`), durées, barème provisoire, consignes de sécurité.

## Publication
Settings → Pages → Deploy from a branch → `main` / `(root)`.
Ouvrir ensuite `qr.html` depuis l'adresse définitive pour imprimer les QR codes.

## Licences
`vendor/qrcode.js` : qrcode-generator (Kazuhiko Arase), licence MIT.
