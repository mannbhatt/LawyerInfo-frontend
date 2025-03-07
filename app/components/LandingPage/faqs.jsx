'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "How do I create a professional profile?",
    answer: "Creating a profile is simple! Sign up, fill in your basic information, add your professional experience, skills, and a profile photo. Make sure to highlight your key achievements and expertise."
  },
  {
    question: "Can I customize my profile's privacy settings?",
    answer: "Yes, you have full control over your profile's privacy. You can choose what information is visible to the public, to your connections, or keep it private. These settings can be adjusted at any time."
  },
  {
    question: "How can I network with other professionals?",
    answer: "You can connect with other professionals by searching for them, joining industry groups, and engaging with their content. You can also share your profile link to expand your network."
  },
  {
    question: "What makes a profile stand out?",
    answer: "A standout profile includes a professional photo, detailed work experience, relevant skills, and regular updates. Sharing your achievements and maintaining an active presence helps attract more connections."
  },
  {
    question: "Is there a limit to the connections I can make?",
    answer: "No, there's no limit to the number of professional connections you can make. However, we encourage meaningful connections that add value to your professional network."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50" id='faqs'>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#591B0C] mx-auto"></div>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-[#591B0C] transition-transform duration-300 ${
                    activeIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
