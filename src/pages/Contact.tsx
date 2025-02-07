import { motion } from "framer-motion";
import GraphBackground from "../components/GraphBackground";
import Navbar from "../components/Navbar";
import CTAButton from "../components/CTAButton";

const Contact = () => {
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
              Get in Touch
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <div className="space-y-4 text-white/80">
                  <p>
                    <strong>Email:</strong>
                    <br />
                    info@makemysite.com
                  </p>
                  <p>
                    <strong>Phone:</strong>
                    <br />
                    +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Address:</strong>
                    <br />
                    123 Web Street, Digital City
                    <br />
                    Tech State, 12345
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                  </div>
                  <CTAButton>Send Message</CTAButton>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Contact; 