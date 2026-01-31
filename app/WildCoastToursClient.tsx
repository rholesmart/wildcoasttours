"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Mail, Phone, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { sendBookingEmail } from "@/actions/send-email"

const ACCENT_COLOR = "#F7931A"

const heroImages = [
  "/images/hero-waterfall-guide.jpg",
  "/images/hero-pristine-beach.jpg",
  "/images/hero-waterfall-pool.jpg",
  "/images/hero-traditional-village.jpg",
  "/images/hero-wildflowers-waterfall.jpg",
  "/images/hero-coastal-vista.jpg",
  "/images/hero-waterfall-gorge.jpg",
  "/images/hero-rock-pools.jpg",
  "/images/hero-cattle-beach.jpg",
]

const november2025Images = [
  { src: "/images/nov-2025/beach-walk.webp", alt: "Hikers walking on misty Wild Coast beach" },
  { src: "/images/nov-2025/kayaking.webp", alt: "Group kayaking on emerald waters near cliffs" },
  { src: "/images/nov-2025/river-landscape.webp", alt: "Scenic river view with lush green hills" },
  { src: "/images/nov-2025/angel-waterfall.webp", alt: "Angel Waterfall cascading into natural pool" },
  { src: "/images/nov-2025/red-dunes.webp", alt: "Hikers crossing striking red sand dunes" },
  { src: "/images/nov-2025/cathedral-rock.webp", alt: "Cathedral Rock formation in the ocean" },
  { src: "/images/nov-2025/tall-waterfall.webp", alt: "Tall waterfall cascading down dark rock face" },
  { src: "/images/nov-2025/phiwani-homestay.webp", alt: "Welcome to Phiwani's Homestay traditional building" },
  { src: "/images/nov-2025/group-beach.webp", alt: "Hiking group taking a break on sandy beach" },
  { src: "/images/nov-2025/orange-rondavels.webp", alt: "Traditional orange and green rondavels" },
  { src: "/images/nov-2025/red-sand-dunes.webp", alt: "Orange and red sand dunes with scattered rocks under blue sky" },
  {
    src: "/images/nov-2025/firewood-carrier-beach.webp",
    alt: "Person carrying firewood bundle on head at sandy beach",
  },
  {
    src: "/images/nov-2025/woman-drinking-tea-patio.webp",
    alt: "Woman in orange dress with pink headwrap drinking tea on patio",
  },
  { src: "/images/nov-2025/cattle-grazing-green-field.webp", alt: "Mixed cattle herd grazing in lush green pasture" },
  {
    src: "/images/nov-2025/coastal-campfire-cooking.webp",
    alt: "Campfire cooking under tarp by rocky coastline with ocean view",
  },
  {
    src: "/images/nov-2025/waterfall-bluff-ocean-cliff.webp",
    alt: "Dramatic waterfall cascading down layered cliff into ocean",
  },
  {
    src: "/images/nov-2025/hikers-rock-pool-waterfall.webp",
    alt: "Hikers exploring cascading rock pools with natural waterfall",
  },
  {
    src: "/images/nov-2025/tranquil-river-rocky-hills.webp",
    alt: "Calm river flowing between rocky vegetated hills under cloudy sky",
  },
  {
    src: "/images/nov-2025/historic-stone-ruins-tour.webp",
    alt: "Group touring historic stone tower ruins with guide",
  },
  {
    src: "/images/nov-2025/rocky-stream-cliff-landscape.webp",
    alt: "Rocky stream with dramatic cliff formation and textured clouds",
  },
  { src: "/images/img-5861.webp", alt: "Pink star-shaped wildflower with yellow center among green foliage" },
  { src: "/images/img-5880.webp", alt: "Cascading waterfalls flowing into turquoise pool surrounded by rocky cliffs" },
  { src: "/images/img-5823.webp", alt: "Group photo of hikers and local hosts at tropical lodge" },
  { src: "/images/img-5906.webp", alt: "Traditional thatched-roof hut interior with colorful bedding" },
  { src: "/images/img-5837.webp", alt: "Orange kayak crossing calm estuary waters with sandy beach backdrop" },
  { src: "/images/img-5905.webp", alt: "Spacious rondavel interior with multiple beds and patterned rugs" },
  { src: "/images/img-5798.webp", alt: "Local women in traditional Mpondo dress at community gathering" },
  { src: "/images/img-5925.webp", alt: "Phiwani's Homestay wooden sign at sunset with rural landscape" },
  { src: "/images/img-5913.webp", alt: "Don't Worry Spaza Shop with vibrant green wall and hiker" },
  { src: "/images/img-5870.webp", alt: "Dramatic rock formations surrounding serene river pool" },
]

