"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import LoadingScene from "../common/LoadingScene";

const PointLight = () => {
  return (
    <pointLight
      position={[-1.5, 1, -1.8]} // Position the point light
      intensity={2} // Brightness of the point light
      decay={1.5} // How quickly the light fades
      distance={7} // Maximum distance of the light effect
      color={0xffcaa1}
      castShadow // Enable shadow casting
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.01} // Adjust bias for point light
    />
  );
};

const PointLight2 = () => {
  return (
    <pointLight
      position={[1.5, 1, -1.8]} // Position the point light
      intensity={2} // Brightness of the point light
      decay={1.5} // How quickly the light fades
      distance={7} // Maximum distance of the light effect
      color={0xffcaa1}
      castShadow // Enable shadow casting
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.01} // Adjust bias for point light
    />
  );
};

const PointLight3 = () => {
  return (
    <pointLight
      position={[-1.8, 1, 0]} // Position the point light
      intensity={2} // Brightness of the point light
      decay={1.5} // How quickly the light fades
      distance={7} // Maximum distance of the light effect
      color={0xffcaa1}
      castShadow // Enable shadow casting
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.01} // Adjust bias for point light
    />
  );
};

const MainRoom = () => {
  const { scene } = useGLTF("/3dModels/room.glb");

  // Traverse the room model to set castShadow for all meshes
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).castShadow = true; // Allow the model to cast shadows
      (child as THREE.Mesh).receiveShadow = true; // If applicable, set to receive shadows
    }
  });

  return (
    <primitive
      object={scene}
      position={[0, -1, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
};

interface CamPropsController {
  camPos: THREE.Vector3;
  camRot: THREE.Quaternion;
  allowFrame: boolean;
  onComplete?: () => void;
}

interface CamPropsMain {
  camPos: THREE.Vector3;
  camRot: THREE.Quaternion;
  allowOrbit: boolean;
  allowFrame: boolean;
}

const CameraController: React.FC<CamPropsController> = ({
  camPos,
  camRot,
  allowFrame,
}) => {
  const camRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (allowFrame && camRef.current) {
      camRef.current.position.lerp(camPos, 0.05);

      camRef.current.quaternion.slerp(camRot, 0.05);
    }
  });

  return <PerspectiveCamera ref={camRef} makeDefault />;
};

const ThreeScene: React.FC<CamPropsMain> = ({
  camPos,
  camRot,
  allowOrbit,
  allowFrame,
}) => {
  return (
    <>
      <Canvas shadows>
        {/* Suspense for loading any async resources */}
        <Suspense fallback={null}>
          <PointLight />
          <PointLight2 />
          <PointLight3 />

          {/* Add lights */}
          <ambientLight intensity={0.1} color={0xccfff8} />

          <MainRoom />
          {/* OrbitControls to navigate the scene */}
          <OrbitControls enabled={allowOrbit} />
          <CameraController
            camPos={camPos}
            camRot={camRot}
            allowFrame={allowFrame}
          />
        </Suspense>
      </Canvas>
      <LoadingScene />
    </>
  );
};

export default ThreeScene;
