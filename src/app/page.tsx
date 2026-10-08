import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

export default function Home() {
  return (
    <div>
      
      <Banner/>
      <PriceUp/>
      <PriceDown/>
      <AllProducts/>
    </div>
  );
}
