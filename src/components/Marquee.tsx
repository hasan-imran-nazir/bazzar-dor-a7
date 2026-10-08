import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IAllProduct } from "@/types/allProduct.type";

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const products: IAllProduct[] = await res.json();

  return (
    <div className="flex items-center gap-4 overflow-x-auto py-2">
      <MarqueeText direction ="right" duration = {20}>
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
              <span className="text-2xl" role="img" aria-label={product.nameBn}>
                {product.image}
              </span>

              <span className="text-gray-900 font-semibold text-base">
                {product.nameBn}
              </span>

              <span className="text-gray-900 font-semibold text-base">
                {product.today} টাকা/{product.unit}
              </span>

              <div
                className={`flex items-center gap-0.5 font-bold text-base ${colorClass}`}
              >
                <span className="text-xs">{arrowIcon}</span>
                <span>{product.change?.pct}%</span>
              </div>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
