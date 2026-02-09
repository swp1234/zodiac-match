# Zodiac Match - Viral Compatibility Test

## Overview

**Zodiac Match** is a viral psychology test app that combines astrology and compatibility analysis. Users select their zodiac sign and their partner/friend's sign to get detailed compatibility scores across romantic, friendship, and work relationships.

This is a **Tier 2 Viral App** with high SNS sharing potential due to:
- Relationship-based content (partners/friends/colleagues)
- Visual results with beautiful cards for sharing
- Emotional engagement (everyone has a zodiac sign)
- Cross-cultural appeal (works globally with 12 languages)

## Live Demo

Access at: https://dopabrain.com/zodiac-match/

## Features

### Core Functionality
- **12 Zodiac Selection**: User selects their zodiac and another person's zodiac
- **Compatibility Matrix**: 12x12 matrix with pre-calculated compatibility scores
- **Multi-dimensional Analysis**:
  - Overall Score (0-100%)
  - Romantic Compatibility
  - Friendship Compatibility
  - Work Compatibility
- **Element-based Analysis**: Fire/Earth/Air/Water element compatibility
- **Detailed Text Analysis**:
  - Strengths of the pairing
  - Cautions to consider
  - Practical advice

### Viral Features
- **Beautiful Result Cards**: Canvas-based image generation for SNS sharing
- **Web Share API**: Direct share to WhatsApp, Messenger, Instagram, etc.
- **Open Graph Meta Tags**: Rich preview when shared on social media
- **Fallback Download**: Download card as PNG if Web Share API unavailable

### Premium Features (Ad-gated)
- **AI Deep Analysis**: Advanced relationship insights locked behind video ad view
  - Relationship Dynamics
  - Communication Style Analysis
  - Emotional Match Details
  - Growth Potential Assessment

### PWA (Progressive Web App)
- **Offline Support**: Service Worker caches all assets
- **App Installation**: Install on home screen like native app
- **Fast Loading**: Asset caching for instant loading
- **Mobile-optimized**: Responsive design for all devices

### Monetization
- **AdMob/AdSense Banners**: Top and bottom banner ads
- **Interstitial Ads**: Between test views (optional)
- **Premium Content**: "AI Deep Analysis" behind video ad wall
- **AdSense Ready**: Web-ready for adsense.google.com integration

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **PWA**: manifest.json, Service Worker (sw.js)
- **Internationalization**: Custom i18n system with 12 languages
- **Icons**: SVG (scalable to any size)
- **Analytics**: Google Analytics 4
- **Ads**: Google AdSense/AdMob

## File Structure

```
zodiac-match/
├── index.html              # Main HTML with 3 screens
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker for offline
├── css/
│   └── style.css           # Global styles + responsive design
├── js/
│   ├── app.js              # Main app logic & event handling
│   ├── zodiac-data.js      # Compatibility matrix & analysis data
│   ├── i18n.js             # Multi-language system
│   └── locales/            # 12 language JSON files
│       ├── ko.json         # Korean
│       ├── en.json         # English
│       ├── ja.json         # Japanese
│       ├── zh.json         # Chinese
│       ├── es.json         # Spanish
│       ├── pt.json         # Portuguese
│       ├── id.json         # Indonesian
│       ├── tr.json         # Turkish
│       ├── de.json         # German
│       ├── fr.json         # French
│       ├── hi.json         # Hindi
│       └── ru.json         # Russian
├── icon-192.svg            # PWA icon (192x192)
├── icon-512.svg            # PWA icon (512x512)
└── README.md               # This file
```

## Supported Languages (12)

| Code | Language | Priority |
|------|----------|----------|
| ko | 한국어 (Korean) | Primary |
| en | English | Essential |
| ja | 日本語 (Japanese) | High RPM |
| zh | 中文 (Chinese) | Large market |
| es | Español (Spanish) | 500M+ speakers |
| pt | Português (Portuguese) | Brazil focus |
| id | Bahasa Indonesia | 270M speakers |
| tr | Türkçe (Turkish) | Growing market |
| de | Deutsch (German) | High RPM |
| fr | Français (French) | Established |
| hi | हिन्दी (Hindi) | Large market |
| ru | Русский (Russian) | Established |

## Design System

### Colors (Dark Mode by Default)
```css
--primary: #8e44ad              /* Deep Purple */
--primary-light: #a55ec7
--primary-dark: #6c2e8a
--bg-dark: #0f0f23              /* Almost black */
--text-primary: #ffffff
--heart-red: #ff4757
```

### UI Components
- **Glassmorphism 2.0**: Subtle backdrop-filter for modern feel
- **Microinteractions**: Hover states, ripple effects, smooth animations
- **Accessibility**: 44px+ touch targets, sufficient color contrast
- **Mobile-First**: Responsive grid system

## Key Features Explained

