import About  from "@/app/routes/sections/about";
import Download from "@/app/routes/sections/download";
import { Features } from "@/app/routes/sections/features";
import { Hero } from "@/app/routes/sections/hero";
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