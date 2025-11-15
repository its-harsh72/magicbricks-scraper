import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Hyderabad";

  const projects = [
    {
      name: "Sunshine Residency",
      location: `${city} Central`,
      price: "₹45–70 Lakh",
      builder: "Skyline Builders",
    },
    {
      name: "Green Valley Homes",
      location: `${city} West`,
      price: "₹60–95 Lakh",
      builder: "Elite Constructions",
    },
  ];

  return NextResponse.json({ projects });
}
