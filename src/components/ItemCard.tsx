import { IAllProduct } from "@/types/allProduct.type";
import Link from "next/link";

interface ProductCardProps {
  product: IAllProduct;
}
const ItemCard = ({ product }: ProductCardProps) => {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const toBnNum = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
      <Link href={`/products/${product.id}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#f2f5f1] flex items-center justify-center text-2xl">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">প্রতি {product.unit}</p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {toBnNum(product.today)}{" "}
              <span className="text-lg font-bold">টাকা</span>
            </p>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
              isUp
                ? "bg-[#f9eceb] text-[#c53030]"
                : isDown
                  ? "bg-[#edf7ed] text-[#2e7d32]"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-[10px]">
              {isUp ? "▲" : isDown ? "▼" : "▬"}
            </span>
            <span>{toBnNum(product.change?.pct || 0)}%</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
