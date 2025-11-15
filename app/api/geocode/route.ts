import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;

    // Add User-Agent header to avoid Nominatim blocking on Vercel
    const res = await fetch(url, {
      headers: {
        "User-Agent": "MagicBricks-Scraper-App - email@example.com",
        "Accept-Language": "en",
      },
    });

    const data = await res.json();

    if (!data || data.length === 0) {
      return NextResponse.json({ lat: null, lng: null });
    }

    return NextResponse.json({
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    });
  } catch (e) {
    console.error("Geocode error", e);
    return NextResponse.json({ error: "Geocode error" }, { status: 500 });
  }
}
