import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, addEffect } from '@react-three/fiber'
import { useProgress, PerformanceMonitor,Image as ImageImpl, Preload, PivotControls } from '@react-three/drei'
import {View,OrthographicCamera,PerspectiveCamera, OrbitControls, Environment} from '@react-three/drei'
import { hatch } from 'ldrs'

import { Overlay } from './Overlay'
import { ResponsiveAppBar } from './Navbar'
import { Intro } from './Intro'
import { Skills } from './Skills'
import { Experiences } from './Experiences'
import { Projects } from './Projects'
import { Contact } from './Contact'

import Lenis from 'lenis'
import Snap from 'lenis/snap'


const lenis = new Lenis(
  { 
    syncTouch: true,
    lerp: 0.1,
    smooth: true,
    syncTouch: true,
    direction: "vertical",
    autoResize: true,
  })

const snap = new Snap(lenis, {
  type: 'mandatory', // default
  velocityThreshold: 1, // default
  onSnapStart: () => console.log('Snap started'),
  onSnapComplete: () => console.log('Snap completed'),
  lerp: 0.05, // default
  easing: (t) => t, // default
  duration: 1, 
})
snap.add(window.innerHeight);
snap.add(window.innerHeight * 2);
snap.add(window.innerHeight * 3);
snap.add(window.innerHeight * 4);

addEffect((t) => lenis.raf(t))

hatch.register()

// const audio = new Audio("./audios/Song Of Unity.mp3");
export function  App() {
  const [start, setStart] = useState(false);
  const [dpr, setDpr] = useState(1.5)
  //scrollcontrol
  const container = useRef()

  // useEffect(() => {
  //   if (start) {
  //     audio.play();
  //   }
  // }, [start]);  
  

  const handlePointerOver = (e) => {console.log(e);}
  const handlPointerClicked = (e) => {console.log(e)}
  return (
        <>
          <div className="container" ref={container} id='container'>
            {/* Views */}
            <View index={0} className='View' id="Intro" >
              <Lights preset="dawn" />
              <color attach="background" args={["#fff"]} />
              <OrthographicCamera makeDefault fov={90} position = {[11, 100, 100]} zoom= {50} gl={{ preserveDrawingBuffer: true }}/>
              <Intro />
            </View>
            <View index={1}  onClick={handlPointerClicked} onPointerOver={handlePointerOver} className='View'>
              <PerspectiveCamera makeDefault fov={90} position={[0,0, 30]}/>
              <fog attach="fog" args={['#202025', 0, 80]} />
              <Skills />
              <OrbitControls autoRotate={"off"} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} />
            </View>
            <View index={2} className='View'>
              <Experiences />
            </View> 
            <View index={3} className='View'>
              {/* <Projects /> */}
            </View>      
            <View index={4} className='View'>
              <Contact />
           </View>
          </div>
          
          {/* ThreeD */}
          
          <Canvas style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}frameloop="demand" gl={{antialias: false}} dpr={dpr} shadows  eventSource={document.getElementById('root')} eventPrefix="client" >

            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
                <View.Port /> 
                <Preload all /> 
                {/* <Box position={[0, 0, 0]} /> */}
            </PerformanceMonitor>
          </Canvas>

            {start && <Overlay /> }
            {start && <ResponsiveAppBar lenis={lenis}/>} 
            {!start && <LoadingScreen started={start} onStarted={() => setStart(true)} />} 
        </>
        
    //   )
    // }
  )
  
}

const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  console.log(progress)

  useEffect(() => {
    if (progress === 100 && !started) {
      onStarted();
    }
  }, [progress, started, onStarted]);
  console.log("loading screen")
  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}> 
      <div className='loadingScreen__progress'> <l-hatch size="28" stroke="4" speed="3.5" color="black"></l-hatch> </div> 
    </div>
  );
};

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



