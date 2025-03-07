'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

const NAVBAR_ITEMS = [
  { label: "FAQs", href: "#faqs" },
  { label: "How it works", href: "#howitworks" },
  { label: "About us", href: "#aboutus" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const[message,setMessage]=useState(false);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [username, setUsername] = useState(null);

  
  // Detect if it's a landing page
  useEffect(() => {
    setIsLandingPage(pathname === '/' || pathname === '/page');
  }, [pathname]);

  // Check authentication when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          
          setUsername(decodedToken["username"]);
          setUser(decodedToken['id'])
         
          
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
     

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.profile);
        } else {
          
          if (pathname === '/' || pathname === '/page') {
            setMessage(true);
          } else {
            setMessage(false);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push('/login'); 
  };
  return (
    <header className={`top-0 left-0 w-full z-20 ${isLandingPage ? 'relative bg-[#591B0C] border-b' : 'relative bg-[#591B0C] border-b'}`}>
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between p-4 sm:px-6 lg:px-16">
        <Link href="/" className="font-bold text-xl sm:text-2xl text-white hover:scale-105 transition-transform">
          <h1 className="text-2xl sm:text-3xl text-white">AdvocateInfo</h1>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <div className="hidden lg:flex text-base sm:text-lg gap-4 sm:gap-8">
            {NAVBAR_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="text-white font-semibold relative group whitespace-nowrap">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {user && (
              <Link href="/dashboard/profiles" className="text-white font-semibold relative group whitespace-nowrap">
                Profiles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>
            
          <div className="hidden lg:flex text-base sm:text-lg gap-4 sm:gap-8">
            {user ? (
              <ProfileDropdown user={user} username={username} handleLogout={handleLogout} />
            ) : (
              <>
                <Link href="/register" className="border-2 border-white text-white py-2 sm:py-3 px-6 text-base sm:text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105">
                  Join Now
                </Link>
                <Link href="/login" className="border-2 border-white text-white py-2 sm:py-3 px-6 text-base sm:text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105">
                  Log in
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden text-white hover:opacity-80 transition-opacity p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="absolute bg-[#591B0C] border left-auto right-0 mt-0 w-[50%] shadow-md rounded-lg py-2 z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="  " onClick={(e) => e.stopPropagation()}>
            <ul className="flex flex-col gap-2 sm:gap-2 px-4 text-right text-white">
              {NAVBAR_ITEMS.map((item) => (
                <li key={item.label} className="">
                  <Link href={item.href} className="block  px-4 py-2  font-semibold whitespace-nowrap relative group" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
               
                </li>
              ))}
              {user ? (
                <>
                  <li className="">
                    <Link href="/dashboard/profiles" className="block  px-4 py-2  font-semibold whitespace-nowrap relative group" onClick={() => setIsMenuOpen(false)}>
                      Profiles
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
              <Link
                href={`${username}`}
                className="block text-right px-4 py-2 text-white font-semibold whitespace-nowrap relative group"
                onClick={() => setIsOpen(false)}
            >
               
                <p className="flex justify-end"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7H5a7 7 0 00-7 7v-2a7 7 0 007 7h14a7 7 0 007-7v-2z" />
                </svg>
                {username}</p>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex justify-end w-full text-right px-4 py-2 text-white font-semibold relative group whitespace-nowrap"
              >
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
                </>
              ) : (
                <>
                  <li className="">
                    <Link href="/register" className="block  px-4 py-2  font-semibold whitespace-nowrap relative group" onClick={() => setIsMenuOpen(false)}>
                      Join Now
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/login" className="block  px-4 py-2  font-semibold whitespace-nowrap relative group" onClick={() => setIsMenuOpen(false)}>
                      Log in
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
            
          
        </div>
      )}
      {message && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#591B0C] p-4 shadow-md rounded-lg max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-4">
            <p className="text-white text-center mb-4">Please complete your profile and onboarding process.</p>
            <div className="flex justify-center">
              <Link href="/onboarding" className="px-6 py-2 border-white border-2 hover:border-[#ff3003] outline-none text-white transition-all duration-300 ease-in-out" onClick={() => setMessage(false)}>
                Start Onboarding
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ProfileDropdown({ user,username, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group focus:outline-none"
      >
        <img
          src={user.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary hover:opacity-80 transition-opacity cursor-pointer"
        />
      </button>

      {isOpen && (
        <div className="absolute bg-[#591B0C] border right-0 mt-4 w-48 shadow-md rounded-lg py-2 z-50">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href={`${username}`}
                className="block text-right px-4 py-2 text-white font-semibold whitespace-nowrap relative group"
                onClick={() => setIsOpen(false)}
            >
               
                <p className="flex justify-end"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7H5a7 7 0 00-7 7v-2a7 7 0 007 7h14a7 7 0 007-7v-2z" />
                </svg>
                {username}</p>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex justify-end w-full text-right px-4 py-2 text-white font-semibold relative group whitespace-nowrap"
              >
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
