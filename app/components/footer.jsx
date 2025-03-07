

"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#591B0C] border-t">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         
          <div>
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white hover:text-[#ff3003] transition-colors">
             AdvocateInfo
              </Link>
            </div>

            <p className="mt-4 max-w-md text-white">
              Connect with professionals worldwide. Create your profile and showcase your expertise to a global
              audience.
            </p>

            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-white hover:text-[#ff3003] transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white hover:text-[#ff3003] transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white hover:text-[#ff3003] transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white hover:text-[#ff3003] transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </Link>

              <Link href="#" className="text-white hover:text-[#ff3003] transition-colors" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-white">Company</p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <Link href="/aboutus" className="text-white hover:text-[#ff3003] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white hover:text-[#ff3003] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white hover:text-[#ff3003] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Services</p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <Link href="/profiles" className="text-white hover:text-[#ff3003] transition-colors">
                    Browse Profiles
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="text-white hover:text-[#ff3003] transition-colors">
                    Create Profile
                  </Link>
                </li>
                
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Help</p>
              <ul className="mt-4 space-y-4 text-sm">
                
                <li>
                  <Link href="#hero" className="text-white hover:text-[#ff3003] transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="#feature" className="text-white hover:text-[#ff3003] transition-colors">
                    Featurs
                  </Link>
                </li>
                <li>
                  <Link href="#howItWork" className="text-white hover:text-[#ff3003] transition-colors">
                    How It Work
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-white hover:text-[#ff3003] transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-white">Legal</p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <Link href="/privacy" className="text-white hover:text-[#ff3003] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white hover:text-[#ff3003] transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-white hover:text-[#ff3003] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="mt-12 border-t border-gray-200 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-white">
              <span className="block sm:inline">All rights reserved.</span>{" "}
              <span className="inline-block sm:inline">&copy; {currentYear} Profiles.</span>
            </p>

            <p className="mt-4 text-sm text-white sm:order-first sm:mt-0">Made with ❤️ for the community</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

