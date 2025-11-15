// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("query");

//     if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//       query
//     )}`;

//     const res = await fetch(url);
//     const data = await res.json();

//     if (!data || data.length === 0) {
//       return NextResponse.json({ lat: null, lng: null });
//     }

//     return NextResponse.json({
//       lat: parseFloat(data[0].lat),
//       lng: parseFloat(data[0].lon),
//     });
//   } catch (e) {
//     return NextResponse.json({ error: "Geocode error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "MyGeoApp/1.0 (your-email@example.com)", // REQUIRED
        "Accept-Language": "en",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch coordinates" }, { status: res.status });
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      return NextResponse.json({ lat: null, lng: null });
    }

    return NextResponse.json({
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    });
  } catch (e) {
    return NextResponse.json({ error: "Geocode error" }, { status: 500 });
  }
}
