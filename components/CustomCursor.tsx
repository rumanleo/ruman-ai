'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [cursorSize, setCursorSize] = useState(16) // default size in pixels
  const [isPulsating, setIsPulsating] = useState(false)
  const [isTextHover, setIsTextHover] = useState(false)
  let cursorTimer: NodeJS.Timeout

  useEffect(() => {
    // Check if device is touch-enabled and browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const updateCursorPosition = (e: MouseEvent) => {
      // Remove requestAnimationFrame delay and update position directly
      setPosition({ 
        x: e.clientX, // Use clientX for better performance
        y: e.clientY  // Use clientY for better performance
      })
      
      setIsPulsating(false)
      if (cursorTimer) clearTimeout(cursorTimer)
      cursorTimer = setTimeout(() => {
        setIsPulsating(true)
      }, 2000)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'button' || 
          target.tagName.toLowerCase() === 'a') {
        setIsHovering(true)
        setIsTextHover(false)
        setCursorSize(40)
      } else if (target.classList.contains('mask-text')) {
        setIsHovering(true)
        setCursorSize(80)
        setIsTextHover(false)
      } else if (target.tagName.toLowerCase() === 'p' || 
                target.tagName.toLowerCase() === 'span' || 
                target.tagName.toLowerCase() === 'h1' || 
                target.tagName.toLowerCase() === 'h2' || 
                target.tagName.toLowerCase() === 'h3' || 
                target.tagName.toLowerCase() === 'h4') {
        setIsTextHover(true)
        setIsHovering(false)
        setCursorSize(24) // Height of the vertical line
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      setIsTextHover(false)
      setCursorSize(16)
    }

    const handleMouseEnterWindow = () => {
      setIsVisible(true)
    }

    const handleMouseLeaveWindow = () => {
      setIsVisible(false)
    }

    // Force cursor visibility on mount for Safari
    setIsVisible(true)

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
      if (cursorTimer) clearTimeout(cursorTimer)
    }
  }, [])

  // Don't render anything on touch devices
  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ 
        willChange: 'transform',
        WebkitTransform: 'translate3d(0,0,0)',
      }}
      animate={{
        scale: isPulsating ? [1, 1.5, 1] : 1,
        opacity: isVisible ? 1 : 0,
        x: position.x - (isTextHover ? 1 : cursorSize / 2),
        y: position.y - cursorSize / 2,
        width: isTextHover ? 2 : cursorSize,
        height: isTextHover ? 20 : cursorSize,
        borderRadius: isTextHover ? 0 : '9999px',
        backgroundColor: 'pink',
        // boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      }}
      transition={{
        default: { // Add default transition for all properties
          type: "spring",
          stiffness: 400, // Increased from 150
          damping: 10,   // Increased from 15
          mass: 0.1      // Decreased from 0.2
        },
        scale: isPulsating ? {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        } : undefined,
        width: {
          type: "spring",
          stiffness: 400, // Increased from 300
          damping: 25
        },
        height: {
          type: "spring",
          stiffness: 400, // Increased from 300
          damping: 25
        }
      }}
    />
  )
}

export default CustomCursor 