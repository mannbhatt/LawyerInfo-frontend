"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do I create a professional profile?",
    answer:
      "Creating a profile is simple! Sign up, fill in your basic information, add your professional experience, skills, and a profile photo. Make sure to highlight your key achievements and expertise.",
  },
  {
    question: "Can I customize my profile's privacy settings?",
    answer:
      "Yes, you have full control over your profile's privacy. You can choose what information is visible to the public, to your connections, or keep it private. These settings can be adjusted at any time.",
  },
  {
    question: "How can I network with other professionals?",
    answer:
      "You can connect with other professionals by searching for them, joining industry groups, and engaging with their content. You can also share your profile link to expand your network.",
  },
  {
    question: "What makes a profile stand out?",
    answer:
      "A standout profile includes a professional photo, detailed work experience, relevant skills, and regular updates. Sharing your achievements and maintaining an active presence helps attract more connections.",
  },
  {
    question: "Is there a limit to the connections I can make?",
    answer:
      "No, there's no limit to the number of professional connections you can make. However, we encourage meaningful connections that add value to your professional network.",
  },
]

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Find answers to common questions about our platform</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white  shadow-custom overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="px-6 py-5">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection

