# Zodiac Match

Static astrology compatibility experience deployed at <https://dopabrain.com/zodiac-match/>.

## Current contract

- Compare two of the 12 zodiac signs across romantic, friendship, and work themes.
- Scores and text come from local compatibility tables and traditional element associations.
- Detailed relationship notes are deterministic reflection prompts, not AI output or scientific assessment.
- Supports result-card sharing, PWA behavior, responsive layouts, and 12 locales.
- No rewarded-ad unlock, registration, or payment gate.

## Structure

- `index.html`: page structure, metadata, FAQ, and structured data.
- `js/app.js`: selection flow, result rendering, sharing, and analytics events.
- `js/zodiac-data.js`: compatibility tables and reflection copy.
- `js/i18n.js`, `js/locales/`: locale loading and translations.
- `css/style.css`: responsive presentation.
- `manifest.json`, `sw.js`: install and offline support.

The app has no build step. Serve the repository root over HTTP for local checks; do not open `index.html` directly because locale files are fetched at runtime.
