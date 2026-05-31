(function(){
  const DATA = window.LA_DIVINA_MENU;
  if(!DATA) return;

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const placeholder = 'assets/product-placeholder.svg';

  const formatPrice = value => value == null ? 'Consultar' : '$' + Number(value).toLocaleString('es-CO').replace(/,/g,'.');
  const whatsappHref = () => `https://wa.me/${DATA.meta.whatsappNumber}?text=${encodeURIComponent(DATA.meta.whatsappText)}`;

  function allProducts(){
    return DATA.categories.flatMap(category => category.groups.flatMap(group => group.items.map(item => ({...item, categoryTitle: category.title, groupTitle: group.title}))));
  }

  function productCard(item){
    const article = document.createElement('article');
    article.className = 'product-card';
    article.id = item.id;
    article.innerHTML = `
      <div class="product-media">
        <img loading="lazy" src="${item.image || placeholder}" alt="Foto de ${escapeHtml(item.name)}" onerror="this.onerror=null;this.src='${placeholder}'">
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${escapeHtml(item.name)}</h3>
          <strong class="price">${formatPrice(item.price)}</strong>
        </div>
        ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
      </div>`;
    return article;
  }

  function renderCategoryCards(){
    const wrap = $('[data-category-cards]');
    if(!wrap) return;
    DATA.categories.forEach(cat => {
      const a = document.createElement('a');
      a.className = 'category-card';
      a.href = `menu.html#${cat.id}`;
      a.innerHTML = `
        <span class="icon-box" aria-hidden="true">${cat.icon || '•'}</span>
        <div>
          <h3>${escapeHtml(cat.title)}</h3>
          <p>${escapeHtml(cat.eyebrow)}</p>
        </div>
        <span class="arrow">Ver →</span>`;
      wrap.appendChild(a);
    });
  }

  function renderHomeHighlights(){
    const wrap = $('[data-home-highlights]');
    if(!wrap) return;
    const products = allProducts();
    DATA.homeHighlights.forEach(id => {
      const item = products.find(p => p.id === id);
      if(item) wrap.appendChild(productCard(item));
    });
  }

  function renderQuickMenu(){
    const wrap = $('[data-quick-menu]');
    if(!wrap) return;
    DATA.categories.forEach(cat => {
      const a = document.createElement('a');
      a.className = 'quick-pill';
      a.href = `#${cat.id}`;
      a.textContent = cat.title;
      wrap.appendChild(a);
    });
    const wa = document.createElement('a');
    wa.className = 'quick-pill';
    wa.href = whatsappHref();
    wa.textContent = 'WhatsApp';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wrap.appendChild(wa);
  }

  function renderMenu(){
    const wrap = $('[data-menu-list]');
    if(!wrap) return;
    DATA.categories.forEach(cat => {
      const section = document.createElement('section');
      section.className = 'menu-category';
      section.id = cat.id;
      section.innerHTML = `
        <div class="container">
          <span class="eyebrow">${escapeHtml(cat.eyebrow)}</span>
          <div class="category-title-row">
            <h2>${escapeHtml(cat.title)}</h2>
            <p>${escapeHtml(cat.intro || '')}</p>
          </div>
        </div>`;
      const container = section.querySelector('.container');
      cat.groups.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'menu-group';
        groupEl.id = group.id;
        groupEl.innerHTML = `
          <div class="group-title-row">
            <h3>${escapeHtml(group.title)}</h3>
            ${group.subtitle ? `<p>${escapeHtml(group.subtitle)}</p>` : ''}
          </div>
          <div class="product-grid"></div>`;
        const grid = groupEl.querySelector('.product-grid');
        group.items.forEach(item => grid.appendChild(productCard(item)));
        container.appendChild(groupEl);
      });
      const back = document.createElement('a');
      back.className = 'back-top';
      back.href = '#quick-menu';
      back.textContent = 'Volver arriba';
      container.appendChild(back);
      wrap.appendChild(section);
    });
  }

  function renderFooterCategories(){
    $$('[data-footer-categories]').forEach(ul => {
      DATA.categories.forEach(cat => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="menu.html#${cat.id}">${escapeHtml(cat.title)}</a>`;
        ul.appendChild(li);
      });
    });
  }

  function wireLinks(){
    $$('[data-whatsapp-link]').forEach(a => {
      a.href = whatsappHref();
      a.target = '_blank';
      a.rel = 'noopener';
    });
    $$('[data-instagram-link]').forEach(a => { a.href = DATA.meta.instagram; });
    $$('[data-maps-link]').forEach(a => { a.href = DATA.meta.maps; });
    $$('[data-phone-label]').forEach(el => { el.textContent = '+57 300 1234567'; });
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  renderCategoryCards();
  renderHomeHighlights();
  renderQuickMenu();
  renderMenu();
  renderFooterCategories();
  wireLinks();
})();
