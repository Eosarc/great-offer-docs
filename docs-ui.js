/* Enhance native controls after initial render and client-side navigation. */
(() => {
  if (window.__greatOfferDocsUI) return;
  window.__greatOfferDocsUI = true;

  // The native assistant is disabled; its preview shortcut must stay inactive.
  window.addEventListener("keydown", (event) => {
    const assistantShortcut = (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "i";
    const assistantSearchResult = event.key === "Enter" && event.target.id === "search-input" &&
      document.querySelector('[data-search-item="item"][data-variant="assistant"][data-highlighted]');
    if (assistantShortcut || assistantSearchResult) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  const labels = {
    cn: ["上一页", "下一页"],
    en: ["Previous", "Next"],
    es: ["Anterior", "Siguiente"],
    fr: ["Précédent", "Suivant"],
    jp: ["前のページ", "次のページ"],
    ko: ["이전", "다음"],
  };

  function normalizeTitle() {
    const titleSuffix = " - Great Offer AI";
    if (document.title.endsWith(titleSuffix)) {
      document.title = document.title.slice(0, -titleSuffix.length) + " | Great Offer AI";
    }
  }

  function enhancePage() {
    normalizeTitle();
    const language = document.documentElement.lang.toLowerCase();
    const locale = language.startsWith("zh") ? "cn" : language === "ja" ? "jp" : language;
    const [previous, next] = labels[locale] || labels.en;

    for (const [part, text] of [["prev", previous], ["next", next]]) {
      const link = document.querySelector('#pagination [data-component-part="pagination-' + part + '"]');
      if (!link) continue;
      let label = link.querySelector('[data-component-part="pagination-label"]');
      if (!label) {
        label = document.createElement("span");
        label.dataset.componentPart = "pagination-label";
        link.append(label);
      }
      label.textContent = text;
    }

    const attribution = document.querySelector('#footer a[href*="mintlify.com"]');
    const text = attribution?.querySelector(":scope > span");
    if (!text) return;
    if (locale === "cn") {
      text.textContent = "由";
      let suffix = attribution.querySelector("[data-great-offer-attribution-suffix]");
      if (!suffix) {
        suffix = document.createElement("span");
        suffix.dataset.greatOfferAttributionSuffix = "";
        attribution.append(suffix);
      }
      suffix.textContent = "提供技术支持";
      attribution.dataset.greatOfferAttribution = "";
      attribution.setAttribute("aria-label", "由 Mintlify 提供技术支持");
    } else {
      // Mintlify supplies the translated attribution on language navigation.
      attribution.querySelector("[data-great-offer-attribution-suffix]")?.remove();
      delete attribution.dataset.greatOfferAttribution;
      attribution.removeAttribute("aria-label");
    }
  }

  enhancePage();
  window.addEventListener("mintlify:navigate", enhancePage);
  // Hosted metadata can settle after the page event. Observe only the small
  // document head so a late title update keeps the same brand separator.
  const titleObserver = new MutationObserver(normalizeTitle);
  titleObserver.observe(document.head, { childList: true, subtree: true, characterData: true });
})();
