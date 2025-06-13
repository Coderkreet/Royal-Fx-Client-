import React from 'react'
import ProductHeroSection from '../Components/productComponent/ProductHeroSection'
import ProductOverview from '../Components/productComponent/ProductOverview'
import DealOfWeek from '../Components/productComponent/DealOfWeek'
import FeaturedProductSection from '../Components/productComponent/FeaturedProductSection'
import PopularBrands from '../Components/productComponent/PopularBrands'
import MarketPlaceSection from '../Components/productComponent/MarketPlaceSection'
import BestSellerSection from '../Components/productComponent/BestSellerSection'
import SubscribeSection from '../Components/productComponent/SubscribeSection'

const ProductPage = () => {
  return (
    <div>
     <ProductHeroSection />
            <ProductOverview />
            <DealOfWeek />
            <FeaturedProductSection />
           <PopularBrands />
            <MarketPlaceSection />
           <BestSellerSection />
            <SubscribeSection /> 
    </div>
  )
}

export default ProductPage
