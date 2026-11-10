(function () {
  const C = window.RALLYE;
  const $ = (s, r) => (r || document).querySelector(s);

  function layout(active) {
    document.body.insertAdjacentHTML("afterbegin",
      '<header><h1>' + C.titre + '</h1></header>' +
      '<nav>' + [
        ["index.html", "Accueil"], ["planning.html", "Rotation"], ["scores.html", "Scores"], ["qr.html", "QR codes"]
      ].map(l => '<a href="' + l[0] + '"' + (l[0] === active ? ' class="on"' : '') + '>' + l[1] + '</a>').join("") + '</nav>');
  }

  function moodleUrl(path) {
    if (!C.moodleBase || !path) return "";
    if (/^https?:\/\//.test(path)) return path;
    return C.moodleBase.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }

  // Rotation : l'équipe t est au poste (t + r) mod n lors de la manche r.
  function pad(n) { return String(n).padStart(2, "0"); }
  function fmt(min) { return pad(Math.floor(min / 60) % 24) + ":" + pad(min % 60); }

  function schedule(startMin) {
    const n = C.jours[1].postes.length;
    const rounds = [];
    let t = startMin + C.briefing;
    for (let r = 0; r < n; r++) {
      rounds.push({ r, debut: t, fin: t + C.dureePoste });
      t += C.dureePoste;
      if (r === C.pauseApresManche - 1) { rounds[r].pauseApres = true; t += C.transition + C.pause; }
      else if (r < n - 1) t += C.transition;
    }
    const finale = { debut: t + C.transition, fin: t + C.transition + C.dureeFinale };
    return { rounds, finale, briefingFin: startMin + C.briefing };
  }

  function posteDe(equipeIdx, manche, n) { return (equipeIdx + manche) % n; }

  function load(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch (e) { return def; } }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }

  window.APP = { C, $, layout, moodleUrl, schedule, posteDe, fmt, load, save };
})();
