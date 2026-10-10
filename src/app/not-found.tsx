import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white text-gray-900 px-4">
      <h2 className="text-4xl font-bold mb-9">এই পৃষ্ঠাটি পাওয়া যায়নি।</h2>
      <Link
        href="/"
        className="px-4 py-2 bg-[#00875a] text-white rounded-md font-medium hover:bg-[#006c48] transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}