(() => {
  "use strict";

  const SIGNS = [
    ["aries", "♈", "fire"], ["taurus", "♉", "earth"], ["gemini", "♊", "air"], ["cancer", "♋", "water"],
    ["leo", "♌", "fire"], ["virgo", "♍", "earth"], ["libra", "♎", "air"], ["scorpio", "♏", "water"],
    ["sagittarius", "♐", "fire"], ["capricorn", "♑", "earth"], ["aquarius", "♒", "air"], ["pisces", "♓", "water"],
  ];
  const SIGN_MAP = new Map(SIGNS.map(([id, icon, element]) => [id, { icon, element }]));
  const ALLOWED_SURFACES = new Set(["direct", "zh_zodiac_guide_primary"]);
  const ALLOWED_TARGETS = new Set(["reaction_test", "iq_test", "blood_type_culture"]);

  class ZodiacPairCards {
    constructor() {
      this.first = document.getElementById("first-sign");
      this.second = document.getElementById("second-sign");
      this.openButton = document.getElementById("open-card");
      this.selection = document.getElementById("selection-screen");
      this.result = document.getElementById("result-screen");
      this.shareStatus = document.getElementById("share-status");
      this.started = false;
      this.opened = false;
      this.surface = this.getSurface();
      this.populateSigns();
      this.attachEvents();
      this.updateRelatedLinks();
      this.track("zodiac_pair_view", { content_language: this.language(), entry_surface: this.surface });
      if (new URLSearchParams(location.search).get("start") === "1") requestAnimationFrame(() => this.selection.scrollIntoView({ block: "start" }));
    }

    language() { return window.i18n?.getCurrentLanguage?.() || document.documentElement.lang || "en"; }
    getSurface() {
      const value = new URLSearchParams(location.search).get("surface") || "direct";
      return ALLOWED_SURFACES.has(value) ? value : "direct";
    }
    track(name, params = {}) {
      if (typeof window.gtag === "function") window.gtag("event", name, { event_category: "zodiac_pair", ...params });
    }
    t(key) { return window.i18n.t(key); }
    format(key, values) {
      return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), this.t(key));
    }

    populateSigns() {
      const selected = [this.first.value, this.second.value];
      [this.first, this.second].forEach((select, index) => {
        select.replaceChildren();
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = this.t("selection.placeholder");
        select.appendChild(placeholder);
        for (const [id, icon] of SIGNS) {
          const option = document.createElement("option");
          option.value = id;
          option.textContent = `${icon} ${this.t(`zodiac.${id}`)}`;
          select.appendChild(option);
        }
        select.value = selected[index] || "";
      });
      this.syncButton();
    }

    attachEvents() {
      [this.first, this.second].forEach(select => select.addEventListener("change", () => this.onChoice()));
      this.openButton.addEventListener("click", () => this.openCard());
      document.getElementById("back-button").addEventListener("click", () => this.restart());
      document.getElementById("share-button").addEventListener("click", () => this.share());
      document.querySelectorAll("#related-links [data-target-slug]").forEach((link, index) => link.addEventListener("click", () => {
        const target = link.dataset.targetSlug;
        if (ALLOWED_TARGETS.has(target)) this.track("zodiac_pair_related_click", { target_slug: target, target_rank: index + 1 });
      }));
      this.setupLanguageSelector();
    }

    onChoice() {
      this.syncButton();
      if (!this.started && (this.first.value || this.second.value)) {
        this.started = true;
        this.track("zodiac_pair_start", { content_language: this.language(), entry_surface: this.surface });
      }
    }
    syncButton() { this.openButton.disabled = !(this.first.value && this.second.value); }

    openCard() {
      if (!SIGN_MAP.has(this.first.value) || !SIGN_MAP.has(this.second.value)) return;
      this.renderCard();
      this.selection.hidden = true;
      this.result.hidden = false;
      this.shareStatus.textContent = "";
      if (!this.opened) {
        this.opened = true;
        this.track("zodiac_pair_open", { content_language: this.language(), entry_surface: this.surface });
      }
      this.result.scrollIntoView({ block: "start" });
      document.getElementById("back-button").focus({ preventScroll: true });
    }

    renderCard() {
      const firstName = this.t(`zodiac.${this.first.value}`);
      const secondName = this.t(`zodiac.${this.second.value}`);
      const firstElement = this.t(`elements.${SIGN_MAP.get(this.first.value).element}`);
      const secondElement = this.t(`elements.${SIGN_MAP.get(this.second.value).element}`);
      document.getElementById("pair-title").textContent = this.format("result.pair_title", { first: firstName, second: secondName });
      document.getElementById("pair-elements").textContent = this.format("result.elements", { first: firstElement, second: secondElement });
    }

    restart() {
      this.result.hidden = true;
      this.selection.hidden = false;
      this.shareStatus.textContent = "";
      this.track("zodiac_pair_restart");
      this.selection.scrollIntoView({ block: "start" });
      this.first.focus({ preventScroll: true });
    }

    updateRelatedLinks() {
      document.querySelectorAll("#related-links a").forEach(link => {
        const url = new URL(link.href, location.origin);
        url.searchParams.set("lang", this.language());
        link.href = url.pathname + url.search;
      });
    }

    setupLanguageSelector() {
      const toggle = document.getElementById("lang-toggle");
      const menu = document.getElementById("lang-menu");
      toggle.addEventListener("click", () => {
        const open = menu.hasAttribute("hidden");
        menu.toggleAttribute("hidden");
        toggle.setAttribute("aria-expanded", String(open));
      });
      menu.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", async () => {
        await window.i18n.setLanguage(button.dataset.lang);
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        this.populateSigns();
        this.updateRelatedLinks();
        if (!this.result.hidden) this.renderCard();
      }));
      document.addEventListener("click", event => {
        if (toggle.contains(event.target) || menu.contains(event.target)) return;
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    }

    shareUrl() {
      const url = new URL(location.origin + location.pathname);
      url.searchParams.set("lang", this.language());
      return url.toString();
    }
    async share() {
      const data = { title: this.t("share.title"), text: this.t("share.text"), url: this.shareUrl() };
      try {
        if (navigator.share) {
          await navigator.share(data);
          this.track("zodiac_pair_share", { method: "native" });
          this.shareStatus.textContent = this.t("share.success");
          return;
        }
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        this.track("zodiac_pair_share", { method: "clipboard" });
        this.shareStatus.textContent = this.t("share.copied");
      } catch (error) {
        if (error?.name !== "AbortError") this.shareStatus.textContent = this.t("share.error");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await window.i18n.ready;
      window.zodiacPairCards = new ZodiacPairCards();
    } finally {
      document.getElementById("app-loader")?.remove();
    }
  });
})();
