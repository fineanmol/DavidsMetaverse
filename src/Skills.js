import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Text, OrbitControls, TrackballControls, PerspectiveCamera, PivotControls } from '@react-three/drei'



const skills1 = ["Neural Networks", "Python", "JavaScript", "Java", "C++"]; // First array of words
const skills2 = ["Unity 3D", "Three.js", "React.js", "React-three-fiber", "TensorFlow", "PyTorch", , "Docker"];   // Second array of words
 // Third array of words
const skills3 = ["Augmented Reality", "Virtual Reality", "Extended Reality"]
const skills35 = ["Machine Learning", "C#", "Networking", "Cloud Computing"]

const skills4 = ['Node.js', 'MongoDB', "Blender", "Git"];

function Word({ children, ...props }) {
  const color = new THREE.Color()
  const {camera} = useThree()
  const fontProps = { font: 'Fonts/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => {console.log("hoverd"); e.stopPropagation(); setHovered(true)}
  const out = (e) => {console.log("unhoverd"); e.stopPropagation(); setHovered(false)}
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame((camera) => {
    if(ref.current){

      ref.current.material.color.lerp(color.set(hovered ? 'red' : 'black'), 0.1)
    }
    
  })
  return (
    <Billboard {...props}>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...fontProps} children={children} />
    </Billboard>
  )
}

// function Cloud({ count = 1, radius = 20 }) {
  
//   // Create a count x count random words with spherical distribution
//   const words = useMemo(() => {
//     const temp = []
//     const spherical = new THREE.Spherical()
//     const phiSpan = Math.PI / (count + 1)
//     const thetaSpan = (Math.PI * 2) / count
//     for (let i = 1; i < count + 1; i++)
//       for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), skills[i-1]])
//     return temp
//   }, [count, radius])
//   return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
// }


function Cloud({ radius = 30 }) {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / 6; // Divide sphere into 6 bands for better spacing

    // Function to push words into temp array at different heights
    const addWords = (skills, phiOffset) => {
      const count = skills.length;
      const thetaSpan = (Math.PI * 2) / count;
      for (let i = 0; i < count; i++) {
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiOffset, thetaSpan * i)
          ),
          skills[i],
        ]);
      }
    };

    // Add words from each array at different heights
    addWords(skills1, phiSpan * 1); // Lower band
    addWords(skills2, phiSpan * 2); // Middle band
    addWords(skills3, phiSpan * 3); // Upper band
    addWords(skills35, phiSpan * 4); // Upper band
    addWords(skills4, phiSpan * 5); // Upper band

    return temp;
  }, [radius]);

  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

export default Cloud;

export function Skills() {
  return (

     <group rotation={[10, 10.5, 10]}>
        <Cloud radius={18} />
      </group>
       


  )
}
      