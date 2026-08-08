/* License & Scale — UI enhancements
   1) Casino / odometer roll for the headline stats (once per page load, on enter).
   2) Mobile navigation bar that follows the user on every page.
   Values, labels and markup content are never altered: the reels are built from
   the existing text and the exact original text is restored when they settle. */
(function () {
  var root = document.getElementById('ls-root');
  if (!root) return;

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ─────────────── 1. odometer stats ─────────────── */
  function initOdometer() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    var groups = root.querySelectorAll('.stats, .statbar');
    if (!groups.length) return;

    var SPIN_BASE = 1100;   /* ms for the first digit  */
    var SPIN_STEP = 280;    /* extra ms per digit to the right */
    var EASE = 'cubic-bezier(.12,.74,.18,1)';

    function reelFor(digit, cycles, cellH) {
      var target = parseInt(digit, 10);
      if (isNaN(target)) target = 0;

      var reel = document.createElement('span');
      reel.className = 'ls-odo__r';

      /* Full spin cycles of 0-9, then one last 0..target sequence so the
         final frame is EXACTLY the displayed digit (no off-by-one). */
      var cells = [];
      var c, d;
      for (c = 0; c < cycles; c++) {
        for (d = 0; d < 10; d++) cells.push(d);
      }
      for (d = 0; d <= target; d++) cells.push(d);

      cells.forEach(function (n) {
        var i = document.createElement('i');
        i.textContent = String(n);
        i.style.height = cellH + 'px';
        i.style.lineHeight = cellH + 'px';
        reel.appendChild(i);
      });

      return { el: reel, stopIndex: cells.length - 1 };
    }

    function measureCellHeight(b) {
      var probe = document.createElement('span');
      probe.style.cssText = 'display:inline-block;visibility:hidden;line-height:1;font:inherit;';
      probe.textContent = '8';
      b.appendChild(probe);
      var h = Math.round(probe.getBoundingClientRect().height) || Math.round(parseFloat(getComputedStyle(b).fontSize)) || 36;
      b.removeChild(probe);
      return Math.max(h, 1);
    }

    function build(b) {
      var text = b.textContent.trim();
      if (!text || !/\d/.test(text)) return null;

      var cellH = measureCellHeight(b);

      var odo = document.createElement('span');
      odo.className = 'ls-odo';
      odo.setAttribute('aria-hidden', 'true');

      var reels = [];
      (text.match(/(\d+|\D+)/g) || []).forEach(function (part) {
        if (/^\d+$/.test(part)) {
          part.split('').forEach(function (ch) {
            /* More cycles for later digits so tens/ones visibly roll longer,
               but final stop is always the real digit. */
            var made = reelFor(ch, 2 + reels.length, cellH);
            var cell = document.createElement('span');
            cell.className = 'ls-odo__d';
            cell.style.height = cellH + 'px';
            cell.appendChild(made.el);
            odo.appendChild(cell);
            reels.push(made);
          });
        } else {
          var s = document.createElement('span');
          s.className = 'ls-odo__s';
          s.textContent = part;
          odo.appendChild(s);
        }
      });
      if (!reels.length) return null;

      var sr = document.createElement('span');
      sr.className = 'ls-odo-sr';
      sr.textContent = text;

      b.textContent = '';
      b.appendChild(odo);
      b.appendChild(sr);
      return { node: b, text: text, reels: reels, cellH: cellH };
    }

    function spin(item) {
      var longest = 0;
      item.reels.forEach(function (r, i) {
        var dur = SPIN_BASE + i * SPIN_STEP;
        longest = Math.max(longest, dur);
        r.el.style.transition = 'transform ' + dur + 'ms ' + EASE;
        /* stopIndex is the last cell (= target digit). Exact px height avoids
           fractional line-height drift that was landing 89/71 on wrong digits. */
        r.el.style.transform = 'translate3d(0,' + (-r.stopIndex * item.cellH) + 'px,0)';
      });
      /* restore original text once settled (byte-identical markup) */
      setTimeout(function () { item.node.textContent = item.text; }, longest + 80);
    }

    function start() {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          var items = [];
          en.target.querySelectorAll('b').forEach(function (b) {
            var made = build(b);
            if (made) items.push(made);
          });
          if (!items.length) return;
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { items.forEach(spin); });
          });
        });
      }, { threshold: 0.3 });
      groups.forEach(function (g) { io.observe(g); });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start).catch(start);
    } else {
      start();
    }
  }

  /* ─────────────── 2. mobile nav that follows the scroll ─────────────── */
  function initStickyNav() {
    var nav = root.querySelector('.nav');
    if (!nav) return;

    var spacer = document.createElement('div');
    spacer.className = 'ls-nav-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    spacer.style.height = '0px';
    nav.parentNode.insertBefore(spacer, nav.nextSibling);

    function sync() {
      var fixed = window.getComputedStyle(nav).position === 'fixed';
      var h = fixed ? Math.round(nav.getBoundingClientRect().height) : 0;
      spacer.style.height = h + 'px';
      document.documentElement.style.setProperty('--ls-navh', (h || 72) + 'px');
      root.style.setProperty('--ls-navh', (h || 72) + 'px');
    }

    sync();
    window.addEventListener('resize', sync);
    window.addEventListener('orientationchange', sync);
    if (window.ResizeObserver) new ResizeObserver(sync).observe(nav);
  }

  initStickyNav();
  initOdometer();
})();
