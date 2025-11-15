// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectCard({ p }: { p: any }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-gray-900">{p.name}</h2>
        <span className="px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
          Featured
        </span>
      </div>

      <p className="mt-1 flex items-center text-gray-500">📍 {p.location}</p>

      <div className="h-px w-full bg-gray-200 my-4" />

      <p className="text-2xl font-bold text-indigo-600">{p.price}</p>
      <p className="mt-1 text-sm text-gray-600">By {p.builder}</p>
    </div>
  );
}
