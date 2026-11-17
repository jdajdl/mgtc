(function(){
"use strict";

/* ---------- Données ---------- */
var TYPES = {connaissance:"Faire connaissance", energie:"Énergisant", cohesion:"Cohésion", metier:"Métier", attention:"Reprise d'attention"};
var ENERGY = {calme:"Calme", moyen:"Modéré", actif:"Dynamique"};
var MOMENTS = {debut:"Début de journée", midi:"Après le déjeuner", fin:"Fin de module"};
var DURS = {court:{label:"5 min ou moins", range:[0,5]}, moyen:{label:"6 à 10 min", range:[6,10]}, long:{label:"Plus de 10 min", range:[11,999]}};
var ALL = ["debut","midi","fin"];

var ACTIVITES = [
 {id:"deux-verites", titre:"Deux vérités, un mensonge", type:"connaissance", duree:8, min:4, max:12, moments:["debut"], materiel:"Aucun", energie:"calme",
  objectif:"Faire connaissance de façon ludique et lancer la parole.",
  etapes:["Chacun note trois affirmations sur lui : deux vraies, une fausse (1 min).","Un volontaire lit ses trois affirmations à voix haute.","Le groupe vote à main levée pour désigner le mensonge.","La personne révèle la réponse et raconte l'histoire derrière une des vérités.","On passe au suivant jusqu'à la fin du temps."],
  variantes:["À partir de 10 personnes : former 3 sous-groupes de 4 qui jouent en parallèle.","Version métier : les trois affirmations portent sur le parcours professionnel."],
  debrief:"Qui a été le plus difficile à lire ? Rappeler que le parcours de chacun est une ressource pour la formation."},
 {id:"interview-binome", titre:"Interview en binôme", type:"connaissance", duree:10, min:4, max:12, moments:["debut"], materiel:"Aucun", energie:"calme",
  objectif:"Se présenter par l'intermédiaire d'un autre, ce qui met à l'aise les profils réservés.",
  etapes:["Former des binômes, de préférence entre personnes qui ne se connaissent pas.","Chacun interroge l'autre pendant 2 minutes : poste, parcours, attente de la formation, un détail inattendu.","Chacun prend quelques notes.","En plénière, chacun présente son binôme en 30 secondes."],
  variantes:["Imposer trois questions identiques pour comparer facilement.","Remplacer la présentation orale par un mot-clé écrit au tableau."],
  debrief:"Noter au tableau les attentes qui reviennent pour ajuster le programme."},
 {id:"portrait-chinois", titre:"Portrait chinois du métier", type:"connaissance", duree:6, min:4, max:12, moments:["debut","midi"], materiel:"Aucun", energie:"calme",
  objectif:"Faire émerger la façon dont chacun voit son métier, avec de l'humour.",
  etapes:["Annoncer le gabarit : « Si mon métier était un outil, un animal, une couleur… »","Chacun choisit deux catégories et complète ses phrases (1 min).","Tour de table : chacun explique ses choix en 20 secondes.","Relever les images qui reviennent."],
  variantes:["Prendre le thème de la formation : « Si la sécurité était… ».","Réponses sur post-it, affichées puis commentées."],
  debrief:"Repérer les représentations communes ou opposées du sujet de formation."},
 {id:"photo-telephone", titre:"Une photo de mon téléphone", type:"connaissance", duree:8, min:4, max:12, moments:["debut"], materiel:"Téléphones des participants", energie:"calme",
  objectif:"Créer du lien à partir d'un souvenir ou d'une passion.",
  etapes:["Chacun choisit une photo de son téléphone qu'il accepte de montrer.","En binômes ou petits groupes, chacun montre sa photo et raconte en 30 secondes.","Chacun résume en une phrase ce qu'il a appris sur l'autre."],
  variantes:["Imposer une catégorie : vacances, travail, passion.","Remplacer la photo par un objet sorti de la poche ou du sac."],
  debrief:"Souligner ce qui rapproche les participants (passions, lieux) pour la suite du travail en groupe."},
 {id:"bingo-humain", titre:"Bingo humain", type:"connaissance", duree:10, min:8, max:12, moments:["debut"], materiel:"Une grille imprimée par personne, stylos", energie:"actif",
  objectif:"Faire circuler tout le monde et découvrir des points communs.",
  etapes:["Distribuer des grilles 3×3 ou 4×4 : chaque case contient un critère (« a déjà changé de métier », « parle trois langues », « joue d'un instrument »).","Les participants circulent et font signer une case par personne.","Le premier qui remplit une ligne ou la grille crie « Bingo ! ».","Lire quelques cases validées et demander à la personne concernée de développer."],
  variantes:["Cases liées au métier : « a déjà vécu un arrêt de chantier », « a obtenu une habilitation ».","Limiter à une signature par personne pour forcer à circuler."],
  debrief:"Qui a découvert quelque chose d'inattendu ? Faire le lien avec le travail d'équipe attendu."},
 {id:"debout-si", titre:"Debout si…", type:"energie", duree:3, min:4, max:12, moments:ALL, materiel:"Aucun", energie:"actif",
  objectif:"Réveiller le groupe en une minute, sans préparation.",
  etapes:["Demander à tous de se tenir prêts, assis.","Énoncer des affirmations : « Debout si vous avez pris le train aujourd'hui », « … si vous buvez du café ».","Alterner affirmations légères et affirmations liées à la formation.","Terminer par une affirmation qui introduit le sujet du jour."],
  variantes:["Remplacer « debout » par « levez les bras » en cas de mobilité réduite.","Laisser les participants proposer les affirmations."],
  debrief:"Aucun débrief nécessaire. Enchaîner directement sur la suite."},
 {id:"noeud-humain", titre:"Le nœud humain", type:"energie", duree:10, min:6, max:12, moments:["midi","fin"], materiel:"Espace dégagé", energie:"actif",
  objectif:"Résoudre un problème ensemble, en mouvement.",
  etapes:["Former un cercle, épaule contre épaule.","Chacun tend les mains et attrape deux mains différentes, hors de ses voisins directs.","Le groupe doit dénouer le nœud sans lâcher les mains.","Fixer une limite de 3 minutes pour ajouter un défi."],
  variantes:["Interdire la parole pour renforcer l'observation.","Avec 12 personnes, faire deux nœuds de 6 en compétition amicale."],
  debrief:"Qui a pris la direction ? Qui a observé ? Faire le lien avec la communication sous contrainte."},
 {id:"pierre-feuille-ciseaux", titre:"Pierre-feuille-ciseaux champion", type:"energie", duree:4, min:8, max:12, moments:["midi","fin"], materiel:"Aucun", energie:"actif",
  objectif:"Remettre de l'énergie et du bruit dans la salle.",
  etapes:["Tous se lèvent et jouent à pierre-feuille-ciseaux, deux par deux.","Le perdant devient supporter du gagnant et le suit en l'encourageant.","Les gagnants se retrouvent face à face, avec leurs supporters.","Continuer jusqu'à ce qu'il reste un champion acclamé par tout le groupe."],
  variantes:["Remplacer par un duel de mimes (éclair, ours, chasseur)."],
  debrief:"Aucun débrief nécessaire. Féliciter le champion et reprendre la séance."},
 {id:"changez-de-place", titre:"Changez de place si…", type:"energie", duree:5, min:8, max:12, moments:["midi","fin"], materiel:"Chaises en cercle, une de moins que de participants", energie:"actif",
  objectif:"Bouger, rire et découvrir des points communs.",
  etapes:["Disposer les chaises en cercle avec une chaise de moins que de participants.","La personne debout au centre dit « Changez de place si… » et complète avec une affirmation vraie pour elle.","Tous ceux qui sont concernés se lèvent et prennent une autre chaise.","Celui qui reste debout devient le nouveau meneur."],
  variantes:["Imposer des phrases liées au métier ou à la formation.","Interdire de prendre la chaise voisine."],
  debrief:"Aucun débrief nécessaire. Garder les chaises en cercle si l'on enchaîne sur un échange."},
 {id:"compter-vingt", titre:"Compter jusqu'à vingt", type:"cohesion", duree:5, min:5, max:12, moments:["debut","midi"], materiel:"Aucun", energie:"calme",
  objectif:"Écouter le groupe et agir de façon coordonnée, sans chef.",
  etapes:["Regards baissés ou yeux fermés, le groupe compte de 1 à 20 sans ordre défini.","N'importe qui peut dire le nombre suivant ; si deux personnes parlent en même temps, on repart à 1.","Aucun signe ni code convenu entre participants.","Poursuivre jusqu'à 20 ou jusqu'à la fin du temps."],
  variantes:["Monter jusqu'à 30 avec un groupe aguerri."],
  debrief:"Qu'est-ce qui a aidé à réussir ? Écoute, patience, prise de risque : relier à la coordination d'une équipe en situation réelle."},
 {id:"tour-spaghettis", titre:"La tour de spaghettis", type:"cohesion", duree:20, min:6, max:12, moments:["midi"], materiel:"Spaghettis crus, ruban adhésif, ficelle, guimauve par équipe", energie:"actif",
  objectif:"Construire ensemble sous contrainte de temps et observer les rôles qui apparaissent.",
  etapes:["Former 3 équipes de 3 à 4 personnes.","Remettre à chaque équipe 20 spaghettis, 1 m de ruban adhésif, 1 m de ficelle et une guimauve.","Objectif : la tour la plus haute qui porte la guimauve à son sommet, en 15 minutes.","Mesurer les tours : gagne la plus haute qui tient seule."],
  variantes:["Réduire à 10 minutes pour augmenter la pression.","Imposer un rôle par personne : chef de projet, observateur, constructeur."],
  debrief:"Qui a testé tôt et corrigé vite ? Relier à la démarche itérative et à la gestion de projet."},
 {id:"naufrages", titre:"Les naufragés", type:"cohesion", duree:15, min:6, max:12, moments:["midi","fin"], materiel:"Liste de 10 objets imprimée par équipe", energie:"moyen",
  objectif:"Prendre une décision collective après un avis personnel.",
  etapes:["Présenter la situation : l'équipe a fait naufrage et ne peut sauver que cinq objets sur dix.","Chacun classe les objets seul pendant 3 minutes.","L'équipe doit se mettre d'accord sur un classement commun en 8 minutes.","Comparer les classements en plénière et justifier les choix."],
  variantes:["Adapter la liste à un contexte professionnel : chantier, panne, salle serveur.","Exiger l'unanimité plutôt que le vote."],
  debrief:"Comment la décision s'est-elle prise ? Qui a convaincu, et comment ? Relier à la décision collective au travail."},
 {id:"un-mot-chacun", titre:"Une histoire, un mot chacun", type:"cohesion", duree:5, min:4, max:12, moments:["midi","fin"], materiel:"Aucun", energie:"calme",
  objectif:"Construire ensemble, rire des maladresses et relancer l'écoute.",
  etapes:["Le groupe se met en cercle.","Un participant lance un mot, le suivant ajoute un mot pour former une phrase.","Poursuivre pour créer une histoire collective, sans préparation.","Arrêter quand le cercle a fait deux tours."],
  variantes:["Imposer un thème de départ lié à la formation.","Deux mots par personne pour accélérer."],
  debrief:"Qu'avez-vous remarqué sur l'écoute ? Relier à la construction collective d'idées."},
 {id:"attentes-craintes", titre:"Attentes et craintes", type:"cohesion", duree:10, min:4, max:12, moments:["debut"], materiel:"Post-it de deux couleurs, tableau ou affiches", energie:"calme",
  objectif:"Recueillir ce que le groupe espère et redoute, pour piloter la formation.",
  etapes:["Distribuer deux couleurs de post-it.","Chacun écrit ses attentes (couleur 1) et ses craintes ou réserves (couleur 2), une par post-it.","Coller les post-it sur deux zones du tableau.","Regrouper par thèmes et commenter en plénière.","Annoncer ce qui sera traité et ce qui sortira du cadre."],
  variantes:["Ramasser les post-it pliés pour garder l'anonymat.","Y revenir en fin de formation pour vérifier ce qui a été atteint."],
  debrief:"Garder le tableau visible jusqu'au bilan final."},
 {id:"presque-incident", titre:"Mon plus grand presque-incident", type:"metier", duree:15, min:4, max:12, moments:["debut","midi"], materiel:"Aucun", energie:"moyen",
  objectif:"Apprendre des situations vécues, sans jugement.",
  etapes:["Rappeler l'objectif : apprendre ensemble, sans chercher de coupable.","Chacun repense à une situation de travail où il a failli y avoir un problème.","En groupes de 3, chacun raconte en 2 minutes : contexte, ce qui s'est passé, ce qui a évité l'incident.","Chaque groupe choisit une histoire à partager avec tous."],
  variantes:["Version positive : « ma plus belle réussite technique »."],
  debrief:"Quelles causes reviennent ? Relier aux procédures et aux règles abordées dans la formation."},
 {id:"vrai-faux-flash", titre:"Vrai ou faux flash", type:"metier", duree:6, min:4, max:12, moments:["midi","fin"], materiel:"6 à 8 affirmations préparées sur le thème", energie:"moyen",
  objectif:"Tester les idées reçues du groupe sur le sujet.",
  etapes:["Préparer 6 à 8 affirmations sur le thème, dont certaines contre-intuitives.","Délimiter deux zones de la salle : « Vrai » et « Faux ».","Lire une affirmation ; chacun se place dans une zone.","Révéler la réponse et l'expliquer en une phrase.","Marquer un point ou applaudir les bonnes réponses."],
  variantes:["Compter les points par équipe.","Faire écrire les affirmations par les participants en fin de module."],
  debrief:"Noter les idées reçues du groupe et y revenir pendant la séance."},
 {id:"definir-sans-dire", titre:"Définir sans le dire", type:"metier", duree:8, min:6, max:12, moments:["fin"], materiel:"Cartes avec termes techniques", energie:"moyen",
  objectif:"Réviser le vocabulaire du module en s'amusant.",
  etapes:["Préparer des cartes avec des termes techniques du module.","Par équipes de deux, un joueur fait deviner le terme à son coéquipier sans le prononcer.","Limiter à 1 minute par terme.","Compter les termes devinés par équipe."],
  variantes:["Imposer le dessin à la place de la parole.","Faire écrire les cartes par les participants."],
  debrief:"Quels termes ont posé problème ? Les reprendre en synthèse."},
 {id:"pitch-poste", titre:"Mon poste en 30 secondes", type:"metier", duree:10, min:4, max:12, moments:["debut"], materiel:"Chronomètre", energie:"calme",
  objectif:"Repérer les expertises présentes dans la salle.",
  etapes:["Chacun prépare 1 minute un pitch de son poste : mission, contexte, une fierté.","Lancer le chrono : 30 secondes par personne, pas plus.","Après chaque pitch, un participant pose une question.","Noter au tableau les compétences présentes dans le groupe."],
  variantes:["Ajouter ce qu'on aimerait apprendre aujourd'hui."],
  debrief:"Identifier les expertises du groupe qui pourront servir pendant la formation."},
 {id:"recap-trois-mots", titre:"Récap en trois mots", type:"attention", duree:4, min:4, max:12, moments:["fin"], materiel:"Aucun", energie:"calme",
  objectif:"Faire ressortir l'essentiel du module qui vient de se terminer.",
  etapes:["Demander à chacun de noter trois mots qui résument le module.","Tour de table : chacun donne un mot, sans répéter ceux déjà cités.","Écrire les mots au tableau.","Compléter oralement les points oubliés."],
  variantes:["Un seul mot par personne pour accélérer.","Projeter un nuage de mots construit en direct."],
  debrief:"Combler les manques repérés avant de passer au module suivant."},
 {id:"questions-flash", titre:"Questions flash par équipes", type:"attention", duree:8, min:6, max:12, moments:["midi","fin"], materiel:"Questions préparées, papier", energie:"moyen",
  objectif:"Relancer l'attention avec un mini-quiz sur le module écoulé.",
  etapes:["Former deux ou trois équipes.","Poser une question courte sur le module écoulé.","Les équipes notent leur réponse en 20 secondes.","Révéler la réponse et attribuer les points.","Annoncer l'équipe gagnante après 6 à 8 questions."],
  variantes:["Chaque équipe écrit une question pour l'équipe adverse."],
  debrief:"Les questions ratées désignent les points à revoir."},
 {id:"pause-respiration", titre:"Étirements et respiration", type:"attention", duree:3, min:4, max:12, moments:["midi"], materiel:"Aucun", energie:"calme",
  objectif:"Recentrer le groupe après le déjeuner ou une longue séquence.",
  etapes:["Demander à tous de se lever et de dérouler les épaules et le cou.","Inspirer 4 secondes, retenir 2 secondes, expirer 6 secondes, trois fois.","Secouer les mains et les jambes pendant 10 secondes.","Se rasseoir et reprendre."],
  variantes:["Faire diriger l'activité par un volontaire."],
  debrief:"Aucun débrief nécessaire."},
 {id:"telegramme", titre:"Le télégramme", type:"attention", duree:5, min:4, max:12, moments:["fin"], materiel:"Papier, stylos", energie:"calme",
  objectif:"Synthétiser le module en une phrase.",
  etapes:["Chacun résume le module en une phrase de dix mots maximum.","Chaque participant lit son télégramme.","Le groupe vote pour celui qui résume le mieux.","Compléter avec les points non cités."],
  variantes:["Version SMS : 140 caractères.","En binôme, fusionner deux télégrammes en un seul."],
  debrief:"Garder les meilleurs télégrammes pour la synthèse finale."}
];

/* ---------- Stockage ---------- */
var LS = {
  get:function(k,d){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set:function(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
};
var state = {
  fav: LS.get("bad:fav",[]),
  hist: LS.get("bad:hist",{}),
  notes: LS.get("bad:notes",{}),
  names: LS.get("bad:names","Camille\nSamir\nLéa\nThomas\nInès\nMarc\nSophie\nKarim\nAnaïs\nPaul\nNadia\nHugo"),
  filters: {type:"all", dur:"all", moment:"all", n:"", favOnly:false}
};
var drawn = [];

/* ---------- Utilitaires ---------- */
function $(s,r){ return (r||document).querySelector(s); }
function esc(s){ return String(s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function pad(n){ return n<10?"0"+n:""+n; }
function fmt(sec){ return pad(Math.floor(sec/60))+":"+pad(sec%60); }
function byId(id){ for(var i=0;i<ACTIVITES.length;i++){ if(ACTIVITES[i].id===id) return ACTIVITES[i]; } return null; }
function fmtDate(ts){ try{ return new Date(ts).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}); }catch(e){ return ""; } }
function reduced(){ return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
function toast(msg){ var t=$("#toast"); t.textContent=msg; t.hidden=false; clearTimeout(toast.h); toast.h=setTimeout(function(){ t.hidden=true; },2600); }
var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5z"/></svg>';

/* ---------- Filtres ---------- */
function matches(a){
  var f=state.filters;
  if(f.type!=="all" && a.type!==f.type) return false;
  if(f.dur!=="all"){ var r=DURS[f.dur].range; if(a.duree<r[0]||a.duree>r[1]) return false; }
  if(f.moment!=="all" && a.moments.indexOf(f.moment)<0) return false;
  var n=parseInt(f.n,10); if(n>0 && (n<a.min||n>a.max)) return false;
  if(f.favOnly && state.fav.indexOf(a.id)<0) return false;
  return true;
}
function filtered(){ return ACTIVITES.filter(matches); }
function activeCount(){
  var f=state.filters, c=0;
  if(f.type!=="all")c++; if(f.dur!=="all")c++; if(f.moment!=="all")c++; if(parseInt(f.n,10)>0)c++; if(f.favOnly)c++;
  return c;
}
function chipRow(name,opts,current){
  var h='<div class="chips" role="group">';
  opts.forEach(function(o){
    h+='<button type="button" class="chip" data-action="filter" data-name="'+name+'" data-value="'+o.v+'" aria-pressed="'+(current===o.v)+'"'+(o.cat?' data-cat="'+o.cat+'"':'')+'>'+(o.cat?'<i style="--dot:var(--c-'+o.cat+')"></i>':'')+esc(o.l)+'</button>';
  });
  return h+'</div>';
}
function filtersHTML(){
  var f=state.filters, n=activeCount();
  var typeOpts=[{v:"all",l:"Tous"}]; Object.keys(TYPES).forEach(function(k){ typeOpts.push({v:k,l:TYPES[k],cat:k}); });
  var durOpts=[{v:"all",l:"Toutes"}]; Object.keys(DURS).forEach(function(k){ durOpts.push({v:k,l:DURS[k].label}); });
  var momOpts=[{v:"all",l:"Tous"}]; Object.keys(MOMENTS).forEach(function(k){ momOpts.push({v:k,l:MOMENTS[k]}); });
  return '<summary>Filtres <small>'+(n?n+' actif'+(n>1?'s':''):'aucun')+'</small></summary>'+
   '<div class="f-row"><span class="lbl">Type d\'activité</span>'+chipRow("type",typeOpts,f.type)+'</div>'+
   '<div class="f-row"><span class="lbl">Durée</span>'+chipRow("dur",durOpts,f.dur)+'</div>'+
   '<div class="f-row"><span class="lbl">Moment de la journée</span>'+chipRow("moment",momOpts,f.moment)+'</div>'+
   '<div class="f-row"><label for="fNum">Nombre de stagiaires</label><input class="num" id="fNum" type="number" inputmode="numeric" min="1" max="100" placeholder="Tous" value="'+esc(f.n)+'"></div>'+
   '<div class="f-foot"><button type="button" class="chip" data-action="favonly" aria-pressed="'+f.favOnly+'">Mes favoris seulement</button>'+(n?'<button type="button" class="link-btn" data-action="reset">Réinitialiser</button>':'')+'</div>';
}
function cardHTML(a){
  var fav=state.fav.indexOf(a.id)>=0, done=state.hist[a.id];
  var recent=done && (Date.now()-done)<14*86400000;
  return '<article class="card" data-cat="'+a.type+'">'+
   '<a class="card-link" href="#a-'+a.id+'">'+
     '<span class="tag"><i></i>'+TYPES[a.type]+(recent?'<span class="done-note">Fait le '+fmtDate(done)+'</span>':'')+'</span>'+
     '<h3>'+esc(a.titre)+'</h3>'+
     '<p class="obj">'+esc(a.objectif)+'</p>'+
     '<p class="meta"><span>'+a.duree+' min</span><span>'+a.min+'–'+a.max+' pers.</span><span>'+ENERGY[a.energie]+'</span></p>'+
   '</a>'+
   '<button type="button" class="fav" data-action="fav" data-id="'+a.id+'" aria-pressed="'+fav+'" aria-label="'+(fav?'Retirer des favoris : ':'Ajouter aux favoris : ')+esc(a.titre)+'">'+STAR+'</button>'+
  '</article>';
}
function updateResults(){
  var list=filtered(), box=$("#results"); if(!box) return;
  $("#count").textContent=list.length===ACTIVITES.length ? ACTIVITES.length+" activités prêtes à lancer" : list.length+" activité"+(list.length>1?"s":"")+" sur "+ACTIVITES.length;
  box.innerHTML = list.length ? list.map(cardHTML).join("") : '<div class="empty">Aucune activité ne correspond à ces filtres.<br><button type="button" class="link-btn" data-action="reset">Réinitialiser les filtres</button></div>';
}
function updateFilters(){ var d=$("#filters"); if(d){ d.innerHTML=filtersHTML(); } updateResults(); }

/* ---------- Vues ---------- */
function viewListe(){
  return '<header class="hero"><h1>Boîte à déclics</h1><p class="sub">Brise-glace, énergisants et reprises d\'attention, avec consignes prêtes à lire en salle.</p>'+
   '<button type="button" class="surprise" data-action="surprise"><b>Surprends-moi</b><span>Une activité au hasard parmi celles qui correspondent aux filtres</span></button></header>'+
   '<details class="filters" id="filters">'+filtersHTML()+'</details>'+
   '<p class="count" id="count"></p><div class="list" id="results"></div>';
}
function viewDetail(a){
  var fav=state.fav.indexOf(a.id)>=0, done=state.hist[a.id];
  var mom = a.moments.length===3 ? "Tout moment" : a.moments.map(function(m){ return MOMENTS[m]; }).join(", ");
  return '<a class="back" href="#activites">← Toutes les activités</a>'+
   '<header class="d-head" data-cat="'+a.type+'"><span class="tag"><i></i>'+TYPES[a.type]+'</span><h1>'+esc(a.titre)+'</h1><p class="lead">'+esc(a.objectif)+'</p></header>'+
   '<dl class="facts"><div><dt>Durée</dt><dd>'+a.duree+' min</dd></div><div><dt>Effectif</dt><dd>'+a.min+' à '+a.max+'</dd></div><div><dt>Rythme</dt><dd>'+ENERGY[a.energie]+'</dd></div><div><dt>Moment</dt><dd>'+esc(mom)+'</dd></div></dl>'+
   '<p><b>Matériel :</b> '+esc(a.materiel)+'</p>'+
   '<div class="actions"><button type="button" class="btn primary" data-action="goto-timer" data-id="'+a.id+'">Lancer le chrono, '+a.duree+' min</button><button type="button" class="btn" data-action="project" data-id="'+a.id+'">Projeter les consignes</button></div>'+
   '<section class="blk"><h2>Consignes</h2><ol class="steps">'+a.etapes.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join("")+'</ol></section>'+
   '<section class="blk"><h2>Variantes</h2><ul class="bul">'+a.variantes.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join("")+'</ul></section>'+
   '<section class="blk"><h2>Débrief</h2><p>'+esc(a.debrief)+'</p></section>'+
   '<section class="blk"><h2>Mes notes</h2><textarea class="notes" id="note" data-note="'+a.id+'" placeholder="Ce qui a marché, ce que vous changeriez…" aria-label="Mes notes sur cette activité">'+esc(state.notes[a.id]||"")+'</textarea></section>'+
   '<div class="actions"><button type="button" class="btn" data-action="done" data-id="'+a.id+'">'+(done?'Fait le '+fmtDate(done)+', marquer à nouveau':'Marquer comme fait')+'</button><button type="button" class="btn" data-action="fav" data-id="'+a.id+'" aria-pressed="'+fav+'">'+(fav?'Dans mes favoris':'Ajouter aux favoris')+'</button><button type="button" class="btn" data-action="surprise">Une autre au hasard</button></div>';
}
function viewOutils(){
  return '<header class="hero"><h1>Outils</h1><p class="sub">Chronomètre, tirage au sort et groupes pour l\'animation en salle.</p></header>'+
   '<section class="tool" aria-labelledby="t-chrono"><h2 id="t-chrono">Chronomètre</h2>'+
     '<div class="clock" data-timer role="timer">05:00</div>'+
     '<div class="bar" aria-hidden="true"><div data-timer-bar></div></div>'+
     '<div class="row center"><button type="button" class="btn primary" data-action="timer-toggle" data-timer-toggle>Démarrer</button><button type="button" class="btn" data-action="timer-reset">Remettre à zéro</button><button type="button" class="btn" data-action="timer-add">+1 min</button></div>'+
     '<div class="row center" role="group" aria-label="Durées prédéfinies">'+[1,2,3,5,10,15].map(function(m){ return '<button type="button" class="chip" data-action="timer-preset" data-min="'+m+'">'+m+' min</button>'; }).join("")+
       '<label class="row" style="gap:6px"><span class="sr" style="font-size:14px;color:var(--muted)">Autre :</span><input class="num" id="customMin" type="number" inputmode="numeric" min="1" max="180" placeholder="min" style="width:80px"></label><button type="button" class="chip" data-action="timer-custom">OK</button></div>'+
     '<div class="row center"><button type="button" class="btn small" data-action="project-timer">Projeter le chrono</button><button type="button" class="btn small" data-action="sound" aria-pressed="'+timer.sound+'">Son : '+(timer.sound?'activé':'coupé')+'</button></div>'+
   '</section>'+
   '<section class="tool" aria-labelledby="t-part"><h2 id="t-part">Participants</h2><p class="hint">Un nom par ligne ou séparés par des virgules. Les noms ci-dessous sont des exemples : remplacez-les par vos stagiaires. La liste reste sur cet appareil.</p>'+
     '<textarea class="names" id="names" aria-label="Liste des participants">'+esc(state.names)+'</textarea>'+
   '</section>'+
   '<section class="tool" aria-labelledby="t-draw"><h2 id="t-draw">Tirage au sort</h2>'+
     '<div class="stage idle" id="drawOut">Appuyez pour tirer un nom.</div>'+
     '<div class="row"><button type="button" class="btn primary" data-action="draw">Tirer un nom</button><button type="button" class="btn" data-action="draw-reset">Remettre tout le monde</button><span class="hint" id="drawLeft" style="color:var(--muted);font-size:14px"></span></div>'+
   '</section>'+
   '<section class="tool" aria-labelledby="t-groups"><h2 id="t-groups">Former des groupes</h2>'+
     '<div class="row"><label for="gMode" style="font-weight:600">Former</label><select class="num" id="gMode" style="width:auto"><option value="count">un nombre de groupes</option><option value="size">des groupes de N personnes</option></select><input class="num" id="gCount" type="number" inputmode="numeric" min="1" max="20" value="3" style="width:80px" aria-label="Nombre de groupes ou de personnes par groupe"><button type="button" class="btn primary" data-action="groups">Former les groupes</button></div>'+
     '<div class="groups" id="groupsOut"></div>'+
   '</section>';
}

/* ---------- Routage ---------- */
var lastKey="", lastView="", listY=0;
function route(){
  var h=location.hash.replace(/^#/,"");
  if(h==="outils") return {v:"outils", key:"outils"};
  if(h.indexOf("a-")===0){ var a=byId(h.slice(2)); if(a) return {v:"detail", a:a, key:"a-"+a.id}; }
  return {v:"liste", key:"liste"};
}
function render(){
  var r=route(), app=$("#app");
  if(lastView==="liste" && r.v!=="liste"){ listY=window.scrollY; }
  if(r.v==="liste") app.innerHTML=viewListe();
  else if(r.v==="detail") app.innerHTML=viewDetail(r.a);
  else app.innerHTML=viewOutils();
  if(r.v==="liste") updateResults();
  $("#tab-liste").setAttribute("aria-current", r.v!=="outils" ? "page" : "false");
  $("#tab-outils").setAttribute("aria-current", r.v==="outils" ? "page" : "false");
  if(r.key!==lastKey){
    window.scrollTo(0, (r.v==="liste" && lastView==="detail") ? listY : 0);
  }
  lastKey=r.key; lastView=r.v;
  if(r.v==="outils") updateDrawLeft();
  paintTimer();
}
window.addEventListener("hashchange",render);

/* ---------- Chronomètre ---------- */
var timer={total:300000,left:300000,running:false,end:0,h:null,sound:true,done:false};
var audio=null;
function ensureAudio(){
  if(!timer.sound) return;
  try{
    if(!audio){ var C=window.AudioContext||window.webkitAudioContext; if(C) audio=new C(); }
    if(audio && audio.state==="suspended") audio.resume();
  }catch(e){}
}
function beep(){
  if(timer.sound && audio){
    try{
      var t0=audio.currentTime;
      [0,0.35,0.7].forEach(function(d){
        var o=audio.createOscillator(), g=audio.createGain();
        o.type="sine"; o.frequency.value=880;
        g.gain.setValueAtTime(0.0001,t0+d);
        g.gain.exponentialRampToValueAtTime(0.35,t0+d+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001,t0+d+0.25);
        o.connect(g); g.connect(audio.destination);
        o.start(t0+d); o.stop(t0+d+0.3);
      });
    }catch(e){}
  }
  try{ if(navigator.vibrate) navigator.vibrate([200,100,200]); }catch(e){}
}
function stopTimer(){ timer.running=false; clearInterval(timer.h); timer.h=null; }
function setTimer(sec){ stopTimer(); timer.total=sec*1000; timer.left=timer.total; timer.done=false; paintTimer(); }
function startTimer(){
  if(timer.running) return;
  if(timer.left<=0){ timer.left=timer.total; }
  timer.done=false; ensureAudio();
  timer.end=Date.now()+timer.left; timer.running=true;
  timer.h=setInterval(tick,200); paintTimer();
}
function pauseTimer(){ if(timer.running){ timer.left=Math.max(0,timer.end-Date.now()); stopTimer(); paintTimer(); } }
function tick(){
  timer.left=Math.max(0,timer.end-Date.now());
  if(timer.left<=0){ stopTimer(); timer.done=true; beep(); }
  paintTimer();
}
function addTime(sec){
  if(timer.running){ timer.end+=sec*1000; timer.left=timer.end-Date.now(); }
  else { timer.left+=sec*1000; timer.total=Math.max(timer.total,timer.left); timer.done=false; }
  paintTimer();
}
function toggleLabel(){
  if(timer.running) return "Pause";
  if(timer.done) return "Relancer";
  if(timer.left<timer.total && timer.left>0) return "Reprendre";
  return "Démarrer";
}
function paintTimer(){
  var secs=Math.ceil(timer.left/1000), txt=fmt(secs);
  var urgent=timer.running && secs<=10;
  Array.prototype.forEach.call(document.querySelectorAll("[data-timer]"),function(el){
    el.textContent=txt; el.classList.toggle("urgent",urgent); el.classList.toggle("done",timer.done);
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-timer-toggle]"),function(b){ b.textContent=toggleLabel(); });
  Array.prototype.forEach.call(document.querySelectorAll("[data-timer-bar]"),function(b){ b.style.width=(timer.total>0?Math.max(0,Math.min(100,timer.left/timer.total*100)):0)+"%"; });
  var mini=$("#mini"), overlayOpen=!$("#overlay").hidden;
  var show=(timer.running||timer.done) && route().v!=="outils" && !overlayOpen;
  mini.hidden=!show; mini.classList.toggle("done",timer.done);
}
$("#mini").addEventListener("click",function(){ location.hash="outils"; });

/* ---------- Projection ---------- */
function openOverlay(kind,id){
  var o=$("#overlay"), html;
  if(kind==="steps"){
    var a=byId(id);
    html='<div class="o-top"><h2>'+esc(a.titre)+'</h2><div class="row"><span class="o-clock" data-timer>00:00</span><button type="button" class="btn primary" data-action="timer-toggle" data-timer-toggle>Démarrer</button><button type="button" class="btn" data-action="close-overlay">Fermer</button></div></div>'+
      '<ol>'+a.etapes.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join("")+'</ol>';
  } else {
    html='<div class="o-top"><span></span><button type="button" class="btn" data-action="close-overlay">Fermer</button></div>'+
      '<div class="o-timer"><div class="o-clock" data-timer>00:00</div><button type="button" class="btn primary" data-action="timer-toggle" data-timer-toggle>Démarrer</button></div>';
  }
  o.innerHTML=html; o.hidden=false; document.body.classList.add("noscroll"); o.scrollTop=0;
  paintTimer();
  var c=o.querySelector('[data-action="close-overlay"]'); if(c) c.focus();
}
function closeOverlay(){ var o=$("#overlay"); o.hidden=true; o.innerHTML=""; document.body.classList.remove("noscroll"); paintTimer(); }
document.addEventListener("keydown",function(e){ if(e.key==="Escape" && !$("#overlay").hidden) closeOverlay(); });

/* ---------- Participants ---------- */
function parseNames(){
  var seen={}, out=[];
  state.names.split(/[\n,;]+/).forEach(function(s){ s=s.trim(); if(s && !seen[s.toLowerCase()]){ seen[s.toLowerCase()]=1; out.push(s); } });
  return out;
}
function updateDrawLeft(){
  var el=$("#drawLeft"); if(!el) return;
  var names=parseNames(), left=names.filter(function(n){ return drawn.indexOf(n)<0; }).length;
  el.textContent=names.length ? left+" restant"+(left>1?"s":"")+" sur "+names.length : "";
}
var drawH=null;
function draw(){
  var out=$("#drawOut"), names=parseNames();
  if(drawH){ return; }
  if(!names.length){ out.className="stage idle"; out.textContent="Ajoutez des noms dans la liste des participants."; return; }
  var pool=names.filter(function(n){ return drawn.indexOf(n)<0; });
  if(!pool.length){ out.className="stage idle"; out.textContent="Tout le monde est déjà passé. Appuyez sur « Remettre tout le monde »."; return; }
  var pick=pool[Math.floor(Math.random()*pool.length)];
  function finish(){ drawn.push(pick); out.className="stage"; out.textContent=pick; updateDrawLeft(); drawH=null; }
  if(reduced() || names.length<2){ finish(); return; }
  var i=0; out.className="stage";
  drawH=setInterval(function(){
    out.textContent=names[Math.floor(Math.random()*names.length)];
    if(++i>=12){ clearInterval(drawH); finish(); }
  },70);
}
function makeGroups(){
  var names=parseNames(), n=parseInt($("#gCount").value,10), out=$("#groupsOut"), mode=$("#gMode").value;
  if(names.length<2){ out.innerHTML='<p class="hint" style="color:var(--muted)">Ajoutez au moins deux noms.</p>'; return; }
  if(mode==="size"){ n=Math.ceil(names.length/(n>=1?n:2)); }
  if(!(n>=2)) n=2;
  if(n>names.length) n=names.length;
  var arr=names.slice();
  for(var i=arr.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=arr[i]; arr[i]=arr[j]; arr[j]=t; }
  var gs=[]; for(var k=0;k<n;k++) gs.push([]);
  arr.forEach(function(name,idx){ gs[idx%n].push(name); });
  out.innerHTML=gs.map(function(g,idx){ return '<div class="group"><h3>Groupe '+(idx+1)+'</h3><ul>'+g.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join("")+'</ul></div>'; }).join("");
}

/* ---------- Actions ---------- */
function toggleFav(id){
  var i=state.fav.indexOf(id);
  if(i>=0) state.fav.splice(i,1); else state.fav.push(id);
  LS.set("bad:fav",state.fav);
}
function surprise(){
  var pool=filtered();
  if(!pool.length){ toast("Aucune activité ne correspond aux filtres."); return; }
  var fresh=pool.filter(function(a){ var d=state.hist[a.id]; return !d || (Date.now()-d)>14*86400000; });
  if(fresh.length) pool=fresh;
  var a=pool[Math.floor(Math.random()*pool.length)];
  location.hash="a-"+a.id;
}
document.addEventListener("click",function(e){
  var el=e.target.closest("[data-action]"); if(!el) return;
  var act=el.getAttribute("data-action"), id=el.getAttribute("data-id");
  switch(act){
    case "filter": state.filters[el.getAttribute("data-name")]=el.getAttribute("data-value"); updateFilters(); break;
    case "favonly": state.filters.favOnly=!state.filters.favOnly; updateFilters(); break;
    case "reset": state.filters={type:"all",dur:"all",moment:"all",n:"",favOnly:false}; updateFilters(); break;
    case "fav": toggleFav(id); if(route().v==="detail") render(); else updateResults(); break;
    case "surprise": surprise(); break;
    case "done": state.hist[id]=Date.now(); LS.set("bad:hist",state.hist); render(); toast("Activité marquée comme faite."); break;
    case "goto-timer": setTimer(byId(id).duree*60); location.hash="outils"; break;
    case "project": openOverlay("steps",id); break;
    case "project-timer": openOverlay("timer"); break;
    case "close-overlay": closeOverlay(); break;
    case "timer-toggle": if(timer.running) pauseTimer(); else startTimer(); break;
    case "timer-reset": setTimer(timer.total/1000); break;
    case "timer-add": addTime(60); break;
    case "timer-preset": setTimer(parseInt(el.getAttribute("data-min"),10)*60); break;
    case "timer-custom": var v=parseInt($("#customMin").value,10); if(v>0 && v<=180) setTimer(v*60); else toast("Entrez une durée entre 1 et 180 minutes."); break;
    case "sound": timer.sound=!timer.sound; el.setAttribute("aria-pressed",timer.sound); el.textContent="Son : "+(timer.sound?"activé":"coupé"); break;
    case "draw": draw(); break;
    case "draw-reset": drawn=[]; var o=$("#drawOut"); o.className="stage idle"; o.textContent="Appuyez pour tirer un nom."; updateDrawLeft(); break;
    case "groups": makeGroups(); break;
  }
});
document.addEventListener("input",function(e){
  var t=e.target;
  if(t.id==="fNum"){ state.filters.n=t.value; updateResults(); var s=$("#filters summary small"); if(s){ var n=activeCount(); s.textContent=n?n+" actif"+(n>1?"s":""):"aucun"; } }
  else if(t.id==="names"){ state.names=t.value; LS.set("bad:names",state.names); updateDrawLeft(); }
  else if(t.hasAttribute("data-note")){ state.notes[t.getAttribute("data-note")]=t.value; LS.set("bad:notes",state.notes); }
});

render();
})();

/* ---------- Installation et hors-ligne ---------- */
if("serviceWorker" in navigator){
  window.addEventListener("load",function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
}
