import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { appFeatures } from "@/utils/utility";
import worker from "@/assets/worker.png";
import { ArrowRight, DownloadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Download() {
  const navigate = useNavigate();

  return (
    <section id="download" className="py-20 relative overflow-hidden">
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
            Join our trusted contributors sharing their computing resources and
            earning rewards. Download the CrowdCloud desktop application to
            become a worker.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                CrowdCloud Desktop App
              </h3>
              <p className="text-lg text-secondary-foreground mb-6 leading-relaxed">
                Transform your idle computing power into a revenue stream. The
                CrowdCloud desktop application allows you to safely share your
                computer's resources while maintining full control over what you
                contribute.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {appFeatures.map((feature, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-secondary backdrop-blur-sm border border-border"
                >
                  <div className="w-10 h-10 p-2.5 flex-shrink-0">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-secondary-foreground font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full font-semibold py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl group"
              >
                <DownloadIcon className="w-5 h-5 mr-3" />
                Download for Windows
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="font-semibold py-4 rounded-full transition-all duration-300 backdrop-blur-sm border-foreground/50"
                >
                  Download for macOS
                </Button>
                <Button
                  variant="outline"
                  className="font-semibold py-4 rounded-full transition-all duration-300 backdrop-blur-sm border-foreground/50"
                >
                  Download for Linux
                </Button>
              </div>
            </div>

            {/* System Requirements */}
            <Card className="backdrop-blur-sm p-4 rounded-lg">
              <CardContent>
                <h4 className="font-semibold mb-2">System Requirements:</h4>
                <p className="text-secondary-foreground text-sm">
                  Windows 10+, macOS 10.15+, or Linux • 4GB RAM minimum • 16GB
                  available storage • Stable internet connection
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-border shadow-2xl overflow-hidden">
                <div className="bg-slate-700 px-4 py-3 flex items-center space-x-2 border-b border-border/80">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-pending" />
                    <div className="w-3 h-3 rounded-full bg-confirm" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-secondary-foreground text-sm font-medium">CrowdCloud Desktop App</span>
                  </div>
                </div>

                <div className="p-1 space-y-6">
                  <img src={worker} alt="Desktop App Image" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-two rounded-xl blur-2xl -z-10"></div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
        >
          <Card className="max-w-2xl mx-auto backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Need Computing Resources?
              </h3>
              <p className="text-secondary-foreground mb-6">
                If you're looking to borrow computing resources for your workloads,
                use our web application to create and manage your jobs.
              </p>
              <Button
                className="font-semibold px-8 py-4 rounded-full"
                onClick={() => navigate("/signup")}
              >
                Start Borrowing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
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
