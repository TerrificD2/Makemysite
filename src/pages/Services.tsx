import { motion } from "framer-motion";
import GraphBackground from "../components/GraphBackground";
import Navbar from "../components/Navbar";
import CTAButton from "../components/CTAButton";

const services = [
  {
    title: "Custom Web Development",
    description: "Tailored websites built from scratch to match your unique business needs and brand identity.",
    features: [
      "Responsive Design",
      "Custom Functionality",
      "Performance Optimization",
      "SEO-friendly Structure"
    ],
    icon: "💻"
  },
  {
    title: "E-commerce Solutions",
    description: "Powerful online stores with seamless payment integration and inventory management.",
    features: [
      "Secure Payment Gateways",
      "Inventory Management",
      "Order Processing",
      "Customer Analytics"
    ],
    icon: "🛍️"
  },
  {
    title: "Web Applications",
    description: "Complex web applications that streamline your business processes and enhance productivity.",
    features: [
      "User Authentication",
      "Real-time Updates",
      "Data Visualization",
      "API Integration"
    ],
    icon: "⚡"
  },
  {
    title: "CMS Development",
    description: "Custom content management systems that make website updates effortless.",
    features: [
      "Easy Content Updates",
      "User Management",
      "Media Library",
      "Version Control"
    ],
    icon: "📝"
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and engaging user interfaces that enhance user experience and conversion rates.",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design"
    ],
    icon: "🎨"
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing support and maintenance to keep your website secure and up-to-date.",
    features: [
      "Security Updates",
      "Performance Monitoring",
      "Content Updates",
      "Technical Support"
    ],
    icon: "🔧"
  }
];

const Services = () => {
  return (
    <div className="relative w-full min-h-screen">
      <GraphBackground />
      <Navbar />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              We offer comprehensive web development solutions tailored to your business needs. 
              From simple websites to complex web applications, we've got you covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/60 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-white/80">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h2>
            <CTAButton onClick={() => window.location.href = '/contact'}>
              Get in Touch
            </CTAButton>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Services; 