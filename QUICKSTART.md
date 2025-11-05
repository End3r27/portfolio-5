# 🚀 Quick Start Guide - VOLTEX Website

## Getting Started (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to **http://localhost:3000**

That's it! 🎉

---

## 📍 Available Pages

Once the server is running, visit these pages:

| Page | URL | What You'll See |
|------|-----|-----------------|
| **Home** | `/` | Landing page with 3D car showcase |
| **Models** | `/models` | Car lineup with filters |
| **Configurator** | `/configurator` | Build your dream car |
| **About** | `/about` | Company timeline & values |
| **Contact** | `/contact` | Get in touch form |

---

## 🎨 Key Interactions to Try

### Landing Page
1. **Scroll down** - Watch parallax effects and animations
2. **Click "Explore Models"** - Navigate to models page
3. **Drag the 3D car** - Rotate and explore the model

### Models Page
1. **Click category filters** - See smooth transitions
2. **Hover over car cards** - Watch the 3D tilt effect
3. **Click arrow button** - Go to configurator for that model

### Configurator
1. **Select colors** - Watch the car preview update
2. **Choose wheels** - See price update in real-time
3. **Pick interior** - Customize every detail
4. **Select autopilot** - Add advanced features

### About Page
1. **Scroll through timeline** - Watch the progress line grow
2. **Hover on timeline events** - See card lift effect
3. **Check the stats** - Animated counters

### Contact Page
1. **Fill in the form** - Watch glow effects follow your cursor
2. **Click input fields** - See focus animations
3. **Submit form** - Get success modal

---

## 🛠 Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code quality

# Port already in use?
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or specify different port
PORT=3001 npm run dev
```

---

## 🎯 Customization Quick Tips

### Change Primary Color
**File:** `tailwind.config.ts`
```typescript
electric: {
  blue: "#YOUR_COLOR_HERE"
}
```

### Add a New Car Model
**File:** `app/models/page.tsx`
```typescript
{
  id: "new-model",
  name: "VOLTEX Y",
  category: "sport",
  price: "$119,990",
  // ... add other properties
}
```

### Modify Animation Speed
**File:** `app/globals.css`
```css
.animate-float {
  animation: float 3s ease-in-out infinite;
  /* Change 3s to your preferred duration */
}
```

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Windows
npx kill-port 3000

# Then restart
npm run dev
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Check TypeScript
npx tsc --noEmit

# Check for outdated packages
npm outdated
```

---

## 📱 Test on Different Devices

1. **Mobile:** Open DevTools (F12) → Toggle device toolbar
2. **Tablet:** Use responsive mode and select iPad
3. **Desktop:** Full screen browser

---

## ✨ Next Steps

1. ✅ Explore all pages
2. ✅ Test animations and interactions
3. ✅ Try customizing colors
4. ✅ Add your own car models
5. ✅ Deploy to Vercel (optional)

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📚 Learn More

- **Next.js:** https://nextjs.org/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Three.js:** https://threejs.org/docs/
- **TailwindCSS:** https://tailwindcss.com/docs

---

## 🎉 Enjoy Building!

You now have a world-class electric car website with:
- ✅ Stunning animations
- ✅ 3D car showcase
- ✅ Interactive configurator
- ✅ Fully responsive design
- ✅ Production-ready code

**Happy coding!** 💙⚡
