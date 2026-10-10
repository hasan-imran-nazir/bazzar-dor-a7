export const instant = false;
import ProductSorting from "@/components/ProductSorting";
import { IAllProduct } from "@/types/allProduct.type";
import { notFound } from "next/navigation";

interface IPageDetailsProps {
    params: Promise<{
        categoryId: string;
    }>;
}

const Page = async ({ params }: IPageDetailsProps) => {
    const { categoryId } = await params;
    console.log(categoryId)
    const response = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    );

    if (response.status === 404) {
        notFound();
    }
    if (!response.ok) {
        throw new Error("Failed to fetch category");
    }

    const data: IAllProduct[] = await response.json();
    if (data.length === 0) {
        notFound();
    }

    const toBnNum = (num: number | string) =>
        num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
    return (
        <div>
            <div className="w-full bg-[#f8faf8] border border-gray-200/80 rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 container mx-auto my-4 sm:my-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    {data[0].image}
                </div>
                <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                        {data[0].categoryNameBn}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{`${toBnNum(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
                </div>
            </div>

            <ProductSorting data={data} />
        </div>
    );
};

export default Page;
