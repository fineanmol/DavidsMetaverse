import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, addEffect } from '@react-three/fiber'
import { useProgress, PerformanceMonitor,Image as ImageImpl, Preload, PivotControls } from '@react-three/drei'
import {View,OrthographicCamera,PerspectiveCamera, OrbitControls, Environment} from '@react-three/drei'
// import { hatch } from 'ldrs'

import { Overlay } from './Overlay'
import { ResponsiveAppBar } from './Navbar'
import { Intro } from './Intro'
import { Skills } from './Skills'
import { Experiences } from './Experiences'
import { Projects } from './Projects'
import { Contact } from './Contact'
import { ScrollProjects } from './ScrollProjects'
import Lenis from 'lenis'
import Snap from 'lenis/snap'


const lenis = new Lenis(
  { 
    syncTouch: true,
    lerp: 0.08,
    smoothWheel: true,
    autoResize: true,
  })
  

  const snapConfig = {
    type: 'mandatory',
    velocityThreshold: 1,
    onSnapStart: () => console.log('Snap started'),
    onSnapComplete: () => console.log('Snap completed'),
    lerp: 0.05,
    easing: (t) => t,
    duration: 1,
  }
  
  const snap = new Snap(lenis, snapConfig)

  // Calculate snap points dynamically
  const numSections = 5 // Adjust based on your actual number of sections
  const snapPoints = Array.from({ length: numSections }, (_, i) => window.innerHeight * i)
  snapPoints.forEach(point => snap.add(point))
  
  // Add resize listener to update snap points
  window.addEventListener('resize', () => {
    snap.removeAll()
    snapPoints.forEach((_, i) => snap.add(window.innerHeight * i))
  })
  
  // Add Lenis to the render loop
  addEffect((time) => lenis.raf(time))

// hatch.register()

// const audio = new Audio("./audios/Song Of Unity.mp3");
export function  App() {
  const [start, setStart] = useState(false);
  const [dpr, setDpr] = useState(1.5)
  const horizontalRef = useRef(null)
  const canvas = useRef()
  const isScrollDisabled = useRef(false);
  //scrollcontrol
  const container = useRef()
  

  // // useEffect(() => {
  // //   if (start) {
  // //     audio.play();
  // //   }
  // // }, [start]);  

  // // useEffect(() => {
  // //   const handleScroll = () => {
  // //     console.log(`scrolling with ${isScrollDisabled.current}`)
  // //     const horizontalElement = horizontalRef.current
  // //     if (horizontalElement) {
  // //       const rect = horizontalElement.getBoundingClientRect()
  // //       console.log((rect.bottom))
  // //       if (rect.top <= 1.5 && rect.top >=0) {
  // //         // && rect.bottom >= window.innerHeight-5
  // //         lenis.orientation = "horizontal"
  // //         console.log("Disabling scroll")
  // //         if(!isScrollDisabled.current){
  // //           disableScroll()
  // //         } 
  // //       } else {
  // //         lenis.orientation = "vertical"
  // //         if(isScrollDisabled.current){
  // //           enableScroll()
  // //         }
  // //         // Switch back to vertical scrolling
  // //         // lenis.off('scroll', (e) => {})
  // //         // enableScroll()
  // //       }
  // //     }
  // //   }
  //   const disableScroll = () => {
  //     console.log("disabling scroll")
  //     horizontalRef.current.classList.add('content');
  //     isScrollDisabled.current = true;
  //   };
  
  //   const enableScroll = () => {
  //     console.log("enabling scroll")
  //     horizontalRef.current.classList.remove('content');
  //     isScrollDisabled.current = false;
  //   };


  //   window.addEventListener('scroll', handleScroll)

  //   return () => {window.removeEventListener('scroll', handleScroll)
  // }
  
  // }, [])

 

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
            {/* <div className='View-Horizontal'  ref={horizontalRef}>
              <View index={3} className='View-HorizontalScroll'>
                <Items />
              </View> 
            </div>
             */}
             <View index={3} className='View'>
             <PerspectiveCamera makeDefault fov={10} position={[0,0, 10]}/>
             {/* <OrbitControls autoRotate={"off"} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} /> */}
              <ScrollProjects lenis={lenis} />
             </View>
     
            <View index={4} className='View'>
              <Contact />
           </View>
          </div>
          
          {/* ThreeD */}
          
          <Canvas style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0}}frameloop="demand" gl={{antialias: false}} dpr={dpr} shadows  eventSource={document.getElementById('root')} eventPrefix="client" ref={canvas}>

            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
                <View.Port /> 
                <Preload all /> 
             </PerformanceMonitor>
          </Canvas>

            
            {start && <ResponsiveAppBar lenis={lenis}/>} 
            {!start && <LoadingScreen started={start} onStarted={() => setStart(true)} />} 
            {start && <Overlay />}
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






import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing } from 'maath'

const material = new THREE.LineBasicMaterial({ color: 'white' })
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])
const state = proxy({
  clicked: null,
  urls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 5, 7, 8, 2, 4, 9, 6].map((u) => `Skills/${u}.jpg`)
})


// function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
//   const ref = useRef()
//   const scroll = useScroll()
//   const { clicked, urls } = useSnapshot(state)
//   const [hovered, hover] = useState(false)
//   const click = () => (state.clicked = index === clicked ? null : index)
//   const over = () => hover(true)
//   const out = () => hover(false)
//   useFrame((state, delta) => {
//     easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 , 1], 0.15, delta)
//     ref.current.material.scale[0] = ref.current.scale.x
//     if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
//     if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
//     if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
//     // easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)
//     easing.dampC(ref.current.material.color, hovered || clicked === index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
//   })
//   return <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
// }


// function Items({ w = 0.7, gap = 0.5 }) {
//   const { urls } = useSnapshot(state)
//   const ref = useRef()
//   const { width } = useThree((state) => state.viewport)
//   const xW = w + gap *2
//   return (
//     <ScrollControls horizontal damping={0.1} pages={(width - xW + urls.length * xW) / width}>
//       <Minimap />
//       <Scroll>
    
//       {urls.map((url, i) => <Item key={i} index={i} position={[(i-4)*3 * xW, 0, 0]} scale={[w*4, 4, 1]} url={url} />)}
// </Scroll>
//     </ScrollControls>
//   );}


function Minimap() {
  const ref = useRef()
  const scroll = useScroll()
  const { urls } = useSnapshot(state)
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
      easing.damp(child.scale, 'y', 0.15 + y / 6, 0.15, delta)
    })
  })
  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line key={i} geometry={geometry} material={material} position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]} />
      ))}
    </group>
  )
}

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const scroll = lenis.scroll
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => hover(true)
  const out = () => hover(false)
  useFrame((state, delta) => {
    const y = scroll * 0.001
    easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1], 0.15, delta)
    ref.current.material.scale[0] = ref.current.scale.x
    ref.current.material.scale[1] = ref.current.scale.y
    if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
    if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
    if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
    easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)
    easing.dampC(ref.current.material.color, hovered || clicked === index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
  })
  return <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap * 10
  return (
    <>

{urls.map((url, i) => <Item key={i} index={i} position={[(i-4)*3 * xW, 0, 0]} scale={[w*6, 4, 1]} url={url} />)}
        </>
  )
}