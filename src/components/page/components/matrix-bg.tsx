import { FONT_SIZE, MATRIX } from '@/constants'
import { useCallback, useEffect, useRef } from 'react'

export const MatrixBackground = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<number[]>([])

  const draw = useCallback(() => {
    const $canvas = canvasRef.current
    if ($canvas == null) return
    const $canvasCTX = $canvas.getContext('2d')
    if ($canvasCTX == null) return

    $canvasCTX.fillStyle = 'rgba(0, 0, 0, 0.04)'
    $canvasCTX.fillRect(0, 0, $canvas.width, $canvas.height)

    $canvasCTX.fillStyle = '#bef264'
    $canvasCTX.font = FONT_SIZE + 'px arial'
    for (let i = 0; i < dropsRef.current.length; i++) {
      const text = MATRIX[Math.floor(Math.random() * MATRIX.length)]
      $canvasCTX.fillText(text, i * FONT_SIZE, dropsRef.current[i] * FONT_SIZE)

      if (dropsRef.current[i] * FONT_SIZE > $canvas.height && Math.random() > 0.975) dropsRef.current[i] = 0

      dropsRef.current[i]++
    }

    requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const $canvas = canvasRef.current
    if ($canvas == null) return

    $canvas.height = window.innerHeight
    $canvas.width = window.innerWidth

    const columns = $canvas.width / FONT_SIZE
    for (let x = 0; x < columns; x++) dropsRef.current[x] = 1

    requestAnimationFrame(draw)
  }, [draw])

  return <canvas ref={canvasRef} className='w-full h-[5em] rounded-t-2xl block' />
}
