export const instant = false;
import ItemCard from "@/components/ItemCard";
import { IAllProduct } from "@/types/allProduct.type";

interface IPageDetailsProps {
    params: Promise<{
        categoryId: string;
    }>;
}

const Page = async ({ params }: IPageDetailsProps) => {
    const { categoryId } = await params;
    console.log(categoryId)
    const response = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
    );

    if (!response.ok) {
        throw new Error("No category found");
    }

    const data: IAllProduct[] = await response.json();
    if (data.length === 0) {
        return <p>এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>;
    }
    const toBnNum = (num: number | string) =>
        num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
    return (
        <div>
            <div className="w-full bg-[#f8faf8] border border-gray-200/80 rounded-2xl p-6 flex items-center gap-4 container mx-auto my-6">
                <div className="w-12 h-12 flex items-center justify-center text-3xl shrink-0">
                    {data[0].image}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {data[0].categoryNameBn}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">{`${toBnNum(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
                </div>
            </div>
            <div className="w-full bg-[#f8faf8] border border-gray-200/80 rounded-2xl p-4 flex items-center justify-end gap-3 container mx-auto my-6">
                <span className="text-gray-600 text-sm font-medium">সাজান</span>
                <select className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-700 font-medium focus:outline-none cursor-pointer">
                    <option value="default">ডিফল্ট</option>
                    <option value="low-to-high">কম থেকে বেশি</option>
                    <option value="high-to-low">বেশি থেকে কম</option>
                </select>
            </div>
            <p className="text-gray-600 text-sm font-medium container mx-auto my-6">
                মোট {toBnNum(data.length)}টি পণ্য দেখানো হচ্ছে
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 container mx-auto my-6">
                {data.map((item) => (
                    <ItemCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Page;
