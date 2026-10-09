"use client";
import { ICategory } from "@/types/category.type";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/assets/logo-icon.png";
import Image from "next/image";
import UserInfo from "./UserInfo";
const Header = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
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
      <header className="w-full bg-[#f9faf9] border-b border-gray-100 font-sans">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0ba85a] rounded-2xl flex items-center justify-center text-white shadow-sm">
                <Image src={Logo} alt="Logo" width={30} height={30} loading="eager" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  বাজার দর
                </h1>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {currentDate || ""}
                </p>
              </div>
            </div>
          </Link>

          <UserInfo />
        </div>

        <div className="container mx-auto px-4 py-2 border-t border-gray-100/60">
          <nav className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
            {loading ? (
              <p className="text-xs text-gray-400 py-1">লোডিং ক্যাটাগরি...</p>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-2 text-gray-800 hover:text-[#008a45] font-medium text-sm transition-colors whitespace-nowrap group"
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
      </header>
    </div>
  );
};

export default Header;
