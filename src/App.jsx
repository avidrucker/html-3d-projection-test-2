// src/App.jsx

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

function TexturedSphere({ texture }) {
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <mesh position={[2, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function App() {
  const htmlRef = useRef(null);
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      if (isMounted && htmlRef.current) {
        html2canvas(htmlRef.current).then((canvas) => {
          const newTexture = new THREE.CanvasTexture(canvas);
          setTexture(newTexture);
        });
      }
    }, 200);

    return () => {
      isMounted = false;
      if (texture) {
        texture.dispose();
      }
    };
  }, []);

  return (
    <div>
      {/* Hidden HTML Content for Texture */}
      <div
        ref={htmlRef}
        style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
      >
        <h1>Hello World</h1>
        <p>This is a simple paragraph.</p>
        <button>Click Me</button>
        <a href="https://www.example.com">Visit Example.com</a>
      </div>

      {/* Visible HTML Content */}
      <h1>Hello World</h1>
      <p>This is a simple paragraph.</p>
      <button>Click Me</button>
      <a href="https://www.example.com">Visit Example.com</a>

      {/* Single Three.js Canvas */}
      <Canvas style={{ height: '400px' }}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />

        {/* First Sphere */}
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Textured Sphere */}
        {texture && <TexturedSphere texture={texture} />}
      </Canvas>
    </div>
  );
}

export default App;
