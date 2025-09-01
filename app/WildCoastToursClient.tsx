"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { sendBookingEmail } from "@/actions/send-email" // Import the server action

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
    info: "February: ACC issues red alert over new death threats to Nonhle Mbuthuma and Thwesha Silangwe. National solidarity from NGOs and Abahlali baseMjondolo.",
    type: "violence",
  },
  {
    year: "2024",
    info: "May: Goldman Environmental Prize (Africa) awarded to Nonhle Mbuthuma & Sinegugu Zukulu. November: WWF SA Living Planet Award presented to ACC & Sustaining the Wild Coast. Media and documentaries highlight ancestral stewardship and eco‑tourism as the future.",
    type: "recognition",
  },
  {
    year: "2025",
    info: "Ongoing monitoring of land, coast, and ocean against new mining and exploration proposals. ACC and local villages remain globally recognized as leaders in community‑driven eco‑activism.",
    type: "recognition",
  },
]

export default function WildCoastToursClient() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<{ year: string; info: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    selectedHike: "",
    numberOfPeople: [2], // Using array format for Slider component
  })
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null) // New state for submission message
  const [currentTimelineEvent, setCurrentTimelineEvent] = useState(timelineData[0])
  const [isProfileHovered, setIsProfileHovered] = useState(false) // New state for profile image hover

  // State for scroll-triggered profile image zoom
  const profileImageRef = useRef<HTMLDivElement>(null)
  const [scrollZoomProgress, setScrollZoomProgress] = useState(0) // 0 to 1 for zoom progress

  // Add new state for drag functionality
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragCurrentX, setDragCurrentX] = useState(0)

  // Hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Handle fade-in for all elements with .fade-in class
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".fade-in")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Scroll handler for profile image zoom
  useEffect(() => {
    if (!profileImageRef.current) return

    const handleScroll = () => {
      if (profileImageRef.current) {
        const rect = profileImageRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        // Define the scroll range where the zoom happens
        // Zoom starts when the bottom of the element is at 85% of viewport height (starts later)
        // Zoom ends when the top of the element is at 20% of viewport height
        const startScroll = viewportHeight * 0.85
        const endScroll = viewportHeight * 0.2

        // Current position of the element's top relative to the viewport
        const elementTop = rect.top

        // Calculate progress (0 to 1)
        let progress = 0
        if (elementTop < startScroll && elementTop > endScroll) {
          progress = 1 - (elementTop - endScroll) / (startScroll - endScroll)
        } else if (elementTop <= endScroll) {
          progress = 1 // Fully zoomed in
        } else {
          progress = 0 // Not in zoom range
        }
        setScrollZoomProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionMessage(null) // Clear previous message

    // Convert the form data to include the number of people as a number
    const submissionData = {
      ...formData,
      numberOfPeople: formData.numberOfPeople[0], // Extract the number from the array
    }

    const result = await sendBookingEmail(submissionData)

    if (result.success) {
      setSubmissionMessage("Thanks for your interest in joining us, we'll get back to you soon.")
      setFormData({ name: "", email: "", message: "", selectedHike: "", numberOfPeople: [2] }) // Clear form
      // Optionally close dialog after a short delay
      setTimeout(() => setIsBookingOpen(false), 3000)
    } else {
      setSubmissionMessage("There was an error submitting your request. Please try again.")
    }
  }

  const selectTimelineEvent = (eventIndex: number) => {
    setCurrentTimelineEvent(timelineData[eventIndex])
  }

  // Add drag handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setDragStartX(clientX)
    setDragCurrentX(clientX)
  }

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setDragCurrentX(clientX)

    const dragDistance = clientX - dragStartX
    const threshold = 50 // pixels to drag before changing event

    if (Math.abs(dragDistance) > threshold) {
      const currentIndex = timelineData.findIndex((item) => item.year === currentTimelineEvent.year)
      let newIndex = currentIndex

      if (dragDistance > 0 && currentIndex > 0) {
        newIndex = currentIndex - 1
      } else if (dragDistance < 0 && currentIndex < timelineData.length - 1) {
        newIndex = currentIndex + 1
      }

      if (newIndex !== currentIndex) {
        selectTimelineEvent(newIndex)
        setDragStartX(clientX) // Reset drag start after successful change
      }
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDragStartX(0)
    setDragCurrentX(0)
  }

  // Dynamic styles for profile image zoom
  const imageScale = 1 + scrollZoomProgress * 0.3 // Slower zoom (from 0.5 to 0.3)
  const overlayOpacity = scrollZoomProgress // Opacity from 0 to 1
  const borderScale = 1 + scrollZoomProgress * 0.15 // Slower border scale (from 0.25 to 0.15)
  const shadowIntensity = scrollZoomProgress * 15 // Slower shadow blur (from 20 to 15)
  const shadowOpacity = scrollZoomProgress * 0.2 // Slower shadow opacity (from 0.3 to 0.2)
  const imageRotate = scrollZoomProgress * 5 // More fisheye rotation (from 2 to 5)
  const imageContrast = 1 + scrollZoomProgress * 0.2 // Added contrast for lens effect

  // Interpolate border color from #F9F6EE to Mpondo blue (#1B5F8C)
  const initialBorderColorR = 249
  const initialBorderColorG = 246
  const initialBorderColorB = 238
  const finalBorderColorR = 27 // R for #1B5F8C
  const finalBorderColorG = 95 // G for #1B5F8C
  const finalBorderColorB = 140 // B for #1B5F8C

  const interpolatedR = initialBorderColorR * (1 - scrollZoomProgress) + finalBorderColorR * scrollZoomProgress
  const interpolatedG = initialBorderColorG * (1 - scrollZoomProgress) + finalBorderColorG * scrollZoomProgress
  const interpolatedB = initialBorderColorB * (1 - scrollZoomProgress) + finalBorderColorB * scrollZoomProgress

  const dynamicBorderColor = `rgb(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`

  return (
    <>
      <div className="bg-[#F4F4F4] text-[#1B5F8C] min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Wild Coast landscape ${index + 1} - Pristine beaches and dramatic cliffs of Mpondoland`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B5F8C]/70 to-[#3AAFB9]/50 z-10" />

          <div className="text-center px-4 max-w-4xl relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-ubuntu">Wild Coast Tours</h1>
            <p className="text-lg md:text-xl mb-10">Authentic Eco-Tourism Experiences in Mpondoland</p>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#E2B659] text-[#1B5F8C] px-8 py-3 rounded-full font-semibold hover:bg-[#E2B659]/90 transition duration-300 transform hover:scale-105 cursor-pointer">
                  Book Your Adventure
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-gray-50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#1B5F8C] text-center">
                    Book Your Adventure
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="border-[#1B5F8C] focus:ring-[#E2B659]"
                    required
                    aria-label="Your full name"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="border-[#1B5F8C] focus:ring-[#E2B659]"
                    required
                    aria-label="Your email address"
                  />
                  <select
                    value={formData.selectedHike}
                    onChange={(e) => setFormData((prev) => ({ ...prev, selectedHike: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#1B5F8C] rounded-md focus:ring-[#E2B659] focus:border-[#E2B659]"
                    required
                    aria-label="Select which hike you'd like to join"
                  >
                    <option value="">Which hike would you like to join?</option>
                    <option value="January - Coastal Trail Adventure">January - Coastal Trail Adventure</option>
                    <option value="February - Waterfall Discovery Hike">February - Waterfall Discovery Hike</option>
                    <option value="March - Cultural Village Walk">March - Cultural Village Walk</option>
                    <option value="April - Whale Watching Expedition">April - Whale Watching Expedition</option>
                    <option value="May - Sunrise Mountain Trek">May - Sunrise Mountain Trek</option>
                    <option value="June - Traditional Fishing Experience">June - Traditional Fishing Experience</option>
                    <option value="July - Winter Coastal Exploration">July - Winter Coastal Exploration</option>
                    <option value="August - Heritage & History Trail">August - Heritage & History Trail</option>
                    <option value="September - Spring Wildflower Walk">September - Spring Wildflower Walk</option>
                    <option value="October - Bird Watching Safari">October - Bird Watching Safari</option>
                    <option value="November - Multi-day Wild Coast Journey">
                      November - Multi-day Wild Coast Journey
                    </option>
                    <option value="December - Summer Beach Adventure">December - Summer Beach Adventure</option>
                  </select>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#1B5F8C] mb-3 block">
                      How many people? ({formData.numberOfPeople[0]}{" "}
                      {formData.numberOfPeople[0] === 1 ? "person" : "people"})
                    </label>
                    <Slider
                      value={formData.numberOfPeople}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, numberOfPeople: value }))}
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
                    className="border-[#1B5F8C] focus:ring-[#E2B659]"
                    aria-label="Additional preferences and special requests"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#E2B659] text-[#1B5F8C] hover:bg-[#E2B659]/90 cursor-pointer"
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
                    boxShadow: `0 0 ${shadowIntensity}px rgba(226,182,89,${shadowOpacity})`,
                    borderColor: dynamicBorderColor, // Apply dynamic Mpondo blue border
                  }}
                >
                  <Image
                    src="/images/sinegugu-portrait.png"
                    alt="Sinegugu Zukulu - Guide and Environmental Activist for Wild Coast Tours"
                    fill
                    className="object-cover transition-all duration-1000 ease-out"
                    style={{
                      transform: `scale(${imageScale}) rotate(${imageRotate}deg)`, // Applied new rotate
                      filter: `contrast(${imageContrast})`, // Applied new contrast
                    }}
                    priority
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                  {/* Animated binocular zoom overlay effect */}
                  <div
                    className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70 rounded-full transition-opacity duration-500" // Darker gradient for more fisheye
                    style={{ opacity: overlayOpacity }}
                  />

                  {/* Removed: Simplified binocular effect without crosshairs (outer and inner rings) */}

                  {/* Edge glow effect */}
                  <div
                    className="absolute inset-0 rounded-full transition-opacity duration-500 shadow-[inset_0_0_50px_rgba(226,182,89,0.3)]"
                    style={{ opacity: overlayOpacity }}
                  />
                </div>

                {/* Floating particles effect */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{ opacity: overlayOpacity }}
                >
                  <div
                    className="absolute top-4 left-4 w-2 h-2 bg-[#E2B659]/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="absolute top-8 right-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="absolute bottom-6 left-8 w-1 h-1 bg-[#E2B659]/80 rounded-full animate-bounce"
                    style={{ animationDelay: "0.5s" }}
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
                tours are designed to showcase the stunning landscapes, rich biodiversity, and vibrant Mpondo culture,
                all while supporting sustainable community development and environmental conservation efforts led by
                local activists like Sinegugu Zukulu.
              </p>
              <Button
                asChild
                className="bg-[#064E3B] text-white hover:bg-[#064E3B]/90 rounded-full px-8 py-3 cursor-pointer"
              >
                <a href="https://wildcoasttours.vercel.app" target="_blank" rel="noopener noreferrer">
                  <span className="block text-xs mt-1 opacity-80">Wild Coast Guided Tours</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

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
                    src="/images/campaign-shell-protest.jpg" // Updated image source
                    alt="Community protest against Shell's seismic blasting on Wild Coast"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-ubuntu">Stopping Shell's Seismic Blasting</h3>
                  <p className="text-sm mb-4">
                    Led the 2022 legal victory protecting whales and community rights against destructive seismic
                    testing along the Wild Coast.
                  </p>
                </div>
              </article>

              <article className="bg-[#F9F6EE] rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg fade-in cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/images/campaign-community-conservation.jpg" // Updated image source
                    alt="Mpondo community sustainable farming and agroecology practices"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-ubuntu">Community-Led Conservation</h3>
                  <p className="text-sm mb-4">
                    Promoting agroecology and cultural tourism as sustainable alternatives to extractive industries in
                    Mpondoland.
                  </p>
                </div>
              </article>

              <article className="bg-[#F9F6EE] rounded-lg overflow-hidden shadow-md transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg fade-in cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/images/campaign-global-advocacy.jpg" // Updated image source
                    alt="Global advocacy for Indigenous environmental rights"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-ubuntu">Global Environmental Advocacy</h3>
                  <p className="text-sm mb-4">
                    Sharing Mpondoland's story on international platforms to build solidarity for Indigenous
                    environmental rights.
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

            {/* Current Event Display */}
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
                className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 font-ubuntu text-[#E2B659]`} // Made heading more compact
              >
                {currentTimelineEvent.year}
              </h3>
              <p
                className={`text-base md:text-lg max-w-4xl mx-auto leading-normal min-h-[120px] text-center py-4`} // Made paragraph more compact and increased min-height
              >
                {currentTimelineEvent.info}
              </p>
            </div>

            {/* Timeline Year Tabs with Hover and Drag - Moved to bottom */}
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
                        ? "bg-[#E2B659] text-[#1B5F8C] font-bold shadow-lg scale-110"
                        : "bg-[#F4F4F4]/20 text-[#F4F4F4] hover:bg-[#F4F4F4]/40 hover:shadow-md"
                    }`}
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
                  className="text-[#E2B659] hover:text-[#E2B659]/80 cursor-pointer"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-[#1B5F8C] text-[#F4F4F4] relative">
          {" "}
          {/* Added relative for absolute positioning */}
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
                <address className="text-xs opacity-70 mt-3 not-italic">Mpondoland, Eastern Cape, South Africa</address>
              </div>
              {/* Removed personal social media links */}
            </div>
            <div className="border-t border-[#F9F6EE] border-opacity-20 mt-10 pt-10 text-center text-sm opacity-80 relative">
              {" "}
              {/* Added relative for image positioning */}
              <p className="text-xs">&copy; 2024 Wild Coast Tours. | Masihamba</p>
              <p className="text-xs mt-2">
                Supporting sustainable tourism and environmental conservation in Mpondoland
              </p>
              {/* New image positioned at the bottom right */}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
