import { downloadOptions } from "@/utils/utility";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Download() {
  return (
    <section 
      id="download"
      className="py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary-two/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join CrowdCloud
          </h2>
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto">
            Choose your path to participate in the CrowdCloud ecosystem.
            Whether you're contributing reources, deploying workloads, or building applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {downloadOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card 
                className="h-full backdrop-blur-sm border border-border hover:border-white/40 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl p-4 mb-4 bg-primary group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="w-8 h-8" />
                    </div>
                    <div className={`
                        absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${option.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300 
                      `} 
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {option.title}
                  </h3>

                  <p className="mb-6 text-secondary-foreground leading-relaxed">
                    {option.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {option.features.map((feature, keyIndex) => (
                      <div key={keyIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary-two" />
                        <span className="text-secondary-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    {option.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Explore CrowdCloud</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href="https://github.com/chmod-u-rwx"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.05 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-secondary backdrop-blur-sm border border-white/50 transition-all duration-300"
            >
              <span className="font-medium">View on GitHub</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}