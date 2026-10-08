export const instant = false;
import { IAllProduct } from "@/types/allProduct.type";
import Link from "next/link";

interface IItemDetailsProps {
    params: Promise<{
        productId: string;
    }>;
}

const page = async ({ params }: IItemDetailsProps) => {
    const { productId } = await params;
    const response = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    );

    if (!response.ok) {
        throw new Error("No product found");
    }
    const product: IAllProduct = await response.json();
    const toBnNum = (num: number | string) =>
        num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
    const maxPrice = Math.max(...product.markets.map((market) => market.max));
    const minPrice = Math.min(...product.markets.map((market) => market.min));
    const avgPrice = (maxPrice + minPrice) / 2;
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
        <div className="w-full max-w-6xl mx-auto px-4 py-6 text-gray-800 space-y-6">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-900 transition-colors">
                    হোম
                </Link>
                <span>›</span>
                <Link href={`/category/${product.category}`} className="hover:text-gray-900 transition-colors">
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-900 font-medium">{product.nameBn}</span>
            </nav>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <span className="w-16 h-16 rounded-2xl bg-[#f2f5f1] flex items-center justify-center shrink-0 text-3xl">
                        🍚
                    </span>
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {product.nameBn}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500">
                            প্রতি {product.unit} · {product.nameBn}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">
                            গতকালকের তুলনায় আজ দাম <span className="font-bold text-gray-900">বেড়েছে</span> · ২ টাকা
                        </p>
                    </div>
                </div>

                <div className="w-full sm:w-auto bg-[#f6f8f5] px-6 py-4 rounded-2xl flex sm:flex-col items-center justify-between sm:justify-center text-right border border-gray-100">
                    <span className="text-xs text-gray-500 block">আজকের দাম</span>
                    <div className="text-2xl font-black text-gray-900 my-0.5">
                        {toBnNum(product.today)}
                    </div>
                    <span className="text-xs text-gray-500 block">
                        টাকা / {product.unit}
                    </span>
                    <div className={`flex items-center gap-1 mt-1 font-bold text-base ${colorClass}`}>
                        <span>{arrowIcon}</span>
                        <span>{toBnNum(product.change?.pct)}%</span>
                    </div>
                </div>
            </div>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-4">
                <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#f8faf8] p-4 rounded-xl border border-gray-100 space-y-1">
                        <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                        <p className="text-xl font-bold text-[#16a34a]">
                            {toBnNum(minPrice)} <span className="text-sm font-semibold">টাকা</span>
                        </p>
                        <p className="text-[11px] text-gray-400">সবচেয়ে কম দামের বাজার</p>
                    </div>

                    <div className="bg-[#f8faf8] p-4 rounded-xl border border-gray-100 space-y-1">
                        <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
                        <p className="text-xl font-bold text-[#dc2626]">
                            {toBnNum(maxPrice)} <span className="text-sm font-semibold">টাকা</span>
                        </p>
                        <p className="text-[11px] text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
                    </div>

                    <div className="bg-[#f8faf8] p-4 rounded-xl border border-gray-100 space-y-1">
                        <p className="text-xs text-gray-500">গড় দাম</p>
                        <p className="text-xl font-bold text-[#16a34a]">
                            {toBnNum(avgPrice)} <span className="text-sm font-semibold">টাকা</span>
                        </p>
                        <p className="text-[11px] text-gray-400">প্রতি কেজি-এর হিসাবে</p>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-4">
                <h2 className="text-lg font-bold text-gray-900">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-700">
                        <thead>
                            <tr className="text-gray-500 text-xs font-semibold border-b border-gray-100">
                                <th className="py-3 px-2">বাজার</th>
                                <th className="py-3 px-2">বিভাগ</th>
                                <th className="py-3 px-2 text-right sm:text-left">সর্বনিম্ন</th>
                                <th className="py-3 px-2 text-right sm:text-left">সর্বাধিক</th>
                                <th className="py-3 px-2 text-right">গড়</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[...product.markets]
                                .sort((a, b) => a.min - b.min)
                                .map((item, index) => {
                                    const avg = Math.round((item.min + item.max) / 2);

                                    return (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-2 font-semibold text-gray-900">{item.market}</td>
                                            <td className="py-3 px-2 text-gray-500">{item.division}</td>
                                            <td className="py-3 px-2 text-right sm:text-left">{toBnNum(item.min)} টাকা</td>
                                            <td className="py-3 px-2 text-right sm:text-left">{toBnNum(item.max)} টাকা</td>
                                            <td className="py-3 px-2 text-right font-bold text-gray-900">{toBnNum(avg)} টাকা</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default page;