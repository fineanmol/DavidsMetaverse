import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useCursor, MeshReflectorMaterial, Image, Text } from '@react-three/drei'
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

export function App() {
  //scrollcontrol
  const scrollArea = useRef();
  const scroll = useRef(0)
  const overlay = useRef()
  const caption = useRef()
  const [pages, setPages] = useState(0);


  

  const handleScroll = (e) => {
    scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
    console.log(scroll.current);
    // caption.current.innerText = scroll.current.toFixed(2)
    // const currentPage = Math.floor(scroll.current * 10 / viewportHeight);
    // console.log(currentPage);
    // setPages(currentPage);
    
  };

  const ref = useRef()
  
  return (
    <>
         <div className="container" ref={scroll} onScroll={handleScroll}>
             <View index={0} className='View'>
             <Lights preset="dawn" />
             <Environment files={'/aerodynamics_workshop_1k.hdr'} baackground blur={0.5} />
             <color attach="background" args={["#fff"]} />
               <OrthographicCamera makeDefault position = {[11, 18, 20]} zoom= {70} gl={{ preserveDrawingBuffer: true }}/>
               <Lights preset="city" />
               <Intro />
             </View>
             <View index={1} className='View-HorizontalScroll'>
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
           </div> 
           <div className="container" ref={scroll} onScroll={handleScroll}>
             {/* <ThreeD /> */}

             <Canvas shadows  eventSource={document.getElementById('root')} className="canvas">
               <ScrollControls pages={5} damping={4}>
                 <Scroll>
                   <View.Port Camera/>
                 </Scroll> 
                  <Scroll html>
                  </Scroll>              
               </ScrollControls>
             </Canvas>
             {/* <Overlay /> */}
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



