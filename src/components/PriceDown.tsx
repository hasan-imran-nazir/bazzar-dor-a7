import { IAllProduct } from "@/types/allProduct.type";
import ItemCard from "./ItemCard";

const PriceDown = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );
  const products: IAllProduct[] = await res.json();
  const downProducts = products.filter(
    (item: IAllProduct) => item.change?.dir === "down",
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-xl">
        <span className="text-green-600 text-sm">▼</span>
        <h2>আজ দাম কমেছে</h2>
      </div>
      <div className="mx-auto py-4 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {downProducts.slice(0, 6).map((product, id) => (
            <ItemCard key={id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceDown;
