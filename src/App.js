import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, addEffect } from '@react-three/fiber'
import { useProgress, PerformanceMonitor,Image as ImageImpl } from '@react-three/drei'
import {View,OrthographicCamera,Environment} from '@react-three/drei'

import { Overlay } from './Overlay'
import { ResponsiveAppBar } from './Navbar'
import { Intro } from './Intro'
import { Skills } from './Skills'
import { Experiences } from './Experiences'
import { Projects } from './Projects'

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

  
  return (
    <>
        
        <div className="container" ref={container} id='container'>
          

            {/* Views */}
            <View index={0} className='View' id="Intro" >
              <Lights preset="dawn" />
              <Environment files={'/aerodynamics_workshop_1k.hdr'} baackground blur={0.5} />
              <color attach="background" args={["#fff"]} />
              <OrthographicCamera makeDefault position = {[11, 18, 20]} zoom= {70} gl={{ preserveDrawingBuffer: true }}/>
              <Intro />
            </View>
            <View index={1} className='View'>
              <Skills />
            </View>
            <View index={2} className='View'>
              <Experiences />
            </View> 
            <View index={3} className='View'>
              <Projects />
            </View>      
            <View index={4} className='View'>
            <Lights preset="dawn" />
              {/* <Contact /> */}
            </View>

            {/* ThreeD */}
          
            <Canvas frameloop="demand" gl={{antialias: false}} dpr={dpr} shadows  eventSource={document.getElementById('root')} eventPrefix='client' className='canvas'>
              <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
                <Suspense fallback={null}>
                  <View.Port /> 
                </Suspense>
              </PerformanceMonitor>
            </Canvas>
            {start && <Overlay /> }
            {start && <ResponsiveAppBar lenis={lenis}/>}
            
            

            {!start && <LoadingScreen started={start} onStarted={() => setStart(true)} />} 
        </div>
        
        
        
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
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
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



