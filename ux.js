const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });

  setupRevealOnScroll();
  setupNavTracking();
  setupSmoothAnchorScroll();
});

function setupRevealOnScroll() {
  const revealItems = document.querySelectorAll('.reveal-on-scroll');

  if (!revealItems.length) {
    return;
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -6% 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupSmoothAnchorScroll() {
  const header = document.querySelector('.site-header');
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();

      const headerOffset = header ? header.offsetHeight + 10 : 0;
      const targetY = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });
}

function setupNavTracking() {
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const sectionMap = navLinks
    .map((link) => {
      const selector = link.getAttribute('href');
      if (!selector || !selector.startsWith('#')) {
        return null;
      }

      const section = document.querySelector(selector);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sectionMap.length) {
    return;
  }

  const updateActiveLink = () => {
    const markerY = window.scrollY + window.innerHeight * 0.22;

    let active = sectionMap[0].link;

    sectionMap.forEach(({ link, section }) => {
      if (section.offsetTop <= markerY) {
        active = link;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link === active);
    });
  };

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink);
}
