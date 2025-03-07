"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a username to search.");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profiles/search?username=${searchQuery}&city=${city}`
      );
      const data = await response.json();

      if (data.success) {
        setResults(data.users);
      } else {
        setError(data.message);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("An error occurred while searching.");
    }
  };

  return (
    <section className="relative h-[100vh] w-full overflow-hidden" id="hero">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_1280.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 max-w-5xl mx-auto bottom-0"
        >
          <h1 className="mb-2 text-4xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Find and Connect with Amazing Profiles
          </h1>

          <p className="mb-4 text-lg sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto">
            Discover and connect with professionals from around the world
          </p>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="Search by name ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full border-0 bg-white pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-12 w-full border-0 bg-white pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>

              <button
                onClick={handleSearch}
                className="h-12 px-8 bg-secondary text-white font-medium transition-all duration-300 hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Results */}
        <div className="mt-6 text-white">
          {error && <p className="text-red-400">{error}</p>}
          <ul>
            {results.map((user) => (
              <li key={user.username} className="flex items-center space-x-4 mt-2">
                <img src={user.profileImage} alt={user.username} className="w-12 h-12 rounded-full" />
                <p>{user.username} - {user.city}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
