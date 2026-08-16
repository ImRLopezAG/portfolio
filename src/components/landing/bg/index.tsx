'use client'

import { Canvas } from '@react-three/fiber'
import { Component, type ReactNode, Suspense, useEffect, useState } from 'react'
import { Particles } from './particles'

/**
 * Probes for a usable WebGL context. three's WebGLRenderer throws when it can't
 * get one — asynchronously, so it surfaces as an unhandled rejection rather than
 * something an error boundary can catch. Checking first avoids constructing it
 * at all on machines without hardware acceleration, on blocklisted drivers, in
 * VMs, or in headless browsers.
 */
function hasWebGL(): boolean {
	try {
		const canvas = document.createElement('canvas')
		return Boolean(
			window.WebGLRenderingContext &&
				(canvas.getContext('webgl2') ?? canvas.getContext('webgl')),
		)
	} catch {
		return false
	}
}

/** Last resort for synchronous failures inside the scene graph. */
class SceneBoundary extends Component<
	{ children: ReactNode },
	{ failed: boolean }
> {
	state = { failed: false }

	static getDerivedStateFromError() {
		return { failed: true }
	}

	componentDidCatch(error: unknown) {
		console.warn('[background] 3D scene disabled:', error)
	}

	render() {
		return this.state.failed ? null : this.props.children
	}
}

export function Background3D() {
	// Resolved after mount: probing needs a DOM, and starting at `false` keeps
	// the first client render identical to the server's.
	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		setEnabled(hasWebGL())
	}, [])

	// Purely decorative — no fallback visual, just nothing.
	if (!enabled) return null

	return (
		<div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
			<SceneBoundary>
				<Canvas
					camera={{ position: [0, 0, 18], fov: 75 }}
					gl={{
						alpha: true,
						antialias: true,
						failIfMajorPerformanceCaveat: false,
					}}
					dpr={[1, 2]}
					className='overflow-hidden'
					onCreated={({ gl }) => {
						// A lost context leaves the renderer unusable; tear the scene
						// down instead of letting it throw on the next frame.
						gl.domElement.addEventListener(
							'webglcontextlost',
							(event) => {
								event.preventDefault()
								setEnabled(false)
							},
							{ once: true },
						)
					}}
				>
					<fog attach='fog' args={[0x000000, 0.04]} />
					<Suspense fallback={null}>
						<Particles />
					</Suspense>
				</Canvas>
			</SceneBoundary>
		</div>
	)
}
