"use client";

import { useEffect } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { type Scene } from 'three';

type GLTFImporterProps = {
  scene: Scene;
}

export default function GLTFImporter({ scene }: GLTFImporterProps) {
  useEffect(() => {
    if (!scene) return;
    
    // Instantiate a loader 
    const loader = new GLTFLoader();
    
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); 
    loader.setDRACOLoader(dracoLoader);
    
    // Load a glTF resource
    loader.load(
      // resource URL
      'models/gltf/duck/duck.gltf',
      // called when the resource is loaded
      function (gltf) {
        scene.add(gltf.scene);
        console.log('Model loaded successfully');
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.error('An error happened', error);
      }
    );
    
    return () => {
      // Cleanup logic if needed
    };
  }, [scene]);
  
  // Return null to make this a valid React component
  return null;
}