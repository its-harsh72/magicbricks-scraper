import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default function Home() {
  // simple landing: redirect to default city or show header
  // We keep a small landing to let user search
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl text-white">Welcome — open /city/{process.env.NEXT_PUBLIC_DEFAULT_CITY} or search above</h2>
      </main>
    </>
  );
}
