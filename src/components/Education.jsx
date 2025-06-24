import { education, certifications } from "../constants";
import { motion } from "framer-motion";

const Education = () => {
  return (
    <section id="education" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">
              Education
            </h3>
            
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="card p-6">
                  <h4 className="text-xl font-bold">{edu.degree}</h4>
                  <p className="text-primary font-medium mb-2">{edu.university}</p>
                  <div className="flex justify-between text-gray-600">
                    <p>Graduated: {edu.graduation}</p>
                    <p>GPA: {edu.gpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">
              Certifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-medium">{cert}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;