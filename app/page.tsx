import type { Metadata } from "next"
import WildCoastToursClient from "./WildCoastToursClient"

// Export metadata for this specific page
export const metadata: Metadata = {
  title: "Wild Coast Tours | Authentic Eco-Tourism Experiences in Pondoland",
  description:
    "Discover the breathtaking beauty of Pondoland with Wild Coast Tours. Our sustainable eco-tours showcase stunning landscapes, vibrant Mpondo culture, and environmental conservation efforts. Book your authentic South African adventure today.",
}

export default function WildCoastTours() {
  return <WildCoastToursClient />
}
