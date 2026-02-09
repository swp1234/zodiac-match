# Zodiac Match - Deployment Guide

## Quick Start

### Local Testing
```bash
# Navigate to project
cd /e/Fire Project/projects/zodiac-match

# Start local server
python -m http.server 8000

# Open browser
http://localhost:8000
```

### File Structure Check
```
zodiac-match/
✓ index.html              (main app, ~450 lines)
✓ manifest.json           (PWA config)
✓ sw.js                   (service worker)
✓ css/style.css           (responsive design)
✓ js/app.js               (main logic)
✓ js/zodiac-data.js       (144 compatibility pairings)
✓ js/i18n.js              (language system)
✓ js/locales/             (12 language JSON files)
✓ icon-192.svg            (PWA icon)
✓ icon-512.svg            (PWA icon)
```

---

## Step-by-Step Deployment

### 1. Prepare Web Server

**Required Configuration:**
- HTTPS (mandatory for Service Worker, Web Share API)
- Gzip compression enabled (CSS/JS/JSON)
- Cache headers configured
- SPA routing fallback to index.html

**Nginx Example:**
```nginx
server {
    listen 443 ssl http2;
    server_name dopabrain.com;

    # SSL certificates
    ssl_certificate /etc/ssl/zodiac-match.crt;
    ssl_certificate_key /etc/ssl/zodiac-match.key;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Root directory
    root /var/www/zodiac-match;
    index index.html;

    # Cache headers
    location ~* \.(js|css)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.json$ {
        expires 7d;
        add_header Cache-Control "public";
    }

    location ~* \.(svg|png|ico)$ {
        expires 90d;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

**Apache Example:**
```apache
<Directory /var/www/zodiac-match>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]

    # Cache headers
    <FilesMatch "\.(js|css)$">
        Header set Cache-Control "public, max-age=2592000, immutable"
    </FilesMatch>

    <FilesMatch "\.json$">
        Header set Cache-Control "public, max-age=604800"
    </FilesMatch>

    # GZIP
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/css application/json
    </IfModule>
