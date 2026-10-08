import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-gray-900 px-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-4">এই পৃষ্ঠাটি পাওয়া যায়নি।</p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#00875a] text-white rounded-md font-medium hover:bg-[#006c48] transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}