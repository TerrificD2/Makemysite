import { motion } from "framer-motion";
import ConcentricCircles from "../components/ConcentricCircles";
import CTAButton from "../components/CTAButton";
import Navbar from "../components/Navbar";
import VideoSection from "../components/VideoSection";

const Index = () => {
  return (
    <div className="relative w-full">
      <ConcentricCircles />
      <Navbar />

      <section className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <main className="text-center space-y-8 px-4 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Unlock the Power of AI
              <br />
              <span className="text-white/90">Image Intelligence</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Convert pixels into actionable location intelligence using AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4"
          >
            <CTAButton onClick={() => console.log("Try GeoSpy clicked")}>
              Try GeoSpy
            </CTAButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-white/40 pt-8"
          >
            Trusted by over 1000+ organizations worldwide
          </motion.p>
        </main>
      </section>

      <VideoSection />
    </div>
  );
};

export default Index;