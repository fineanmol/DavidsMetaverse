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
import ThreeD from './3d'
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({ syncTouch: true })
// Integrate into fibers own raf loop instead of opening another
addEffect((t) => lenis.raf(t))


export function  App() {
  //scrollcontrol
  const container = useRef()

  useEffect(() => {
    if (container.current) {
      lenis.start();
      lenis.on('scroll', ({ scroll }) => {
        console.log('Current scroll position:', scroll);
      });
    }
    return () => {
      lenis.stop();
    };
  }, []);
  
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



