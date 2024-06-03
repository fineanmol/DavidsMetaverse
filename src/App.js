import * as THREE from 'three'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree, addEffect } from '@react-three/fiber'
import { ScrollControls, Scroll, useCursor, MeshReflectorMaterial, CameraShake, Text, Preload,useScroll,Image as ImageImpl } from '@react-three/drei'
import {
  View,
  Bounds,
  OrthographicCamera,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ArcballControls,
  PivotControls,
  Html,
  Center
} from '@react-three/drei'
import { Projects } from './Projects'
import { Intro } from './Intro'
import { Soda } from './Models'
import { Skills } from './Skills'
import { Overlay } from './Overlay'
import Lenis from 'lenis'
import Snap from 'lenis/snap'



export function  App() {

  const lenis = new Lenis(
    { 
      syncTouch: true,
      lerp: 0.1,
      smooth: true,
      syncTouch: true,
      direction: "vertical"
    })

  const snap = new Snap(lenis, {
    type: 'proximity', // default
    velocityThreshold: 1, // default
    onSnapStart: () => console.log('Snap started'),
    onSnapComplete: () => console.log('Snap completed'),
    lerp: 0.05, // default
    easing: (t) => t, // default
    duration: 10000, 
  })
  snap.add(window.innerHeight);
  snap.add(window.innerHeight * 2);
  snap.add(window.innerHeight * 3);

  addEffect((t) => lenis.raf(t))
   
  //scrollcontrol
  const container = useRef()


  
  return (
    <>
        <div className="container" ref={container}>
          {/* Views */}
            <View index={0} className='View'>
              <Lights preset="dawn" />
              <Environment files={'/aerodynamics_workshop_1k.hdr'} baackground blur={0.5} />
              <color attach="background" args={["#fff"]} />
              <OrthographicCamera makeDefault position = {[11, 18, 20]} zoom= {70} gl={{ preserveDrawingBuffer: true }}/>
              <Intro />
            </View>
            <View index={1} className='View'>
                <OrthographicCamera makeDefault position={[0, 0, 30]} zoom={150} />
                <Skills />
            </View>
            <View index={2} className='View'>
              <Projects />
            </View>      
            <View index={3} className='View'>
              <Lights preset="city" />
              <color attach="background" args={["#fff"]} />
              <PerspectiveCamera makeDefault position={[0, 0, 4]} />
              <Lights preset="dawn" />
              <Soda scale={3} position={[0, -0.75, 0]} />
            </View>
            <View index={4} className='View'>
              <Lights preset="city" />
              <color attach="background" args={['#fff']} />
                <PerspectiveCamera makeDefault position={[-1, 1, 1]} fov={25} />
                <Lights preset="warehouse" />
                <PivotControls depthTest={false} scale={0.15} anchor={[0, 0, 0]}>
                  <Center>
                    <Soda wireframe />
                  </Center>
                </PivotControls>
            </View>
          {/* </div> */}
          {/* ThreeD */}
          
          <Canvas gl={{antialias: false}} dpr={[1, 1.5]} shadows  eventSource={document.getElementById('root')} className='canvas'>
            <View.Port />
          </Canvas>
          <Overlay />
        </div>
        
        
    </>
    //   )
    // }
  )
  
}

function Lights({ preset }) {
  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset={preset} />
    </>
  )
}



