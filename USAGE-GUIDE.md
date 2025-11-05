# 🎯 Snap Scrolling Usage Guide

## Quick Start

Open http://localhost:3000 and try these actions:

### 1️⃣ Scroll Naturally
- Use your **mouse wheel** or **trackpad**
- Scroll up or down as you normally would
- **Stop scrolling** and wait ~150ms
- The page will **automatically snap** to the nearest section! ✨

### 2️⃣ Use Keyboard Shortcuts
Press these keys to navigate:

| Key | Action |
|-----|--------|
| `↓` | Next section |
| `↑` | Previous section |
| `Page Down` | Next section |
| `Page Up` | Previous section |
| `Home` | First section |
| `End` | Last section |

### 3️⃣ Click the Dots (Desktop Only)
Look at the **right side** of your screen:
- You'll see **glowing dots**
- Each dot = one section
- **Active dot** = where you are now (electric blue glow)
- **Click any dot** = jump to that section instantly!
- **Hover over dots** = see section number tooltip

### 4️⃣ Touch Gestures (Mobile/Tablet)
- **Swipe up/down** naturally
- **Release** your finger
- Page **auto-snaps** to closest section

## 📍 Sections on Landing Page

The home page has **6 main sections**:

```
┌─────────────────────────────────┐
│ 1. Hero Section                 │  ← "VOLTEX The Future"
├─────────────────────────────────┤
│ 2. 3D Car Showcase             │  ← Interactive car model
├─────────────────────────────────┤
│ 3. Stats Section               │  ← 500+ miles, 2.1s, etc.
├─────────────────────────────────┤
│ 4. Features Section            │  ← 6 feature cards
├─────────────────────────────────┤
│ 5. CTA Section                 │  ← "Ready to Experience"
└─────────────────────────────────┘
```

## 🎨 Visual Cues

### What to Look For:

1. **Right-Side Dots** (Desktop)
   - Small circles on the right edge
   - One dot per section
   - Active = large + glowing blue
   - Inactive = small + gray

2. **Smooth Snap Animation**
   - Page glides to section (1.2s)
   - Eases in and out naturally
   - Feels like turning a magazine page

3. **Scroll Indicator at Bottom**
   - Shows "Drag to rotate • Scroll to zoom" on 3D section

## ⚙️ How It Works

### The Magic Behind the Scenes:

1. **You scroll** 🖱️
2. **You stop** ⏸️
3. **Wait 150ms** ⏱️
4. **System calculates** which section is closest to middle of screen 🎯
5. **Page smoothly snaps** to that section 🎪
6. **Dot indicator updates** 💙

### Threshold Detection:
- Uses **middle of viewport** (50% height) as reference point
- Measures distance from each section
- Snaps to the **closest one**

## 💡 Pro Tips

### Tip 1: Keyboard is Fastest
Use `↓` and `↑` keys for instant, precise navigation between sections.

### Tip 2: Click Dots to Jump
Skip multiple sections by clicking dots on the right.

### Tip 3: Free Scrolling Before Snap
You have 150ms of free scrolling before auto-snap kicks in. Use this to fine-tune your position.

### Tip 4: Override Snap
Keep scrolling actively to prevent auto-snap. It only triggers when you **stop** scrolling.

### Tip 5: Mobile Swipe
On mobile, quick swipes let you skip sections faster.

## 🐛 Expected Behavior

### ✅ Normal:
- Brief pause before snap (150ms)
- Smooth gliding animation
- Dots update as you scroll
- Keyboard navigation instant

### ❌ Not Normal:
- Page jumps without animation
- Dots don't update
- Keyboard shortcuts don't work
- Snap happens while actively scrolling

If you experience "Not Normal" behavior, refresh the page!

## 🎯 Examples

### Example 1: Scroll Down Three Sections
1. Start at top (Hero)
2. Scroll down past 3D showcase
3. Stop at Features section
4. Page snaps perfectly to Features! ✨

### Example 2: Jump to End
1. Press `End` key
2. Instantly at CTA section
3. Dot indicator shows last position

### Example 3: Browse with Dots
1. Click 3rd dot
2. Jumps to Stats section
3. Hover over 5th dot
4. See "Section 5" tooltip
5. Click to jump there

## 📱 Device-Specific Features

### Desktop (> 1024px)
- ✅ Scroll indicators visible
- ✅ Keyboard shortcuts
- ✅ Hover tooltips on dots
- ✅ Mouse wheel scrolling

### Tablet (768px - 1024px)
- ❌ No scroll indicators
- ✅ Touch swipe gestures
- ✅ Full snap behavior

### Mobile (< 768px)
- ❌ No scroll indicators
- ✅ Optimized touch scrolling
- ✅ Full snap behavior
- ✅ Works with single finger swipe

## 🎪 Try This Now!

### Exercise 1: Full Page Tour
1. Go to http://localhost:3000
2. Press `↓` key 5 times
3. You'll visit all sections in order
4. Watch the dots light up as you go!

### Exercise 2: Random Navigation
1. Click the 3rd dot
2. Then click the 1st dot
3. Then press `End` key
4. Feel the smooth transitions!

### Exercise 3: Free Scroll Test
1. Scroll down slowly
2. Stop between sections
3. Watch it snap to closest one
4. Try again, stopping at different points

## 🚀 Advanced Usage

### For Developers:

#### Add Snap to Any Page:
```tsx
<section data-scroll-section className="min-h-screen">
  {/* Your content */}
</section>
```

#### Customize Snap Timing:
Edit `components/SmoothScroll.tsx`:
```typescript
setTimeout(() => {
  // snap logic
}, 150); // Change this number (ms)
```

#### Change Snap Speed:
```typescript
lenis.scrollTo(section, {
  duration: 1.2, // Change this (seconds)
  // ...
});
```

## 🎉 Enjoy!

The snap scrolling creates a **premium, magazine-like experience** that makes your site feel polished and intentional.

**Have fun exploring!** ⚡💙

---

**Need help?** Check `SNAP-SCROLLING.md` for technical details.
