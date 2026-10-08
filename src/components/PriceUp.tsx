import { IAllProduct } from "@/types/allProduct.type";
import ItemCard from "./ItemCard";

const PriceUp = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const products: IAllProduct[] = await res.json();
  const upProducts = products.filter(
    (item: IAllProduct) => item.change?.dir === "up",
  );
  console.log(upProducts);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-xl">
        <span className="text-red-600 text-sm">▲</span>
        <h2>আজ দাম বেড়েছে</h2>
      </div>
      <div className="mx-auto py-4 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {upProducts.slice(0, 6).map((product, id) => (
            <ItemCard key={id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceUp;
