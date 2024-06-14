import { useState, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'
import { a } from '@react-spring/three'
import { Scene } from './Wobble'

export function Contact() {
  return (
    <>
              <group position={[0, -0.65, 0]}>
              <Scene />

      </group>
        
        <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
    </>
  )
}
