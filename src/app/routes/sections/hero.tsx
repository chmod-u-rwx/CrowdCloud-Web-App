import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, MemoryStick, Shield, Zap } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const floatingIcons = [
    { Icon: Zap, delay: 0, x: 100, y: 50 },
    { Icon: Shield, delay: 0.5, x: -80, y: 80 },
    { Icon: Cpu, delay: 1, x: 120, y: -60 },
    { Icon: MemoryStick, delay: 1, x: -120, y: 110 },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6],
            scale: [0, 1.2, 1, 1.1],
            x: [0, x * 0.5, x, x * 0.8],
            y: [0, y * 0.5, y, y * 0.8],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute hidden lg:block"
        >
          <div className="relative">
            <Icon className="w-12 h-12 text-primary/80" />
            <div className="absolute inset-0 bg-primary-three/20 blur-xl rounded-full" />
          </div>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-allerta"
          >
            CrowdCloud
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-secondary-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Transform idle computing resources into a powerful distributed
            network. Secure, scalable, and intelligent serverless computing with
            AI-powered scheduling.
          </motion.p>

          {/* CTF Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={() => scrollToSection("download")}
              size="lg"
              className="font-bold px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Computing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => scrollToSection("feature")}
              variant="outline"
              size="lg"
              className="border-white/40 font-bold rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "10x", label: "Faster Deployment" },
              { number: "50%", label: "Cost Reduction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl backdrop-blur-sm bg-primary/10 border border-primary-two/50"
              >
                <div className="bg-linear-to-r from-primary-two to-primary-three text-2xl md:text-3xl font-bold bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-secondary-foreground text-md mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-two/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-two/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};