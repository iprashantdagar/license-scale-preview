/* License & Scale — runtime for isolated GHL hybrid Custom Code blocks. */
(function () {
  var blocks = document.querySelectorAll('.ls-block');
  if (!blocks.length) return;
  var base = (window.LS_ASSET_BASE || '').replace(/\/$/, '');

  function assetUrl(src) {
    if (base && src && src.indexOf('assets/') === 0) {
      return base + '/' + src.slice(7);
    }
    return src;
  }

  function playYouTube(button) {
    if (!button || button.classList.contains('is-playing')) return;
    var id = button.getAttribute('data-yt');
    if (!id) return;
    var start = button.getAttribute('data-yt-start');
    var src =
      'https://www.youtube.com/embed/' +
      id +
      '?autoplay=1&rel=0&modestbranding=1';
    if (start) src += '&start=' + encodeURIComponent(start);
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = button.getAttribute('aria-label') || 'Video';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    button.appendChild(iframe);
    button.classList.add('is-playing');
  }

  blocks.forEach(function (root) {
    root.querySelectorAll('[data-bg]').forEach(function (element) {
      var src = assetUrl(element.getAttribute('data-bg'));
      if (!src) return;
      element.style.setProperty('--img', 'url("' + src + '")');
      element.classList.add('is-set');
    });
    root.querySelectorAll('img[src^="assets/"]').forEach(function (image) {
      image.src = assetUrl(image.getAttribute('src'));
    });

    root.querySelectorAll('.video[data-yt]').forEach(function (button) {
      button.addEventListener('click', function () {
        playYouTube(button);
      });
    });
    root.querySelectorAll('[data-yt-play]').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        var id = trigger.getAttribute('data-yt-play');
        var button = root.querySelector('.video[data-yt="' + id + '"]');
        if (button) playYouTube(button);
      });
    });

    var rail = root.querySelector('[data-ls-rail]');
    if (rail) {
      var slides = rail.querySelectorAll('.result');
      var dots = root.querySelectorAll('[data-ls-dots] button');
      var previous = root.querySelector('[data-ls-prev]');
      var next = root.querySelector('[data-ls-next]');
      function step() {
        return slides.length > 1
          ? slides[1].offsetLeft - slides[0].offsetLeft
          : rail.clientWidth;
      }
      function index() {
        return Math.round(rail.scrollLeft / step());
      }
      function goTo(position) {
        rail.scrollTo({
          left:
            Math.max(0, Math.min(position, slides.length - 1)) * step(),
          behavior: 'smooth',
        });
      }
      if (previous) {
        previous.addEventListener('click', function () {
          goTo(index() - 1);
        });
      }
      if (next) {
        next.addEventListener('click', function () {
          goTo(index() + 1);
        });
      }
      dots.forEach(function (dot, dotIndex) {
        dot.addEventListener('click', function () {
          goTo(dotIndex);
        });
      });
      rail.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          goTo(index() + 1);
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goTo(index() - 1);
        }
      });
      rail.addEventListener(
        'scroll',
        function () {
          var current = index();
          dots.forEach(function (dot, dotIndex) {
            if (dotIndex === current) {
              dot.setAttribute('aria-current', 'true');
            } else {
              dot.removeAttribute('aria-current');
            }
          });
          if (previous) previous.classList.toggle('is-on', current > 0);
          if (next) {
            next.classList.toggle('is-on', current < slides.length - 1);
          }
        },
        { passive: true }
      );
    }

    var lightbox = root.querySelector('[data-ls-lightbox]');
    var lightboxImage = lightbox
      ? lightbox.querySelector('[data-ls-lightbox-image]')
      : null;
    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      if (lightboxImage) lightboxImage.removeAttribute('src');
      document.documentElement.style.overflow = '';
    }
    root.querySelectorAll('.shot[data-zoom]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = assetUrl(button.getAttribute('data-zoom'));
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.documentElement.style.overflow = 'hidden';
      });
    });
    if (lightbox) {
      var close = lightbox.querySelector('[data-ls-lightbox-close]');
      if (close) close.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) closeLightbox();
      });
    }

    var revealItems = root.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      revealItems.forEach(function (element) {
        observer.observe(element);
      });
    } else {
      revealItems.forEach(function (element) {
        element.classList.add('is-in');
      });
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    document
      .querySelectorAll('.ls-block [data-ls-lightbox].is-open')
      .forEach(function (lightbox) {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        var image = lightbox.querySelector('[data-ls-lightbox-image]');
        if (image) image.removeAttribute('src');
      });
    document.documentElement.style.overflow = '';
  });
})();