### 1. Zodiac Selector Screen
- Two columns: "My Zodiac" and "Their Zodiac"
- 12 buttons per column (3x4 grid on mobile, maintains aspect)
- Selected state: Purple background with glow effect
- "Check Compatibility" button enabled only when both selected

### 2. Results Screen
- **Zodiac Display**: Large zodiac icons with names
- **Heart Gauge**: Animated heart-fill gauge for overall score
- **Mini Gauges**: Romantic, Friendship, Work compatibility
- **Element Card**: Element-based compatibility description
- **Analysis Sections**: Strengths, Cautions, Advice (context-specific)

### 3. Premium Analysis Modal
- Appears on "AI Deep Analysis" click
- Simulates ad view (real app: interstitial ad)
- Contains 4 sections of premium insights
- Close button to return to results

### 4. Canvas Card Generation
- Creates shareable image with:
  - Both zodiac names
  - Purple heart symbol
  - Overall compatibility score
  - Sub-scores (romantic, friendship, work)
  - Footer with dopabrain.com branding
- Supports Web Share API or fallback download

## Compatibility Data

### Matrix Structure
- 144 pairings (12 x 12)
- Each pairing contains:
  - Overall (0-100%)
  - Romantic (0-100%)
  - Friendship (0-100%)
  - Work (0-100%)

### Element Compatibility
- 4 elements: Fire, Earth, Air, Water
- 10 combination types (including same-element)
- Pre-written descriptions for each combination

### Analysis Database
- Key pairings: Aries-Leo, Aries-Sagittarius, Taurus-Capricorn, etc.
- Default analysis for unmapped combinations
- Contextual text for strengths, cautions, advice

## i18n Implementation

### Language Detection
1. Check localStorage for saved preference
2. Check browser language (navigator.language)
3. Fall back to English

### Language Switching
- Click globe icon → language menu
- 2x6 grid of language options
- Selection saved to localStorage
- UI updates instantly

### Translation Files
- JSON format with dot-notation keys
- Example: `zodiac.aries` → 양자리 (Korean)
- Consistent structure across all 12 files
- Easy to add new translations

## Analytics & Ad Integration

### Google Analytics 4
- Property ID: G-J8GSWM40TV
- Tracks: page views, events, user engagement
- Goal: Premium analysis views (conversion)

### Google AdSense
- Publisher ID: ca-pub-3600813755953882
- Two ad units (top/bottom banner)
- Ad-gated premium content

## SEO Optimization

### Meta Tags
- Descriptive title and meta description
- Open Graph tags for social sharing
- Twitter Card meta tags
- Schema.org WebApplication structured data

### Keywords
- 별자리 궁합, zodiac compatibility, astrology
- 별자리 테스트, zodiac test
- 궁합, match, compatibility

## Mobile Optimization

### Responsive Design
- **Mobile (480px)**: 2x6 zodiac grid, stacked layout
- **Tablet (768px)**: 3x4 zodiac grid
- **Desktop (1200px+)**: 3x4 zodiac grid, centered max-width

### Touch Targets
- All buttons: 44px minimum height/width
- Zodiac buttons: 100px+ minimum
- Language menu: 40px buttons

### Performance
- Service Worker caching
- No external dependencies
- Inline SVG icons
- Minified CSS/JS recommended

## Deployment Checklist

- [ ] Verify all 12 languages load correctly
- [ ] Test PWA installation on iOS/Android
- [ ] Test service worker (offline mode)
- [ ] Check AdSense integration
- [ ] Verify GA4 event tracking
- [ ] Test share functionality (Web Share API)
- [ ] Canvas image generation working
- [ ] Mobile responsive (360px-1920px)
- [ ] Dark mode displays correctly
- [ ] All zodiac data loaded and matching

## Future Enhancement Ideas

1. **Birth Date Auto-detection**: Input birth date → auto-select zodiac
2. **Daily Horoscope**: Date-seeded horoscope for user's zodiac
3. **Chinese Zodiac**: Combine Western + Chinese for deeper analysis
4. **Myers-Briggs Integration**: Cross-compatibility with personality types
5. **Love Language**: Add love language dimension
6. **Leaderboard**: Top compatible pairings
7. **Comparison History**: Save previous tests
8. **Animated Transitions**: More dynamic screen transitions

## Privacy & Legal

- No personal data collection (except localStorage language preference)
- No tracking of user zodiac selections
- AdSense/Analytics policies compliant
- Open Graph sharing meta tags don't identify users
- Zodiac data is public/general information

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (PWA partially on iOS)
- Mobile browsers: Full support
- IE11: Not supported

## Performance Metrics

- First Contentful Paint: <1s
- Largest Contentful Paint: <2s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <2s
- Cache efficiency: ~95% on return visits

## Contact & Support

- App URL: https://dopabrain.com/zodiac-match/
- Issue tracking: Internal GitHub repo
- Support: dev@dopabrain.com

---

**Zodiac Match** - Making astrology fun, social, and profitable. 💜
