const BRANDS = [
  { id: 1, name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { id: 2, name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { id: 3, name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg" },
  { id: 4, name: "Reebok", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Reebok_2019_logo.svg" },
  { id: 5, name: "Under Armour", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg" },
  { id: 6, name: "Vans", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Vans-logo.svg" },
];

export default function BrandGrid() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider dark:text-neutral-500">
          Trusted by world-class brands
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 lg:gap-6">
        {BRANDS.map((brand) => (
          <div key={brand.id} className="p-4 md:p-7 bg-gray-100 rounded-xl dark:bg-neutral-800 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
            <img 
              className="py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto" 
              src={brand.logo} 
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
