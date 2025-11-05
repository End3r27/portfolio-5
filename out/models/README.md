# 🚗 3D Models Folder

## How to Add Your Custom Car Model

### Step 1: Get a Model
Download a `.glb` or `.gltf` 3D car model from:
- **Sketchfab**: https://sketchfab.com (search "car", filter by "Downloadable")
- **Poly Pizza**: https://poly.pizza
- **CGTrader**: https://www.cgtrader.com/free-3d-models

### Step 2: Add Model Here
Copy your model file to this folder:
```
public/models/
  ├── car.glb          ← Your main car model
  ├── sport-car.glb    ← Optional: different models
  └── suv.glb          ← Optional: more variations
```

### Step 3: Update Your Code
In your page where you use `<CarScene />`, update it:

```tsx
import CarSceneWithModel from "@/components/CarSceneWithModel";

// Then in your JSX:
<CarSceneWithModel
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
/>
```

## File Requirements

- **Format:** `.glb` (recommended) or `.gltf`
- **Size:** Under 10MB (5MB ideal)
- **Optimize:** Use https://gltf.report/ to check model

## Common Scale Values

If your model appears too big or small, adjust the scale:

```tsx
// Small model? Make it bigger
modelScale={2}

// Large model? Make it smaller
modelScale={0.5}

// Perfect size
modelScale={1}
```

## Common Rotation Values

If your model faces the wrong direction:

```tsx
// Rotate 180 degrees
modelRotation={[0, Math.PI, 0]}

// Rotate 90 degrees left
modelRotation={[0, Math.PI / 2, 0]}

// Rotate 90 degrees right
modelRotation={[0, -Math.PI / 2, 0]}
```

## Position Adjustments

If your model is off-center:

```tsx
// Move up
modelPosition={[0, 2, 0]}

// Move down
modelPosition={[0, -1, 0]}

// Move left/right
modelPosition={[2, 0, 0]}  // right
modelPosition={[-2, 0, 0]} // left
```

## Example Models to Try

### Free Car Models:
1. Search "low poly car glb" on Sketchfab
2. Search "electric car 3d model free"
3. Check Poly Pizza for simple car models

### Recommended:
- **Low-poly cars** (< 2MB) - Fast and smooth
- **Electric vehicles** - Fits your theme!
- **Sport cars** - Look amazing

## Full Example

```tsx
// In app/page.tsx
import CarSceneWithModel from "@/components/CarSceneWithModel";

<section className="relative min-h-screen">
  <CarSceneWithModel
    useCustomModel={true}           // Enable custom model
    modelPath="/models/tesla.glb"   // Your model path
    modelScale={1.5}                // Adjust size
    modelPosition={[0, -0.5, 0]}    // Adjust position
    modelRotation={[0, Math.PI, 0]} // Adjust rotation
  />
</section>
```

## Troubleshooting

### Model doesn't show?
1. Check file is in `public/models/`
2. Check console (F12) for errors
3. Verify file path is correct

### Model too big/small?
- Increase/decrease `modelScale`
- Try values: 0.5, 1, 2, 5, 10

### Model upside down?
- Use `modelRotation={[Math.PI, 0, 0]}`

### Model has no color?
- Download model with textures
- Use `.glb` format (includes textures)

## Need Help?

Check the full guide: `3D-MODEL-GUIDE.md` in the project root.

---

**Happy modeling!** 🚗⚡
