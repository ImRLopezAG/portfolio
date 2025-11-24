'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

export function FloatingSprite({
  texture,
  initialX,
  initialY,
  initialZ,
  floatSpeed,
  floatOffset,
  xMoveSpeed,
  scale,
}: {
  texture: THREE.Texture
  initialX: number
  initialY: number
  initialZ: number
  floatSpeed: number
  floatOffset: number
  xMoveSpeed: number
  scale: number
}) {
  const spriteRef = useRef<THREE.Sprite>(null)

  useFrame((state) => {
    if (!spriteRef.current) return

    const time = state.clock.elapsedTime * 60 * 0.01

    // Float animation
    spriteRef.current.position.y =
      initialY + Math.sin(time * floatSpeed + floatOffset) * 2

    // Move horizontally
    spriteRef.current.position.x += xMoveSpeed

    // Wrap around
    if (spriteRef.current.position.x > 30) spriteRef.current.position.x = -30
    if (spriteRef.current.position.x < -30) spriteRef.current.position.x = 30
  })

  return (
    <sprite
      ref={spriteRef}
      position={[initialX, initialY, initialZ]}
      scale={[scale, scale, 1]}
    >
      <spriteMaterial map={texture} transparent opacity={0.4} />
    </sprite>
  )
}
