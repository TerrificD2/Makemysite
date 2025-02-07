import { motion } from "framer-motion";
import GraphBackground from "../components/GraphBackground";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="relative w-full min-h-screen">
      <GraphBackground />
      <Navbar />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              About MakemySite
            </h1>

            <div className="space-y-6 text-white/80">
              <p>
                At MakemySite, we're passionate about transforming digital visions into reality. With years of experience in web development and design, our team of experts is dedicated to creating exceptional online experiences that drive results.
              </p>

              <h2 className="text-2xl font-semibold pt-4">Our Mission</h2>
              <p>
                To empower businesses with cutting-edge web solutions that combine innovative design, robust functionality, and seamless user experience.
              </p>

              <h2 className="text-2xl font-semibold pt-4">Our Expertise</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Custom Website Development</li>
                <li>E-commerce Solutions</li>
                <li>Progressive Web Applications</li>
                <li>Content Management Systems</li>
                <li>API Integration & Development</li>
                <li>Website Maintenance & Support</li>
              </ul>

              <h2 className="text-2xl font-semibold pt-4">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm text-white/60">Staying ahead with the latest technologies and trends</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <h3 className="font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-white/60">Delivering excellence in every project we undertake</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About; 