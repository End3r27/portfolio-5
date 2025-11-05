"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Car() {
  const carRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (carRef.current) {
      // Subtle floating animation
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Slow rotation
      carRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
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
          color="#00D9FF"
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
          color="#00D9FF"
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
        {/* Rim glow */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
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
            color="#00D9FF"
            emissive="#00D9FF"
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
            color="#00D9FF"
            emissive="#00D9FF"
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
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Headlights - Electric Blue Glow */}
      <pointLight position={[2.5, 0, 0.7]} intensity={2} color="#00D9FF" distance={5} />
      <pointLight position={[2.5, 0, -0.7]} intensity={2} color="#00D9FF" distance={5} />
      <mesh position={[2.3, 0, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[2.3, 0, -0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.1, 0.1, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FF0040"
          emissive="#FF0040"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-2.1, 0.1, -0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FF0040"
          emissive="#FF0040"
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

export default function CarScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 3, 8]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#B026FF" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#00D9FF"
        />

        <Suspense fallback={<LoadingFallback />}>
          <Car />
          <Environment preset="night" />
        </Suspense>

        {/* Ground with reflection */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={0.5}
          />
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
