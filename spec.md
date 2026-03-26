# Momo, I'm Sorry

## Current State
New project — no existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full single-page romantic apology website addressed to "Momo" from "Avesh"
- Hero section: full-screen with floating hearts, heading "I'm Truly Sorry ❤️", subtext "I never meant to hurt you, Momo…", CTA button "Please Read My Heart"
- Apology section: heartfelt letter referencing 2+ years together; animated text reveal
- Love messages section: ~100 short messages in floating bubbles / scrolling grid
- Emotion/quotes section: soft romantic quotes with floating particle animations
- Final message section: closing emotional message with beating heart animation, signed by Avesh
- Interactive "Forgive Me?" button: shows thank-you message and triggers hearts/confetti on click
- Music toggle button: soft romantic instrumental (using a free royalty-free audio URL or generated audio)
- Fully responsive, mobile-friendly
- Smooth scroll between sections
- All custom animations (no template libraries)

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Single React page (App.tsx) with all sections as components
2. Use Google Fonts: Dancing Script (headings), Lora (body)
3. Floating hearts background: CSS keyframe animation, randomized positions
4. Apology letter text with staggered fade-in on scroll (Intersection Observer)
5. Love messages: array of ~100 messages rendered as floating bubbles + scrolling marquee
6. Emotion quotes with CSS particle animation
7. Beating heart: CSS scale pulse keyframe
8. Forgive Me button: React state toggle + confetti via canvas-confetti or CSS hearts burst
9. Music: HTML5 audio element with a free romantic piano URL, muted autoplay or toggle
10. Tailwind for layout; custom CSS animations in index.css
