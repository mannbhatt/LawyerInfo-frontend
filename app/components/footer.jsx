"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary border-t border-primary-light">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand and Social */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <Link href="/" className="text-2xl font-bold text-white hover:text-secondary transition-colors">
                AdvocateInfo
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 max-w-md text-white/80 leading-relaxed"
            >
              Connect with professionals worldwide. Create your profile and showcase your expertise to a global
              audience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 flex gap-4"
            >
              <Link href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </Link>
            </motion.div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="font-medium text-white">Company</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/aboutus" className="text-white/70 hover:text-secondary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/70 hover:text-secondary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-secondary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="font-medium text-white">Services</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/profiles" className="text-white/70 hover:text-secondary transition-colors">
                    Browse Profiles
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="text-white/70 hover:text-secondary transition-colors">
                    Create Profile
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-medium text-white">Help</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="#hero" className="text-white/70 hover:text-secondary transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="#feature" className="text-white/70 hover:text-secondary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#howitworks" className="text-white/70 hover:text-secondary transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#faqs" className="text-white/70 hover:text-secondary transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-medium text-white">Legal</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-white/70 hover:text-secondary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/70 hover:text-secondary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-white/70 hover:text-secondary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-primary-light pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-white/70">
              <span className="block sm:inline">All rights reserved.</span>{" "}
              <span className="inline-block sm:inline">&copy; {currentYear} AdvocateInfo.</span>
            </p>

            <p className="mt-4 text-sm text-white/70 sm:order-first sm:mt-0">
              Made with <Heart className="inline-block h-4 w-4 text-secondary" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

