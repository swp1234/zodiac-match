// i18n - Multi-language Support System

class I18n {
    constructor() {
        this.translations = {};
        this.supportedLanguages = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'id', 'tr', 'de', 'fr', 'hi', 'ru'];
        this.currentLang = this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        // Check localStorage
        const saved = localStorage.getItem('zodiac-match-lang');
        if (saved && this.supportedLanguages.includes(saved)) {
            return saved;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        // Default to English
        return 'en';
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updateUI();
        document.documentElement.lang = this.currentLang;
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`js/locales/${lang}.json`);
            if (response.ok) {
                this.translations = await response.json();
            } else {
                console.warn(`Could not load ${lang} translations`);
                // Fall back to English
                if (lang !== 'en') {
                    await this.loadTranslations('en');
                }
            }
        } catch (error) {
            console.error(`Error loading ${lang} translations:`, error);
        }
    }

    t(key) {
        const parts = key.split('.');
        let value = this.translations;

        for (let part of parts) {
            if (value && typeof value === 'object') {
                value = value[part];
            } else {
                return key; // Return key if translation not found
            }
        }

        return value || key;
    }

    async setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('zodiac-match-lang', lang);
        await this.loadTranslations(lang);
        this.updateUI();
        document.documentElement.lang = lang;
    }

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            element.textContent = translation;
        });

        // Update placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            element.placeholder = translation;
        });

        // Update title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            element.title = translation;
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    getLanguageName(lang) {
        const names = {
            'ko': '한국어',
            'en': 'English',
            'ja': '日本語',
            'zh': '中文',
            'es': 'Español',
            'pt': 'Português',
            'id': 'Bahasa Indonesia',
            'tr': 'Türkçe',
            'de': 'Deutsch',
            'fr': 'Français',
            'hi': 'हिन्दी',
            'ru': 'Русский'
        };
        return names[lang] || lang;
    }
}

// Initialize i18n globally
const i18n = new I18n();
