// Cliente para comportamiento del header: scrollspy, manejo de idioma y acciones CV
// Este archivo se importa como módulo en Layout.astro

function getCurrentLang(): string {
  const htmlLangAttr = document.documentElement.lang;
  const htmlLang: string = typeof htmlLangAttr === "string" ? htmlLangAttr : "";
  if (htmlLang !== "") {
    return htmlLang;
  }
  // fallback: infer from pathname (/es/ or /en/)
  const p: string = window.location.pathname;
  if (p.startsWith("/en")) {
    return "en";
  }
  return "es";
}

function setLangCookie(lang: string): void {
  document.cookie = "lang=" + lang + ";path=/;max-age=31536000";
}

function handleLangLinkClick(e: MouseEvent): void {
  const a = e.currentTarget as HTMLAnchorElement | null;
  if (a === null) {
    return;
  }
  const href = a.getAttribute("href");
  if (href === null || href === "") {
    return;
  }
  // Only intercept internal /es/ or /en/ links
  if (href === "/es/" || href === "/en/") {
    e.preventDefault();
    const lang = href === "/en/" ? "en" : "es";
    setLangCookie(lang);
    window.location.pathname = href;
  }
}

function handleCvLinkClick(e: MouseEvent): void {
  const a = e.currentTarget as HTMLAnchorElement | null;
  if (a === null) {
    return;
  }
  const href = a.getAttribute("href");
  if (href === null || href === "") {
    return;
  }
  // If it's a download link (/assets/cv.pdf) let native download proceed but ensure cookie
  const lang = getCurrentLang();
  setLangCookie(lang);
  // If it's an internal view link, let it navigate (cookie set)
}

function initScrollSpy(): void {
  const sectionIds = ["sobremi", "experiencia", "proyectos", "contacto"];
  const options = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.target.id) {
        return;
      }
      const id = entry.target.id;
      const isVisible = entry.isIntersecting;
      // links that contain '#id' in href
      const selector = `header a[href*="#${id}"]`;
      const links = document.querySelectorAll(selector);
      links.forEach(function (link) {
        if (isVisible) {
          link.classList.add("text-blue-400", "font-bold");
        } else {
          link.classList.remove("text-blue-400", "font-bold");
        }
      });
    });
  }, options);

  sectionIds.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      observer.observe(el);
    }
  });
}

// Inicialización en DOMContentLoaded
window.addEventListener("DOMContentLoaded", function () {
  // Scrollspy
  initScrollSpy();

  // Lang links (desktop dropdown & mobile menu)
  const langLinks = document.querySelectorAll<HTMLAnchorElement>(
    'header a[href="/es/"], header a[href="/en/"]'
  );
  langLinks.forEach(function (a) {
    a.addEventListener("click", handleLangLinkClick as EventListener);
  });

  // CV links (desktop & mobile)
  const cvLinks = document.querySelectorAll<HTMLAnchorElement>(
    'header a[href*="/cv/"], header a[href*="/assets/cv.pdf"]'
  );
  cvLinks.forEach(function (a) {
    a.addEventListener("click", handleCvLinkClick as EventListener);
  });
});
