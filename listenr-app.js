/* Listenr app shell: damped scroll, glass tab bar, toast, reveals.
   Each page sets <body data-tab="home|bookings|listeners|profile">. */
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Focus rings only for keyboard users
  addEventListener('keydown', e => { if (e.key === 'Tab') document.documentElement.classList.add('kbd'); });
  addEventListener('pointerdown', () => document.documentElement.classList.remove('kbd'));

  // Damped scrolling: the page glides to a stop instead of halting
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, syncTouch: true, syncTouchLerp: 0.075, touchInertiaMultiplier: 28 });
    requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
  }
  const scrollTo = target => lenis
    ? lenis.scrollTo(target, { duration: 1.8, easing: t => 1 - Math.pow(1 - t, 4) })
    : target.scrollIntoView();

  // Tabs. Screens not built yet show a toast instead of navigating.
  const TABS = [
    { id: 'home', label: 'Home', icon: 'house', href: 'LISTENR.html' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar-check', href: 'LISTENR-bookings.html', badge: true },
    { id: 'listeners', label: 'Listeners', icon: 'users-three', href: 'LISTENR-listeners.html' },
    { id: 'profile', label: 'Me', icon: 'user-circle', href: 'LISTENR-profile.html' },
  ];

  const toastEl = document.createElement('div');
  toastEl.className = 'toast glass';
  toastEl.setAttribute('role', 'status');
  document.body.appendChild(toastEl);
  let toastTimer;
  function toast(text, icon = 'sparkle') {
    toastEl.innerHTML = `<i class="ph ph-${icon}"></i><span>${text}</span>`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  const bar = document.createElement('nav');
  bar.className = 'tabbar glass';
  bar.setAttribute('aria-label', 'App');
  bar.style.gridTemplateColumns = `repeat(${TABS.length}, 54px)`;
  const blob = document.createElement('span');
  blob.className = 'tab-blob';
  bar.appendChild(blob);

  // Labels stay hidden; tapping a tab shows its name above it for a moment.
  // When the tap opens another screen, the hint is handed over and plays there.
  let hintTimer;
  function hint(tab) {
    bar.querySelectorAll('.tab.hint').forEach(x => x !== tab && x.classList.remove('hint'));
    tab.classList.add('hint');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => tab.classList.remove('hint'), 1400);
  }
  const HINT_KEY = 'listenr-tab-hint';

  TABS.forEach(t => {
    const a = document.createElement('a');
    a.className = 'tab';
    a.dataset.tab = t.id;
    a.href = t.href || '#';
    a.setAttribute('aria-label', t.label);
    a.innerHTML = `<span class="ico"><i class="ph ph-${t.icon}"></i><i class="ph-fill ph-${t.icon}"></i>${t.badge ? '<span class="badge"></span>' : ''}</span><span class="tab-hint" aria-hidden="true">${t.label}</span>`;
    a.addEventListener('click', e => {
      if (t.href && document.body.dataset.tab !== t.id) { // real screen: let it navigate
        try { sessionStorage.setItem(HINT_KEY, t.id); } catch {}
        return;
      }
      e.preventDefault();
      hint(a);
      if (document.body.dataset.tab === t.id) { lenis ? lenis.scrollTo(0, { duration: 1.4 }) : scrollTo(document.body); return; }
      setActive(t.id);
      toast(`${t.label} is the next screen we build`, t.icon);
      setTimeout(() => setActive(document.body.dataset.tab), 1400);
    });
    bar.appendChild(a);
  });
  document.body.appendChild(bar);

  function setActive(id, instant) {
    const tab = bar.querySelector(`[data-tab="${id}"]`);
    if (!tab) return;
    bar.querySelectorAll('.tab').forEach(x => {
      x.classList.toggle('is-active', x === tab);
      x.toggleAttribute('aria-current', x === tab);
    });
    const inset = 4;
    const x = tab.offsetLeft + inset, w = tab.offsetWidth - inset * 2;
    if (instant) blob.style.transition = 'none';
    else if (!reduceMotion && blob._x != null && blob._x !== x) {
      // a little stretch while it travels, like a drop of liquid
      blob.animate({ scale: ['1 1', '1.18 .9', '1 1'] }, { duration: 700, easing: 'cubic-bezier(.45, 0, .2, 1)' });
    }
    blob.style.width = w + 'px';
    blob.style.transform = `translateX(${x}px)`;
    blob._x = x;
    if (instant) { blob.offsetWidth; blob.style.transition = ''; }
  }
  const place = () => setActive(document.body.dataset.tab || 'home', true);
  place();
  try {
    if (sessionStorage.getItem(HINT_KEY) === document.body.dataset.tab) {
      sessionStorage.removeItem(HINT_KEY);
      setTimeout(() => hint(bar.querySelector(`[data-tab="${document.body.dataset.tab}"]`)), 700); // once the bar has slid in
    }
  } catch {}
  addEventListener('resize', place);
  document.fonts?.ready.then(place);

  // Reveal on scroll, staggered within [data-stagger] groups
  document.querySelectorAll('[data-stagger]').forEach(g =>
    [...g.children].forEach((el, i) => el.style.setProperty('--i', i)));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // In-page anchors glide with the same damping
  document.querySelectorAll('a[href^="#"]:not(.tab)').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollTo(target);
  }));

  // Run a state change when an exit animation ends, with a timer backstop:
  // throttled or hidden pages can pause animations and never fire onfinish
  function afterAnim(anim, ms, fn) {
    let done = false;
    const run = () => { if (!done) { done = true; fn(); } };
    anim.onfinish = run;
    setTimeout(run, ms + 60);
  }

  window.Listenr = { lenis, toast, reduceMotion, scrollTo, afterAnim };
})();
