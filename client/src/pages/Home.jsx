import FeaturedProperty from "../components/UI/FeaturedProperty"
import Hero from "../components/UI/Hero"
import HomeSection2 from "../components/UI/HomeSection2"
import ShopSection from "../components/UI/ShopSection"
import StorageSection from "../components/UI/StorageSection"

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeSection2 />
      <FeaturedProperty />
      <ShopSection />
      <StorageSection />
    </div>
  )
}

export default Home