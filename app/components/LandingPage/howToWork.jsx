"use client"

import { motion } from "framer-motion"
import { UserPlus, Edit, Share2 } from "lucide-react"

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-primary" />,
    title: "Create Your Profile",
    description: "Sign up and create your personalized profile in just a few minutes.",
  },
  {
    icon: <Edit className="w-10 h-10 text-primary" />,
    title: "Customize Content",
    description: "Add your skills, experience, and showcase your best work.",
  },
  {
    icon: <Share2 className="w-10 h-10 text-primary" />,
    title: "Share & Connect",
    description: "Share your profile with others and grow your professional network.",
  },
]

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="howitworks">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get started in three simple steps and begin your professional journey
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center md:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 15px 35px rgba(89, 27, 12, 0.15)",
                }}
                className="flex flex-col items-center text-center p-8 bg-white  shadow-custom w-full border border-gray-100 relative overflow-hidden h-full"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

                <span className="absolute top-4 right-4 text-gray-200 font-bold text-6xl opacity-20">{index + 1}</span>

                <div className="mb-6 p-5 bg-primary/10 rounded-full transform transition-transform duration-500 hover:rotate-12 z-10">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>

                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center mx-4">
                  <div className="w-16 h-0.5 bg-primary"></div>
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

