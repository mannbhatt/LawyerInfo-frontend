import Image from "next/image";

import HeroSection from "./components/LandingPage/hero";
import ProfileSlider from"./components/LandingPage/swiper";
import Features from "./components/LandingPage/feature";
import HowItWorks from "./components/LandingPage/howToWork";
import FAQSection from "./components/LandingPage/faqs";

export default function Home() {
  return (<>
 
 <HeroSection/>
 <ProfileSlider/><HowItWorks/>
 <Features/>
 <FAQSection/>
 
  </>);
}
