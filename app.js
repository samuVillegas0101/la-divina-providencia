(function(){
  const DATA = window.LA_DIVINA_MENU;
  if(!DATA) return;

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const placeholder = 'assets/product-placeholder.svg';

  const formatPrice = value => value == null ? 'Consultar' : '$' + Number(value).toLocaleString('es-CO').replace(/,/g,'.');
  const whatsappHref = () => `https://wa.me/${DATA.meta.whatsappNumber}?text=${encodeURIComponent(DATA.meta.whatsappText)}`;

  function allProducts(){
    return DATA.categories.flatMap(category =>
      category.groups.flatMap(group =>
        group.items.map(item => ({...item, categoryTitle: category.title, groupTitle: group.title, categoryId: category.id, groupId: group.id}))
      )
    );
  }

  function getItem(id){
    return allProducts().find(p => p.id === id);
  }

  const homePreviewMap = {
    'desayunos': ['calentao-con-chorizo-o-morcilla','calentao-con-res-chicharron-o-cerdo','huevos-a-la-cacerola','arepa-de-mote-con-quesito-y-huevos','arepa-tela-con-mantequilla-y-quesito'],
    'para-compartir': ['empanadas','pataconada','ceviche-mixto','tocino-la-divina','papas-con-pulled-pork','migao-la-divina','hamburguesa-de-la-casa','mini-burger'],
    'parrilla-tradicion': ['pechuga-a-la-parrilla-300-g','churrasco-300-g','picada-para-2-o-3-personas','punta-de-anca-300-g','bandeja-tipica','cazuela-de-frijoles','mondongo','sancocho-trifasico'],
    'bebidas-licores': ['jugo-en-agua','limonada-natural','jarra-de-limonada-natural','soda-frutos-rojos','chocolate-con-leche','carajillo','divina-tentacion','pilsen']
  };

  function productCard(item, options={}){
    const tag = options.link ? 'a' : 'article';
    const article = document.createElement(tag);
    article.className = `product-card${options.compact ? ' product-card-compact' : ''}`;
    article.id = options.menuAnchor ? item.id : '';
    if(options.link){
      article.href = `menu.html#${item.id}`;
      article.setAttribute('aria-label', `Ver ${item.name} en la carta`);
    }
    article.innerHTML = `
      <div class="product-media">
        <img loading="lazy" src="${item.image || placeholder}" alt="Foto de ${escapeHtml(item.name)}" onerror="this.onerror=null;this.src='${placeholder}'">
      </div>
      <div class="product-body">
        <div class="product-meta">${escapeHtml(item.groupTitle || '')}</div>
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
        <div class="category-card-copy">
          <h3>${escapeHtml(cat.title)}</h3>
          <p>${escapeHtml(cat.eyebrow)}</p>
        </div>
        <span class="arrow">Ver platos →</span>`;
      wrap.appendChild(a);
    });
  }

  function renderHomeHighlights(){
    const wrap = $('[data-home-highlights]');
    if(!wrap) return;
    DATA.homeHighlights.forEach(id => {
      const item = getItem(id);
      if(item) wrap.appendChild(productCard(item, {link:true}));
    });
  }

  function renderHomeRails(){
    const wrap = $('[data-home-rails]');
    if(!wrap) return;
    DATA.categories.forEach(cat => {
      const rail = document.createElement('section');
      rail.className = 'home-rail';
      const ids = homePreviewMap[cat.id] || cat.groups.flatMap(g => g.items).slice(0,8).map(i => i.id);
      rail.innerHTML = `
        <div class="rail-head">
          <div>
            <span class="rail-kicker">${escapeHtml(cat.eyebrow)}</span>
            <h3>${escapeHtml(cat.title)}</h3>
          </div>
          <a href="menu.html#${cat.id}">Ver todo →</a>
        </div>
        <div class="rail-scroll"></div>`;
      const scroller = $('.rail-scroll', rail);
      ids.forEach(id => {
        const item = getItem(id);
        if(item) scroller.appendChild(productCard(item, {link:true, compact:true}));
      });
      wrap.appendChild(rail);
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
    wa.className = 'quick-pill quick-pill-wa';
    wa.href = whatsappHref();
    wa.textContent = 'Reservar';
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
          <div class="group-chip-row"></div>
        </div>`;
      const container = section.querySelector('.container');
      const chipRow = section.querySelector('.group-chip-row');
      cat.groups.forEach(group => {
        const chip = document.createElement('a');
        chip.className = 'group-chip';
        chip.href = `#${group.id}`;
        chip.textContent = group.title;
        chipRow.appendChild(chip);
      });
      cat.groups.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'menu-group';
        groupEl.id = group.id;
        groupEl.innerHTML = `
          <div class="group-title-row">
            <div>
              <span class="group-count">${group.items.length} productos</span>
              <h3>${escapeHtml(group.title)}</h3>
            </div>
            ${group.subtitle ? `<p>${escapeHtml(group.subtitle)}</p>` : ''}
          </div>
          <div class="product-grid"></div>`;
        const grid = groupEl.querySelector('.product-grid');
        group.items.forEach(item => grid.appendChild(productCard({...item, groupTitle: group.title}, {menuAnchor:true})));
        container.appendChild(groupEl);
      });
      const cta = document.createElement('div');
      cta.className = 'category-cta';
      cta.innerHTML = `<a class="back-top" href="#quick-menu">Volver arriba</a><a class="btn btn-wa" href="${whatsappHref()}" target="_blank" rel="noopener">Reservar por WhatsApp</a>`;
      container.appendChild(cta);
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
  renderHomeRails();
  renderHomeHighlights();
  renderQuickMenu();
  renderMenu();
  renderFooterCategories();
  wireLinks();
})();
