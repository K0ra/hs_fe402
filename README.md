# hs_fe402
Building a simple frontend and design for the HS course "Programming Interactivity"

A production-ready, accessible, and responsive portfolio website built with semantic HTML5, hand-crafted CSS3, and vanilla JavaScript.

## Features

### ✅ Semantic HTML5 Structure
- Proper use of `<header>`, `<main>`, `<section>`, `<footer>`, and ARIA landmarks
- Accessible navigation with `aria-` attributes
- SEO-optimized meta tags and Open Graph support

### ✅ Modern CSS3
- CSS Variables for easy customization
- Fluid typography using `clamp()`
- CSS Grid & Flexbox for responsive layouts
- Dark/Light mode support via `prefers-color-scheme`
- Smooth transitions and animations
- Mobile-first responsive design

### ✅ Vanilla JavaScript
- Mobile navigation toggle with accessibility features
- IntersectionObserver for scroll-triggered animations
- Smooth scroll behavior for anchor links
- Form validation ready
- Performance monitoring (development only)
- Keyboard navigation support

### ✅ Accessibility (WCAG 2.1 AA)
- Skip to content link
- Descriptive ARIA labels
- Keyboard navigable
- Focus visible states
- Sufficient color contrast
- Respects `prefers-reduced-motion`

### ✅ Sections Included
1. **Header** - Fixed navigation with mobile toggle
2. **Hero** - Full-screen hero with geometric background
3. **About** - Profile image, bio, and highlights
4. **Work** - Portfolio grid with 6 project cards
5. **Duo Image** - Asymmetrical two-image layout
6. **Contact** - Form and contact links
7. **Footer** - Copyright and utility links

## File Structure

```
public/
├── index.html    # Main HTML file with placeholder system
├── styles.css    # Complete CSS styling
├── app.js        # Vanilla JavaScript functionality
└── README.md     # This file
```

## Placeholder System

All editable content is marked with `{{PLACEHOLDER}}` syntax and inline `TODO:` comments:

### Navigation
- `{{SITE_NAME}}` - Your site/brand name
- `{{NAV_HOME}}`, `{{NAV_ABOUT}}`, `{{NAV_WORK}}`, `{{NAV_CONTACT}}` - Navigation labels

### Hero Section
- `{{HERO_TITLE}}` - Main headline
- `{{HERO_SUBTITLE}}` - Supporting text
- `{{PRIMARY_CTA_LABEL}}` - Call-to-action button text
- `{{PRIMARY_CTA_LINK}}` - CTA destination URL

### About Section
- `{{PROFILE_IMAGE_URL}}` - Your profile photo
- `{{PROFILE_IMAGE_ALT}}` - Descriptive alt text
- `{{SHORT_BIO}}` - Your bio (2-3 paragraphs)
- `{{HIGHLIGHT_1}}`, `{{HIGHLIGHT_2}}`, `{{HIGHLIGHT_3}}` - Key highlights
- `{{HIGHLIGHT_1_DESC}}`, etc. - Highlight descriptions

### Work Section
For each project (1-6):
- `{{PROJECT_TITLE_n}}` - Project name
- `{{PROJECT_DESC_n}}` - Brief description
- `{{PROJECT_IMAGE_n}}` - Project thumbnail
- `{{PROJECT_IMAGE_ALT_n}}` - Image alt text
- `{{PROJECT_LINK_n}}` - Project URL
- `{{PROJECT_TAG_n_1}}`, etc. - Technology tags

### Duo Image Section
- `{{DUO_HEADING}}` - Section heading
- `{{DUO_BODY}}` - Description text
- `{{IMAGE_LEFT_URL}}`, `{{IMAGE_RIGHT_URL}}` - Image sources
- `{{IMAGE_LEFT_ALT}}`, `{{IMAGE_RIGHT_ALT}}` - Alt text

### Contact Section
- `{{CONTACT_HEADING}}` - Section title
- `{{CONTACT_SUBTEXT}}` - Supporting text
- `{{CONTACT_EMAIL}}` - Your email address
- `{{CONTACT_LINKEDIN}}` - LinkedIn profile URL
- `{{CONTACT_GITHUB}}` - GitHub profile URL

### Footer
- `{{COPYRIGHT_NAME}}` - Your name for copyright
- `{{FOOTER_LINK_n_LABEL}}` - Footer link text
- `{{FOOTER_LINK_n_URL}}` - Footer link destination

### SEO
- `{{YOUR_NAME}}` - Your name for title tag
- `{{META_DESCRIPTION}}` - Meta description
- `{{OG_DESCRIPTION}}` - Open Graph description
- `{{YOUR_WEBSITE_URL}}` - Canonical URL
- `{{OG_IMAGE_URL}}` - Social share image

## Customization Guide

### 1. Replace Placeholders
Search for `{{` in `index.html` and replace all placeholders with your actual content.

### 2. Customize Colors
Edit CSS variables in `styles.css` (lines 23-36):

```css
:root {
  --color-bg: hsl(220, 15%, 10%);
  --color-accent: hsl(180, 60%, 50%);
  /* etc. */
}
```

### 3. Add Your Images
Replace placeholder image URLs with your actual images:
- Profile photo (square, 800x800px recommended)
- Project thumbnails (16:9 ratio, 1200x675px recommended)
- Duo section images (various aspect ratios)

### 4. Customize Typography
Modify font sizes in CSS variables or the fluid typography `clamp()` values.

### 5. Adjust Spacing
Edit spacing scale variables (lines 38-45 in `styles.css`).

## Animation System

### IntersectionObserver
Elements with `data-animate` attribute will animate when scrolled into view:

- `data-animate="fade-in"` - Fade in
- `data-animate="slide-up"` - Slide up
- `data-animate="reveal"` - Staggered reveal (for project cards)

### Delays
Add `data-animate-delay` to stagger animations:
```html
<div data-animate="fade-in" data-animate-delay="200">
```

## Accessibility Features

- **Skip to Content**: Press Tab on page load to access
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Indicators**: Visible focus outlines on all interactive elements
- **Reduced Motion**: Respects user's motion preferences

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

Optimized for 90+ Lighthouse scores:
- Semantic HTML for SEO
- Minimal JavaScript
- CSS-only animations
- Lazy loading images
- Optimized assets

## Form Handling

The contact form includes:
- Client-side validation
- Accessible labels and error states
- Submit handler (placeholder - implement backend)

To implement actual form submission:
1. Add backend endpoint
2. Update `initContactForm()` in `app.js`
3. Handle success/error states

## Development

No build process required! Simply:
1. Replace all `{{PLACEHOLDERS}}`
2. Add your images
3. Customize colors/spacing
4. Deploy to any static host

## Deployment

This portfolio is ready to deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Simply upload the `public/` directory contents.

## Lighthouse Score Goals

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100

## License

This scaffold is free to use for personal or commercial projects.

---

**Built with care** following modern web standards and best practices.
