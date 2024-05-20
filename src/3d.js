import React from 'react';
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text } from '@react-three/drei'
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

function ThreeD(){
    // useFrame(() => {
    //     console.log('scroll', scroll);
    // });

    return (
        <div className='snap-mandatory'>  
            <div style={{ position: "relative", height:"100vh", width:"100vw" }} className='snap-child'>
                <div style={{ zIndex: 10, position: "absolute" }}>
                    <div class="dot">
                        <h1>Welcome to my side of the Metaverse</h1>
                        Virtual reality (VR) is a simulated experience that can be similar to or completely different from the real world.
                    </div>
                </div>
                <div style={{ zIndex: 10, position: "absolute" }}>
                    <View index={0} className='View'>
                        <Lights preset="dawn" />
                        <Environment files={'/aerodynamics_workshop_1k.hdr'} baackground blur={0.5} />
                        <color attach="background" args={["#fff"]} />
                        <OrthographicCamera makeDefault position = {[11, 18, 20]} zoom= {70} gl={{ preserveDrawingBuffer: true }}/>
                        <Lights preset="city" />
                        <Intro />
                    </View>
                </div>
            </div>
            <View index={1} className='View snap-child'>
                <OrthographicCamera makeDefault position={[0, 0, 30]} zoom={150} />
                <Skills />
            </View>
            <View index={2} className='View snap-child'>
                <Projects />
            </View>
            
            <View index={3} className='View snap-child'>
            <Lights preset="city" />
            <color attach="background" args={["#fff"]} />
                <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                <Lights preset="dawn" />
                <Soda scale={3} position={[0, -0.75, 0]} />
            </View>
            <View index={4} className='View snap-child'>
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

                
        </div>
    );
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

export default ThreeD;