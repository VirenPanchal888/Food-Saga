"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Clock, ExternalLink, Volume2, VolumeX, Play, Pause, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 })
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)
  const [videoNaturalDimensions, setVideoNaturalDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsLoaded(true)

    // Enhanced mobile detection and screen dimension tracking
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio || 1

      setIsMobile(width < 768)
      setScreenDimensions({ width, height })
      setDevicePixelRatio(pixelRatio)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", () => {
      setTimeout(checkMobile, 200) // Increased delay for orientation change
    })

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsVideoLoaded(true)
      // Auto-play the video when loaded
      video.play().catch((error) => {
        console.error("Auto-play failed:", error)
        if (error.name === "NotAllowedError") {
          console.log("Auto-play prevented by browser policy")
        }
      })
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setVideoError(true)
      console.error("Video error occurred")
    }

    const handleLoadedMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        const aspectRatio = video.videoWidth / video.videoHeight
        setVideoNaturalDimensions({ width: video.videoWidth, height: video.videoHeight })
        console.log(`Video natural dimensions: ${video.videoWidth}x${video.videoHeight}, aspect ratio: ${aspectRatio}`)
      }
    }

    const handleCanPlay = () => {
      // Ensure video quality is optimized
      if (video.readyState >= 3) {
        console.log("Video ready for optimal playback")
      }
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch((error) => {
        console.error("Error playing video:", error)
        if (error.name === "NotAllowedError") {
          setVideoError(true)
        }
      })
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // Direct Google Maps link for Food Saga
  const googleMapsLink = "https://maps.app.goo.gl/5eeSr5Vp8mqA7Fuu8"

  // WhatsApp link with pre-filled message
  const whatsappLink =
    "https://wa.me/919876543210?text=Hello!%20I'd%20like%20to%20know%20more%20about%20AMAI%20Experience."

  // Calculate optimal video container dimensions based on natural aspect ratio
  const getVideoContainerStyle = () => {
    const containerWidth = isMobile
      ? screenDimensions.width < 480
        ? screenDimensions.width - 32
        : screenDimensions.width - 64
      : 600 // Desktop container width

    let containerHeight

    if (videoNaturalDimensions.width && videoNaturalDimensions.height) {
      // Use natural aspect ratio to calculate height
      const aspectRatio = videoNaturalDimensions.width / videoNaturalDimensions.height
      containerHeight = containerWidth / aspectRatio
    } else {
      // Fallback dimensions
      if (isMobile) {
        containerHeight = screenDimensions.width < 480 ? 280 : 320
      } else {
        containerHeight = 400
      }
    }

    // Apply reasonable constraints
    const minHeight = isMobile ? 200 : 300
    const maxHeight = isMobile ? 400 : 500

    containerHeight = Math.max(minHeight, Math.min(maxHeight, containerHeight))

    return {
      width: "100%",
      height: `${containerHeight}px`,
      maxWidth: "100%",
    }
  }

  const getVideoStyle = () => {
    const baseStyle = {
      transform: "translate3d(0, 0, 0)",
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
      imageRendering: "high-quality" as const,
      WebkitImageRendering: "high-quality" as const,
      WebkitTransform: "translateZ(0)",
      willChange: "transform",
    }

    // Mobile-optimized video display settings
    if (isMobile) {
      return {
        ...baseStyle,
        objectFit: "contain" as const, // Prevent cropping on mobile
        objectPosition: "center center" as const,
        filter: "brightness(1.03) contrast(1.02) saturate(1.05) sharpen(0.2)",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }
    }

    // Desktop settings
    return {
      ...baseStyle,
      objectFit: "cover" as const,
      objectPosition: "center center" as const,
      filter: "brightness(1.05) contrast(1.03) saturate(1.1)",
      width: "100%",
      height: "100%",
    }
  }

  return (
    <div
      className={`min-h-screen bg-white text-black pt-16 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wider mb-4 md:mb-8 text-black drop-shadow-lg lg:text-7xl font-medium">
            VISIT US
          </h1>
          <div className="w-8 sm:w-12 md:w-16 h-px bg-black/70 mx-auto mb-4 md:mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-black/90 mb-4 md:mb-8 drop-shadow-md">
            Experience Food Saga in the Heart of Kolhapur
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Details */}
            <div className="space-y-8 lg:space-y-12">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-gray-700">
                  Come find out what the hype is all about!
                </h2>

                <div className="space-y-6 lg:space-y-8">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl leading-relaxed mb-2 text-gray-700">ADDRESS</h3>
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer"
                      >
                        Food Saga, Sardar Colony, Tarabai Park,
                        <br />
                        Kolhapur, 416003
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl leading-relaxed mb-2 text-gray-700">PHONE</h3>
                      <a
                        href="tel:+919876543210"
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200"
                      >
                        +91 9765230838
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl leading-relaxed mb-2 text-gray-700">WHATSAPP</h3>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200"
                      >
                        +91 9765230838
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Quick responses during business hours</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 mt-1 text-black flex-shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl leading-relaxed mb-2 text-gray-700">
                        OPENING HOURS
                      </h3>
                      <div className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 space-y-1">
                        <p>Monday - Friday: 12:30 PM - 12:30 PM</p>
                        <p>Weekends: 12:00 AM - 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Actions */}
              <div className="bg-gray-50 p-4 lg:p-6 rounded-lg border border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 text-gray-700">QUICK CONTACT</h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+919876543210"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm lg:text-base"
                    style={{ minHeight: "44px" }}
                  >
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>CALL NOW</span>
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm lg:text-base"
                    style={{ minHeight: "44px" }}
                  >
                    <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-gray-700">
                  FOLLOW US
                </h2>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/foodsaga__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>@foodsaga__</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Find Us Section with Optimized Video */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-gray-700">FIND US</h2>

                {/* Location Image */}
                <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-900 shadow-2xl" style={getVideoContainerStyle()}>
                  <img
                    src="/food-saga-happy-hour.jpeg"
                    alt="Food Saga Happy Hour Location"
                    className="w-full h-full object-cover"
                    style={getVideoStyle()}
                  />
                </div>

                {/* View on Google Maps Link */}
                <div className="text-center">
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 hover:text-black transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-black pb-1"
                  >
                    <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>VIEW ON GOOGLE MAPS</span>
                  </a>
                </div>
              </div>

              {/* Get Directions */}
              <div className="bg-gray-50 p-4 lg:p-8 rounded-lg border border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 text-gray-700">GET DIRECTIONS</h3>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-gray-700">
                  Click below to open our location in Google Maps and get turn-by-turn directions to AMAI Experience.
                </p>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-black text-white px-4 py-3 lg:px-6 lg:py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm lg:text-base"
                >
                  <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>OPEN IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* AMAI Logo */}
            <div className="flex justify-center">
              <img
                src="/amai-logo-new.png"
                alt="AMAI Experience Logo"
                className="h-10 lg:h-12 w-auto hover:opacity-80 transition-opacity duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-white/30 mx-auto"></div>

            {/* Location */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl md:text-2xl font-light text-white">Food Saga - Old house cafe</p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200">
                Kolhapur, Maharashtra, India
              </p>
            </div>

            {/* Contact Methods */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a
                href="tel:+919876543210"
                className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 hover:text-white transition-colors duration-200"
              >
                +91 9765230838
              </a>
              <div className="hidden sm:block w-px h-4 bg-white/30"></div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 hover:text-white transition-colors duration-200"
              >
                WhatsApp
              </a>
            </div>

            {/* Social */}
            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/foodsaga__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 hover:text-white transition-colors duration-200"
              >
                @foodsaga__
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-lg sm:text-xl font-light text-center text-gray-300 md:text-xl">
                Where every taste tells a story, and every visit is a moment to cherish.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
