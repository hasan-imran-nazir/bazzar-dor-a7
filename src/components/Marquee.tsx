import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IAllProduct } from "@/types/allProduct.type";
import Link from "next/link";
// import Link from "next/link";

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "force-cache" }
  );
  const products: IAllProduct[] = await res.json();
  const toBnNum = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
  console.log(products.length)
  return (
    <div className="flex items-center gap-4 overflow-x-auto py-2">
      <MarqueeText direction="right" duration={20}>
        {products.map((product) => {
          const dir = product.change?.dir;
          const isUp = dir === "up";
          const isDown = dir === "down";

          const colorClass = isUp
            ? "text-[#dc2626]"
            : isDown
              ? "text-[#16a34a]"
              : "text-gray-500";

          const arrowIcon = isUp ? "▲" : isDown ? "▼" : "▬";

          return (
            <div
              key={product.id}
              className="flex items-center gap-2 px-2 whitespace-nowrap"
            >
              <Link href={`/products/${product.id}`} className="flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label={product.nameBn}>
                  {product.image}
                </span>

                <span className="text-gray-900 font-semibold text-base">
                  {product.nameBn}
                </span>

                <span className="text-gray-900 font-semibold text-base">
                  {toBnNum(product.today)} টাকা/{product.unit}
                </span>

                <div
                  className={`flex items-center gap-0.5 font-bold text-base ${colorClass}`}
                >
                  <span className="text-xs">{arrowIcon}</span>
                  <span>{toBnNum(product.change?.pct)}%</span>
                </div>
              </Link>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
