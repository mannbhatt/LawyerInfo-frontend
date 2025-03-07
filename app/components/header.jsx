"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const NAVBAR_ITEMS = [
  { label: "FAQs", href: "#faqs" },
  { label: "How it works", href: "#howitworks" },
  { label: "About us", href: "#aboutus" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const [message, setMessage] = useState(false)
  const [isLandingPage, setIsLandingPage] = useState(false)
  const [username, setUsername] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect if it's a landing page
  useEffect(() => {
    setIsLandingPage(pathname === "/" || pathname === "/page")

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Check authentication when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setLoading(false)
        return
      }

      if (token) {
        try {
          const decodedToken = jwtDecode(token)
          setUsername(decodedToken["username"])
          setUser(decodedToken["id"])
        } catch (error) {
          console.error("Invalid token:", error)
        }
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.profile)
        } else {
          if (pathname === "/" || pathname === "/page") {
            setMessage(true)
          } else {
            setMessage(false)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname])

  // Logout function
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    router.push("/login")
  }

  return (
    <header
      className={`${isLandingPage ? "fixed top-0 left-0  z-50 " : " "} w-full transition-all duration-300 ${
        isScrolled || !isLandingPage ? "bg-primary shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-4 sm:px-6 lg:px-16">
        <Link href="/" className="font-bold text-xl sm:text-2xl text-white hover:scale-105 transition-transform">
          <h1 className="text-2xl sm:text-3xl text-white">AdvocateInfo</h1>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <div className="hidden lg:flex text-base sm:text-lg gap-4 sm:gap-8">
            {NAVBAR_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white font-medium relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {user && (
              <Link href="/dashboard/profiles" className="text-white font-medium relative group whitespace-nowrap">
                Profiles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          <div className="hidden lg:flex text-base sm:text-lg gap-4 sm:gap-6">
            {user ? (
              <ProfileDropdown user={user} username={username} handleLogout={handleLogout} />
            ) : (
              <>
                <Link
                  href="/register"
                  className="border-2 border-white text-white py-2 px-6 rounded-md text-base font-medium hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Join Now
                </Link>
                <Link
                  href="/login"
                  className="bg-secondary text-white py-2 px-6 rounded-md text-base font-medium hover:bg-secondary-light transition-all duration-300"
                >
                  Log in
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden text-white hover:text-secondary transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary border-t border-primary-light"
          >
            <div className="p-4 space-y-3">
              {NAVBAR_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-white font-medium hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <Link
                  href="/dashboard/profiles"
                  className="block py-2 text-white font-medium hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profiles
                </Link>
              )}

              <div className="pt-3 border-t border-primary-light">
                {user ? (
                  <>
                    <Link
                      href={`/${username}`}
                      className="flex items-center py-2 text-white font-medium hover:text-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2" />
                      {username}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center w-full py-2 text-white font-medium hover:text-secondary transition-colors"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 pt-2">
                    <Link
                      href="/register"
                      className="block text-center border border-white text-white py-2 px-4 rounded-md font-medium hover:bg-white hover:text-primary transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Now
                    </Link>
                    <Link
                      href="/login"
                      className="block text-center bg-secondary text-white py-2 px-4 rounded-md font-medium hover:bg-secondary-light transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 shadow-xl rounded-xl max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Complete Your Profile</h3>
              <p className="text-gray-700 mb-6">
                Please complete your profile and onboarding process to get the most out of our platform.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setMessage(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Later
                </button>
                <Link
                  href="/onboarding"
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-light transition-colors"
                  onClick={() => setMessage(false)}
                >
                  Start Onboarding
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ProfileDropdown({ user, username, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group focus:outline-none flex items-center gap-2 text-white"
      >
        <img
          src={user.profileImage || "/placeholder.svg?height=40&width=40"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white hover:border-secondary transition-colors"
        />
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <Link
              href={`/${username}`}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2 text-primary" />
              <span>{username}</span>
            </Link>
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={() => {
                handleLogout()
                setIsOpen(false)
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={16} className="mr-2 text-primary" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

