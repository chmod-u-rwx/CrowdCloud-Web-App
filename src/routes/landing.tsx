import About  from "@/components/LandingPage/About";
import Download from "@/components/LandingPage/Download";
import { Features } from "@/components/LandingPage/Features";
import { Hero } from "@/components/LandingPage/Hero";
import Footer from "@/components/layouts/Footer";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Download />
      <Footer />
    </>
  )
}

export default LandingPage;