const timelineData = [
  {
    year: "2006",
    info: "Launch of AmaDiba Adventures, an eco‑tourism initiative promoting a sustainable alternative to mining.",
    type: "formation",
  },
  {
    year: "2007",
    info: "Formation of the Amadiba Crisis Committee (ACC) to lead organized resistance against titanium mining at Xolobeni.",
    type: "formation",
  },
  {
    year: "2008",
    info: "Mining rights granted to Mineral Commodities / Transworld. ACC immediately files legal appeals to block mining.",
    type: "legal",
  },
  {
    year: "2009",
    info: "Community imbizos and village declarations continue to reject mining. Petition campaigns gain momentum through local NGOs.",
    type: "mobilization",
  },
  {
    year: "2010",
    info: "Environmental monitoring and advocacy expand along the Wild Coast. ACC maintains pressure on government to revoke mining rights.",
    type: "mobilization",
  },
  {
    year: "2011",
    info: "South African government revokes mining rights at Xolobeni after persistent community objections.",
    type: "legal",
  },
  {
    year: "2012",
    info: "24,300+ signature petition submitted calling for a No‑Go Mining Zone. Large imbizos and public commitments from villagers to protect the land.",
    type: "mobilization",
  },
  {
    year: "2015",
    info: "May: Villagers block EIA consultants; barricades set up; elder assaulted with knobkerrie. December: Returning activists attacked with pangas and knobkerries; four arrests made.",
    type: "violence",
  },
  {
    year: "2016 Q1",
    info: 'January: 500+ villagers gather at Komkhulu imbizo led by the Mpondo Queen rejecting mining. Returning villagers attacked by pro‑mining faction. March: Sikhosiphi "Bazooka" Rhadebe, ACC chairperson, assassinated outside his home.',
    type: "violence",
  },
  {
    year: "2016 Q3",
    info: "July: Mining company signals withdrawal due to community resistance. September: Minister announces 18‑month mining moratorium for Xolobeni.",
    type: "violence",
  },
  {
    year: "2018",
    info: "November 22: Landmark Pretoria High Court ruling confirms the community's Right to Say No; mining requires Free, Prior & Informed Consent.",
    type: "legal",
  },
  {
    year: "2019",
    info: "Community outreach and eco‑tourism promotion expand as alternatives to mining.",
    type: "formation",
  },
  {
    year: "2020",
    info: "January: 400+ villagers confront SANRAL over N2 Toll Road linked to mining interests. July–November: Death threats against Nonhle Mbuthuma and ACC leaders. Suspicious death of Sibusiso Mqasi, community activist.",
    type: "violence",
  },
  {
    year: "2021",
    info: "June–September: ACC campaigns against N2 Toll Road route through Sigidi. December: Mass protests at Mzamba River Mouth against Shell's seismic survey. Legal interdicts filed; activists tear‑gassed and forcibly removed.",
    type: "protest",
  },
  {
    year: "2022",
    info: "February: High Court halts Shell's offshore seismic exploration. May: International climate justice recognition for ACC and SWC.",
    type: "legal",
  },
  {
    year: "2023",
    info: "Continued advocacy for sustainable development and community-led eco-tourism initiatives along the Wild Coast.",
    type: "formation",
  },
]

