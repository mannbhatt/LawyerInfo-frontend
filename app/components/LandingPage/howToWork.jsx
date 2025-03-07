'use client';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEdit, FaShareAlt } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUserPlus className="w-10 h-10 text-[#591B0C]" />,
    title: "Create Your Profile",
    description: "Sign up and create your personalized profile in just a few minutes."
  },
  {
    icon: <FaEdit className="w-10 h-10 text-[#591B0C]" />,
    title: "Customize Content",
    description: "Add your skills, experience, and showcase your best work."
  },
  {
    icon: <FaShareAlt className="w-10 h-10 text-[#591B0C]" />,
    title: "Share & Connect",
    description: "Share your profile with others and grow your professional network."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50" id='howitworks'>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-[#591B0C] mx-auto"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl w-72 border border-gray-100 relative overflow-hidden"
              >
                <div className="mb-6 p-5 bg-[#fff5f3] rounded-full transform transition-transform duration-500 hover:rotate-12">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#591B0C] to-[#ff4b22]"></div>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center mx-4">
                  <div className="w-16 h-0.5 bg-[#591B0C]"></div>
                  <div className="w-3 h-3 bg-[#591B0C] rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
