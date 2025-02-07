import { motion } from "framer-motion";
import GraphBackground from "../components/GraphBackground";
import CTAButton from "../components/CTAButton";
import Navbar from "../components/Navbar";
import VideoSection from "../components/VideoSection";
import FeaturesSection from "../components/FeaturesSection";

const Index = () => {
  return (
    <div className="relative w-full">
      <GraphBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <main className="text-center space-y-8 px-4 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Crafting Digital Excellence
              <br />
              <span className="text-white/90">Web Development Services</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Transform your ideas into stunning, responsive websites with our expert development team
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4"
          >
            <CTAButton onClick={() => window.location.href = '/contact'}>
              Start Your Project
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-white/40">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm text-white/40">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-white/40">Support Available</p>
            </div>
          </motion.div>
        </main>
      </section>

      {/* Video Showcase */}
      <VideoSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Why Choose Us Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose MakemySite?
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              We combine creativity, technical expertise, and industry best practices to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Expert Team",
                description: "Skilled developers and designers with years of experience",
                icon: "👨‍💻"
              },
              {
                title: "Timely Delivery",
                description: "We respect deadlines and deliver projects on time",
                icon: "⏰"
              },
              {
                title: "Quality Assurance",
                description: "Rigorous testing and quality control processes",
                icon: "✅"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Let's discuss your project and create something amazing together
            </p>
            <CTAButton onClick={() => window.location.href = '/contact'}>
              Schedule a Free Consultation
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;