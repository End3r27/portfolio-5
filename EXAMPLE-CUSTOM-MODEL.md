# 🎯 Quick Example: Adding a Custom Car Model

## In 3 Steps!

### Step 1: Download a Free Model

Go to **Sketchfab**:
1. Visit: https://sketchfab.com/search?q=car&type=models
2. Click **Filters** → Check "Downloadable"
3. Find a car you like (example: "Tesla Model S" or "Sports Car")
4. Click **Download**
5. Select **glTF Binary (.glb)** format
6. Download the file

**Recommended searches:**
- "low poly car" (fast loading)
- "electric car" (matches theme)
- "sports car" (looks cool!)

### Step 2: Add to Project

Copy the downloaded file to your project:

```bash
# Copy your downloaded file here:
public/models/car.glb
```

**Windows Explorer:**
1. Find your downloaded `model.glb` file
2. Rename it to `car.glb`
3. Copy it to: `C:\Users\EnderKiller27YT\Desktop\portfolio-5\public\models\car.glb`

### Step 3: Update Landing Page

Open `app/page.tsx` and change this line:

**Find this:**
```tsx
import CarScene from "@/components/CarScene";
```

**Replace with:**
```tsx
import CarScene from "@/components/CarSceneWithModel";
```

**Then find this section:**
```tsx
<section data-scroll-section className="relative min-h-screen flex items-center justify-center bg-electric-dark">
  <CarScene />
```

**Replace with:**
```tsx
<section data-scroll-section className="relative min-h-screen flex items-center justify-center bg-electric-dark">
  <CarScene
    useCustomModel={true}
    modelPath="/models/car.glb"
    modelScale={1}
  />
```

### Step 4: Adjust Size (If Needed)

Your model might be too big or small. Try these values:

```tsx
// Model too small?
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={2}      // or 3, 5, 10
/>

// Model too big?
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={0.5}    // or 0.3, 0.1
/>
```

## Full Example Code

Here's the complete code for `app/page.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Zap,
  Battery,
  Gauge,
  Wind,
  Shield,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";
import CarScene from "@/components/CarSceneWithModel"; // ← CHANGED THIS LINE

// ... rest of your code ...

export default function Home() {
  // ... existing code ...

  return (
    <main ref={heroRef} className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        data-scroll-section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* ... hero content ... */}
      </motion.section>

      {/* 3D Car Showcase Section */}
      <section data-scroll-section className="relative min-h-screen flex items-center justify-center bg-electric-dark">
        {/* ← CHANGED THIS PART ↓ */}
        <CarScene
          useCustomModel={true}
          modelPath="/models/car.glb"
          modelScale={1.5}
          modelPosition={[0, 0, 0]}
        />
        {/* ← CHANGED THIS PART ↑ */}

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/60 mb-4"
          >
            Drag to rotate • Scroll to zoom
          </motion.p>
        </div>
      </section>

      {/* ... rest of your sections ... */}
    </main>
  );
}
```

## Common Adjustments

### Model is Backwards
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
  modelRotation={[0, Math.PI, 0]}  // ← Add this
/>
```

### Model is Upside Down
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
  modelRotation={[Math.PI, 0, 0]}  // ← Add this
/>
```

### Model is Too Low/High
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
  modelPosition={[0, 1, 0]}  // ← Move up
/>
```

## Testing

1. **Save your changes**
2. **Check the browser** at http://localhost:3000
3. **Scroll down** to the 3D showcase section
4. **See your custom model!** 🎉

## Switch Back to Geometric Car

If you want to go back to the geometric car:

```tsx
<CarScene
  useCustomModel={false}  // ← Set to false
/>
```

Or just change the import back:
```tsx
import CarScene from "@/components/CarScene";
```

## Troubleshooting

### "Model doesn't show"
1. Check file path: `public/models/car.glb`
2. Open browser console (F12) → Check for errors
3. Verify file size is under 10MB

### "Model is black/no textures"
- Download model again, select "Include textures"
- Use `.glb` format (not `.obj` or `.stl`)

### "Page loads slowly"
- Model is too big, compress it
- Use: https://gltf.report/ to optimize

### "Model looks weird"
- Try different scale: 0.5, 1, 2, 5
- Try rotation: `[0, Math.PI, 0]`
- Check model in online viewer first: https://gltf-viewer.donmccurdy.com/

## Recommended Free Models

### Good Starting Points:
1. **Sketchfab** → "low poly car" → Sort by downloads
2. Look for models under 5MB
3. Check license (most are free to use)

### Example Searches:
- "tesla model 3 free"
- "electric vehicle glb"
- "sports car low poly"
- "futuristic car"

## Multiple Models

Want different models on different pages?

**Homepage:**
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/sport.glb"
/>
```

**Models Page:**
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/suv.glb"
/>
```

**Configurator:**
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/sedan.glb"
/>
```

## That's It!

You now have a custom 3D car model on your site! 🚗⚡

**Need more help?** Check `3D-MODEL-GUIDE.md` for detailed info.

---

**Enjoy your custom model!** 💙