</Directory>
```

### 2. Upload Files

**FTP/SFTP:**
```bash
sftp user@dopabrain.com
cd /var/www/zodiac-match
put -r ./*
exit
```

**Git Deployment (Recommended):**
```bash
# On server, clone repository
cd /var/www
git clone https://github.com/your-repo/zodiac-match.git
cd zodiac-match
git pull origin master
```

### 3. Google AdSense Setup

#### Add to Meta Tags
```html
<!-- In index.html <head> -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3600813755953882" crossorigin="anonymous"></script>
```

#### Verify Site Ownership
1. Go to AdSense account
2. Add site: dopabrain.com/zodiac-match/
3. Verify through meta tag or DNS
4. Wait 24-48 hours for approval

#### Monitor Ad Performance
- AdSense Dashboard → Performance Reports
- Check for policy violations
- Monitor RPM trends
- Optimize ad placement if needed

### 4. Google Analytics 4 Setup

#### Create GA4 Property
1. Go to Google Analytics
2. Create new Property: "Zodiac Match"
3. Copy Property ID: `G-J8GSWM40TV`
4. Add to index.html (already configured)

#### Set Up Conversion Events
```javascript
// Track premium analysis views
gtag('event', 'view_promotion', {
    'promotion_id': 'premium_analysis',
    'promotion_name': 'AI Deep Analysis',
    'value': 1,
    'currency': 'KRW'
});

// Track share events
gtag('event', 'share', {
    'method': 'web_share_api',
    'content_type': 'zodiac_card'
});
```

#### Set Up Goals
- **Goal 1**: Premium Analysis View (conversion)
- **Goal 2**: Share Button Click (engagement)
- **Goal 3**: Language Switch (retention indicator)

### 5. Test Deployment

#### Critical Tests
- [ ] Homepage loads without HTTPS warnings
- [ ] All 12 language files load
- [ ] Service worker registers (F12 → Application → Service Workers)
- [ ] Offline mode works (disable network, reload)
- [ ] PWA installable (desktop: Chrome menu → Install app)
- [ ] AdSense ads display (check for policy violations)
- [ ] GA4 events tracking
- [ ] Share button works (click "Share Card")
- [ ] Canvas image generation works
- [ ] Mobile responsive (test on 360px, 480px, 768px)
- [ ] Touch targets 44px+ (use Chrome DevTools)
- [ ] Dark mode displays correctly
- [ ] All zodiac icons render

#### Browser Testing
```
✓ Chrome (latest)
✓ Firefox (latest)
✓ Safari (latest)
✓ Edge (latest)
✓ Chrome Mobile (Android)
✓ Safari Mobile (iOS)
```

#### Performance Testing
```bash
# Lighthouse audit
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+
```

### 6. SEO Optimization

#### Meta Tags (Already in place)
- Title: ✓ 별자리 궁합 테스트
- Description: ✓ Descriptive text
- OG:image: ✓ icon-512.svg
- OG:url: ✓ https://dopabrain.com/zodiac-match/

#### Structured Data (Schema.org)
```json
{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zodiac Match Test",
    ...
}
```

#### Sitemap & Robots.txt
```
robots.txt:
User-agent: *
Allow: /
Sitemap: https://dopabrain.com/sitemap.xml

sitemap.xml:
<url>
    <loc>https://dopabrain.com/zodiac-match/</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
</url>
```

### 7. Monitoring & Maintenance

#### Daily Monitoring
- Check server error logs
- Monitor uptime (use UptimeRobot)
- Verify AdSense ads serving

#### Weekly Review
- AdSense revenue trends
- GA4 user metrics
- Traffic sources
- User feedback

#### Monthly Tasks
- Update compatibility data if needed
- Review and respond to user feedback
- Check browser compatibility
- Update translations if new languages added
- Back up database (if added)

### 8. Domain & DNS

#### DNS Setup (if new domain)
```dns
# A Record
zodiac-match.dopabrain.com A 1.2.3.4

# CNAME (if using CDN)
www A 1.2.3.4
cdn CNAME cdn.provider.com
```

#### SSL Certificate
- Use Let's Encrypt (free)
- Or purchase from trusted CA
- Auto-renewal recommended

---

## Performance Optimization

### Image Optimization
- SVG icons: ✓ Already optimal
- No raster images (all SVG)
- Canvas-generated PNGs: Compressed on-the-fly

### Code Minification
```bash
# Install minifier
npm install -g html-minifier terser clean-css-cli

# Minify for production
html-minifier --collapse-whitespace index.html -o index.min.html
terser js/app.js -c -m -o js/app.min.js
cleancss css/style.css -o css/style.min.css
```

### Caching Strategy
```javascript
// Service Worker implements:
// 1. Cache first for assets (js, css, svg)
// 2. Network first for JSON files (locales)
// 3. Network first for ads/analytics
```

### CDN Integration (Optional)
```
Files to CDN:
- css/style.css
- js/app.js
- js/zodiac-data.js
- js/i18n.js
- icon-192.svg
- icon-512.svg
- js/locales/*.json
```

---

## Troubleshooting

### Issue: Service Worker not registering
**Solution:**
- Ensure HTTPS is enabled
- Check browser console for errors
- Clear browser cache
- Test in incognito mode

### Issue: Languages not loading
**Solution:**
- Verify file paths in js/locales/
- Check browser Network tab for 404 errors
- Ensure correct JSON format (valid JSON)
- Test fetch in console: `fetch('js/locales/en.json')`

### Issue: AdSense not showing
**Solution:**
- Verify publisher ID is correct
- Wait 24-48 hours for approval
- Check AdSense policy violations
- Ensure ads div IDs are unique
- Test with browser ad blocker disabled

### Issue: Share button not working
**Solution:**
- Ensure HTTPS enabled
- Test in supported browser (Chrome, Firefox, Edge)
- Check Web Share API availability
- Canvas image generation might fail on some Android browsers

### Issue: Mobile app not installing
**Solution:**
- Verify manifest.json is valid
- Ensure icons exist (192x192, 512x512)
- Check for HTTPS
- Try Chrome on Android, Safari on iOS
- Clear app cache if upgrading

---

## Version Control

### Git Workflow
```bash
# Development
git checkout -b feature/new-feature
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature

# Merge to master
git checkout master
git merge feature/new-feature
git push origin master

# Tag release
git tag v1.0.0
git push origin v1.0.0
```

### Release Notes Format
```markdown
# v1.0.0 - Initial Release

## Features
- Zodiac compatibility test
- 12 language support
- PWA support
- AdSense integration

## Fixes
- Minor UI adjustments

## Performance
- Service worker caching
- Optimized CSS

## Known Issues
- PWA install on iOS limited
```

---

## Rollback Procedure

### If Critical Issue Found
```bash
# Identify previous stable version
git log --oneline

# Rollback to previous commit
git revert <commit-hash>
git push origin master

# Or reset to specific version
git checkout v0.9.0
git push origin master -f
```

---

## Post-Launch Checklist

- [ ] Site accessible via HTTPS
- [ ] All languages load correctly
- [ ] Offline mode works (service worker)
- [ ] PWA installable on mobile
- [ ] AdSense ads displaying
- [ ] GA4 tracking events
- [ ] Share functionality working
- [ ] Performance score 90+
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation complete
- [ ] Team trained on maintenance

---

## Contact & Support

- **Developer**: Sang-woo (상우)
- **Email**: dev@dopabrain.com
- **Status Page**: https://status.dopabrain.com

---

*Last Updated: 2026-02-10*
*Version: 1.0.0 - Production Ready*
