# 📍 Snap Scrolling Feature

## Overview

The website now features **intelligent snap scrolling** that automatically snaps to predefined sections when you stop scrolling, creating a smooth, magazine-like browsing experience.

## ✨ How It Works

### Automatic Section Snapping
- **Scroll normally** - The page scrolls smoothly
- **Stop scrolling** - After 150ms of inactivity, the page automatically snaps to the nearest section
- **Threshold-based** - Uses the middle of your viewport to determine the closest section

### Visual Indicators
- **Right-side dots** - Shows all available sections (desktop only)
- **Active indicator** - Highlighted dot shows your current section
- **Hover tooltips** - Shows section numbers when hovering over dots
- **Click navigation** - Click any dot to jump to that section

## 🎮 Navigation Methods

### 1. Mouse/Trackpad
- Scroll naturally up or down
- Release and wait 150ms for auto-snap

### 2. Keyboard Shortcuts
- `↓` or `Page Down` - Go to next section
- `↑` or `Page Up` - Go to previous section
- `Home` - Jump to first section
- `End` - Jump to last section

### 3. Scroll Indicators (Desktop)
- Click the dots on the right side
- Instant navigation to any section

### 4. Touch (Mobile/Tablet)
- Swipe normally
- Release to trigger auto-snap

## 🎯 Landing Page Sections

The home page has **6 snap points**:

1. **Hero Section** - Main landing with VOLTEX title
2. **3D Car Showcase** - Interactive car model
3. **Stats Section** - Performance numbers
4. **Features Section** - 6 feature cards
5. **CTA Section** - Configure your car

## 🛠 Technical Details

### Section Detection
Sections are detected using the `data-scroll-section` attribute:
```html
<section data-scroll-section>
  <!-- Content -->
</section>
```

### Snap Behavior
- **Delay:** 150ms after scroll stops
- **Duration:** 1.2s smooth animation
- **Easing:** Cubic bezier for natural feel
- **Threshold:** Middle of viewport (50% height)

### Components

#### SmoothScroll Component
- Lenis smooth scrolling
- Snap detection logic
- Keyboard navigation
- Section tracking

#### ScrollIndicator Component
- Visual dot navigation
- Current section highlighting
- Click-to-scroll functionality
- Responsive (hidden on mobile)

## 🎨 Customization

### Adjust Snap Delay
**File:** `components/SmoothScroll.tsx`

```typescript
// Change the timeout value (in milliseconds)
setTimeout(() => {
  // ... snap logic
}, 150); // Change this value
```

### Modify Snap Duration
**File:** `components/SmoothScroll.tsx`

```typescript
lenis.scrollTo(section, {
  offset: 0,
  duration: 1.2, // Change this (in seconds)
  // ...
});
```

### Change Threshold Position
**File:** `components/SmoothScroll.tsx`

```typescript
// Current: uses middle of viewport
const scrollPosition = window.scrollY + window.innerHeight / 2;

// Top third:
const scrollPosition = window.scrollY + window.innerHeight / 3;

// Bottom third:
const scrollPosition = window.scrollY + (window.innerHeight * 2) / 3;
```

### Hide Scroll Indicators
**File:** `components/ScrollIndicator.tsx`

```typescript
// Change the className to always hide:
className="fixed right-8 ... hidden"

// Or show on all devices:
className="fixed right-8 ... flex"
```

## 📱 Responsive Behavior

### Desktop (> 1024px)
- ✅ Scroll indicators visible
- ✅ Full snap behavior
- ✅ Keyboard shortcuts active

### Tablet (768px - 1024px)
- ❌ Scroll indicators hidden
- ✅ Full snap behavior
- ✅ Touch swipe support

### Mobile (< 768px)
- ❌ Scroll indicators hidden
- ✅ Full snap behavior
- ✅ Touch optimized

## 🚀 Adding Snap Scrolling to Other Pages

To add snap scrolling to any page:

### 1. Add Section Markers
```tsx
<section data-scroll-section className="min-h-screen">
  {/* Your content */}
</section>

<section data-scroll-section className="min-h-screen">
  {/* More content */}
</section>
```

### 2. That's It!
The SmoothScroll component automatically detects all sections with `data-scroll-section` on any page.

### Example: Models Page

```tsx
// app/models/page.tsx
export default function ModelsPage() {
  return (
    <main>
      <section data-scroll-section className="min-h-screen pt-32">
        {/* Hero */}
      </section>

      <section data-scroll-section className="min-h-screen">
        {/* Models Grid */}
      </section>

      <section data-scroll-section className="min-h-screen">
        {/* CTA */}
      </section>
    </main>
  );
}
```

## ⚙️ Configuration Options

### Disable Snap on Specific Pages

**File:** `components/SmoothScroll.tsx`

Add a prop to disable snapping:
```typescript
export default function SmoothScroll({
  children,
  enableSnap = true, // Add this prop
}: {
  children: React.ReactNode;
  enableSnap?: boolean;
}) {
  // Then wrap snap logic in:
  if (enableSnap) {
    // ... snap code
  }
}
```

Usage:
```tsx
<SmoothScroll enableSnap={false}>
  {children}
</SmoothScroll>
```

### Change Snap Sensitivity

More sensitive (snaps sooner):
```typescript
setTimeout(() => {
  // ... snap logic
}, 100); // Lower value = more sensitive
```

Less sensitive (allows more free scrolling):
```typescript
setTimeout(() => {
  // ... snap logic
}, 300); // Higher value = less sensitive
```

## 🐛 Troubleshooting

### Sections not snapping
- Make sure sections have `data-scroll-section` attribute
- Check that sections have sufficient height (`min-h-screen`)
- Verify SmoothScroll component is wrapping your content

### Snapping too aggressively
- Increase the timeout delay in SmoothScroll.tsx
- Increase snap duration for smoother transitions

### Indicators not showing
- Check viewport width (only shows on desktop)
- Verify ScrollIndicator is in layout.tsx
- Check z-index conflicts with other fixed elements

### Keyboard navigation not working
- Ensure SmoothScroll component is mounted
- Check browser console for errors
- Verify no other keyboard event listeners are blocking

## 💡 Best Practices

1. **Section Height** - Use `min-h-screen` for full-screen sections
2. **Content Balance** - Don't make sections too short or too long
3. **Mobile Consideration** - Test touch scrolling on real devices
4. **Performance** - Limit to 6-8 sections per page for best performance
5. **Accessibility** - Ensure keyboard navigation works smoothly

## 🎉 Features Summary

✅ Automatic section snapping after scroll stop
✅ Visual scroll indicators with active state
✅ Keyboard navigation support
✅ Touch-friendly on mobile
✅ Click-to-navigate dots
✅ Smooth animations with custom easing
✅ Threshold-based intelligent detection
✅ Works on all pages automatically
✅ Fully responsive
✅ Customizable timing and behavior

---

**Enjoy the smooth, magazine-like scrolling experience!** ⚡
