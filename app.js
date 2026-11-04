const grid = document.getElementById('grid');
const search = document.getElementById('search');
const stats = document.getElementById('stats');
let currentCat = 'all';

function render() {
  const q = search.value.toLowerCase().trim();
  const filtered = tools.filter(t =
    (currentCat === 'all'  t.cat === currentCat) &&
    (t.name.toLowerCase().includes(q)  t.desc.toLowerCase().includes(q)  t.cat.toLowerCase().includes(q))
  );
  
  stats.textContent = `${filtered.length} outil(s)`;
  
  if (filtered.length === 0) {
    grid.innerHTML = 'div class=empty🔍 Aucun outil ne correspond à votre recherche.div';
    return;
  }
  
  grid.innerHTML = '';
  filtered.forEach(t = {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      div
        span class=tag${t.cat}span
        h3${t.name}h3
        p${t.desc}p
      div
      div class=card-footer
        a href=${t.url} target=_blank rel=noopenerOuvrir ↗a
        button class=copy-btn onclick=copyUrl('${t.url}') title=Copier le lien📋button
      div
    `;
    grid.appendChild(card);
  });
}

function copyUrl(url) {
  navigator.clipboard.writeText(url);
  alert('Lien copié dans le presse-papier !');
}

document.querySelectorAll('.cat-btn').forEach(btn = {
  btn.addEventListener('click', () = {
    document.querySelector('.cat-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    render();
  });
});

search.addEventListener('input', render);
render();