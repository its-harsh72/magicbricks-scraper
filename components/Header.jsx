"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/city/${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="w-full px-6 py-5 bg-black/60 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Magic<span className="text-indigo-500">Scout</span>
        </h1>

        {/* Search form */}
        <form onSubmit={submit} className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter city (e.g., Mumbai)"
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 transition w-56"
          />

          <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold">
            Search
          </button>
        </form>

      </div>
    </header>
  );
}
