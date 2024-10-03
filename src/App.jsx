// src/App.jsx

import React from 'react';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div>
      {/* Simple HTML Content */}
      <h1>Hello World</h1>
      <p>This is a simple paragraph.</p>
      <button>Click Me</button>
      <a href="https://www.example.com">Visit Example.com</a>

      {/* First Three.js Canvas with a Sphere */}
      <Canvas style={{ height: '400px' }}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
