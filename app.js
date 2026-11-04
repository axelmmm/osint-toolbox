const grid = document.getElementById('grid');
const search = document.getElementById('search');
const stats = document.getElementById('stats');
let currentCat = 'all';

function render() {
  const q = search.value.toLowerCase().trim();
  const filtered = tools.filter(t =>
    (currentCat === 'all' || t.cat === currentCat) &&
    (t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q))
  );
  
  stats.textContent = `${filtered.length} outil(s)`;
  
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty">🔍 Aucun outil ne correspond à votre recherche.</div>';
    return;
  }
  
  grid.innerHTML = '';
  filtered.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <span class="tag">${t.cat}</span>
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
      </div>
      <div class="card-footer">
        <a href="${t.url}" target="_blank" rel="noopener">Ouvrir ↗</a>
        <button class="copy-btn" onclick="copyUrl('${t.url}')" title="Copier le lien">📋</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function copyUrl(url) {
  navigator.clipboard.writeText(url);
  alert('Lien copié dans le presse-papier !');
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.cat-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    render();
  });
});

search.addEventListener('input', render);
render();

// --- Moteur de recherche directe par cible ---
const searchEngines = {
  username: [
    { name: "WhatsMyName", url: (target) => `https://whatsmyname.app/` },
    { name: "Google (Dork)", url: (target) => `https://www.google.com/search?q="${encodeURIComponent(target)}"` },
    { name: "GitHub", url: (target) => `https://github.com/search?q=${encodeURIComponent(target)}&type=users` }
  ],
  email: [
    { name: "Have I Been Pwned", url: (target) => `https://haveibeenpwned.com/account/${encodeURIComponent(target)}` },
    { name: "Epieos", url: (target) => `https://epieos.com/?q=${encodeURIComponent(target)}` },
    { name: "Google (Dork)", url: (target) => `https://www.google.com/search?q="${encodeURIComponent(target)}"` }
  ],
  domain: [
    { name: "Shodan", url: (target) => `https://www.shodan.io/search?query=${encodeURIComponent(target)}` },
    { name: "VirusTotal", url: (target) => `https://www.virustotal.com/gui/search/${encodeURIComponent(target)}` },
    { name: "SecurityTrails", url: (target) => `https://securitytrails.com/domain/${encodeURIComponent(target)}/dns` }
  ],
  geo: [
    { name: "Google Maps", url: (target) => `https://www.google.com/maps/search/${encodeURIComponent(target)}` },
    { name: "SunCalc", url: (target) => `https://www.suncalc.org/#/${encodeURIComponent(target)}` }
  ]
};

const targetInput = document.getElementById('target-input');
const searchType = document.getElementById('search-type');
const launchBtn = document.getElementById('launch-search-btn');
const quickLinksContainer = document.getElementById('quick-links-container');

function executeDirectSearch() {
  const target = targetInput.value.trim();
  const type = searchType.value;

  if (!target) {
    alert("Veuillez entrer une valeur à rechercher.");
    return;
  }

  const engines = searchEngines[type];
  if (!engines) return;

  quickLinksContainer.innerHTML = '';

  engines.forEach(engine => {
    const linkUrl = engine.url(target);
    const linkBtn = document.createElement('a');
    linkBtn.className = 'quick-link-btn';
    linkBtn.href = linkUrl;
    linkBtn.target = '_blank';
    linkBtn.rel = 'noopener';
    linkBtn.textContent = `Ouvrir sur ${engine.name} ↗`;
    quickLinksContainer.appendChild(linkBtn);
  });

  window.open(engines[0].url(target), '_blank');
}

if (launchBtn) {
  launchBtn.addEventListener('click', executeDirectSearch);
}