"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Loader2, User, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [city, setCity] = useState("")
  const [results, setResults] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim() && !city.trim()) {
      setError("Please enter a name or location to search.")
      return
    }

    setError("")
    setLoading(true)
    setShowResults(true)

    try {
      // Build the query string properly, only including parameters that have values
      const queryParams = []
      if (searchQuery.trim()) {
        queryParams.push(`username=${encodeURIComponent(searchQuery.trim())}`)
      }
      if (city.trim()) {
        queryParams.push(`city=${encodeURIComponent(city.trim())}`)
      }

      const queryString = queryParams.join("&")
      const url = `${process.env.NEXT_PUBLIC_API_URL}/profiles/search?${queryString}`

      console.log("Fetching from URL:", url) // Debug log

      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Server responded with status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setResults(data.users)
        if (data.users.length === 0) {
          setError("No profiles found matching your search criteria.")
        }
      } else {
        setError(data.message || "Search failed. Please try again.")
        setResults([])
      }
    } catch (error) {
      console.error("Error fetching search results:", error)
      setError("An error occurred while searching. Please try again later.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="relative h-[100vh] w-full overflow-hidden" id="hero">
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
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 max-w-5xl mx-auto"
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
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-12 w-full border-0 bg-white pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none rounded-sm"
                  aria-label="Search by name"
                />
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-12 w-full border-0 bg-white pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none rounded-sm"
                  aria-label="Search by location"
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="h-12 px-8 bg-secondary text-white font-medium transition-all duration-300 hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center rounded-sm"
                aria-label="Search profiles"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 w-full max-w-4xl mx-auto"
          >
            {error ? (
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white text-center">
                <p>{error}</p>
              </div>
            ) : loading ? (
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            ) : results.length > 0 ? (
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
                <h2 className="text-white text-xl font-semibold mb-4">Search Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((user) => (
                    <Link
                      href={`/${user.username}`}
                      key={user._id || user.id || user.username}
                      className="bg-white/20 hover:bg-white/30 transition-colors p-4 rounded-lg flex flex-col items-center text-white group"
                    >
                      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-white/50">
                        {user.profileImage ? (
                          <Image
                            src={user.profileImage || "/placeholder.svg"}
                            alt={user.username || user.fullName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <User className="w-10 h-10 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-lg">{user.fullName || user.username}</h3>
                      {user.title && <p className="text-white/80 text-sm">{user.title}</p>}
                      {user.city && (
                        <div className="flex items-center mt-1 text-white/70 text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{user.city}</span>
                        </div>
                      )}
                      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-secondary">
                        <span className="text-sm mr-1">View Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </div>
    </section>
  )
}

