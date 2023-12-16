import AboutIntro from "../components/UI/AboutIntro"
import HowItWorks from "../components/UI/HowItWorks"


const About = () => {

  window.scroll({
    top: 0,
    behavior: 'smooth'
  });

  return (
    <div>
      <AboutIntro />
      <HowItWorks />
    </div>
  )
}

export default About