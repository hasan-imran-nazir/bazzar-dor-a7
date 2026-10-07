"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
    <div className="container mx-auto p-4">
      <div className="bg-[#f3f7f4] border border-gray-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-block bg-[#e1efe6] text-[#008a45] text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
            {currentDate}
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button className="bg-[#008a45] text-white font-medium text-sm md:text-base px-6 py-2.5 rounded-xl hover:bg-[#00753a] transition-colors shadow-sm">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

        <div className="w-full md:w-80 h-48 md:h-64 flex items-center justify-center">
          <Image
            src={BannerImage}
            alt="Banner Image"
            width={320}
            height={256}

          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
