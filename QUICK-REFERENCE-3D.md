# 🚗 Quick Reference: 3D Models

## The Basics

### Current Setup
✅ Geometric car (built with code)
✅ Works out of the box
✅ No file needed

### Custom Model Setup
🎨 Real 3D car model
📁 Requires `.glb` file
🔧 Easy to customize

## File Locations

```
Your Project:
portfolio-5/
├── public/
│   └── models/
│       └── car.glb          ← Put your model here!
├── components/
│   ├── CarScene.tsx         ← Current (geometric)
│   └── CarSceneWithModel.tsx ← New (supports custom)
└── app/
    └── page.tsx             ← Update this to use custom
```

## Usage Cheat Sheet

### Option 1: Keep Geometric Car (Current)
```tsx
import CarScene from "@/components/CarScene";

<CarScene />
```
✅ No changes needed
✅ Already working

### Option 2: Use Custom Model
```tsx
import CarScene from "@/components/CarSceneWithModel";

<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1.5}
/>
```
🎨 Custom model
📁 Requires file in `public/models/`

### Option 3: Switch Between Both
```tsx
import CarScene from "@/components/CarSceneWithModel";

// Custom model
<CarScene useCustomModel={true} modelPath="/models/car.glb" />

// Geometric car
<CarScene useCustomModel={false} />
```

## Props Quick Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `useCustomModel` | boolean | `false` | Use custom `.glb` file? |
| `modelPath` | string | `"/models/car.glb"` | Path to your model |
| `modelScale` | number | `1` | Size multiplier |
| `modelPosition` | [x,y,z] | `[0,0,0]` | Position offset |
| `modelRotation` | [x,y,z] | `[0,0,0]` | Rotation angles |

## Common Scale Values

```tsx
modelScale={0.1}   // Tiny
modelScale={0.5}   // Small
modelScale={1}     // Normal
modelScale={2}     // Big
modelScale={5}     // Huge
modelScale={10}    // Gigantic
```

## Common Rotations

```tsx
// Rotate 180° (facing opposite)
modelRotation={[0, Math.PI, 0]}

// Rotate 90° right
modelRotation={[0, Math.PI / 2, 0]}

// Rotate 90° left
modelRotation={[0, -Math.PI / 2, 0]}

// Flip upside down
modelRotation={[Math.PI, 0, 0]}
```

## Common Positions

```tsx
// Move up
modelPosition={[0, 2, 0]}

// Move down
modelPosition={[0, -1, 0]}

// Move right
modelPosition={[2, 0, 0]}

// Move left
modelPosition={[-2, 0, 0]}

// Move forward
modelPosition={[0, 0, 2]}

// Move back
modelPosition={[0, 0, -2]}
```

## Where to Get Models

### Free Sources:
1. **Sketchfab** - https://sketchfab.com
   - Search: "car"
   - Filter: "Downloadable"
   - Format: "glTF Binary (.glb)"

2. **Poly Pizza** - https://poly.pizza
   - Simple, free models
   - Good for testing

3. **CGTrader** - https://cgtrader.com
   - Free section
   - High quality

### Search Tips:
- "low poly car" = Fast, small file
- "electric car" = Matches your theme
- "sports car" = Looks cool
- Add "free" to search

## File Requirements

✅ Format: `.glb` (best) or `.gltf`
✅ Size: Under 10MB (5MB ideal)
✅ Include: Textures embedded
❌ Avoid: `.obj`, `.stl`, `.fbx`

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Model doesn't show | Check file path & console (F12) |
| Too big/small | Adjust `modelScale` |
| Wrong direction | Use `modelRotation` |
| No textures | Download `.glb` with textures |
| Slow loading | Compress model (< 5MB) |
| Black model | Increase lighting |

## Step-by-Step Setup

### 1️⃣ Download Model
- Go to Sketchfab
- Search "car"
- Download as `.glb`

### 2️⃣ Add to Project
```bash
# Copy file to:
public/models/car.glb
```

### 3️⃣ Update Code
```tsx
// In app/page.tsx, change:
import CarScene from "@/components/CarScene";

// To:
import CarScene from "@/components/CarSceneWithModel";

// Then use:
<CarScene
  useCustomModel={true}
  modelPath="/models/car.glb"
  modelScale={1}
/>
```

### 4️⃣ Adjust & Enjoy!
- Too big? → Lower `modelScale`
- Too small? → Increase `modelScale`
- Wrong way? → Add `modelRotation`

## Examples

### Minimal (Default)
```tsx
<CarScene useCustomModel={true} />
```

### With Scale
```tsx
<CarScene
  useCustomModel={true}
  modelScale={2}
/>
```

### Full Control
```tsx
<CarScene
  useCustomModel={true}
  modelPath="/models/tesla.glb"
  modelScale={1.5}
  modelPosition={[0, -0.5, 0]}
  modelRotation={[0, Math.PI, 0]}
/>
```

## Testing Online

Before adding to your site, test models here:
- https://gltf-viewer.donmccurdy.com/
- Drag & drop your `.glb` file
- See how it looks!

## Documentation Files

- `3D-MODEL-GUIDE.md` - Full detailed guide
- `EXAMPLE-CUSTOM-MODEL.md` - Step-by-step example
- `public/models/README.md` - Quick folder guide
- This file - Quick reference

## Need Help?

1. Check browser console (F12)
2. Read error messages
3. Try smaller `modelScale` values
4. Test model in online viewer first
5. Check file is in correct location

---

**Happy 3D modeling!** 🚗⚡💙
