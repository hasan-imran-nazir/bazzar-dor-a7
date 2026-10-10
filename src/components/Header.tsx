"use client";
import { ICategory } from "@/types/category.type";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/assets/logo-icon.png";
import Image from "next/image";
import UserInfo from "./UserInfo";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
    fetchCurrentDate();
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 w-full bg-[#f9faf9] border-b border-gray-100 font-sans">
        <div className="container mx-auto px-4 py-2.5 sm:py-3 relative flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-xl transition-colors shrink-0 z-10"
          >
            <FiMenu className="text-xl" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link href="/">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#0ba85a] rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0">
                  <Image src={Logo} alt="Logo" width={30} height={30} loading="eager" className="w-5 h-5 sm:w-7 sm:h-7 object-contain" />
                </div>

                <div className="text-center md:text-left">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                    বাজার দর
                  </h1>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5 whitespace-nowrap">
                    {currentDate || ""}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <UserInfo />
          </div>

          <div className="w-10 md:hidden" />
        </div>

        <div className="hidden md:block border-t border-gray-100/60">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
              {loading ? (
                <p className="text-xs text-gray-400 py-1">লোডিং ক্যাটাগরি...</p>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-2 text-gray-800 hover:text-[#008a45] font-medium text-sm transition-colors whitespace-nowrap group shrink-0"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <span>{category.nameBn}</span>
                  </Link>
                ))
              )}
            </nav>
          </div>
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80%] bg-white h-full shadow-2xl flex flex-col z-10 p-5 space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-base font-bold text-gray-900">মেনু</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="pb-4 border-b border-gray-100">
                <UserInfo />
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-xs font-semibold text-gray-400 px-2 mb-1">ক্যাটাগরি সমূহ</span>
                {loading ? (
                  <p className="text-xs text-gray-400 px-2">লোডিং ক্যাটাগরি...</p>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-800 hover:bg-emerald-50 hover:text-[#008a45] font-medium text-sm transition-colors"
                    >
                      <span className="text-base">{category.icon}</span>
                      <span>{category.nameBn}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;