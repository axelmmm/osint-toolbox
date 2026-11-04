'use strict';
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => (/^https?:\/\//i.test(u) ? u : '#');
const enc = encodeURIComponent;

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ================= Annuaire d'outils ================= */
const grid = $('grid');
const search = $('search');
const stats = $('stats');
let currentCat = 'all';

function render() {
  const q = search.value.toLowerCase().trim();
  const filtered = tools.filter(t =>
    (currentCat === 'all' || t.cat === currentCat) &&
    (t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q))
  );
  stats.textContent = `${filtered.length} outil(s)`;
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty">🔍 Aucun outil ne correspond à votre recherche.</div>';
    return;
  }
  grid.innerHTML = filtered.map(t => `
    <div class="card">
      <div>
        <span class="tag">${esc(t.cat)}</span>
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.desc)}</p>
      </div>
      <div class="card-footer">
        <a href="${esc(safeUrl(t.url))}" target="_blank" rel="noopener noreferrer">Ouvrir ↗</a>
        <button class="copy-btn" data-url="${esc(t.url)}" title="Copier le lien">📋</button>
      </div>
    </div>`).join('');
}

grid.addEventListener('click', async e => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.url);
    toast('Lien copié dans le presse-papier !');
  } catch {
    toast('Copie impossible : ' + btn.dataset.url);
  }
});

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.cat-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    render();
  });
});
search.addEventListener('input', render);
render();

/* ================= Recherche directe (résultats sur le site) ================= */
async function getJSON(url, ms = 9000) {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(url, { signal: c.signal });
    if (r.status === 404) return { notFound: true };
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(timer); }
}
const nf = d => !d || d.notFound;
const R = (...pairs) => pairs.filter(p => p[1] !== undefined && p[1] !== null && p[1] !== '' && p[1] !== false);
const day = ts => new Date(ts * 1000).toISOString().slice(0, 10);
const sha256 = async s => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map(b => b.toString(16).padStart(2, '0')).join('');
const isIPv4 = s => /^(\d{1,3}\.){3}\d{1,3}$/.test(s);
const isIP = s => isIPv4(s) || (s.includes(':') && /^[0-9a-f:]+$/i.test(s));
const memo = new Map();
const once = (k, f) => { if (!memo.has(k)) memo.set(k, f()); return memo.get(k); };

const dns = async (name, type) => {
  const d = await getJSON(`https://dns.google/resolve?name=${enc(name)}&type=${type}`);
  return (d.Answer || []).map(a => a.data);
};
const ipInfo = async ip => {
  const d = await getJSON(`https://ipwho.is/${enc(ip)}`);
  if (nf(d) || d.success === false) return null;
  return {
    link: `https://www.google.com/maps?q=${d.latitude},${d.longitude}`,
    rows: R(['IP', d.ip], ['Type', d.type], ['Pays', d.country], ['Région', d.region], ['Ville', d.city],
      ['FAI', d.connection?.isp], ['Organisation', d.connection?.org],
      ['ASN', d.connection?.asn && 'AS' + d.connection.asn], ['Fuseau horaire', d.timezone?.id])
  };
};

