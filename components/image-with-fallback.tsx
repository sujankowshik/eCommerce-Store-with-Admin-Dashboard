"use client"

import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
}

export function ImageWithFallback({ src, alt, fallbackSrc, className = "", width, height }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      const fallback =
        fallbackSrc || `/placeholder.svg?height=${height || 300}&width=${width || 300}&text=${encodeURIComponent(alt)}`
      setImgSrc(fallback)
    }
  }

  return <img src={imgSrc || "/placeholder.svg"} alt={alt} className={className} onError={handleError} loading="lazy" />
}
