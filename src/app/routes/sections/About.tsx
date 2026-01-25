import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getLimitations,
  getObjectives,
  getScopeFeatures,
} from "@/utils/utility";
import { CheckCircle, Globe, XCircle } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-rubik mb-6">
            <span>Revolutionizing</span>
            <br />
            <span className="text-secondary-foreground">
              Distributed Computing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CrowdCloud represents the next evolution in distributed computing,
            harnessing the collective power of peer-contributed resources to
            create a truly decentralized compute and strorage platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Mission */}
          <Card className="bg-secondary backdrop-blur-sm border border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-secondary-foreground">
                To democratize access to high-performance computing by creating
                a decentralized platform where anyone can contribute resources
                and benefit from the collective computational power of the
                network.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="bg-secondary backdrop-blur-sm border border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-secondary-foreground">
                A world where computing resources are efficiently shared,
                accessible to all, and powered by intelligent algorithms that
                optimize performance while ensuring security and fair
                compensation.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            Core Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getObjectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 rounded-lg bg-secondary backdrop-blur-sm border border-border"
              >
                <CheckCircle className="w-6 h-6 text-confirm mt-1 shrink-0" />
                <p className="text-secondary-foreground">{objective}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scope */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-secondary backdrop-blur-sm border border-border">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Globe className="w-6 h-6 mr-4" />
                  <h3 className="text-2xl font-bold">Platform Scope</h3>
                </div>
                <div className="space-y-3">
                  {getScopeFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-confirm mt-1 shrink-0" />
                      <p className="text-secondary-foreground">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-secondary backdrop-blur-sm border border-border">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <XCircle className="w-6 h-6 mr-4" />
                  <h3 className="text-2xl font-bold">Current Limitations</h3>
                </div>
                <div className="space-y-3">
                  {getLimitations.map((limit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <XCircle className="w-5 h-5 text-destructive mt-1 shrink-0" />
                      <p className="text-secondary-foreground">{limit}</p>
                    </motion.div>
                  ))}
                </div>
                <Alert className="mt-6 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertDescription className="text-destructive block">
                    <strong>Note:</strong> These limitations are specific to the
                    current prototype phase and will be addressed in future
                    iterations as the platform evolves.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
