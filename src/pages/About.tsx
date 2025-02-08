import { motion } from "framer-motion";
import GraphBackground from "../components/GraphBackground";
import Navbar from "../components/Navbar";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import "../styles/CyberCard.css";
import TeamMemberCard from "../components/TeamMemberCard";
import { useState } from 'react';
import AnimatedCounter from "@/components/AnimatedCounter";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Somnath Biswas",
    role: "Founder, CEO",
    bio: "Visionary leader with extensive experience in web development and business strategy.",
    image: "/team/somnath.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/somnath",
      twitter: "https://twitter.com/somnath",
      github: "https://github.com/somnath"
    }
  },
  {
    name: "Akash Shil",
    role: "CTO",
    bio: "Technical expert with deep knowledge in modern web technologies.",
    image: "/team/akash.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/akash",
      twitter: "https://twitter.com/akash",
      github: "https://github.com/akash"
    }
  },
  {
    name: "Tamal Putaunda",
    role: "Business Development Expert",
    bio: "Strategic thinker focused on expanding our reach.",
    image: "/team/tamal.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/tamal",
      twitter: "https://twitter.com/tamal",
      github: "https://github.com/tamal"
    }
  }
];

const aboutContent = {
  mission: {
    title: "Our Mission",
    description: "To empower businesses with cutting-edge web solutions that drive growth and innovation in the digital space.",
    points: [
      "Creating scalable web applications",
      "Delivering exceptional user experiences",
      "Implementing modern technologies",
      "Ensuring client success"
    ]
  },
  expertise: [
    {
      title: "Modern Tech Stack",
      description: "We use the latest technologies including React, TypeScript, and Next.js",
      icon: "🚀"
    },
    {
      title: "Performance First",
      description: "Optimized for speed and efficiency across all devices",
      icon: "⚡"
    },
    {
      title: "Security Focus",
      description: "Enterprise-grade security measures and best practices",
      icon: "🔒"
    }
  ],
  stats: [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support" }
  ]
};

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrevCard = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div className="relative w-full min-h-screen">
      <GraphBackground />
      <Navbar />

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MakemySite</h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              We're a team of passionate developers and designers dedicated to creating exceptional web experiences.
            </p>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <AnimatedCounter from={0} to={100} suffix="+" />
              <div className="text-sm text-white/60">Projects Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <AnimatedCounter from={0} to={50} suffix="+" />
              <div className="text-sm text-white/60">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <AnimatedCounter from={0} to={5} suffix="+" />
              <div className="text-sm text-white/60">Years Experience</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold">24/7</div>
              <div className="text-sm text-white/60">Support</div>
            </motion.div>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">{aboutContent.mission.title}</h2>
            <p className="text-white/80 mb-6">{aboutContent.mission.description}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutContent.mission.points.map((point, index) => (
                <li key={index} className="flex items-center text-white/70">
                  <span className="mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Expertise Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aboutContent.expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <div className="relative">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-16"
            >
              Meet Our Team
            </motion.h2>
            
            <div className="relative h-[280px] w-full max-w-[200px] mx-auto">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.name}
                  member={member}
                  direction={index > activeIndex ? 1 : -1}
                  isActive={index === activeIndex}
                  index={index}
                  totalCards={teamMembers.length}
                  activeIndex={activeIndex}
                />
              ))}
              
              <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center gap-4">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About; 