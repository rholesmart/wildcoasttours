"use server"

import { Resend } from "resend"

interface EmailFormData {
  name: string
  email: string
  message: string
  selectedHike: string
  numberOfPeople: number
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail(data: EmailFormData) {
  try {
    const { name, email, message, selectedHike, numberOfPeople } = data

    await resend.emails.send({
      from: "Wild Coast Tours <onboarding@resend.dev>", // <--- TEMPORARY FOR TESTING: Use this if your own domain/email isn't verified yet.
      // Once your domain/email is verified, change this back to your desired verified email, e.g., "Wild Coast Tours <info@yourdomain.com>"
      to: "rholesmartvillage@gmail.com",
      subject: `New Booking Request from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Selected Hike:</strong> ${selectedHike}</p>
        <p><strong>Number of People:</strong> ${numberOfPeople}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${message}</p>
      `,
    })

    return { success: true, message: "Thanks for your interest in joining us, we'll get back to you soon." }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "There was an error submitting your request. Please try again." }
  }
}
