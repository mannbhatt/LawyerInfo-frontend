"use client"

import { motion } from "framer-motion"
import { UserCircle, Eye, Users } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <UserCircle className="w-10 h-10 text-white" />,
      title: "Profile Customization",
      description:
        "Create a unique professional identity with customizable profile options and personal branding tools.",
    },
    {
      icon: <Eye className="w-10 h-10 text-white" />,
      title: "Visibility Control",
      description: "Manage your online presence with advanced privacy settings and selective information sharing.",
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: "Professional Networking",
      description: "Connect with industry peers, join communities, and expand your professional network effortlessly.",
    },
  ]

  return (
    <section className="py-20  bg-white" id="feature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Powerful Features for Professionals
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-0 mb-2"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to build your professional presence online and connect with the right people
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 30px rgba(89, 27, 12, 0.2)",
              }}
              className="p-8 bg-gradient-to-br from-primary to-primary-light shadow-custom overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150"></div>

              <div className="mb-6 p-4 bg-white/10 rounded-full inline-block transform transition-transform duration-500 group-hover:rotate-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>

              <p className="text-white/90 text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

