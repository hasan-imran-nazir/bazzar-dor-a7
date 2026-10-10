"use client";

import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import { IAllProduct } from "@/types/allProduct.type";

interface IProductSortingProps {
  data: IAllProduct[];
}

const ProductSorting = ({ data }: IProductSortingProps)=> {
  const [sortOption, setSortOption] = useState<string>("default");

  const sortedData = [...data].sort((a, b) => {
    if (sortOption === "pct-low-to-high") {
      return (a.change?.pct ?? 0) - (b.change?.pct ?? 0);
    }
    if (sortOption === "pct-high-to-low") {
      return (b.change?.pct ?? 0) - (a.change?.pct ?? 0);
    }
    return 0;
  });

  return (
    <div>
      <div className="w-full bg-[#f8faf8] border border-gray-200/80 rounded-2xl p-3 sm:p-4 flex items-center justify-between sm:justify-end gap-3 container mx-auto my-4 sm:my-6">
        <span className="text-gray-600 text-xs sm:text-sm font-medium">সাজান</span>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-700 font-medium focus:outline-none cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="pct-low-to-high">পরিবর্তন: কম থেকে বেশি</option>
          <option value="pct-high-to-low">পরিবর্তন: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 container mx-auto my-4 sm:my-6">
        {sortedData.map((item) => (
          <ItemCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductSorting