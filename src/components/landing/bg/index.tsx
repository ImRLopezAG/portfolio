'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Particles } from './particles'
export function Background3D() {
	return (
		<div className='-z-10 pointer-events-none fixed inset-0 overflow-hidden'>
			<Canvas
				camera={{ position: [0, 0, 18], fov: 75 }}
				gl={{ alpha: true, antialias: true }}
				dpr={[1, 2]}
				className='overflow-hidden'
			>
				<fog attach='fog' args={[0x000000, 0.04]} />
				<Suspense fallback={null}>
					<Particles />
				</Suspense>
			</Canvas>
		</div>
	)
}
