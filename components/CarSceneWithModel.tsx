"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// Custom 3D Model Loader
function CustomCarModel({
  modelPath = "/models/car.glb",
  scale = 1,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scrollProgress = 0,
}: {
  modelPath?: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  scrollProgress?: number;
}) {
  const carRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const currentRotationX = useRef(0);

  // Load the model
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (carRef.current) {
      // Calculate target rotation based on scroll progress (reduced to 180 degrees for slower rotation)
      targetRotationY.current = rotation[1] + scrollProgress * Math.PI * 1; // Changed from * 2 to * 1
      targetRotationX.current = rotation[0] + scrollProgress * 0.1 - 0.05; // Reduced tilt too

      // Smooth interpolation (lerp) for rotation - slower interpolation
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * Math.min(delta * 2, 1);
      currentRotationX.current += (targetRotationX.current - currentRotationX.current) * Math.min(delta * 2, 1);

      carRef.current.rotation.y = currentRotationY.current;
      carRef.current.rotation.x = currentRotationX.current;

      // Subtle floating animation
      carRef.current.position.y = position[1];
    }
  });

  return (
    <group ref={carRef}>
      <primitive
        object={scene.clone()}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </group>
  );
}

// Geometric Car (Fallback)
function GeometricCar({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const carRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);
  const targetRotationX = useRef(0);
  const currentRotationX = useRef(0);

  useFrame((state, delta) => {
    if (carRef.current) {
      // Calculate target rotation based on scroll progress (reduced to 180 degrees for slower rotation)
      targetRotationY.current = scrollProgress * Math.PI * 1; // Changed from * 2 to * 1
      targetRotationX.current = scrollProgress * 0.1 - 0.05; // Reduced tilt too

      // Smooth interpolation (lerp) for rotation - slower interpolation
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * Math.min(delta * 2, 1);
      currentRotationX.current += (targetRotationX.current - currentRotationX.current) * Math.min(delta * 2, 1);

      carRef.current.rotation.y = currentRotationY.current;
      carRef.current.rotation.x = currentRotationX.current;

      // Subtle floating animation
      carRef.current.position.y = 0;
    }
  });

  return (
    <group ref={carRef}>
      {/* Main Car Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Car Roof */}
      <mesh castShadow receiveShadow position={[0.5, 0.8, 0]} scale={[0.6, 0.6, 0.95]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>

      {/* Front Hood - Sleek slope */}
      <mesh castShadow receiveShadow position={[1.8, 0.3, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[1, 0.4, 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Windows with glass effect */}
      <mesh position={[0.5, 1.1, 0.95]} scale={[0.5, 0.5, 0.05]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshPhysicalMaterial
          color="#2A9D8F"
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0}
          transmission={0.9}
        />
      </mesh>
      <mesh position={[0.5, 1.1, -0.95]} scale={[0.5, 0.5, 0.05]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshPhysicalMaterial
          color="#2A9D8F"
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0}
          transmission={0.9}
        />
      </mesh>

      {/* Wheels - Front Left */}
      <group position={[1.2, -0.5, 1]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
          <meshStandardMaterial
            color="#2A9D8F"
            emissive="#2A9D8F"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Wheels - Front Right */}
      <group position={[1.2, -0.5, -1]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
          <meshStandardMaterial
            color="#2A9D8F"
            emissive="#2A9D8F"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Wheels - Back Left */}
      <group position={[-1.2, -0.5, 1]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
          <meshStandardMaterial
            color="#2A9D8F"
            emissive="#2A9D8F"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Wheels - Back Right */}
      <group position={[-1.2, -0.5, -1]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
          <meshStandardMaterial
            color="#2A9D8F"
            emissive="#2A9D8F"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Headlights - Teal Glow */}
      <pointLight position={[2.5, 0, 0.7]} intensity={2} color="#2A9D8F" distance={5} />
      <pointLight position={[2.5, 0, -0.7]} intensity={2} color="#2A9D8F" distance={5} />
      <mesh position={[2.3, 0, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#2A9D8F"
          emissive="#2A9D8F"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[2.3, 0, -0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#2A9D8F"
          emissive="#2A9D8F"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.1, 0.1, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FF7F50"
          emissive="#FF7F50"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-2.1, 0.1, -0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FF7F50"
          emissive="#FF7F50"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Spoiler */}
      <mesh position={[-2, 0.8, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 1.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00D9FF" wireframe />
    </mesh>
  );
}

// Main Component with Props
export default function CarScene({
  useCustomModel = true,
  modelPath = "/models/car.glb",
  modelScale = 1,
  modelPosition = [0, 0, 0] as [number, number, number],
  modelRotation = [0, 0, 0] as [number, number, number],
  scrollProgress = 0,
}: {
  useCustomModel?: boolean;
  modelPath?: string;
  modelScale?: number | [number, number, number];
  modelPosition?: [number, number, number];
  modelRotation?: [number, number, number];
  scrollProgress?: number;
}) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[6, 2, 6]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4A90A4" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#2A9D8F"
        />

        <Suspense fallback={<LoadingFallback />}>
          {useCustomModel ? (
            <CustomCarModel
              modelPath={modelPath}
              scale={modelScale}
              position={modelPosition}
              rotation={modelRotation}
              scrollProgress={scrollProgress}
            />
          ) : (
            <GeometricCar scrollProgress={scrollProgress} />
          )}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model for better performance
useGLTF.preload("/models/car.glb");