export default function WildCoastToursClient() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0)
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<(typeof timelineData)[0] | null>(null)
  const profileImageRef = useRef<HTMLDivElement>(null)
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hikeMonth: "",
    people: 1,
    message: "",
  })
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null)

  const [nov2025Index, setNov2025Index] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [nov2025TouchStart, setNov2025TouchStart] = useState<number | null>(null)
  const thumbnailStripRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Timeline drag state
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  // Interactive profile image states
  const [borderScale, setBorderScale] = useState(1)
  const [shadowIntensity, setShadowIntensity] = useState(20)
  const [shadowOpacity, setShadowOpacity] = useState(0.5)
  const [imageScale, setImageScale] = useState(1)
  const [imageRotate, setImageRotate] = useState(0)
  const [imageContrast, setImageContrast] = useState(1)
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [dynamicBorderColor, setDynamicBorderColor] = useState("#1B5F8C")

  const currentTimelineEvent = timelineData[currentTimelineIndex]

  // Hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const fadeElements = document.querySelectorAll(".fade-in")
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Interactive profile image animation
  useEffect(() => {
    if (isProfileHovered) {
      const hoverInterval = setInterval(() => {
        setBorderScale((prev) => 1 + Math.sin(Date.now() / 300) * 0.02)
        setShadowIntensity((prev) => 30 + Math.sin(Date.now() / 200) * 10)
        setShadowOpacity((prev) => 0.6 + Math.sin(Date.now() / 400) * 0.2)
        setImageScale((prev) => 1.15 + Math.sin(Date.now() / 500) * 0.03)
        setImageRotate((prev) => Math.sin(Date.now() / 800) * 2)
        setImageContrast((prev) => 1.1 + Math.sin(Date.now() / 600) * 0.05)
        setOverlayOpacity((prev) => 0.3 + Math.sin(Date.now() / 350) * 0.15)
        setDynamicBorderColor(
          `hsl(${200 + Math.sin(Date.now() / 1000) * 10}, 70%, ${40 + Math.sin(Date.now() / 700) * 5}%)`,
        )
      }, 50)
      return () => clearInterval(hoverInterval)
    } else {
      setBorderScale(1)
      setShadowIntensity(20)
      setShadowOpacity(0.5)
      setImageScale(1)
      setImageRotate(0)
      setImageContrast(1)
      setOverlayOpacity(0)
      setDynamicBorderColor("#1B5F8C")
    }
  }, [isProfileHovered])

  const selectTimelineEvent = (index: number) => {
    setCurrentTimelineIndex(index)
  }

  // Timeline drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setDragStartX(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const diff = dragStartX - clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentTimelineIndex < timelineData.length - 1) {
        setCurrentTimelineIndex((prev) => prev + 1)
      } else if (diff < 0 && currentTimelineIndex > 0) {
        setCurrentTimelineIndex((prev) => prev - 1)
      }
      setDragStartX(clientX)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const nextNov2025 = () => {
    setNov2025Index((prev) => (prev + 1) % november2025Images.length)
  }

  const prevNov2025 = () => {
    setNov2025Index((prev) => (prev - 1 + november2025Images.length) % november2025Images.length)
  }

  const handleNov2025TouchStart = (e: React.TouchEvent) => {
    setNov2025TouchStart(e.touches[0].clientX)
  }

  const handleNov2025TouchEnd = (e: React.TouchEvent) => {
    if (nov2025TouchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = nov2025TouchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextNov2025()
      else prevNov2025()
    }
    setNov2025TouchStart(null)
  }

  useEffect(() => {
    const activeThumb = thumbnailRefs.current[nov2025Index]
    if (activeThumb && thumbnailStripRef.current) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      })
    }
  }, [nov2025Index])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionMessage(null)
    try {
      const result = await sendBookingEmail(formData)
      if (result.success) {
        setSubmissionMessage("Thanks for your interest in joining us, we'll get back to you soon.")
        setFormData({ name: "", email: "", hikeMonth: "", people: 1, message: "" })
      } else {
        setSubmissionMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setSubmissionMessage("An unexpected error occurred. Please try again later.")
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F4F4] text-[#1B5F8C] font-ubuntu overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentHeroImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Wild Coast landscape ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-3">
          <a
            href="tel:+27724285109"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#1B5F8C] hover:bg-white transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: ACCENT_COLOR }}
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="mailto:sinegugu@wildcoasttours.co.za"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#1B5F8C] hover:bg-white transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: ACCENT_COLOR }}
            aria-label="Email us"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-ubuntu">Wild Coast Tours</h1>
          <p className="text-lg md:text-xl mb-10">Authentic Eco-Tourism Experiences in Mpondoland</p>
          <Link href="/booking">
            <Button
              className="px-8 py-3 rounded-full font-semibold hover:opacity-90 transition duration-300 transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: ACCENT_COLOR, color: "#1B5F8C" }}
            >
              Book Your Adventure
            </Button>
          </Link>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogContent className="max-w-md bg-gray-50">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#1B5F8C] text-center">Book Your Adventure</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Input
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="border-[#1B5F8C] focus:ring-[#F7931A]"
                  aria-label="Your name"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="border-[#1B5F8C] focus:ring-[#F7931A]"
                  aria-label="Your email address"
                />
                <div>
                  <label htmlFor="hikeMonth" className="block text-sm font-medium text-[#1B5F8C] mb-1">
                    Which hike would you like to join?
                  </label>
                  <select
                    id="hikeMonth"
                    required
                    value={formData.hikeMonth}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hikeMonth: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#1B5F8C] rounded-md focus:ring-[#F7931A] focus:border-[#F7931A]"
                    aria-label="Select your preferred hike month"
                  >
                    <option value="">Select a month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-[#1B5F8C]">
                    How many people? <span className="font-bold">{formData.people}</span>
                  </label>
                  <Slider
                    value={[formData.people]}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, people: value[0] }))}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                    aria-label="Number of people for the hike"
                  />
                  <div className="flex justify-between text-xs text-[#1B5F8C] opacity-70">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>
                <Textarea
                  placeholder="Additional Details & Preferences"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="border-[#1B5F8C] focus:ring-[#F7931A]"
                  aria-label="Additional preferences and special requests"
                />
                <Button
                  type="submit"
                  className="w-full hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: ACCENT_COLOR, color: "#1B5F8C" }}
                >
                  Submit Booking Request
                </Button>
              </form>
              {submissionMessage && <p className="text-center text-sm mt-4 text-[#1B5F8C]">{submissionMessage}</p>}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3 flex justify-center fade-in">
            <div
              ref={profileImageRef}
              className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div
                className="relative w-full h-full overflow-hidden rounded-full shadow-xl border-4 transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${borderScale})`,
                  boxShadow: `0 0 ${shadowIntensity}px rgba(247,147,26,${shadowOpacity})`,
                  borderColor: dynamicBorderColor,
                }}
              >
                <Image
                  src="/images/sinegugu-portrait.png"
                  alt="Sinegugu Zukulu - Guide and Environmental Activist for Wild Coast Tours"
                  fill
                  className="object-cover transition-all duration-1000 ease-out"
                  style={{
                    transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
                    filter: `contrast(${imageContrast})`,
                  }}
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                />
                <div
                  className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70 rounded-full transition-opacity duration-500"
                  style={{ opacity: overlayOpacity }}
                />
                <div
                  className="absolute inset-0 rounded-full transition-opacity duration-500 shadow-[inset_0_0_50px_rgba(247,147,26,0.3)]"
                  style={{ opacity: overlayOpacity }}
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{ opacity: overlayOpacity }}
              >
                <div
                  className="absolute top-4 left-4 w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: `${ACCENT_COLOR}99`, animationDelay: "0.1s" }}
                />
                <div
                  className="absolute top-8 right-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
                <div
                  className="absolute bottom-6 left-8 w-1 h-1 rounded-full animate-bounce"
                  style={{ backgroundColor: `${ACCENT_COLOR}cc`, animationDelay: "0.5s" }}
                />
                <div
                  className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.7s" }}
                />
              </div>
            </div>
          </div>
          <div className="md:w-2/3 fade-in">
            <div className="bg-[#1B5F8C] text-[#F4F4F4] px-3 py-1 rounded-full text-sm inline-block mb-6">
              Our Story
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 font-ubuntu">Discover Mpondoland's Beauty & Culture</h2>
            <p className="text-base mb-8">
              Wild Coast Tours offers authentic eco-tourism experiences in the breathtaking region of Mpondoland. Our
              tours are designed to showcase the stunning landscapes, rich biodiversity, and vibrant Mpondo culture, all
              while supporting sustainable community development and environmental conservation efforts led by local
              activists like Sinegugu Zukulu.
            </p>
          </div>
        </div>
      </section>

      <section id="november-2025" className="py-16 bg-[#1B5F8C]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 font-ubuntu text-white">Our Tours</h2>
          <h3 className="text-xl md:text-2xl font-bold text-center mb-10 font-ubuntu" style={{ color: ACCENT_COLOR }}>
            November 2025
          </h3>

          {/* Fullscreen Carousel */}
          <div
            className="relative w-full h-[60vh] md:h-[70vh] rounded-lg overflow-hidden"
            onTouchStart={handleNov2025TouchStart}
            onTouchEnd={handleNov2025TouchEnd}
          >
            <div className="relative w-full h-full">
              <Image
                src={november2025Images[nov2025Index].src || "/placeholder.svg"}
                alt={november2025Images[nov2025Index].alt}
                fill
                className="object-cover transition-all duration-500"
                sizes="100vw"
                priority={nov2025Index < 6}
                loading={nov2025Index < 6 ? undefined : "lazy"}
              />
              <button
                onClick={() => setZoomedImage(november2025Images[nov2025Index].src)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer z-10"
                aria-label="Zoom image"
              >
                <ZoomIn className="w-6 h-6" />
              </button>

              <button
                onClick={prevNov2025}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextNov2025}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {nov2025Index + 1} / {november2025Images.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div ref={thumbnailStripRef} className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
            {november2025Images.map((img, idx) => (
              <button
                key={idx}
                ref={(el) => {
                  thumbnailRefs.current[idx] = el
                }}
                onClick={() => setNov2025Index(idx)}
                className={`flex-shrink-0 relative w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${
                  idx === nov2025Index ? "scale-105 opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  outline: idx === nov2025Index ? `2px solid ${ACCENT_COLOR}` : "none",
                  outlineOffset: "2px",
                }}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                  loading={idx < 6 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
            aria-label="Close zoom"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
            <Image
              src={zoomedImage || "/placeholder.svg"}
              alt="Zoomed view"
              fill
              className="object-contain"
              sizes="100vw"
              onClick={(e) => e.stopPropagation()}
              priority={nov2025Index < 6}
              loading={nov2025Index < 6 ? undefined : "lazy"}
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              const newIndex = (nov2025Index - 1 + november2025Images.length) % november2025Images.length
              setNov2025Index(newIndex)
              setZoomedImage(november2025Images[newIndex].src)
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              const newIndex = (nov2025Index + 1) % november2025Images.length
              setNov2025Index(newIndex)
              setZoomedImage(november2025Images[newIndex].src)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}

      {/* Campaigns Section */}
      <section id="campaigns" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-20 fade-in font-ubuntu">
            Environmental Campaigns & Activism
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <article className="bg-[#F4F4F4] rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg fade-in cursor-pointer">
              <div className="relative h-48">
                <Image
                  src="/images/campaign-shell-protest.jpg"
                  alt="Community protest against Shell's seismic blasting on Wild Coast"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 font-ubuntu">Stopping Shell's Seismic Blasting</h3>
                <p className="text-sm mb-4">
                  Led the 2022 legal victory protecting whales and community rights against destructive seismic testing
                  along the Wild Coast.
                </p>
              </div>
            </article>

            <article className="bg-[#F9F6EE] rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg fade-in cursor-pointer">
              <div className="relative h-48">
                <Image
                  src="/images/campaign-global-advocacy.jpg"
                  alt="International environmental advocacy for Mpondoland"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 font-ubuntu">Global Environmental Advocacy</h3>
                <p className="text-sm mb-4">
                  Sharing Mpondoland's story on international platforms to build solidarity for Indigenous environmental
                  rights.
                </p>
              </div>
            </article>

            <article className="bg-[#E8F2F7] rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg fade-in cursor-pointer">
              <div className="relative h-48">
                <Image
                  src="/images/campaign-community-conservation.jpg"
                  alt="Ubuntu Philosophy - community conservation and collective stewardship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 font-ubuntu">Ubuntu Philosophy</h3>
                <p className="text-sm mb-4">
                  "I am because we are" - Our activism is rooted in collective action, shared responsibility, and the belief that environmental protection benefits the entire community.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 md:py-28 bg-[#1B5F8C] text-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-10 fade-in font-ubuntu">
            Wild Coast Environmental Activism Timeline
          </h2>

          <div
            className="text-center relative timeline-event min-h-[120px] flex flex-col justify-center px-0"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            role="tabpanel"
            id={`timeline-panel-${currentTimelineEvent.year}`}
            aria-labelledby={`timeline-tab-${currentTimelineEvent.year}`}
          >
            <h3
              className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 font-ubuntu"
              style={{ color: ACCENT_COLOR }}
            >
              {currentTimelineEvent.year}
            </h3>
            <p className="text-base md:text-lg max-w-4xl mx-auto leading-normal min-h-[120px] text-center py-4">
              {currentTimelineEvent.info}
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <div
              className="flex flex-wrap gap-3 justify-center max-w-full cursor-grab active:cursor-grabbing select-none px-2"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              role="tablist"
              aria-label="Timeline navigation"
            >
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onMouseEnter={() => !isDragging && selectTimelineEvent(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm transition-all duration-300 transform hover:scale-110 cursor-pointer ${
                    currentTimelineEvent.year === item.year
                      ? "font-bold shadow-lg scale-110"
                      : "bg-[#F4F4F4]/20 text-[#F4F4F4] hover:bg-[#F4F4F4]/40 hover:shadow-md"
                  }`}
                  style={
                    currentTimelineEvent.year === item.year ? { backgroundColor: ACCENT_COLOR, color: "#1B5F8C" } : {}
                  }
                  role="tab"
                  aria-selected={currentTimelineEvent.year === item.year}
                  aria-controls={`timeline-panel-${item.year}`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {selectedTimelineItem && (
            <div className="bg-white text-[#1B5F8C] p-6 rounded-lg shadow-xl max-w-md mx-auto mt-8">
              <h3 className="text-lg font-bold mb-2 font-ubuntu">{selectedTimelineItem.year}</h3>
              <p className="text-sm md:text-base mb-4">{selectedTimelineItem.info}</p>
              <Button
                onClick={() => setSelectedTimelineItem(null)}
                variant="ghost"
                className="hover:opacity-80 cursor-pointer"
                style={{ color: ACCENT_COLOR }}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-[#F4F4F4]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B5F8C] mb-3 font-ubuntu">
              Explore the Wild Coast
            </h2>
            <p className="text-[#1B5F8C]/70 max-w-2xl mx-auto">
              Discover the breathtaking landmarks, hiking trails, and hidden gems of Mpondoland with Sinegugu and his team
            </p>
          </div>
          
          {/* Map Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl fade-in">
            <div className="aspect-[16/9] md:aspect-[21/9] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d442089.5!2d29.7!3d-31.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sza!4v1706000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wild Coast Satellite Map - Port Edward to Port St Johns"
                className="absolute inset-0"
              />
            </div>
            
            {/* Location Labels Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <p className="text-sm font-semibold text-[#1B5F8C]">Wild Coast Region</p>
              <p className="text-xs text-[#1B5F8C]/70">Port Edward to Port St Johns</p>
            </div>
          </div>

          {/* Hiking Trail Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${ACCENT_COLOR}20` }}>
                <svg className="w-5 h-5" style={{ color: ACCENT_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1B5F8C] mb-1">Coastal Trails</h3>
              <p className="text-sm text-[#1B5F8C]/70">Over 280km of pristine coastline with dramatic cliffs and secluded beaches</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${ACCENT_COLOR}20` }}>
                <svg className="w-5 h-5" style={{ color: ACCENT_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1B5F8C] mb-1">Waterfalls</h3>
              <p className="text-sm text-[#1B5F8C]/70">Discover majestic waterfalls including Waterfall Bluff and Magwa Falls</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${ACCENT_COLOR}20` }}>
                <svg className="w-5 h-5" style={{ color: ACCENT_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1B5F8C] mb-1">Mpondo Villages</h3>
              <p className="text-sm text-[#1B5F8C]/70">Experience authentic homestays in traditional Mpondo communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#1B5F8C] text-[#F4F4F4] relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <p className="text-base font-bold font-ubuntu">Wild Coast Tours</p>
              <p className="text-xs opacity-80">Authentic Eco-Tourism Experiences in Mpondoland</p>
              <div className="mt-3">
                <span className="bg-[#1B5F8C] text-[#F4F4F4] px-3 py-1 rounded-full text-xs">
                  Promoting Eco-Mpondo Tourism
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="mailto:sinegugu@wildcoasttours.co.za"
                className="w-10 h-10 rounded-full bg-[#F4F4F4]/20 flex items-center justify-center transition-colors duration-300"
                style={{ ["--hover-bg" as string]: ACCENT_COLOR }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ACCENT_COLOR
                  e.currentTarget.style.color = "#1B5F8C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(244,244,244,0.2)"
                  e.currentTarget.style.color = "#F4F4F4"
                }}
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+27724285109"
                className="w-10 h-10 rounded-full bg-[#F4F4F4]/20 flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ACCENT_COLOR
                  e.currentTarget.style.color = "#1B5F8C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(244,244,244,0.2)"
                  e.currentTarget.style.color = "#F4F4F4"
                }}
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/wildcoasttours"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F4F4F4]/20 flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ACCENT_COLOR
                  e.currentTarget.style.color = "#1B5F8C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(244,244,244,0.2)"
                  e.currentTarget.style.color = "#F4F4F4"
                }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/Wildcoasttours/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F4F4F4]/20 flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ACCENT_COLOR
                  e.currentTarget.style.color = "#1B5F8C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(244,244,244,0.2)"
                  e.currentTarget.style.color = "#F4F4F4"
                }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm4.441 7.559c.614 0 1.114.5 1.114 1.114s-.5 1.114-1.114 1.114-1.114-.5-1.114-1.114.5-1.114 1.114-1.114zm-4.441 1.441c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5zm0-1.5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm5.5 13h-11c-1.1 0-2-.9-2-2v-11c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@wildcoasttours"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F4F4F4]/20 flex items-center justify-center transition-colors duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ACCENT_COLOR
                  e.currentTarget.style.color = "#1B5F8C"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(244,244,244,0.2)"
                  e.currentTarget.style.color = "#F4F4F4"
                }}
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.6a4.76 4.76 0 0 1-.54-.05z" />
                </svg>
              </a>
              
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-[#F4F4F4]/20">
            <p className="text-xs opacity-60">© {new Date().getFullYear()} Wild Coast Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
