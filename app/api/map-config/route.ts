import { NextResponse } from "next/server"

export async function GET() {
  // Only provide map configuration if API key is available server-side
  const apiKey = process.env.GOOGLE_MAPS_API_KEY // Note: NOT NEXT_PUBLIC_

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_google_maps_api_key_here") {
    return NextResponse.json({
      enabled: false,
      apiKey: "",
      message: "Google Maps integration not configured",
    })
  }

  return NextResponse.json({
    enabled: true,
    apiKey: apiKey,
    message: "Google Maps integration available",
  })
}
