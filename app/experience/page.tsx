"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

const allGalleryItems = [
  // Latest Menu & Product Launches (Reverse Chronological - Most Recent First)
  {
    name: "Strawberry Cheesecake Croissant",
    description: "A delightful pastry creation that combines the elegance of a French croissant with the richness of cheesecake and fresh strawberries. This innovation showcases our mastery of flavor combination and pastry craftsmanship, delivering an unforgettable experience with every bite",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cruffin%20is%20croissant%20muffin%20stuffed%20with%20flavoured%20creme%20%21%20Do%20you%20want%20to%20see%20this%20on%20the%20menu%20-ZlycJ8fbszm0baDppMUYJCzp4GP2DX.mp4",
    featured: true,
  },
  {
    name: "Matcha Saffron Wellness Blend",
    description: "A premium wellness-focused beverage that energizes and nourishes from within. This creation demonstrates our expertise in ingredient selection and therapeutic beverage design, combining the antioxidant power of matcha with the golden benefits of saffron for holistic wellness",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hydrated%20by%20matcha%2C%20driven%20by%20desire%E2%80%94this%20thirst%20hits%20different%20%E2%80%94%20Coconut%20Water%20Matcha%20%F0%9F%A5%A5%20%F0%9F%8D%B5-orfnHKAtTmXhGijwRzLovRATzQDXiU.mp4",
    featured: true,
  },
  {
    name: "Homemade Protein Granola",
    description: "A nutritional achievement combining homemade protein granola with creamy yogurt and antioxidant-rich chia berry compote. This creation exemplifies our commitment to high-protein nutrition without compromising on taste, reflecting our expertise in healthy indulgence",
    category: "FOOD",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glass-EVVEcgjXAqyH1kcop6W8jsGeVIrnsJ.mp4",
    featured: true,
  },
  {
    name: "Nourishing Menu Collection",
    description: "An innovative menu expansion dedicated to wholesome nutrition and wellness. This strategic offering reflects our growth in understanding customer wellness needs and our skill in crafting balanced, nourishing creations that align with health-conscious indulgence",
    category: "FOOD",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Would%20you%20like%20to%20see%20this%20on%20the%20menu%20-ijkSHFvbV8UngIbOxhqGpYINNyFeGX.mp4",
    featured: true,
  },
  {
    name: "Caffeine & Vanilla Signature",
    description: "A carefully balanced coffee creation featuring an extra dose of caffeine alongside smooth vanilla undertones. This professional-grade beverage demonstrates our technical mastery in espresso extraction and flavor layering, creating a harmonious blend for the discerning coffee enthusiast",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caffeinated%20%E2%98%95%EF%B8%8F%20%F0%9F%8C%A1%EF%B8%8F-2wCUnWrkzYijGa8tDUwdA6oPsFruJt.mp4",
    featured: true,
  },
  {
    name: "Seasonal Chocolate Collection",
    description: "A time-limited chocolate offering showcasing our expertise in seasonal menu planning and premium cocoa sourcing. This exclusive creation emphasizes our ability to create urgency while maintaining the highest standards of craft and quality in every chocolate creation",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chewww-WAhw3ilrnIcpegWB5kv9VnsmnBGZcC.mp4",
    featured: true,
    limited: true,
  },
  // Foundation - Core Experience Videos
  {
    name: "The Art of Creation",
    description: "Behind-the-scenes footage of our artisanal coffee and pastry creation process, showcasing precision and passion",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.34.54_f5209451-NdZqrUv42cesK3bB4ErrMxkzy4sAUd.mp4",
    featured: true,
  },
  {
    name: "Artisanal Creation",
    description: "Behind the scenes—witness the artistry in every pour and presentation",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.34.54_f5209451-NdZqrUv42cesK3bB4ErrMxkzy4sAUd.mp4",
    featured: true,
  },
  {
    name: "Pistachio Latte Iced",
    description: "Layers of creamy pistachio perfection with crushed nuts and artisanal presentation",
    category: "COFFEE",
    image: "/images/pistachio-latte-iced.jpg",
    featured: true,
  },
  {
    name: "Strawberry Latte",
    description: "Layers of flavor in every sip with fresh strawberry and creamy milk",
    category: "COFFEE",
    image: "/images/strawberry-latte.jpg",
    featured: true,
  },
  {
    name: "Strawberry Elderflower Espresso",
    description: "Limited Edition Valentine's special—grab it while you can",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Limited%20Edition%20Strawberry%20Elderflower%20Espresso.%20Dropping%20today%20for%20valentines%20week%20only%20.%20Grab%20it%20while%20you%20can-Lg4EzIBo872ltr24o9tAgezzJbGRzy.mp4",
    featured: true,
    limited: true,
  },
  {
    name: "Strawberry Protein Smoothie with Pastry",
    description:
      "Wellness meets indulgence—a vibrant strawberry protein smoothie paired with our signature artisanal pastry, topped with fresh cream and strawberry garnish",
    category: "COFFEE",
    image: "/images/strawberry-protein-smoothie-pastry.jpg",
    featured: true,
  },
  // Tea Items
  {
    name: "Coconut Water Matcha",
    description: "Hydrated by matcha, driven by desire—this thirst hits different",
    category: "TEA",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hydrated%20by%20matcha%2C%20driven%20by%20desire%E2%80%94this%20thirst%20hits%20different%20%E2%80%94%20Coconut%20Water%20Matcha%20%F0%9F%A5%A5%20%F0%9F%8D%B5-orfnHKAtTmXhGijwRzLovRATzQDXiU.mp4",
    featured: true,
  },
  // Pastries
  {
    name: "Culinary Artistry",
    description: "The delicate process of creating perfection—every detail matters",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.35.06_f2eed39c-P4Kvn0pRE4dCjUMHx9UdjvF5b4Ehib.mp4",
    featured: true,
  },
  {
    name: "Koko - Thai Coconut Inspiration",
    description:
      "Soham's love for Thai coconut desserts comes alive in Koko—capturing the essence of fresh, tender coconuts. Each slice transports you to Thailand with creamy, balanced sweetness crafted from culinary adventures",
    category: "PASTRIES",
    image: "/images/koko-coconut-cake.jpg",
    featured: true,
  },
  {
    name: "Balance is Key",
    description:
      "The perfect harmony of indulgence—rich dark chocolate cake meets light coconut pastry, showcasing our philosophy that balance creates the most memorable experiences",
    category: "PASTRIES",
    image: "/images/balance-dessert-duo.jpg",
    featured: true,
  },
  {
    name: "Strawberry Choux",
    description: "Delicate choux pastry filled with strawberry cream, topped with fresh berries and pistachios",
    category: "PASTRIES",
    image: "/images/strawberry-choux.jpg",
    featured: true,
  },
  {
    name: "Strawberry Collection",
    description: "Painting your feed berry red—an artisanal spread of our finest strawberry creations",
    category: "PASTRIES",
    image: "/images/strawberry-collection.jpg",
    featured: true,
    collection: true,
  },
  {
    name: "Mango Delice",
    description: "Pure Alphonso mango indulgence with artistic swirl presentation",
    category: "PASTRIES",
    image: "/images/mango-delice.jpg",
    featured: true,
  },
  {
    name: "Strawberry Cake",
    description: "Soft homemade vanilla sponge layered with crème diplomat, fresh strawberry and chantilly garnish",
    category: "PASTRIES",
    image: "/images/strawberry-cake.jpg",
    featured: true,
  },
  {
    name: "Tiramisu 2.0",
    description: "We have moved from jar to artisanal presentation—the ultimate crowd pleaser",
    category: "PASTRIES",
    image: "/images/tiramisu.jpg",
    featured: true,
  },
  {
    name: "Lazy Cat Cake",
    description: "Layers of chocolate indulgence with cream and crunchy elements",
    category: "PASTRIES",
    image: "/images/lazy-cat-cake.jpg",
    featured: true,
  },
  {
    name: "Protein Cake",
    description: "Inspired by healthy living—egg-free, gluten-free, protein-rich, low-calorie dessert",
    category: "PASTRIES",
    image: "/images/protein-cake.jpg",
    featured: true,
  },
  {
    name: "Strawberry Cheesecake Croissant",
    description: "This is what dreams are made of—flaky croissant with strawberry cheesecake filling",
    category: "PASTRIES",
    image: "/images/strawberry-croissant.jpg",
    featured: true,
  },
  // Bowls
  {
    name: "Avocado Strawberry Granola",
    description: "Nourishment in a bowl—fresh strawberry and chantilly garnish with house-made granola",
    category: "BOWLS",
    image: "/images/avocado-strawberry-granola.jpg",
    featured: true,
  },
  {
    name: "Avocado Blueberry Granola Bowl",
    description: "Wholesome indulgence with fresh blueberries and creamy avocado base",
    category: "BOWLS",
    image: "/images/avocado-blueberry-granola.jpg",
    featured: true,
  },
  // New Artisanal Creations
  {
    name: "Crystal Clear Perfection",
    description: "The art of glassware meets liquid artistry—every pour tells a story",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glass-EVVEcgjXAqyH1kcop6W8jsGeVIrnsJ.mp4",
    featured: true,
  },
  {
    name: "Pistachio Artistry",
    description: "Witness the delicate process of crafting our signature pistachio creations",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pista-W3dMRDhgzWXdZqR8ltCCBtBAdSg2un.mp4",
    featured: true,
  },
  {
    name: "Texture & Sensation",
    description: "Experience the symphony of textures that define our artisanal approach",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.54.28_f98d6a7f-NVA9qRuRtjH9xqR0IZnuVPlyUfyFjY.mp4",
    featured: true,
  },
  {
    name: "The Perfect Bite",
    description: "Capturing the moment when texture meets flavor—pure indulgence",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chewww-WAhw3ilrnIcpegWB5kv9VnsmnBGZcC.mp4",
    featured: true,
  },
  // New Menu Innovations
  {
    name: "Hello Cloudy",
    description: "Ethereal clouds meet liquid artistry—a dreamy creation that floats between reality and indulgence",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hello%20Cloudy%20%E2%98%81%EF%B8%8F-MPIHuhHikActneJMz8lskk0pcLsIn7.mp4",
    featured: true,
  },
  {
    name: "Cruffin Revolution",
    description: "Croissant meets muffin in perfect harmony—stuffed with flavoured crème and endless possibilities",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cruffin%20is%20croissant%20muffin%20stuffed%20with%20flavoured%20creme%20%21%20Do%20you%20want%20to%20see%20this%20on%20the%20menu%20-ZlycJ8fbszm0baDppMUYJCzp4GP2DX.mp4",
    featured: true,
    limited: true,
  },
  {
    name: "Menu Innovation",
    description: "Witness the birth of tomorrow's favorites—artisanal creations waiting for your approval",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Would%20you%20like%20to%20see%20this%20on%20the%20menu%20-ijkSHFvbV8UngIbOxhqGpYINNyFeGX.mp4",
    featured: true,
  },
  // Premium Signature Creations
  {
    name: "Chocolate Lazy Cat Cup",
    description: "An indulgent chocolate creation that embodies our philosophy of guilt-free indulgence—rich, smooth, and utterly irresistible. A signature that captures the essence of pure chocolate bliss",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hello%20Cloudy%20%E2%98%81%EF%B8%8F-MPIHuhHikActneJMz8lskk0pcLsIn7.mp4",
    featured: true,
    limited: true,
  },
  {
    name: "Chocolate Chip Banana Bread",
    description: "A snack-worthy masterpiece combining wholesome banana with decadent chocolate chips. The perfect balance of healthy indulgence and artisanal craftsmanship that makes every bite memorable",
    category: "PASTRIES",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-06-05%20at%2015.54.28_f98d6a7f-NVA9qRuRtjH9xqR0IZnuVPlyUfyFjY.mp4",
    featured: true,
  },
  {
    name: "Tiramisu Latte Limited Drop",
    description: "Weekend alert—our exclusive limited-edition Tiramisu Latte, available only from 5-8th September. A professional-grade espresso creation infused with authentic tiramisu flavors, capturing the essence of Italian elegance in a cup",
    category: "COFFEE",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Limited%20Edition%20Strawberry%20Elderflower%20Espresso.%20Dropping%20today%20for%20valentines%20week%20only%20.%20Grab%20it%20while%20you%20can-Lg4EzIBo872ltr24o9tAgezzJbGRzy.mp4",
    featured: true,
    limited: true,
  },
]

