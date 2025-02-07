import { motion } from 'framer-motion';

const features = [
  {
    title: "Automated Geolocation",
    description: "Our AI analyzes visual elements to determine precise locations from images and videos.",
    icon: "🌍"
  },
  {
    title: "Real-time Processing",
    description: "Process thousands of images simultaneously with our distributed cloud infrastructure.",
    icon: "⚡"
  },
  {
    title: "Advanced Recognition",
    description: "Identify landmarks, architecture, and environmental features with high accuracy.",
    icon: "🔍"
  },
  {
    title: "Custom Integration",
    description: "Easily integrate with your existing workflows through our robust API.",
    icon: "🔄"
  },
  {
    title: "Secure & Private",
    description: "Enterprise-grade security with end-to-end encryption for all your data.",
    icon: "🔒"
  },
  {
    title: "Detailed Analytics",
    description: "Get comprehensive insights and confidence scores for each prediction.",
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
            Powerful Features for
            <span className="text-white/90 ml-2">Location Intelligence</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Transform your visual data into actionable geographic insights with our comprehensive suite of AI-powered tools
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