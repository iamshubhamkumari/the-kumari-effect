import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaPhoneAlt, FaRedo } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { personalData } from "../constants";

const generateMathCaptcha = () => {
  const operations = [
    { symbol: '+', method: (a, b) => a + b },
    { symbol: '-', method: (a, b) => a - b },
    { symbol: '×', method: (a, b) => a * b }
  ];
  
  const operation = operations[Math.floor(Math.random() * operations.length)];
  const num1 = Math.floor(Math.random() * 15) + 1;
  const num2 = Math.floor(Math.random() * 15) + 1;
  
  // Ensure positive results for subtraction
  if (operation.symbol === '-') {
    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);
    return {
      question: `${larger} ${operation.symbol} ${smaller}`,
      answer: operation.method(larger, smaller)
    };
  }
  
  return {
    question: `${num1} ${operation.symbol} ${num2}`,
    answer: operation.method(num1, num2)
  };
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captchaAnswer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captcha, setCaptcha] = useState(generateMathCaptcha());
  const [captchaError, setCaptchaError] = useState('');
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'captchaAnswer' && captchaError) {
      setCaptchaError('');
    }
  };

  const refreshCaptcha = () => {
    setCaptcha(generateMathCaptcha());
    setFormData(prev => ({ ...prev, captchaAnswer: '' }));
    setCaptchaError('');
  };

  const validateCaptcha = () => {
    const userAnswer = parseInt(formData.captchaAnswer);
    if (isNaN(userAnswer)) {
      setCaptchaError('Please enter a valid number');
      return false;
    }
    if (userAnswer !== captcha.answer) {
      setCaptchaError('Incorrect answer');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCaptcha()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('https://formspree.io/f/mldnpbab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name} (${formData.email})`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        formRef.current.reset();
        setFormData({ name: '', email: '', message: '', captchaAnswer: '' });
        refreshCaptcha();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get In Touch</h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <p className="mb-6">
                  Feel free to reach out to me for any questions or opportunities!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaEnvelope className="text-primary text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <a 
                        href={`mailto:${personalData.email}`} 
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhoneAlt className="text-primary text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-bold">Phone</h4>
                      <a 
                        href={`tel:${personalData.phone}`} 
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {personalData.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaLinkedin className="text-primary text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="font-bold">LinkedIn</h4>
                      <a 
                        href={`https://${personalData.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {personalData.linkedin}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your Email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  
                  {/* Math CAPTCHA */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-medium">
                        Math Verification:
                      </label>
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="text-gray-500 hover:text-primary transition-colors"
                        title="Refresh question"
                      >
                        <FaRedo className="inline mr-1" />
                        <span className="text-sm">New Problem</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-mono bg-white px-4 py-2 rounded border border-gray-300">
                        {captcha.question} = ?
                      </div>
                      <input
                        type="number"
                        name="captchaAnswer"
                        value={formData.captchaAnswer}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your answer"
                      />
                    </div>
                    {captchaError && (
                      <p className="mt-2 text-sm text-red-500">{captchaError}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                      Failed to send message. Please try again or email me directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;