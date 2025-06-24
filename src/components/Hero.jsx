import { motion, useScroll, useTransform } from "framer-motion";
import { personalData } from "../constants";
import { useRef } from 'react';

const Hero = () => {
  const heroRef = useRef();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Unsplash images for parallax
  const parallaxImages = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen relative overflow-hidden bg-gray-50"
    >
      {/* Background parallax images */}
      <div className="absolute inset-0 overflow-hidden">
        {parallaxImages.map((img, index) => (
          <motion.div
            key={index}
            style={{ y: useTransform(scrollYProgress, [0, 1], [`0%`, `${(index + 1) * 30}%`]) }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt=""
              className={`w-full h-full object-cover opacity-${20 + (index * 20)}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-white/80" />

      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-20">
          {/* Text content with neumorphic card */}
          <motion.div
            style={{ y: yText }}
            className="md:w-1/2 relative"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-neumorph">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800"
              >
                Hi, I'm <span className="text-primary">{personalData.name}</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700"
              >
                {personalData.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-600 mb-8 max-w-lg"
              >
                {personalData.summary}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#contact"
                  className="btn btn-primary shadow-neumorph-inset hover:shadow-neumorph"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
                <motion.a
                  href="#projects"
                  className="btn btn-outline shadow-neumorph-inset hover:shadow-neumorph"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Image with neumorphic frame */}
          <motion.div
            style={{ y: yBg }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl shadow-neumorph overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                  alt={personalData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 rounded-3xl border-2 border-white/30 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;