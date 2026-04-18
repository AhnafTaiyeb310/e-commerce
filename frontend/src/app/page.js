import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TopProducts from "@/components/home/TopProducts";
import CategoryQuickLinks from "@/components/home/CategoryQuickLinks";
import TrendingGrid from "@/components/home/TrendingGrid";
import PromoBanners from "@/components/home/PromoBanners";
import ShopByCategories from "@/components/home/ShopByCategories";
import BrandGrid from "@/components/home/BrandGrid";
import TrustBadges from "@/components/home/TrustBadges";

export default function Home() {
  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      <Navbar />
      
      <main>
        <Hero />
        
        <CategoryQuickLinks />
        
        {/* <ShopByCategories /> */}
        
        <TrendingGrid />
        
        <PromoBanners />
        
        <TopProducts />
        
        {/* <BrandGrid /> */}
        
        <TrustBadges />
      </main>

      <Footer />
    </div>
  );
}
