import type { Metadata } from "next"
import BookingClient from "./BookingClient"

export const metadata: Metadata = {
  title: "Book Your Adventure | Wild Coast Tours",
  description: "Book your authentic Wild Coast eco-tourism experience with us today.",
}

export default function BookingPage() {
  return <BookingClient />
}
