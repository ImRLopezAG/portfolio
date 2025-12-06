'use client'

import { useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const logoUrls = [
	'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
	'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
	'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
	'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
	'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
] as const

function FloatingSprite({
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

export function Particles() {
	const textures = useLoader(THREE.TextureLoader, logoUrls)
	const particleCount = 45

	const particles = useMemo(() => {
		const items = []
		// Distribute textures among particles
		for (let i = 0; i < particleCount; i++) {
			const textureIndex = i % logoUrls.length
			items.push({
				id: i,
				texture: textures[textureIndex],
				initialX: (Math.random() - 0.5) * 50,
				initialY: (Math.random() - 0.5) * 50,
				initialZ: (Math.random() - 0.5) * 30 - 10,
				floatSpeed: Math.random() * 0.01 + 0.002,
				floatOffset: Math.random() * Math.PI * 2,
				xMoveSpeed: (Math.random() - 0.5) * 0.02,
				scale: Math.random() * 1.5 + 1,
			})
		}
		return items
	}, [textures])

	return (
		<>
			{particles.map((data) => (
				<FloatingSprite key={data.id} {...data} />
			))}
		</>
	)
}
