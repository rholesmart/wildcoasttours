"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Mail, Phone, ArrowLeft } from "lucide-react"
import { sendBookingEmail } from "@/actions/send-email"

const ACCENT_COLOR = "#F7931A"

export default function BookingClient() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    groupSize: [1],
    tourType: "custom",
    dates: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      groupSize: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      await sendBookingEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        groupSize: formData.groupSize[0],
        tourType: formData.tourType,
        dates: formData.dates,
        message: formData.message,
      })

      setSuccessMessage("Your booking inquiry has been sent! We'll contact you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        groupSize: [1],
        tourType: "custom",
        dates: "",
        message: "",
      })

      setTimeout(() => {
        setSuccessMessage("")
        router.push("/")
      }, 3000)
    } catch (error) {
      setErrorMessage("Failed to send booking inquiry. Please try again.")
      console.error("Booking error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <ArrowLeft size={20} style={{ color: ACCENT_COLOR }} />
            <span className="text-sm font-medium" style={{ color: ACCENT_COLOR }}>
              Back to Home
            </span>
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: "#1B5F8C" }}>
            Book Your Adventure
          </h1>
          <p className="text-gray-600 mt-2">
            Let us know about your dream Wild Coast experience, and we'll make it happen.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          {successMessage && (
            <div
              className="mb-6 p-4 rounded-lg text-white text-center"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-800 text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1B5F8C" }}>
                Your Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="border-gray-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1B5F8C" }}>
                Email Address *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="border-gray-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1B5F8C" }}>
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+27 ..."
                className="border-gray-300"
              />
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-sm font-semibold mb-4" style={{ color: "#1B5F8C" }}>
                Group Size: <span style={{ color: ACCENT_COLOR }}>{formData.groupSize[0]} people</span>
              </label>
              <Slider
                value={formData.groupSize}
                onValueChange={handleSliderChange}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1</span>
                <span>20+</span>
              </div>
            </div>

            {/* Tour Type */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1B5F8C" }}>
                Tour Type
              </label>
              <select
                name="tourType"
                value={formData.tourType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="custom">Custom Tour</option>
                <option value="coastal">Coastal Hiking</option>
                <option value="kayaking">Kayaking Adventure</option>
                <option value="cultural">Cultural Experience</option>
                <option value="combined">Combined Package</option>
              </select>
            </div>

            {/* Preferred Dates */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1B5F8C" }}>
                Preferred Dates
              </label>
              <Input
                type="text"
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                placeholder="e.g., December 15-20, 2024"
                className="border-gray-300"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1B5F8C" }}>
                Special Requests or Questions
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your interests, dietary requirements, accessibility needs, or any other information that will help us plan your perfect adventure..."
                className="border-gray-300 min-h-32"
              />
            </div>

            {/* Contact Info Display */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "rgba(247, 147, 26, 0.1)", borderLeft: `4px solid ${ACCENT_COLOR}` }}
            >
              <p className="text-sm text-gray-700">
                <strong>Can't wait?</strong> You can also reach us directly:
              </p>
              <div className="flex gap-4 mt-2 text-sm">
                <a href="tel:+27..." className="flex items-center gap-2 hover:opacity-70">
                  <Phone size={16} style={{ color: ACCENT_COLOR }} />
                  <span>+27 ...</span>
                </a>
                <a href="mailto:info@wildcoasttours.com" className="flex items-center gap-2 hover:opacity-70">
                  <Mail size={16} style={{ color: ACCENT_COLOR }} />
                  <span>info@wildcoasttours.com</span>
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full font-semibold hover:opacity-90 transition duration-300 text-white"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              {isLoading ? "Sending..." : "Send Booking Inquiry"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              * Required fields. We'll contact you within 24 hours to confirm your booking.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
