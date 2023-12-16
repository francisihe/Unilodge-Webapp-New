import { useEffect } from "react"
import FeaturedProperty from "../components/UI/FeaturedProperty"
import Hero from "../components/UI/Hero"
import HomeSection2 from "../components/UI/HomeSection2"
import RecentBlogs from "../components/UI/RecentBlogs"
import ShopSection from "../components/UI/ShopSection"
import StorageSection from "../components/UI/StorageSection"

const Home = () => {

  useEffect(() => {

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      <Hero />
      <HomeSection2 />
      <FeaturedProperty />
      <ShopSection />
      <StorageSection />
      <RecentBlogs />
    </div>
  )
}

export default Home