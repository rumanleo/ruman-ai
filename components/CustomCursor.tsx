'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [cursorSize, setCursorSize] = useState(24) // default size in pixels

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'button' || 
          target.tagName.toLowerCase() === 'a') {
        setIsHovering(true)
        setCursorSize(40) // larger size for interactive elements
      } else if (target.classList.contains('mask-text')) {
        setIsHovering(true)
        setCursorSize(80) // even larger for text masking
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      setCursorSize(24) // reset to default size
    }

    const handleMouseEnterWindow = () => {
      setIsVisible(true)
    }

    const handleMouseLeaveWindow = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseenter', handleMouseEnterWindow)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
    }
  }, [])

  // Don't render anything on touch devices
  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed rounded-full pointer-events-none mix-blend-difference"
      animate={{
        scale: isHovering ? 1 : 1,
        opacity: isVisible ? 1 : 0,
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
        width: cursorSize,
        height: cursorSize
      }}
      style={{
        backgroundColor: 'white',
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.2
      }}
    />
  )
}

export default CustomCursor 