interface VideoState {
  isPlaying: boolean
  isLoading: boolean
  isMuted: boolean
  hasError: boolean
  isInView: boolean
  hasUserInteracted: boolean
}

export default function ExperiencePage() {
  const [selectedItem, setSelectedItem] = useState<(typeof allGalleryItems)[0] | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [validItems, setValidItems] = useState<typeof allGalleryItems>([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [videoStates, setVideoStates] = useState<Map<string, VideoState>>(new Map())
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const playingVideos = useRef<Set<string>>(new Set())

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Track user interaction for autoplay permissions
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserHasInteracted(true)
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [])

  // Filter function to check if media exists and is not a placeholder
  const isValidMediaItem = (item: (typeof allGalleryItems)[0]) => {
    const hasValidImage =
      item.image &&
      !item.image.includes("placeholder.svg") &&
      !item.image.includes("placeholder") &&
      item.image.trim() !== ""

    const hasValidVideo = item.video && !item.video.includes("placeholder") && item.video.trim() !== ""

    return hasValidImage || hasValidVideo
  }

  // Update video state
  const updateVideoState = useCallback((itemName: string, updates: Partial<VideoState>) => {
    setVideoStates((prev) => {
      const newStates = new Map(prev)
      const currentState = newStates.get(itemName) || {
        isPlaying: false,
        isLoading: false,
        isMuted: false,
        hasError: false,
        isInView: false,
        hasUserInteracted: false,
      }
      newStates.set(itemName, { ...currentState, ...updates })
      return newStates
    })
  }, [])

  // Handle video play/pause with error handling
  const handleVideoPlayback = useCallback(
    async (video: HTMLVideoElement, itemName: string, shouldPlay: boolean) => {
      try {
        if (shouldPlay) {
          updateVideoState(itemName, { isLoading: true })

          // Ensure video is ready to play
          if (video.readyState < 3) {
            await new Promise((resolve, reject) => {
              const timeout = setTimeout(() => reject(new Error("Video load timeout")), 10000)
              video.addEventListener(
                "canplaythrough",
                () => {
                  clearTimeout(timeout)
                  resolve(void 0)
                },
                { once: true },
              )
            })
          }

          // Try to play with audio first, fallback to muted if blocked
          try {
            video.muted = false
            await video.play()
            updateVideoState(itemName, {
              isPlaying: true,
              isLoading: false,
              isMuted: false,
              hasUserInteracted: userHasInteracted,
            })
            playingVideos.current.add(itemName)
          } catch (audioError) {
            // Fallback to muted autoplay
            video.muted = true
            await video.play()
            updateVideoState(itemName, {
              isPlaying: true,
              isLoading: false,
              isMuted: true,
              hasUserInteracted: userHasInteracted,
            })
            playingVideos.current.add(itemName)
          }
        } else {
          video.pause()
          updateVideoState(itemName, { isPlaying: false, isLoading: false })
          playingVideos.current.delete(itemName)
        }
      } catch (error) {
        console.warn(`Video playback error for ${itemName}:`, error)
        updateVideoState(itemName, {
          hasError: true,
          isLoading: false,
          isPlaying: false,
        })
        playingVideos.current.delete(itemName)
      }
    },
    [updateVideoState, userHasInteracted],
  )

  // Intersection Observer for video autoplay
  useEffect(() => {
    if (reducedMotion) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemName = entry.target.getAttribute("data-item-name")
          if (!itemName) return

          const video = videoRefs.current.get(itemName)
          if (!video) return

          const isInView = entry.isIntersecting && entry.intersectionRatio > 0.5
          updateVideoState(itemName, { isInView })

          if (isInView) {
            // Limit concurrent playing videos to prevent performance issues
            if (playingVideos.current.size < 2) {
              handleVideoPlayback(video, itemName, true)
            }
          } else {
            handleVideoPlayback(video, itemName, false)
          }
        })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px", // Only trigger when video is well within viewport
      },
    )

    // Observe all video containers
    const videoContainers = document.querySelectorAll("[data-item-name]")
    videoContainers.forEach((container) => {
      if (observerRef.current) {
        observerRef.current.observe(container)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [validItems, handleVideoPlayback, updateVideoState, reducedMotion])

  // Toggle video mute
  const toggleVideoMute = useCallback(
    (itemName: string) => {
      const video = videoRefs.current.get(itemName)
      const state = videoStates.get(itemName)

      if (video && state) {
        video.muted = !video.muted
        updateVideoState(itemName, { isMuted: video.muted, hasUserInteracted: true })
        setUserHasInteracted(true)
      }
    },
    [videoStates, updateVideoState],
  )

  // Keyboard navigation for videos
  const handleVideoKeyDown = useCallback(
    (event: React.KeyboardEvent, itemName: string) => {
      const video = videoRefs.current.get(itemName)
      if (!video) return

      switch (event.key) {
        case " ":
        case "Enter":
          event.preventDefault()
          const state = videoStates.get(itemName)
          if (state?.isPlaying) {
            handleVideoPlayback(video, itemName, false)
          } else {
            handleVideoPlayback(video, itemName, true)
          }
          setUserHasInteracted(true)
          break
        case "m":
        case "M":
          event.preventDefault()
          toggleVideoMute(itemName)
          break
      }
    },
    [videoStates, handleVideoPlayback, toggleVideoMute],
  )

  // Validate media items on component mount
  useEffect(() => {
    const validateItems = async () => {
      const filteredItems = allGalleryItems.filter(isValidMediaItem)
      setValidItems(filteredItems)
      setLoadingItems(false)
      setIsLoaded(true)

      // Initialize video states
      filteredItems.forEach((item) => {
        if (item.video) {
          updateVideoState(item.name, {
            isPlaying: false,
            isLoading: false,
            isMuted: true,
            hasError: false,
            isInView: false,
            hasUserInteracted: false,
          })
        }
      })
    }

    validateItems()
  }, [updateVideoState])

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (selectedItem) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedItem])

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white bg-opacity-60 z-10"></div>
          <Image src="/images/strawberry-choux.jpg" alt="AMAI Experience" fill className="object-cover" priority />
        </div>
        <div className="relative z-20 text-center text-black max-w-4xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal tracking-wider mb-4 md:mb-8 text-black drop-shadow-lg">
            EXPERIENCE
          </h1>
          <div className="w-8 sm:w-12 md:w-16 h-px bg-black/70 mx-auto mb-4 md:mb-8"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-black/90 mb-4 md:mb-8 drop-shadow-md">
            A visual journey through our artisanal creations
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Where minimalism meets indulgence in a symphony of flavors and textures
          </p>
        </div>
      </section>

      {/* Experience Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 md:mb-8 text-black drop-shadow-lg">
              THE SAGA EXPERIENCE
            </h2>
            <div className="w-8 sm:w-12 md:w-16 h-px bg-black/70 mx-auto mb-4 md:mb-8"></div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Step into a world where every moment is crafted to inspire tranquility and delight. At FOOD SAGA, we believe in
              the power of slowing down, savoring each bite, and finding joy in life's simple pleasures.
            </p>
          </div>

          {/* Loading State */}
          {loadingItems && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-2">
                <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-black rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-4 h-4 bg-black rounded-full animate-pulse animation-delay-400"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading our artisanal creations...</p>
            </div>
          )}

          {/* Dynamic Gallery Grid with Enhanced Video Support */}
          {!loadingItems && validItems.length > 0 && (
            <div className="space-y-8 sm:space-y-12 mb-20">
              {validItems.map((item, index) => {
                const videoState = videoStates.get(item.name)

                return (
                  <div
                    key={`${item.name}-${index}`}
                    className={`group cursor-pointer overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onClick={() => setSelectedItem(item)}
                    data-item-name={item.video ? item.name : undefined}
                  >
                    {/* Media Container - Full width with natural aspect ratio */}
                    <div className="w-full overflow-hidden relative">
                      {item.video ? (
                        <div className="w-full relative bg-gray-50 flex items-center justify-center overflow-hidden" style={{ aspectRatio: "16/9" }}>
                          <video
                            ref={(el) => {
                              if (el) {
                                videoRefs.current.set(item.name, el)
                              }
                            }}
                            className="w-full h-full max-h-[70vh] object-contain"
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            muted={videoState?.isMuted !== false}
                            onLoadStart={() => updateVideoState(item.name, { isLoading: true })}
                            onCanPlayThrough={() => updateVideoState(item.name, { isLoading: false })}
                            onError={(e) => {
                              const videoElement = e.currentTarget as HTMLVideoElement
                              const errorCode = videoElement.error?.code
                              const errorMessage =
                                errorCode === 1 ? "MEDIA_ERR_ABORTED" :
                                  errorCode === 2 ? "MEDIA_ERR_NETWORK" :
                                    errorCode === 3 ? "MEDIA_ERR_DECODE" :
                                      errorCode === 4 ? "MEDIA_ERR_SRC_NOT_SUPPORTED" :
                                        "UNKNOWN_ERROR"
                              console.warn(`[v0] Video load warning for "${item.name}": ${errorMessage} (code: ${errorCode})`)
                              updateVideoState(item.name, { hasError: false, isLoading: false })
                            }}
                            onPlay={() => updateVideoState(item.name, { isPlaying: true })}
                            onPause={() => updateVideoState(item.name, { isPlaying: false })}
                            tabIndex={0}
                            role="button"
                            aria-label={`Video: ${item.name}. Press space to play/pause, M to mute/unmute`}
                            onKeyDown={(e) => handleVideoKeyDown(e, item.name)}
                          >
                            <source src={item.video} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
                            <p>Your browser does not support HTML5 video. Please upgrade to a modern browser.</p>
                          </video>

                          {/* Video Loading Spinner */}
                          {videoState?.isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                              <div className="bg-white bg-opacity-90 rounded-full p-4">
                                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            </div>
                          )}

                          {/* Video Error State */}
                          {videoState?.hasError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
                                <svg
                                  className="h-8 w-8 text-red-500 mx-auto mb-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <p className="text-sm text-gray-700">Video unavailable</p>
                              </div>
                            </div>
                          )}

                          {/* Video Controls Overlay */}
                          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Mute/Unmute Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleVideoMute(item.name)
                              }}
                              className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-all duration-200"
                              aria-label={videoState?.isMuted ? "Unmute video" : "Mute video"}
                            >
                              {videoState?.isMuted ? (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                  />
                                </svg>
                              ) : (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                  />
                                </svg>
                              )}
                            </button>

                            {/* Play/Pause Indicator */}
                            <div className="bg-black bg-opacity-70 text-white rounded-full p-2">
                              {videoState?.isPlaying ? (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 9v6m4-6v6"
                                  />
                                </svg>
                              ) : (
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                            </div>
                          </div>

                          {/* Autoplay Indicator */}
                          {videoState?.isInView && !videoState?.hasUserInteracted && (
                            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                              AUTO-PLAYING
                            </div>
                          )}
                        </div>
                      ) : item.image ? (
                        <div className="w-full relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={1200}
                            height={800}
                            className="w-full h-auto max-h-[70vh] object-contain bg-gray-50"
                            onError={(e) => {
                              console.warn(`Image failed to load: ${item.image}`)
                              e.currentTarget.style.display = "none"
                            }}
                          />

                          {/* Image Hover Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                        </div>
                      ) : null}

                      {/* Badges */}
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                        {item.limited && (
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                            LIMITED EDITION
                          </span>
                        )}
                        {item.collection && (
                          <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                            COLLECTION
                          </span>
                        )}
                        {item.featured && !item.limited && !item.collection && (
                          <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="p-6 text-black">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-light tracking-wide mb-2">{item.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <span className="text-xs uppercase tracking-wider text-gray-500 ml-4 whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* No Content State */}
          {!loadingItems && validItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-light text-gray-600 mb-2">No Media Available</h3>
              <p className="text-gray-500">Our artisanal creations are being prepared for display.</p>
            </div>
          )}

          {/* Content Count Display */}
          {!loadingItems && validItems.length > 0 && (
            <div className="text-center mb-12">
              <p className="text-sm text-gray-500">
                Showcasing {validItems.length} artisanal creation{validItems.length !== 1 ? "s" : ""}
                {validItems.filter((item) => item.video).length > 0 && (
                  <span className="block mt-1">
                    {validItems.filter((item) => item.video).length} interactive video
                    {validItems.filter((item) => item.video).length !== 1 ? "s" : ""} with autoplay
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Reduced Motion Notice */}
          {reducedMotion && (
            <div className="text-center mb-12 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Video autoplay is disabled due to your reduced motion preference. Click videos to play manually.
              </p>
            </div>
          )}

          {/* Rest of the sections remain the same... */}
          {/* Ambiance Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg md:text-xl font-medium tracking-wide text-black">
                Indulge • Relax • Slow Down
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed text-left">
                Our philosophy centers around creating moments of mindful indulgence. Every table setting, every
                carefully crafted beverage, and every artisanal creation is designed to encourage you to pause, breathe,
                and truly savor the experience.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed text-left">
                The gentle play of natural light across our marble surfaces, the thoughtful arrangement of each dish,
                and the warm ambiance all work together to create a sanctuary where time moves at your pace.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/indulge-relax-slowdown.jpg"
                alt="AMAI table setting with natural lighting"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Quality & Craftsmanship */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-lg">
              <Image
                src="/images/amai-interior.png"
                alt="AMAI café interior with modern design"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-base sm:text-lg md:text-xl font-medium tracking-wide text-black">
                Artisanal Excellence
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed text-left">
                From the creativity of our chefs to the warmth of our hospitality team, every member of Food Saga is, devoted to delivering an exceptional dining experience. We take pride in crafting flavorful dishes, fostering meaningful connections, and creating an inviting atmosphere that makes every visit memorable.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed text-left">
                From the skill of our chefs to the attentiveness of our service team, every member is dedicated to delivering an experience delivering
                an experience that exceeds expectations while maintaining the serene defines Food Saga.
              </p>
            </div>
          </div>

          {/* Seasonal Offerings */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg md:text-xl font-medium tracking-wide text-black">Seasonal Harmony</h3>
              <p className="text-lg text-gray-800 leading-relaxed text-left">
                We celebrate the rhythm of seasons through our ever-evolving menu. Our Grilled chicken with spicy peri peri sauce,
                prepared with carefully selected ingredients and bold flavors, embodies our dedication to exceptional
                taste, quality, and the art of great hospitality.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed text-left">
                Each seasonal offering is thoughtfully developed to complement the natural energy of the time, whether
                it's the warming spices of autumn or the fresh vibrancy of spring ingredients.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/pumpkin-spice-protein-cake.jpg"
                alt="Seasonal pumpkin spice protein cake with layered coffee"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Mindful Moments */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="/images/layered-coffee-pastries.png"
                  alt="Layered coffee drinks with floral garnishes"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <h4 className="text-xl font-medium tracking-wide text-black mb-3">Artful Presentation</h4>
              <p className="text-gray-700">
                Every beverage is a canvas, every garnish a brushstroke. Our layered creations are designed to delight
                the eyes before they enchant the palate.
              </p>
            </div>

            <div className="text-center">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="/images/strawberry-protein-smoothie.jpg"
                  alt="Strawberry protein smoothie with elegant dessert"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <h4 className="text-xl font-medium tracking-wide text-black mb-3">Wellness & Indulgence</h4>
              <p className="text-gray-700">
                We believe wellness and indulgence can coexist beautifully. Our protein smoothies and health-conscious
                options never compromise on flavor or presentation.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h4 className="text-xl font-medium tracking-wide text-black mb-3">Your Moment</h4>
                  <p className="text-gray-700">
                    Every visit to Food Saga is an invitation to create your own perfect moment of tranquility and taste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-95 flex items-center justify-center p-4 touch-manipulation">
          <div className="max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 p-3 sm:p-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200 touch-manipulation"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 h-full">
              {/* Full Size Image/Video - Preserving aspect ratio */}
              <div className="relative h-[40vh] sm:h-[50vh] lg:h-[80vh] overflow-hidden rounded-lg flex items-center justify-center bg-gray-50">
                {selectedItem.video ? (
                  <video className="max-w-full max-h-full object-contain" autoPlay muted loop controls playsInline>
                    <source src={selectedItem.video} type="video/mp4" />
                  </video>
                ) : selectedItem.image ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : null}
              </div>

              {/* Content */}
              <div className="text-black p-4 sm:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="text-base sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 font-medium">
                      {selectedItem.category}
                    </div>
                    {selectedItem.limited && (
                      <div className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium tracking-wider">
                        LIMITED EDITION
                      </div>
                    )}
                    {selectedItem.collection && (
                      <div className="bg-pink-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium tracking-wider">
                        COLLECTION
                      </div>
                    )}
                    {selectedItem.featured && !selectedItem.limited && !selectedItem.collection && (
                      <div className="bg-black text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium tracking-wider">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-6xl font-light tracking-wide leading-tight">
                    {selectedItem.name}
                  </h2>
                  <p className="text-base sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  )
}
