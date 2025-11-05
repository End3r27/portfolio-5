# 🎯 How to Enable Your Custom 3D Model

## Current Status: ✅ Ready for Custom Models!

Your site is now configured to support custom 3D car models. By default, it still shows the geometric car. Follow these simple steps to use your own model:

## Quick Setup (2 Minutes)

### Step 1: Add Your Model File

1. Download a `.glb` car model from [Sketchfab](https://sketchfab.com/search?q=car&type=models) (filter by "Downloadable")
2. Save/rename it as `car.glb`
3. Copy it to: `public/models/car.glb`

**Windows Path:**
```
C:\Users\EnderKiller27YT\Desktop\portfolio-5\public\models\car.glb
```

### Step 2: Enable Custom Model

Open `app/page.tsx` and find this line (around line 218):

**Change this:**
```tsx
<CarScene
  useCustomModel={false}    // ← Change this to true
  modelPath="/models/car.glb"
  modelScale={1.5}
/>
```

**To this:**
```tsx
<CarScene
  useCustomModel={true}     // ← Changed to true!
  modelPath="/models/car.glb"
  modelScale={1.5}
/>
```

### Step 3: Save and Refresh

1. Save the file (Ctrl+S)
2. Refresh your browser at http://localhost:3000
3. Your custom model will appear! 🎉

---

## Adjusting Your Model

### If Model is Too Small:
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={3}        // Try 2, 3, 5, or 10
/>
```

### If Model is Too Big:
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={0.5}      // Try 0.5, 0.3, or 0.1
/>
```

### If Model Faces Wrong Way:
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
  modelRotation={[0, Math.PI, 0]}  // Rotate 180°
/>
```

### If Model is Too Low/High:
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
  modelPosition={[0, 1, 0]}  // Move up
/>
```

---

## Code Location Reference

**File to edit:** `app/page.tsx`

**Section:** Around line 215-221

**Look for:**
```tsx
{/* 3D Car Showcase Section */}
<section data-scroll-section className="relative min-h-screen...">
  <CarScene
    useCustomModel={false}  // ← This line!
    modelPath="/models/car.glb"
    modelScale={1.5}
  />
```

---

## Troubleshooting

### Model doesn't show?
1. Check file is at: `public/models/car.glb`
2. Check `useCustomModel={true}` in code
3. Press F12 → Check Console for errors
4. Try refreshing the page

### Model is wrong size?
- Adjust `modelScale` value
- Start with 1, then try 0.5, 2, 5, 10

### Model has no color?
- Make sure you downloaded with textures
- Use `.glb` format (not `.obj` or `.stl`)

### Still not working?
1. Check `3D-MODEL-GUIDE.md` for detailed help
2. Try testing model at https://gltf-viewer.donmccurdy.com/
3. Make sure file size is under 10MB

---

## Switch Back to Geometric Car

To go back to the geometric car:

```tsx
<CarScene
  useCustomModel={false}  // ← Set to false
  modelPath="/models/car.glb"
  modelScale={1.5}
/>
```

---

## That's It!

You're all set up! Just add your model file and change one word in the code from `false` to `true`.

**Need more help?** Check these files:
- `EXAMPLE-CUSTOM-MODEL.md` - Full example
- `QUICK-REFERENCE-3D.md` - Quick lookup
- `3D-MODEL-GUIDE.md` - Complete guide

---

**Happy modeling!** 🚗⚡💙
