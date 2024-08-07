// https://cydstumpel.nl/

import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture, Text } from '@react-three/drei'
import { easing } from 'maath'
import './util'

export const ScrollProjects = ({lenis}) => (
  <Rig position={[0,0,0]} rotation={[-0.05, 0, 0]} lenis={lenis}>
    <Carousel />
  </Rig>
)

function Rig({lenis, snap, ...props}) {
  const ref = useRef()
  const scrollRef = useRef(0)
  const [expandedCard, setExpandedCard] = useState(null)
  const lastScrollRef = useRef(0)
  const targetRotationRef = useRef(0)

  const navigateCard = (direction) => {
    const cardCount = 8;
    const newIndex = (expandedCard + direction + cardCount) % cardCount;
    setExpandedCard(newIndex);
    // Update target rotation
    targetRotationRef.current += direction * (Math.PI * 2 / cardCount);
  };

  useEffect(() => {
    const onScroll = (e) => {
      scrollRef.current = e.progress
      
      // Check if we've scrolled to a new "view"
      if (Math.abs(scrollRef.current - lastScrollRef.current) > 0.1) {
        setExpandedCard(null) // Reset expanded card
        lastScrollRef.current = scrollRef.current
      }
    }
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  useEffect(() => {
    if (snap && typeof snap.onComplete === 'function') {
      const onSnapComplete = () => {
        // Calculate the index of the card in the center
        const cardCount = 8; // Assuming 8 cards as in the Carousel component
        const centerCardIndex = Math.round(scrollRef.current * cardCount) % cardCount;
        setExpandedCard(centerCardIndex);
      };

      snap.onComplete(onSnapComplete);
      return () => snap.onComplete(null); // Clean up
    }
  }, [snap]);

  useFrame((state, delta) => {
    if (expandedCard !== null) {
      // Smoothly rotate the carousel to the target rotation
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        targetRotationRef.current,
        0.1
      );
      // Move camera back when a card is expanded
      easing.damp3(state.camera.position, [0, 0, 18], 0.3, delta)
    } else {
      // Normal rotation based on Lenis scroll
      ref.current.rotation.y = scrollRef.current * Math.PI * 2
      // Normal camera position
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta)
    }
    state.camera.lookAt(0, 0, 0)
  })
  
  return <group {...props}>
    <group ref={ref}>
      <Carousel 
        setExpandedCard={setExpandedCard} 
        expandedCard={expandedCard} 
      />
    </group>
    {expandedCard !== null && (
      <ExpandedCardUI
        index={expandedCard}
        onClose={() => setExpandedCard(null)}
        onNavigate={navigateCard}
      />
    )}
  </group>
}

function Carousel({ radius = 2, count = 8, setExpandedCard, expandedCard }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Card
          key={i}
          index={i}
          url={`/img${Math.floor(i % 10) + 1}_.jpg`}
          position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
          rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
          setExpandedCard={setExpandedCard}
          isExpanded={expandedCard === i}
        />
      ))}
    </>
  )
}

function Card({ url, index, setExpandedCard, isExpanded, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  const handleClick = () => setExpandedCard(index)

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, isExpanded ? 2 : hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
    if (isExpanded) {
      // When expanded, move to the center in world space
      const targetPosition = new THREE.Vector3(0, 0, 3)
      const targetQuaternion = new THREE.Quaternion()
      
      ref.current.parent.getWorldQuaternion(targetQuaternion).invert()
      targetPosition.applyQuaternion(targetQuaternion)
      
      easing.damp3(ref.current.position, targetPosition, 0.2, delta)
      easing.dampQ(ref.current.quaternion, targetQuaternion, 0.2, delta)
    } else {
      // When not expanded, use the original carousel position and rotation
      easing.damp3(ref.current.position, props.position, 0.2, delta)
      easing.dampE(ref.current.rotation, props.rotation, 0.2, delta)
    }
  })

  return (
    <Image 
      ref={ref} 
      url={url} 
      transparent 
      side={THREE.DoubleSide} 
      onPointerOver={pointerOver} 
      onPointerOut={pointerOut} 
      onClick={handleClick}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  )
}

function ExpandedCardUI({ index, onClose, onNavigate }) {
  const descriptions = [
    "Project 1 description",
    "Project 2 description",
    // ... add more descriptions for each project
  ]

  return (
    <group>
      <Text 
        position={[0, 1.2, 3]} 
        fontSize={0.2}
        color="white"
      >
        {`Project ${index + 1}`}
      </Text>
      <Text 
        position={[0, 0.8, 3]} 
        fontSize={0.1}
        color="white"
        maxWidth={2}
      >
        {descriptions[index]}
      </Text>
      
      {/* Left arrow button */}
      <group position={[-3, 0, 3]} onClick={() => onNavigate(-1)}>
        <mesh>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.2} color="black">
          {"<"}
        </Text>
      </group>
      
      {/* Right arrow button */}
      <group position={[3, 0, 3]} onClick={() => onNavigate(1)}>
        <mesh>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.2} color="black">
          {">"}
        </Text>
      </group>
      
      {/* Close button */}
      <group position={[0, -1.2, 3]} onClick={onClose}>
        <mesh>
          <planeGeometry args={[0.8, 0.3]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.15} color="black">
          Close
        </Text>
      </group>
    </group>
  )
}

function Banner(props) {
  const ref = useRef()
  const texture = useTexture('/work_.png')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4
    ref.current.material.map.offset.x += delta / 2
  })
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  )
}