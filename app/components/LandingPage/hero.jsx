"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Loader2, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [city, setCity] = useState("")
  const [results, setResults] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [resultsExpanded, setResultsExpanded] = useState(true)
  const [visibleResults, setVisibleResults] = useState(6)
  const resultsRef = useRef(null)

  // Handle scrolling when results are shown
  useEffect(() => {
    if (showResults && results.length > 0 && resultsRef.current) {
      const scrollToResults = () => {
        const heroHeight = window.innerHeight
        const scrollPosition = heroHeight * 0.65 // Scroll to 65% of hero height
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        })
      }

      // Small delay to ensure animation completes
      const timer = setTimeout(scrollToResults, 300)
      return () => clearTimeout(timer)
    }
  }, [showResults, results.length])


  const handleSearch = async () => {
  if (!searchQuery.trim() && !city.trim()) {
    setError("Please enter a full name or location to search.");
    return;
  }

  setError("");
  setLoading(true);
  setShowResults(true);
  setResultsExpanded(true);
  setVisibleResults(6);

  try {
    // Build the query string properly, only including parameters that have values
    const queryParams = [];
    if (searchQuery.trim()) {
      queryParams.push(`fullName=${encodeURIComponent(searchQuery.trim())}`); // FIXED: Changed `username` to `fullName`
    }
    if (city.trim()) {
      queryParams.push(`city=${encodeURIComponent(city.trim())}`);
    }

    const queryString = queryParams.join("&");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/searchdata/search?${queryString}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Server responded with status: ${response.status}`);
    }

    if (data.success) {
      setResults(data.users);
      if (data.users.length === 0) {
        setError("No profiles found matching your search criteria.");
      }
    } else {
      setError(data.message || "Search failed. Please try again.");
      setResults([]);
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    setError("An error occurred while searching. Please try again later.");
    setResults([]);
  } finally {
    setLoading(false);
  }
};
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setCity("")
    setResults([])
    setError("")
    setShowResults(false)
  }

  const toggleResultsExpansion = () => {
    setResultsExpanded(!resultsExpanded)
  }

  const loadMoreResults = () => {
    setVisibleResults((prev) => prev + 6)
  }

  // Determine if we should show "Load More" button
  const hasMoreResults = results.length > visibleResults

  // Get the results to display based on current state
  const displayedResults = resultsExpanded ? results.slice(0, visibleResults) : results.slice(0, 3)

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden" id="hero">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://cdn.pixabay.com/photo/2018/02/16/14/38/portrait-3157821_1280.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center mt-auto justify-end px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="mb-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Find and Connect with Amazing Profiles
          </h1>

          <p className="mb-6 text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
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
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 w-full border-0 bg-white pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none rounded-md"
                  aria-label="Search by name"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search input"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 w-full border-0 bg-white pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none rounded-md"
                  aria-label="Search by location"
                />
                {city && (
                  <button
                    onClick={() => setCity("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear location input"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="h-12 px-6 bg-secondary text-white font-medium transition-all duration-300 hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center rounded-md disabled:opacity-70 flex-grow"
                  aria-label="Search profiles"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
                </button>

                {showResults && (
                  <button
                    onClick={clearSearch}
                    className="h-12 px-3 bg-white/20 text-white font-medium transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 flex items-center justify-center rounded-md"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto mt-8 mb-8"
            >
              {error ? (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white text-center">
                  <p>{error}</p>
                </div>
              ) : loading ? (
                <div className="fixed bg-white/10 backdrop-blur-md p-8 rounded-lg flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
                  <p className="text-white">Searching for profiles...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 bg-white/5 backdrop-blur-md flex justify-between items-center border-b border-white/10">
                    <h2 className="text-white text-xl font-semibold">
                      Found {results.length} {results.length === 1 ? "Profile" : "Profiles"}
                    </h2>

                    {results.length > 3 && (
                      <button
                        onClick={toggleResultsExpansion}
                        className="flex items-center gap-1 text-white/80 hover:text-white transition-colors px-3 py-1 rounded-md bg-white/10 hover:bg-white/20"
                        aria-label={resultsExpanded ? "Show fewer results" : "Show all results"}
                      >
                        <span className="text-sm font-medium">{resultsExpanded ? "Show Less" : "Show All"}</span>
                        {resultsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayedResults.map((user) => (
                        <Link
                          href={`/${user.username}`}
                          key={user.username || user._id}
                          className="bg-white/20 backdrop-blur-md rounded-lg p-4 hover:bg-white/30 transition-all duration-300 flex flex-col items-center text-white group relative overflow-hidden"
                        >
                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <img
                              src={user.profileImage || "/placeholder.svg?height=80&width=80"}
                              alt={user.username}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=80&width=80"
                              }}
                            />
                          </div>

                          <h3 className="font-semibold text-lg relative z-10 group-hover:text-white transition-colors">
                            {user.fullName || user.username}
                          </h3>

                          {user.title && (
                            <p className="text-sm text-white/80 relative z-10 group-hover:text-white/90 transition-colors">
                              {user.title}
                            </p>
                          )}

                          {user.city && (
                            <div className="flex items-center mt-1 text-sm relative z-10 group-hover:text-white/90 transition-colors">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{user.city}</span>
                            </div>
                          )}

                          <div className="mt-3 flex items-center text-white/70 group-hover:text-white transition-colors relative z-10 transform translate-y-0 group-hover:translate-y-0 opacity-100 group-hover:opacity-100">
                            <span className="text-sm font-medium">View Profile</span>
                            <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Load More Button */}
                    {resultsExpanded && hasMoreResults && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={loadMoreResults}
                          className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md transition-colors inline-flex items-center gap-2"
                        >
                          <span>Load More</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

