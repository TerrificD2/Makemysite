import { motion } from 'framer-motion';

const features = [
  {
    title: "Custom Web Development",
    description: "Tailored websites built from scratch to match your unique business needs.",
    icon: "💻"
  },
  {
    title: "Real-time Updates",
    description: "Modern web applications with live updates and seamless interactions.",
    icon: "⚡"
  },
  {
    title: "Responsive Design",
    description: "Websites that look and work perfectly on all devices and screen sizes.",
    icon: "📱"
  },
  {
    title: "API Integration",
    description: "Seamless integration with third-party services and custom APIs.",
    icon: "🔄"
  },
  {
    title: "Security First",
    description: "Enterprise-grade security with end-to-end encryption for your data.",
    icon: "🔒"
  },
  {
    title: "Analytics & Insights",
    description: "Comprehensive analytics to track and improve your website's performance.",
    icon: "📊"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Web Development
            <span className="text-white/90 ml-2">Solutions</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Transform your digital presence with our full suite of modern web development services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 