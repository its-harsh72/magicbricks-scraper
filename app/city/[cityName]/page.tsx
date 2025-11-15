"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

interface Project {
  name: string;
  location: string;
  price: string;
  builder: string;
}

export default function CityPage({ params }: { params: Promise<{ cityName: string }> }) {
  // ⬇️ FIX: unwrap promise using React.use()
  const { cityName: city } = use(params);
type MarkerType = any;
  const [projects, setProjects] = useState<Project[]>([]);  
  const [markers, setMarkers] = useState([] as MarkerType[]);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    try {
      const res = await axios.get(`/api/scrape?city=${city}`);
      const list: Project[] = res.data.projects;
      setProjects(list);

      const geocoded = await Promise.all(
        list.map(async (p) => {
          const geo = await axios.get(
            `/api/geocode?query=${encodeURIComponent(p.location + ", " + city)}`
          );
          return {
            ...p,
            lat: geo.data.lat,
            lng: geo.data.lng,
          };
        })
      );

      setMarkers(geocoded);
    } catch (err) {
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Projects in {city}</h1>

      {loading && (
        <p className="mt-4 animate-pulse text-gray-600">
          Scraping projects...
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 mt-6">
        {projects.map((p, idx) => (
          <ProjectCard key={idx} p={p} />
        ))}
      </div>

      {markers.length > 0 && (
        <div className="mt-8">
          <MapComponent markers={markers} />
        </div>
      )}
    </div>
  );
}