const parseCoords = s => {
  const m = s.match(/^\s*(-?\d+(?:\.\d+)?)\s*[,;\s]\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = +m[1], lon = +m[2];
  return Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? { lat, lon } : null;
};
const place = t => once('place', async () => {
  const c = parseCoords(t);
  const base = 'https://nominatim.openstreetmap.org/';
  if (c) {
    const d = await getJSON(`${base}reverse?format=jsonv2&lat=${c.lat}&lon=${c.lon}&accept-language=fr`);
    return { ...c, rows: R(['Adresse', nf(d) || d.error ? null : d.display_name], ['Type', d.type], ['Latitude', c.lat], ['Longitude', c.lon]) };
  }
  const d = await getJSON(`${base}search?format=jsonv2&limit=3&accept-language=fr&q=${enc(t)}`);
  if (nf(d) || !d.length) return null;
  const rows = d.map((p, i) => [`Résultat ${i + 1}`, `${p.display_name}\n(${(+p.lat).toFixed(5)}, ${(+p.lon).toFixed(5)})`]);
  return { lat: +d[0].lat, lon: +d[0].lon, rows };
});
const osm = (lat, lon) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;

function build(type, t) {
  if (type === 'username') return [
    { name: 'GitHub', run: async u => { const d = await getJSON(`https://api.github.com/users/${enc(u)}`); return nf(d) ? null : { link: d.html_url, img: d.avatar_url, rows: R(['Nom', d.name], ['Bio', d.bio], ['Société', d.company], ['Localisation', d.location], ['Site', d.blog], ['Dépôts publics', d.public_repos], ['Followers', d.followers], ['Créé le', d.created_at?.slice(0, 10)]) }; } },
    { name: 'GitLab', run: async u => { const d = await getJSON(`https://gitlab.com/api/v4/users?username=${enc(u)}`); return nf(d) || !d.length ? null : { link: d[0].web_url, img: d[0].avatar_url, rows: R(['Nom', d[0].name], ['Statut', d[0].state]) }; } },
    { name: 'Codeberg', run: async u => { const d = await getJSON(`https://codeberg.org/api/v1/users/${enc(u)}`); return nf(d) ? null : { link: d.html_url, img: d.avatar_url, rows: R(['Nom', d.full_name], ['Bio', d.description], ['Localisation', d.location], ['Créé le', d.created?.slice(0, 10)]) }; } },
    { name: 'Keybase', run: async u => { const d = await getJSON(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${enc(u)}`); const p = d.them?.[0]; return !p ? null : { link: `https://keybase.io/${enc(u)}`, rows: R(['Pseudo', p.basics?.username], ['Nom', p.profile?.full_name], ['Localisation', p.profile?.location], ['Bio', p.profile?.bio]) }; } },
    { name: 'Hacker News', run: async u => { const d = await getJSON(`https://hacker-news.firebaseio.com/v0/user/${enc(u)}.json`); return nf(d) ? null : { link: `https://news.ycombinator.com/user?id=${enc(u)}`, rows: R(['Karma', d.karma], ['Inscrit le', d.created && day(d.created)], ['À propos', d.about]) }; } },
    { name: 'DEV.to', run: async u => { const d = await getJSON(`https://dev.to/api/users/by_username?url=${enc(u)}`); return nf(d) ? null : { link: `https://dev.to/${enc(u)}`, img: d.profile_image, rows: R(['Nom', d.name], ['Bio', d.summary], ['Localisation', d.location], ['GitHub', d.github_username], ['Twitter', d.twitter_username], ['Inscrit le', d.joined_at]) }; } },
    { name: 'Chess.com', run: async u => { const d = await getJSON(`https://api.chess.com/pub/player/${enc(u.toLowerCase())}`); return nf(d) ? null : { link: d.url, img: d.avatar, rows: R(['Pseudo', d.username], ['Nom', d.name], ['Pays', d.country?.split('/').pop()], ['Followers', d.followers], ['Inscrit le', d.joined && day(d.joined)]) }; } },
    { name: 'Lichess', run: async u => { const d = await getJSON(`https://lichess.org/api/user/${enc(u)}`); return nf(d) ? null : { link: d.url, rows: R(['Pseudo', d.username], ['Parties', d.count?.all], ['Inscrit le', d.createdAt && new Date(d.createdAt).toISOString().slice(0, 10)]) }; } }
  ];
  if (type === 'email') {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t)) throw new Error('Adresse email invalide.');
    return [
      { name: 'Gravatar', run: async e => { const d = await getJSON(`https://api.gravatar.com/v3/profiles/${await sha256(e.toLowerCase())}`); return nf(d) ? null : { link: d.profile_url, img: d.avatar_url, rows: R(['Nom', d.display_name], ['Poste', d.job_title], ['Société', d.company], ['Localisation', d.location], ['Bio', d.description]) }; } },
      { name: 'Serveurs mail (MX)', run: async e => { const mx = await dns(e.split('@')[1], 'MX'); return mx.length ? { rows: mx.map((m, i) => [`MX ${i + 1}`, m]) } : null; } },
      { name: 'EmailRep', run: async e => { const d = await getJSON(`https://emailrep.io/${enc(e)}`); return nf(d) ? null : { rows: R(['Réputation', d.reputation], ['Suspect', d.suspicious ? 'oui' : 'non'], ['Références', d.references], ['Fuite de données', d.details?.data_breach ? 'oui' : 'non'], ['Identifiants fuités', d.details?.credentials_leaked ? 'oui' : 'non'], ['Jetable', d.details?.disposable ? 'oui' : 'non'], ['Profils', d.details?.profiles?.join(', ')]) }; } }
    ];
  }
  if (type === 'domain') {
    if (isIP(t)) return [
      { name: 'Géolocalisation IP', run: ipInfo },
      { name: 'DNS inverse (PTR)', run: async ip => { if (!isIPv4(ip)) return null; const p = await dns(ip.split('.').reverse().join('.') + '.in-addr.arpa', 'PTR'); return p.length ? { rows: p.map((x, i) => [`PTR ${i + 1}`, x]) } : null; } }
    ];
    if (!t.includes('.')) throw new Error('Domaine invalide (ex : exemple.com).');
    return [
      { name: 'Enregistrements DNS', run: async d => { const types = ['A', 'AAAA', 'MX', 'NS', 'TXT']; const res = await Promise.all(types.map(x => dns(d, x))); const rows = types.map((x, i) => [x, res[i].join('\n')]).filter(r => r[1]); return rows.length ? { rows } : null; } },
      { name: 'WHOIS (RDAP)', run: async d => { const r = await getJSON(`https://rdap.org/domain/${enc(d)}`); if (nf(r)) return null; const ev = a => r.events?.find(e => e.eventAction === a)?.eventDate?.slice(0, 10); return { rows: R(['Domaine', r.ldhName], ['Enregistré le', ev('registration')], ['Expire le', ev('expiration')], ['Modifié le', ev('last changed')], ['Statut', r.status?.join(', ')], ['Serveurs DNS', r.nameservers?.map(n => n.ldhName).join('\n')]) }; } },
      { name: 'Serveur (IP & localisation)', run: async d => { const a = (await dns(d, 'A'))[0]; return a ? ipInfo(a) : null; } }
    ];
  }
  if (type === 'geo') return [
    { name: 'Adresse / Lieu (OpenStreetMap)', run: async s => { const p = await place(s); return p ? { link: osm(p.lat, p.lon), rows: p.rows } : null; } },
    { name: 'Météo & altitude', run: async s => { const p = await place(s); if (!p) return null; const d = await getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,wind_speed_10m`); return nf(d) ? null : { rows: R(['Altitude', d.elevation + ' m'], ['Température', d.current?.temperature_2m + ' °C'], ['Vent', d.current?.wind_speed_10m + ' km/h']) }; } }
  ];
  if (type === 'phone') {
    const digits = t.replace(/[^\d+]/g, '');
    if (digits.replace(/\D/g, '').length < 6) throw new Error('Numéro invalide.');
    return [{
      name: 'Analyse du format', run: async () => ({
        rows: R(['Numéro normalisé', digits], ['Format', digits.startsWith('+') ? 'International' : digits.startsWith('00') ? 'International (00)' : 'National'],
          ['Indicatif +33 (France)', digits.startsWith('+33') || digits.startsWith('0033') ? 'oui' : null])
      })
    }];
  }
  return [];
}

const placeholders = { username: 'Entrez un pseudo...', email: 'exemple@domaine.com', domain: 'exemple.com ou 8.8.8.8', geo: 'Paris, France  ou  48.8566, 2.3522', phone: '+33 6 12 34 56 78' };
const external = (type, t) => {
  const q = enc(`"${t}"`);
  const google = ['Google (dork)', `https://www.google.com/search?q=${q}`];
  const bing = ['Bing', `https://www.bing.com/search?q=${q}`];
  const e = enc(t);
  return {
    username: [['WhatsMyName', 'https://whatsmyname.app/'], google, ['GitHub', `https://github.com/search?q=${e}&type=users`], ['Namechk', 'https://namechk.com/']],
    email: [['Have I Been Pwned', 'https://haveibeenpwned.com/'], ['Epieos', `https://epieos.com/?q=${e}`], google],
    domain: [['Shodan', `https://www.shodan.io/search?query=${e}`], ['VirusTotal', `https://www.virustotal.com/gui/search/${e}`], ['SecurityTrails', `https://securitytrails.com/domain/${e}/dns`], ['crt.sh', `https://crt.sh/?q=${e}`], ['urlscan.io', `https://urlscan.io/search/#${e}`]],
    geo: [['Google Maps', `https://www.google.com/maps/search/${e}`], ['OpenStreetMap', `https://www.openstreetmap.org/search?query=${e}`]],
    phone: [google, bing, ['Truecaller', `https://www.truecaller.com/search/fr/${e}`]]
  }[type] || [];
};

const targetInput = $('target-input');
const searchType = $('search-type');
const launchBtn = $('launch-search-btn');
const results = $('results');
let runId = 0;

function showCard(card, state, res, src) {
  const badge = { ok: ['ok', 'Trouvé'], no: ['no', 'Aucun résultat'], err: ['err', 'Indisponible'] }[state];
  let body = '';
  if (state === 'ok') {
    body = `<div class="res-body">${res.img ? `<img src="${esc(safeUrl(res.img))}" alt="" referrerpolicy="no-referrer">` : ''}<dl>${res.rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div>${res.link ? `<a class="res-link" href="${esc(safeUrl(res.link))}" target="_blank" rel="noopener noreferrer">Voir la source ↗</a>` : ''}`;
  } else if (state === 'no') {
    body = '<p class="res-msg">Aucune donnée publique trouvée sur cette source.</p>';
  } else {
    body = `<p class="res-msg">Source inaccessible (réseau, quota ou blocage du navigateur) : ${esc(res)}. Essayez les liens externes ci-dessous.</p>`;
  }
  card.innerHTML = `<div class="res-head"><h3>${esc(src.name)}</h3><span class="badge ${badge[0]}">${badge[1]}</span></div>${body}`;
}

async function executeDirectSearch() {
  const t = targetInput.value.trim();
  const type = searchType.value;
  if (!t) { toast('Veuillez entrer une valeur à rechercher.'); targetInput.focus(); return; }
  let sources;
  try { sources = build(type, t); } catch (e) { toast(e.message); return; }

  const id = ++runId;
  memo.clear();
  results.hidden = false;
  results.innerHTML = `<h2>Résultats pour « ${esc(t)} »</h2><div class="res-grid"></div><p class="res-sub">Autres sources (s'ouvrent dans un nouvel onglet) :</p><div class="quick-links">${external(type, t).map(([n, u]) => `<a class="quick-link-btn" href="${esc(safeUrl(u))}" target="_blank" rel="noopener noreferrer">${esc(n)} ↗</a>`).join('')}</div>`;
  const resGrid = results.querySelector('.res-grid');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  launchBtn.disabled = true;

  await Promise.all(sources.map(src => {
    const card = document.createElement('div');
    card.className = 'res-card';
    card.innerHTML = `<div class="res-head"><h3>${esc(src.name)}</h3><span class="badge load">Recherche…</span></div>`;
    resGrid.appendChild(card);
    return src.run(t).then(
      r => id === runId && showCard(card, r ? 'ok' : 'no', r, src),
      e => id === runId && showCard(card, 'err', e.name === 'AbortError' ? 'délai dépassé' : e.message, src)
    );
  }));
  if (id === runId) launchBtn.disabled = false;
}

searchType.addEventListener('change', () => { targetInput.placeholder = placeholders[searchType.value]; });
targetInput.addEventListener('keydown', e => { if (e.key === 'Enter') executeDirectSearch(); });
launchBtn.addEventListener('click', executeDirectSearch);
