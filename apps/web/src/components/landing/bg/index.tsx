'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Particles } from './particles'
export function Background3D() {
	return (
		<div className='pointer-events-none fixed inset-0 z-0'>
			<Canvas
				camera={{ position: [0, 0, 18], fov: 75 }}
				gl={{ alpha: true, antialias: true }}
				dpr={[1, 2]}
			>
				<fog attach='fog' args={[0x000000, 0.03]} />
				<Suspense fallback={null}>
					<Particles />
				</Suspense>
			</Canvas>
		</div>
	)
}
