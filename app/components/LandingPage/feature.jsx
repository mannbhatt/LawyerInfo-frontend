'use client';
import { UserCircleIcon, EyeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <UserCircleIcon className="w-12 h-12 text-white" />,
      title: "Profile Customization",
      description: "Create a unique professional identity with customizable profile options and personal branding tools."
    },
    {
      icon: <EyeIcon className="w-12 h-12 text-white" />,
      title: "Visibility Control", 
      description: "Manage your online presence with advanced privacy settings and selective information sharing."
    },
    {
      icon: <UsersIcon className="w-12 h-12 text-white" />,
      title: "Professional Networking",
      description: "Connect with industry peers, join communities, and expand your professional network effortlessly."
    }
  ];

  return (
    <section className="py-16 bg-white" id='feature'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Powerful Features for Professionals
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to build your professional presence online
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
              className="p-6 bg-[#591B0C] rounded-lg shadow-md"
            >
              <div 
                className="mb-4 transform transition-transform duration-500 hover:rotate-12"
                
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
