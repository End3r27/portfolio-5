# VOLTEX - Electric Car Website 🚗⚡

A stunning, futuristic electric vehicle website built with Next.js, featuring advanced animations, 3D car showcases, and an immersive user experience.

## ✨ Features

- **Snap Scrolling** - Intelligent section snapping with threshold detection and visual indicators (NEW!)
- **Cinematic Landing Page** - Hero section with smooth parallax scrolling and floating particle animations
- **3D Car Showcase** - Interactive Three.js car model with ambient lighting and rotation controls + Custom model support (.glb/.gltf)
- **Interactive Configurator** - Real-time car customization with color, wheels, interior, and autopilot options
- **Models Gallery** - Filterable car lineup with animated category transitions and 3D hover effects
- **About Timeline** - Animated company history with scroll-triggered timeline animations
- **Contact Form** - Beautiful form with cursor-following glow effects and smooth validation
- **Smooth Scrolling** - Buttery smooth scrolling experience with Lenis + Auto-snap to sections
- **Glassmorphism UI** - Modern glass-effect cards with electric blue accent colors
- **Keyboard Navigation** - Arrow keys, Page Up/Down, Home/End for section navigation
- **Scroll Indicators** - Visual dots showing current section with click navigation
- **Fully Responsive** - Optimized for all devices from mobile to desktop

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:**
  - Framer Motion (component animations)
  - GSAP (scroll-triggered animations)
  - Lenis (smooth scrolling)
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Icons:** Lucide React
- **Fonts:** Inter, Orbitron (Google Fonts)

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
portfolio-5/
├── app/                      # Next.js app directory
│   ├── about/               # About page with timeline
│   ├── configurator/        # Car configurator page
│   ├── contact/             # Contact form page
│   ├── models/              # Models gallery page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with navigation
│   └── page.tsx             # Landing page
├── components/              # Reusable components
│   ├── CarScene.tsx         # 3D car showcase
│   ├── Footer.tsx           # Footer component
│   ├── Navbar.tsx           # Navigation bar
│   └── SmoothScroll.tsx     # Smooth scroll wrapper
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Color Palette

- **Electric Blue:** `#00D9FF` - Primary accent color
- **Cyan:** `#0FF0FC` - Secondary accent
- **Purple:** `#B026FF` - Gradient accent
- **Dark:** `#0A0A0F` - Background
- **Darker:** `#050508` - Deep background

### Typography

- **Display Font:** Orbitron (headings, logo)
- **Body Font:** Inter (content, UI)

### Animation Principles

- **Duration:** 0.6-0.8s for most transitions
- **Easing:** Custom easing curves for smooth motion
- **Stagger:** 0.1-0.15s delay between animated items
- **Hover Effects:** Scale (1.05), translateY (-10px)

## 🎯 Key Features Explained

### 3D Car Showcase

The `CarScene.tsx` component uses Three.js to render a fully interactive 3D car model with:
- Auto-rotation for continuous motion
- Orbit controls for user interaction
- Dynamic lighting with electric blue accents
- Realistic metallic materials and reflections
- Animated headlights and taillights
- **NEW:** Support for custom `.glb`/`.gltf` models

**Want to use your own 3D model?** See:
- `3D-MODEL-GUIDE.md` - Complete guide
- `EXAMPLE-CUSTOM-MODEL.md` - Quick setup
- `QUICK-REFERENCE-3D.md` - Cheat sheet

### Configurator

Real-time car customization with:
- 6 exterior color options with gradient previews
- 4 wheel upgrade options
- 4 interior themes
- 3 autopilot packages
- Live price calculation
- Animated selection indicators

### Smooth Scroll

Using Lenis for physics-based smooth scrolling:
- Configurable duration and easing
- Wheel and touch multipliers
- Seamless integration with GSAP ScrollTrigger

## 🌟 Animation Highlights

1. **Hero Section** - GSAP timeline with staggered title/subtitle entrance
2. **Feature Cards** - Scroll-triggered fade-in with stagger effect
3. **Timeline** - Animated progress line that fills on scroll
4. **Form Fields** - Glow effect that follows cursor movement
5. **Stats Counter** - Scale animation with bounce effect
6. **Navigation** - Slide-in mobile menu with backdrop blur

## 📱 Responsive Design

- **Mobile (< 768px):** Single column layouts, hamburger menu
- **Tablet (768px - 1024px):** 2-column grids, optimized spacing
- **Desktop (> 1024px):** Full 3-4 column layouts, enhanced animations

## 🔧 Customization

### Adding New Car Models

Edit `app/models/page.tsx`:

```typescript
const carModels: CarModel[] = [
  {
    id: "your-model-id",
    name: "VOLTEX X",
    category: "sport",
    price: "$99,990",
    // ... other properties
  },
];
```

### Changing Theme Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  electric: {
    blue: "#00D9FF",    // Your color here
    cyan: "#0FF0FC",
    purple: "#B026FF",
  }
}
```

### Modifying Animations

Adjust timing in `app/globals.css`:

```css
.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

## 🚀 Performance Optimization

- **Code Splitting:** Automatic route-based splitting with Next.js
- **Image Optimization:** Next.js Image component with lazy loading
- **Font Optimization:** Variable fonts with display swap
- **Animation Performance:** GPU-accelerated transforms
- **Bundle Size:** Tree-shaking with ES modules

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a showcase project. Feel free to fork and customize for your own use!

## 📝 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

- Design inspiration: Tesla, Rimac, Porsche
- 3D graphics: Three.js community
- Animation tutorials: Framer Motion & GSAP documentation

---

Built with 💙 by Rylee

**Experience the Future of Electric Mobility**
