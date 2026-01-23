import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { getFeatures } from "@/utils/utility";

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="features"
      className="py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-rubik">
            Revolutionary Architecture
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-secondary-foreground">
            Built from the ground up for the next generation of distributed
            computing. Every component is designed for scale, security, and
            performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {getFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full bg-secondary backdrop-blur-sm border border-border overflow-hidden">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary group-hover:scale-110 p-4 mb-4 transition-transform duration-300">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className={`
                        absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300 
                      `} 
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary-three transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-secondary-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};