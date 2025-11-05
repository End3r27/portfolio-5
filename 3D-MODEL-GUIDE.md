# 🚗 Adding Custom 3D Car Models

## Quick Overview

You can replace the geometric car with a real 3D model in `.glb` or `.gltf` format.

## 📁 Step 1: Get Your 3D Model

### Where to Find Free Car Models:

1. **Sketchfab** (https://sketchfab.com)
   - Search "car" with "Downloadable" filter
   - Look for models with Creative Commons license
   - Download as `.glb` format

2. **Poly Pizza** (https://poly.pizza)
   - Free 3D models
   - Easy downloads

3. **CGTrader** (https://www.cgtrader.com)
   - Free section available
   - High-quality models

4. **TurboSquid** (https://www.turbosquid.com)
   - Free models section

### Recommended Format:
- **Best:** `.glb` (single file, optimized)
- **Alternative:** `.gltf` (with separate textures)

### File Size:
- Keep under **10MB** for fast loading
- Under **5MB** is ideal

## 📂 Step 2: Add Model to Your Project

1. **Create models folder:**
```bash
mkdir public/models
```

2. **Copy your model file:**
```
public/
  └── models/
      └── car.glb  ← Your 3D car model here
```

## 🔧 Step 3: Update CarScene Component

I'll create an updated version that supports custom models!

### Option A: Simple Model Loader

Replace the entire car mesh code with:

```typescript
import { useGLTF } from "@react-three/drei";

function Car() {
  const { scene } = useGLTF("/models/car.glb");
  const carRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={carRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
}
```

### Option B: With Scale Control

```typescript
function Car({ modelPath = "/models/car.glb", scale = 1 }) {
  const { scene } = useGLTF(modelPath);
  const carRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={carRef}>
      <primitive object={scene} scale={scale} position={[0, 0, 0]} />
    </group>
  );
}
```

## 🎨 Step 4: Adjust Scale and Position

Your model might be too big/small or off-center:

### Scale Issues:
```typescript
// Too small?
<primitive object={scene} scale={2} />

// Too big?
<primitive object={scene} scale={0.5} />

// Scale per axis
<primitive object={scene} scale={[2, 2, 2]} />
```

### Position Issues:
```typescript
// Move up/down (Y)
<primitive object={scene} position={[0, 1, 0]} />

// Move left/right (X)
<primitive object={scene} position={[2, 0, 0]} />

// Move forward/back (Z)
<primitive object={scene} position={[0, 0, -1]} />
```

### Rotation Issues:
```typescript
// Rotate 180 degrees
<primitive
  object={scene}
  rotation={[0, Math.PI, 0]}
/>

// Rotate 90 degrees
<primitive
  object={scene}
  rotation={[0, Math.PI / 2, 0]}
/>
```

## 🎯 Complete Updated CarScene Component

Here's a complete version with fallback:

```typescript
"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Model loader with error handling
function CustomCarModel({
  modelPath = "/models/car.glb",
  scale = 1
}: {
  modelPath?: string;
  scale?: number;
}) {
  try {
    const { scene } = useGLTF(modelPath);
    const carRef = useRef<THREE.Group>(null);

    useFrame((state) => {
      if (carRef.current) {
        carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      }
    });

    return (
      <group ref={carRef}>
        <primitive
          object={scene}
          scale={scale}
          position={[0, 0, 0]}
        />
      </group>
    );
  } catch (error) {
    console.error("Failed to load car model:", error);
    return <GeometricCar />; // Fallback to geometric car
  }
}

// Your existing geometric car as fallback
function GeometricCar() {
  // ... existing geometric car code
}

export default function CarScene({
  useCustomModel = true,
  modelPath = "/models/car.glb",
  modelScale = 1
}: {
  useCustomModel?: boolean;
  modelPath?: string;
  modelScale?: number;
}) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 3, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <Suspense fallback={<LoadingFallback />}>
          {useCustomModel ? (
            <CustomCarModel modelPath={modelPath} scale={modelScale} />
          ) : (
            <GeometricCar />
          )}
          <Environment preset="night" />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.9} roughness={0.1} />
        </mesh>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
```

## 🚀 Usage Examples

### In your page:
```tsx
// Use custom model
<CarScene
  useCustomModel={true}
  modelPath="/models/tesla.glb"
  modelScale={1.5}
/>

// Use geometric car (current)
<CarScene useCustomModel={false} />
```

## 🔍 Troubleshooting

### Model doesn't appear?
1. **Check console** for errors (F12)
2. **Verify path:** Model must be in `public/models/`
3. **Check file size:** Large files may take time to load

### Model is wrong size?
```typescript
// Try different scales
scale={0.5}  // Smaller
scale={2}    // Bigger
scale={10}   // Much bigger
```

### Model is upside down?
```typescript
<primitive
  object={scene}
  rotation={[Math.PI, 0, 0]}  // Flip vertically
/>
```

### Model is backwards?
```typescript
<primitive
  object={scene}
  rotation={[0, Math.PI, 0]}  // Rotate 180°
/>
```

### Model has no textures?
- Make sure you downloaded **with textures**
- Use `.glb` format (includes textures)
- Check model in online viewer first

### Model is too dark?
```typescript
// Increase lighting
<ambientLight intensity={1.5} />
<directionalLight intensity={2} />
```

## 🎨 Model Optimization Tips

### Before Adding Model:

1. **Use Blender** (free) to optimize:
   - Reduce polygon count
   - Compress textures
   - Remove unnecessary parts
   - Export as `.glb`

2. **Use glTF Pipeline:**
```bash
npm install -g gltf-pipeline
gltf-pipeline -i model.glb -o optimized.glb -d
```

3. **Online Tools:**
   - https://gltf.report/ (analyze)
   - https://products.aspose.app/3d/compress (compress)

## 📦 Recommended Models to Try

### Free, Ready-to-Use Models:

1. **Low-poly car** - Easy to load, fast
2. **Sports car** - Looks great, medium size
3. **Electric vehicle** - Perfect for your theme!

### Where to Find:
- Sketchfab: "low poly car free download"
- Search: "electric car glb free"
- Filter by: < 5MB file size

## 🔄 Switching Between Models

Create multiple scenes:

```typescript
// Homepage - Sport car
<CarScene modelPath="/models/sport.glb" scale={1.2} />

// Models page - Different models per card
<CarScene modelPath="/models/suv.glb" scale={1.5} />

// Configurator - Customizable car
<CarScene modelPath="/models/custom.glb" scale={1} />
```

## 💡 Pro Tips

1. **Test in viewer first:** Use https://gltf-viewer.donmccurdy.com/
2. **Start with low-poly:** Easier to load and animate
3. **Keep backups:** Save both geometric and custom versions
4. **Check licenses:** Make sure you can use the model
5. **Optimize textures:** Reduce image sizes if loading is slow

## 🎯 Quick Setup Checklist

- [ ] Download `.glb` model (< 10MB)
- [ ] Create `public/models/` folder
- [ ] Copy model to `public/models/car.glb`
- [ ] Update CarScene component
- [ ] Test different scales
- [ ] Adjust position/rotation
- [ ] Add loading fallback
- [ ] Test on mobile

## 🆘 Need Help?

Common issues:
- **"Model not loading"** → Check file path and size
- **"Too big/small"** → Adjust `scale` prop
- **"Wrong orientation"** → Adjust `rotation` prop
- **"Loading slow"** → Compress model file
- **"Textures missing"** → Use `.glb` not `.obj`

---

**Ready to add your custom model?** Follow the steps above! 🚗⚡
