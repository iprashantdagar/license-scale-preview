(function(){
  var root = document.getElementById('ls-root');
  if(!root) return;
  var base = (window.LS_ASSET_BASE || '').replace(/\/$/,'');
  root.querySelectorAll('[data-bg]').forEach(function(el){
    var src = el.getAttribute('data-bg');
    if(!src) return;
    if(base && src.indexOf('assets/') === 0) src = base + '/' + src.slice(7);
    /* absolute: url() inside a custom property resolves against the stylesheet, not the page */
    try { src = new URL(src, document.baseURI).href; } catch(e){}
    el.style.setProperty('--img', 'url("' + src + '")');
    el.classList.add('is-set');
  });
  root.querySelectorAll('img[src^="assets/"]').forEach(function(img){
    if(base) img.setAttribute('src', base + '/' + img.getAttribute('src').slice(7));
  });
  var burger = root.querySelector('#ls-burger'), menu = root.querySelector('#ls-menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function(e){
      if(e.target.tagName === 'A'){ menu.classList.remove('is-open'); burger.setAttribute('aria-expanded','false'); }
    });
  }
  root.querySelectorAll('#ls-acc .acc__btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.parentElement, open = item.classList.contains('is-open');
      root.querySelectorAll('#ls-acc .acc__item').forEach(function(i){
        i.classList.remove('is-open');
        var b = i.querySelector('.acc__btn');
        if(b) b.setAttribute('aria-expanded','false');
      });
      if(!open){ item.classList.add('is-open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
  var items = root.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin:'0px 0px -8% 0px', threshold:.08 });
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* ── inline YouTube play (same-tab) ── */
  function lsPlayYt(btn){
    if(!btn || btn.classList.contains('is-playing')) return;
    var id = btn.getAttribute('data-yt');
    if(!id) return;
    var start = btn.getAttribute('data-yt-start');
    var src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
    if(start) src += '&start=' + encodeURIComponent(start);
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = btn.getAttribute('aria-label') || 'Video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    btn.appendChild(iframe);
    btn.classList.add('is-playing');
  }
  root.querySelectorAll('.video[data-yt]').forEach(function(btn){
    btn.addEventListener('click', function(){ lsPlayYt(btn); });
  });
  root.querySelectorAll('[data-yt-play]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      var id = el.getAttribute('data-yt-play');
      if(!id) return;
      var btn = root.querySelector('.video[data-yt="' + id + '"]');
      if(btn){ lsPlayYt(btn); btn.scrollIntoView({behavior:'smooth', block:'nearest'}); }
    });
  });
})();
