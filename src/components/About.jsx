import { personalData } from "../constants";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <p className="text-lg text-gray-700 mb-6">
              {personalData.summary}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-medium">
                  <span className="text-primary mr-2">Name:</span>
                  {personalData.name}
                </p>
                <p className="font-medium">
                  <span className="text-primary mr-2">Email:</span>
                  {personalData.email}
                </p>
                <p className="font-medium">
                  <span className="text-primary mr-2">Phone:</span>
                  {personalData.phone}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">
                  <span className="text-primary mr-2">Location:</span>
                  {personalData.location}
                </p>
                <p className="font-medium">
                  <span className="text-primary mr-2">Title:</span>
                  {personalData.title}
                </p>
                <p className="font-medium">
                  <span className="text-primary mr-2">LinkedIn:</span>
                  <a 
                    href={`https://${personalData.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {personalData.linkedin}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;