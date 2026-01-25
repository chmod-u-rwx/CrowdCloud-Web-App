import About  from "@/app/routes/sections/About";
import Download from "@/app/routes/sections/Download";
import { Features } from "@/app/routes/sections/Features";
import { Hero } from "@/app/routes/sections/Hero";
import Footer from "@/components/footer";

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