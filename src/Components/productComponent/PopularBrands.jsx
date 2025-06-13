import { useState } from "react";
import { popularBrands, popularProducts } from "../../utils/constant";
import zicZacImage from '../../assets/product/zic-zack.png';

export default function PopularBrands() {
    const [selectedBrand, setSelectedBrand] = useState("Bitmain");

    const filteredProducts = popularProducts.filter(
        (product) => product.brand === selectedBrand
    );

    return (
        <section className="px-4 sm:px-12 lg:px-32 py-16 text-white space-y-12">
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                    Popular Brands
                </h1>
                <img
                    src={zicZacImage}
                    alt="underline"
                    className="w-40 sm:w-52 lg:w-60"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-4 border-b border-gray-700 pb-4">
                {popularBrands.map((brand) => (
                    <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`text-xl sm:text-2xl transition font-medium px-4 py-1 rounded-t 
                            ${selectedBrand === brand
                                ? "text-blue-400 border-b-2 border-blue-500"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {brand}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white text-black rounded-lg p-5 relative flex flex-col sm:flex-row items-center gap-4 shadow hover:shadow-lg transition"
                    >
                        {product.soldOut && (
                            <span className="absolute top-2 left-2 bg-black text-white  px-3 py-1 rounded text-base">
                                SOLD OUT
                            </span>
                        )}

                        <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
                            <img
                                src={product.img}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-base sm:text-[1rem] font-semibold mb-2">{product.title}</h3>
                            <button className="bg-gradient-to-r from-[#0068DA] to-[#00D5E6] text-white px-4 py-2 rounded text-[1rem] sm:text-base font-medium">
                                US${product.price.toFixed(2)}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
