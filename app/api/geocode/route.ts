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
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter 'query'" }, { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}`;

  try {
    // IMPORTANT: Adding a User-Agent header to comply with Nominatim usage policy.
    // Replace 'YourAppName v1.0 (contact@example.com)' with a unique identifier for your app.
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'VercelGeocodingApp/1.0 (contact@myproject.dev)',
      },
    });

    // Explicitly handle non-OK (e.g., 403 Forbidden or 429 Too Many Requests) responses
    if (!res.ok) {
        const errorDetail = await res.text();
        // Log the specific error status and response detail to Vercel logs
        console.error(`Nominatim API returned non-OK status ${res.status}:`, errorDetail);
        
        return NextResponse.json(
            { error: `External geocoding service error (Status ${res.status}). Possible rate limit or block.` }, 
            { status: 502 } // 502 Bad Gateway is appropriate for a failed external service call
        );
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
    // Log the uncaught exception (e.g., network error, DNS failure, timeout)
    console.error("Geocoding API Route uncaught exception during fetch:", e); 
    
    // Return a generic error message instructing the user to check server logs
    return NextResponse.json({ error: "Geocode error. Check Vercel logs for specific fetch error (e.g., timeout)." }, { status: 500 });
  }
}