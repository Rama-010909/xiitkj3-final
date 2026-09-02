/* XII TKJ 3 — shared UI behavior (theme, logo modal, page transition) */
(function(){
  var THEME_KEY = 'xii-tkj3-theme';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(mode){
    var actual = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode;
    root.setAttribute('data-theme', actual);
    document.querySelectorAll('[data-theme-select]').forEach(function(sel){ sel.value = mode; });
    document.querySelectorAll('.theme-logo').forEach(function(img){
      var src = actual === 'dark' ? img.dataset.darkSrc : img.dataset.lightSrc;
      if (src && img.getAttribute('src') !== src) img.src = src;
    });
  }
  window.iosTheme = { apply: applyTheme, key: THEME_KEY };

  document.addEventListener('DOMContentLoaded', function(){
    applyTheme(localStorage.getItem(THEME_KEY) || 'system');
    document.querySelectorAll('[data-theme-select]').forEach(function(sel){
      sel.addEventListener('change', function(e){
        localStorage.setItem(THEME_KEY, e.target.value);
        applyTheme(e.target.value);
      });
    });
    if (media.addEventListener){
      media.addEventListener('change', function(){
        if ((localStorage.getItem(THEME_KEY) || 'system') === 'system') applyTheme('system');
      });
    }

    /* ---- Logo tap-to-view modal ---- */
    var modal = document.getElementById('logoModal');
    if (modal){
      var img = document.getElementById('logoModalImg');
      var title = document.getElementById('logoModalTitle');
      var sub = document.getElementById('logoModalSub');
      var close = document.getElementById('logoModalClose');
      function open(src, t, s){
        img.src = src; title.textContent = t; sub.textContent = s;
        modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
      }
      function shut(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
      document.querySelectorAll('[data-logo-view]').forEach(function(btn){
        btn.addEventListener('click', function(){
          var isDark = root.getAttribute('data-theme') === 'dark';
          var light = btn.dataset.light, dark = btn.dataset.dark;
          var src = (isDark && dark) ? dark : (light || dark);
          open(src, btn.dataset.title || 'Logo', btn.dataset.sub || 'Identitas Resmi');
        });
      });
      close.addEventListener('click', shut);
      modal.addEventListener('click', function(e){ if (e.target === modal) shut(); });
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape') shut(); });
    }

    /* ---- Highlight active mobile tab / nav ---- */
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.ios-tab-bar a, .nav-links a').forEach(function(a){
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === here) a.classList.add('active');
    });

    /* ---- Logout ---- */
    document.querySelectorAll('[data-logout]').forEach(function(btn){
      btn.addEventListener('click', function(){
        sessionStorage.removeItem('tkj3_session');
        location.href = 'index.html';
      });
    });

    /* ---- Ripple-ish tap feedback for tiles/buttons already handled by CSS transitions ---- */

    /* ---- iOS-style page transition between internal pages ---- */
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      document.addEventListener('click', function(e){
        var a = e.target.closest('a[href]');
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (!href.endsWith('.html') || a.target === '_blank' || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        document.body.style.transition = 'opacity .2s ease, transform .22s cubic-bezier(.2,.8,.2,1)';
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(.985)';
        setTimeout(function(){ location.href = href; }, 170);
      });
      window.addEventListener('pageshow', function(){
        document.body.style.transition = 'none';
        document.body.style.opacity = '';
        document.body.style.transform = '';
      });
    }
  });
})();
