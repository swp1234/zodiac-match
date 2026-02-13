// Zodiac Match - Main Application

class ZodiacMatchApp {
    constructor() {
        this.myZodiac = null;
        this.theirZodiac = null;
        this.selectedZodiacs = { my: null, their: null };
        this.init();
    }

    async init() {
        try {
            // Initialize theme
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
            }

            if (window.i18n && typeof i18n.init === 'function') {
                await i18n.init();
            }
        } catch (e) {
            console.warn('i18n init failed:', e);
        }
        this.setupEventListeners();
        this.setupStarfield();
        this.hideAppLoader();
    }

    hideAppLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 400);
        }
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'dark';
                const next = current === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
            });
        }

        // Language selector
        const langToggle = document.getElementById('lang-toggle');
        const langMenu = document.getElementById('lang-menu');
        const langOptions = document.querySelectorAll('.lang-option');

        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });

        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                i18n.setLanguage(lang);
                langMenu.classList.add('hidden');
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-controls')) {
                langMenu.classList.add('hidden');
            }
        });

        // Zodiac selector buttons
        const zodiacBtns = document.querySelectorAll('.zodiac-btn');
        let isMySideActive = true;

        let engageFired = false;
        zodiacBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                // GA4 engagement on first interaction
                if (!engageFired) {
                    engageFired = true;
                    if (typeof gtag === 'function') {
                        gtag('event', 'engagement', { event_category: 'zodiac_match', event_label: 'first_interaction' });
                    }
                }
                const zodiac = btn.getAttribute('data-zodiac');

                if (index < 12) {
                    // First column (my zodiac)
                    document.querySelectorAll('.zodiac-btn').forEach((b, i) => {
                        if (i < 12) b.classList.remove('selected');
                    });
                    btn.classList.add('selected');
                    this.selectedZodiacs.my = zodiac;
                    isMySideActive = true;
                } else {
                    // Second column (their zodiac)
                    document.querySelectorAll('.zodiac-btn').forEach((b, i) => {
                        if (i >= 12) b.classList.remove('selected');
                    });
                    btn.classList.add('selected');
                    this.selectedZodiacs.their = zodiac;
                    isMySideActive = false;
                }

                this.updateCheckButton();
            });
        });

        // Check compatibility button
        const checkBtn = document.getElementById('check-btn');
        checkBtn.addEventListener('click', () => {
            if (this.selectedZodiacs.my && this.selectedZodiacs.their) {
                this.showResults();
            }
        });

        // Results screen buttons
        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
            this.showSelector();
        });

        const premiumBtn = document.getElementById('premium-btn');
        premiumBtn.addEventListener('click', () => {
            this.showPremiumAnalysis();
        });

        const closePremiumBtn = document.getElementById('close-premium');
        const closePremiumBtn2 = document.getElementById('close-premium-btn');
        closePremiumBtn.addEventListener('click', () => {
            this.hidePremiumAnalysis();
        });
        closePremiumBtn2.addEventListener('click', () => {
            this.hidePremiumAnalysis();
        });

        const shareBtn = document.getElementById('share-btn');
        shareBtn.addEventListener('click', () => {
            this.generateAndShareCard();
        });
    }

    setupStarfield() {
        const starfield = document.getElementById('starfield');
        const starCount = 50;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = Math.random() * 2 + 'px';
            star.style.height = star.style.width;
            star.style.backgroundColor = '#ffffff';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
            star.style.animationDelay = Math.random() * 3 + 's';

            starfield.appendChild(star);
        }

        // Add CSS animation if not exists
        if (!document.querySelector('style[data-stars]')) {
            const style = document.createElement('style');
            style.setAttribute('data-stars', 'true');
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateCheckButton() {
        const checkBtn = document.getElementById('check-btn');
        if (this.selectedZodiacs.my && this.selectedZodiacs.their) {
            checkBtn.disabled = false;
        } else {
            checkBtn.disabled = true;
        }
    }

    showSelector() {
        const selectorScreen = document.getElementById('selector-screen');
        const resultsScreen = document.getElementById('results-screen');

        selectorScreen.classList.add('active');
        resultsScreen.classList.remove('active');
    }

    showResults() {
        const selectorScreen = document.getElementById('selector-screen');
        const resultsScreen = document.getElementById('results-screen');

        // Get compatibility data
        const compatibility = getCompatibility(this.selectedZodiacs.my, this.selectedZodiacs.their);
        const analysis = getAnalysisData(this.selectedZodiacs.my, this.selectedZodiacs.their);
        const element1 = getElement(this.selectedZodiacs.my);
        const element2 = getElement(this.selectedZodiacs.their);
        const elementDesc = getElementCompatibilityDescription(element1, element2);

        // Update zodiac displays
        this.updateZodiacDisplay('my');
        this.updateZodiacDisplay('their');

        // Update scores with animation
        this.animateScore('overall-gauge', 'overall-score', compatibility.overall);
        this.animateScore('romantic-gauge', 'romantic-score', compatibility.romantic);
        this.animateScore('friendship-gauge', 'friendship-score', compatibility.friendship);
        this.animateScore('work-gauge', 'work-score', compatibility.work);

        // Update analysis text
        document.getElementById('element-text').textContent = elementDesc;
        document.getElementById('strengths-text').textContent = analysis.strengths;
        document.getElementById('cautions-text').textContent = analysis.cautions;
        document.getElementById('advice-text').textContent = analysis.advice;

        // Switch screens
        selectorScreen.classList.remove('active');
        resultsScreen.classList.add('active');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    updateZodiacDisplay(side) {
        const zodiac = side === 'my' ? this.selectedZodiacs.my : this.selectedZodiacs.their;
        const zodiacData = ZODIACS[zodiac];

        const displayElement = document.getElementById(`${side}-zodiac-display`);
        const nameElement = document.getElementById(`${side}-zodiac-name`);

        // Update SVG color
        displayElement.querySelector('circle').style.stroke = zodiacData.color;
        const paths = displayElement.querySelectorAll('path');
        paths.forEach(path => {
            path.style.stroke = zodiacData.color;
            path.style.fill = zodiacData.color;
        });

        nameElement.textContent = i18n.t(`zodiac.${zodiac}`);
    }

    animateScore(gaugeId, scoreId, targetValue) {
        const gauge = document.getElementById(gaugeId);
        const scoreText = document.getElementById(scoreId);

        let currentValue = 0;
        const increment = targetValue / 30;
        const interval = 30;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }

            gauge.style.width = currentValue + '%';
            scoreText.textContent = Math.round(currentValue) + '%';
        }, interval);
    }

    showPremiumAnalysis() {
        const resultsScreen = document.getElementById('results-screen');
        const premiumScreen = document.getElementById('premium-screen');

        // Simulate showing ad - in real app, you'd show actual ad
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                'value': 1,
                'currency': 'KRW',
                'items': [{
                    'id': 'premium_analysis',
                    'quantity': 1
                }]
            });
        }

        const analysis = getAnalysisData(this.selectedZodiacs.my, this.selectedZodiacs.their);

        // Generate premium content
        const premiumDynamics = this.generatePremiumContent('dynamics', this.selectedZodiacs.my, this.selectedZodiacs.their);
        const premiumCommunication = this.generatePremiumContent('communication', this.selectedZodiacs.my, this.selectedZodiacs.their);
        const premiumEmotional = this.generatePremiumContent('emotional', this.selectedZodiacs.my, this.selectedZodiacs.their);
        const premiumGrowth = this.generatePremiumContent('growth', this.selectedZodiacs.my, this.selectedZodiacs.their);

        document.getElementById('premium-dynamics').textContent = premiumDynamics;
        document.getElementById('premium-communication').textContent = premiumCommunication;
        document.getElementById('premium-emotional').textContent = premiumEmotional;
        document.getElementById('premium-growth').textContent = premiumGrowth;

        resultsScreen.classList.remove('active');
        premiumScreen.classList.add('active');
    }

    hidePremiumAnalysis() {
        const resultsScreen = document.getElementById('results-screen');
        const premiumScreen = document.getElementById('premium-screen');

        premiumScreen.classList.remove('active');
        resultsScreen.classList.add('active');
    }

    generatePremiumContent(type, zodiac1, zodiac2) {
        const zodiacData1 = ZODIACS[zodiac1];
        const zodiacData2 = ZODIACS[zodiac2];
        const compatibility = getCompatibility(zodiac1, zodiac2);

        const contents = {
            dynamics: `${zodiacData1.name} brings ${zodiacData1.element} energy to the relationship, while ${zodiacData2.name} brings ${zodiacData2.element} energy. With an overall compatibility of ${compatibility.overall}%, your relationship dynamics are influenced by these elemental forces. Your natural roles complement each other, creating a balanced dynamic where each partner's strengths offset the other's weaknesses.`,

            communication: `Communication between you flows with a ${compatibility.romantic}% romantic synchronicity. ${zodiacData1.name} tends to express feelings through ${zodiacData1.element === 'fire' ? 'passionate intensity' : zodiacData1.element === 'air' ? 'intellectual discussion' : zodiacData1.element === 'water' ? 'emotional vulnerability' : 'practical action'}, while ${zodiacData2.name} prefers ${zodiacData2.element === 'fire' ? 'bold directness' : zodiacData2.element === 'air' ? 'thoughtful dialogue' : zodiacData2.element === 'water' ? 'intuitive understanding' : 'honest practicality'}. Learning to bridge these communication styles will deepen your connection.`,

            emotional: `Emotionally, your connection shows ${compatibility.romantic}% romantic compatibility. You share ${zodiacData1.element === zodiacData2.element ? 'the same elemental foundation, giving you natural emotional understanding' : 'complementary emotional needs that can create balance'}. ${zodiacData1.name} ${zodiacData1.element === 'water' ? 'feels deeply' : 'approaches emotions thoughtfully'}, while ${zodiacData2.name} ${zodiacData2.element === 'water' ? 'values emotional depth' : 'appreciates clarity'}. This creates opportunities for meaningful emotional growth together.`,

            growth: `The potential for growth together is substantial. Your ${compatibility.work}% work compatibility suggests you can achieve great things as a team. Both of you have lessons to teach and learn from each other. The key is embracing your differences as opportunities for expansion rather than sources of conflict. Your relationship is a journey of mutual evolution and transformation.`
        };

        return contents[type] || 'Discover deeper insights about your connection.';
    }

    generateAndShareCard() {
        const canvas = document.getElementById('share-canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 600;
        canvas.height = 800;

        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 800);

        // Zodiac names
        const zodiac1Data = ZODIACS[this.selectedZodiacs.my];
        const zodiac2Data = ZODIACS[this.selectedZodiacs.their];
        const compatibility = getCompatibility(this.selectedZodiacs.my, this.selectedZodiacs.their);

        // Title
        ctx.fillStyle = '#a55ec7';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(i18n.t('app.title'), 300, 80);

        // Zodiac names
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(i18n.t(`zodiac.${this.selectedZodiacs.my}`), 150, 200);

        // Heart
        ctx.fillStyle = '#ff4757';
        ctx.font = 'bold 48px sans-serif';
        ctx.fillText('💜', 300, 260);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(i18n.t(`zodiac.${this.selectedZodiacs.their}`), 450, 200);

        // Compatibility score
        ctx.fillStyle = '#ff8fab';
        ctx.font = 'bold 64px sans-serif';
        ctx.fillText(compatibility.overall + '%', 300, 380);

        ctx.fillStyle = '#b0b0b0';
        ctx.font = '20px sans-serif';
        ctx.fillText(i18n.t('results.overallScore'), 300, 420);

        // Compatibility types
        ctx.fillStyle = '#a55ec7';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'left';

        const types = [
            [`${i18n.t('results.romantic')}: ${compatibility.romantic}%`, 80],
            [`${i18n.t('results.friendship')}: ${compatibility.friendship}%`, 480],
            [`${i18n.t('results.work')}: ${compatibility.work}%`, 580]
        ];

        types.forEach(([text, y]) => {
            ctx.fillText(text, 100, y);
        });

        // Footer
        ctx.fillStyle = '#8e44ad';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('dopabrain.com - Zodiac Match', 300, 750);

        // Convert to image and share
        canvas.toBlob((blob) => {
            if (navigator.share && navigator.canShare({ files: [new File([blob], 'zodiac-match.png', { type: 'image/png' })] })) {
                navigator.share({
                    title: i18n.t('app.title'),
                    text: `${i18n.t(`zodiac.${this.selectedZodiacs.my}`)} & ${i18n.t(`zodiac.${this.selectedZodiacs.their}`)} - ${compatibility.overall}% 궁합!`,
                    files: [new File([blob], 'zodiac-match.png', { type: 'image/png' })]
                }).catch(err => console.log('Share failed:', err));
            } else {
                // Fallback: download image
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'zodiac-match.png';
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    }
}

// GA4 engagement tracking (scroll + timer)
(function() {
    let scrollFired = false;
    window.addEventListener('scroll', function() {
        if (!scrollFired && window.scrollY > 100) {
            scrollFired = true;
            if (typeof gtag === 'function') gtag('event', 'scroll_engagement', { engagement_type: 'scroll' });
        }
    }, { passive: true });
    setTimeout(function() {
        if (typeof gtag === 'function') gtag('event', 'timer_engagement', { engagement_time_msec: 5000 });
    }, 5000);
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new ZodiacMatchApp();
});
