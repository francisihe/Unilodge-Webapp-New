import { useEffect } from "react"
import PropertiesList from "../components/UIskeleton/PropertiesList"

const Properties = () => {

  useEffect(() => {
    //Scroll to Top;
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [])

  return (
    <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">
      <PropertiesList />
    </div>
  )
}

export default Properties