import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Canvas, useLoader } from '@react-three/fiber'
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial
} from '@react-three/drei'
import { useControls, button } from 'leva'
// import { EffectComposer, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'

export function Intro() {
  const { autoRotate, text, shadow, ...config } = {
    text: 'David',
    backside: true,
    backsideThickness: 0.3,
    samples: 8,
    resolution: 512,
    transmission: 1,
    clearcoat: 0,
    clearcoatRoughness: 0.0,
    thickness: 0.3,
    chromaticAberration: 5,
    anisotropy: 0.3,
    roughness: 0,
    distortion: 0.5,
    distortionScale: 0.1,
    temporalDistortion: 0,
    ior: 1.5,
    color: '#1ACCE8',
    gColor: '#52544F',
    shadow: "#000",
    autoRotate: false,
    }
  return (
    <>
      {/** The text and the grid */}
      <Text config={config} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 2.25]}>
        {text}
      </Text>
      {/** Controls */}
      <OrbitControls autoRotate={"on"} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} />

      {/** The environment is just a bunch of shapes emitting light. This is needed for the clear-coat */}
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
        </group>
      </Environment>
      {/** Soft shadows */}
      <AccumulativeShadows frames={50} color={shadow} colorBlend={5} toneMapped={true} alphaTest={0.9} opacity={1} scale={30} position={[0, -1.01, 0]}>
        <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={1} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
      </AccumulativeShadows>
    </>
  );
}

const Grid = ({ number = 6.5, lineWidth = 0.026, height = 0.5, config }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]}/>
    <meshStandardMaterial color={"#000"} emissive={"#000"} emissiveIntensity={1} toneMapped={false} />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
  </Instances>
)

function Text({ children, config, font = '/Inter_Medium_Regular.json', ...props }) {
  return (
    <>
      <group>
        <Center scale={[0.8, 1, 1]} front top {...props}>
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}>
            {children}
            <MeshTransmissionMaterial {...config} />
          </Text3D>
        </Center>
        <Grid config={config}/>
      </group>
    </>
  )
}
