import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

export default function Home() {
  return (
    <div>
      <Marquee/>
      <Banner/>
      <PriceUp/>
      <PriceDown/>
      <AllProducts/>
    </div>
  );
}
