// Type declarations for React Three Fiber components
import * as THREE from 'three';
import { Object3DNode, BufferGeometryNode, MeshProps, ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps;
      planeGeometry: BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
      primitive: { object: any; [key: string]: any };
      shaderMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof THREE.ShaderMaterial
      >;
      // Add any other Three.js elements you're using
    }
  }
}

declare module 'three' {
  interface ShaderMaterial {
    uniforms: {
      [key: string]: {
        value: any;
      };
    };
  }
} 