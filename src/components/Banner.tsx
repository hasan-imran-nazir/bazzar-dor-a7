"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import BannerImage from "@/assets/bazar-hero.png";
const Banner = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchCurrentDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      setCurrentDate(
        new Intl.DateTimeFormat("bn-BD", options).format(new Date()),
      );
    };
    fetchCurrentDate();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4 md:py-6">
      <div className="bg-[#f3f7f4] border border-gray-100 rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
          <div className="inline-block bg-[#e1efe6] text-[#008a45] text-[11px] sm:text-xs md:text-sm font-semibold px-3 py-1 sm:py-1.5 rounded-full">
            {currentDate}
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-1 sm:pt-2">
            <Link href="#all-products" className="inline-block w-full sm:w-auto bg-[#008a45] text-white font-medium text-xs sm:text-sm md:text-base px-5 sm:px-6 py-2.5 rounded-xl hover:bg-[#00753a] transition-colors shadow-sm">
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        <div className="w-full md:w-80 h-36 sm:h-48 md:h-64 flex items-center justify-center shrink-0">
          <Image
            src={BannerImage}
            alt="Banner Image"
            priority
            width={320}
            height={256}
            className="max-h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
