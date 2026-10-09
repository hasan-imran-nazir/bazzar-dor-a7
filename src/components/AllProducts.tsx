import { IAllProduct } from "@/types/allProduct.type";
import ItemCard from "./ItemCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "force-cache" }
  );
  const products: IAllProduct[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-gray-900 font-bold text-xl">সব পণ্য</h2>
        <p>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      </div>
      <div className="mx-auto py-4 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {products.map((product, id) => (
            <ItemCard key={id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
