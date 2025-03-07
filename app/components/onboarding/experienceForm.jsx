"use client"

import { useState, useEffect, useRef } from "react"
import { useToast } from "../ui/toast"
import { Briefcase, Calendar, Building, FileText } from "lucide-react"
import "tailwindcss/tailwind.css"

const ExperienceForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const { success, error } = useToast()
  const [experienceData, setExperienceData] = useState({
    userId: userId,
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  })
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter companies based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredCompanies(filtered)
    } else {
      setFilteredCompanies([])
    }
  }, [searchTerm, companies])

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`)
      const data = await response.json()
      if (data.success) {
        setCompanies(
          data.companies || [
            { _id: "1", name: "Google" },
            { _id: "2", name: "Microsoft" },
            { _id: "3", name: "Apple" },
            { _id: "4", name: "Amazon" },
            { _id: "5", name: "Facebook" },
            { _id: "6", name: "Netflix" },
            { _id: "7", name: "Tesla" },
            { _id: "8", name: "Twitter" },
            { _id: "9", name: "Uber" },
            { _id: "10", name: "Airbnb" },
          ],
        )
      } else {
        console.error("Failed to fetch companies")
      }
    } catch (error) {
      console.error("Error fetching companies:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setExperienceData((prev) => ({
        ...prev,
        [name]: checked,
        // Clear end date if currently working
        ...(name === "currentlyWorking" && checked ? { endDate: "" } : {}),
      }))
    } else {
      setExperienceData((prev) => ({ ...prev, [name]: value }))

      // Handle company search
      if (name === "company") {
        setSearchTerm(value)
        setShowDropdown(true)
      }
    }
  }

  const handleCompanySelect = (companyName) => {
    setExperienceData((prev) => ({ ...prev, company: companyName }))
    setSearchTerm(companyName)
    setShowDropdown(false)
  }

  const validateForm = () => {
    const newErrors = {}
    const currentDate = new Date()

    if (!searchTerm.trim()) {
      newErrors.company = "Company name is required."
    }

    if (!experienceData.position.trim()) {
      newErrors.position = "Position is required."
    }

    if (!experienceData.startDate) {
      newErrors.startDate = "Start date is required."
    } else if (new Date(experienceData.startDate) > currentDate) {
      newErrors.startDate = "Start date cannot be in the future."
    }

    if (!experienceData.currentlyWorking && !experienceData.endDate) {
      newErrors.endDate = "End date is required if not currently working."
    } else if (experienceData.endDate && new Date(experienceData.endDate) < new Date(experienceData.startDate)) {
      newErrors.endDate = "End date cannot be before start date."
    }

    if (!experienceData.description?.trim()) {
      newErrors.description = "Description is required."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitExperienceData = async (redirectAfterSubmit) => {
    if (!validateForm()) {
      error("Please fix the errors in the form")
      return
    }

    const token = localStorage.getItem("authToken")

    if (!token) {
      error("No token found. User might not be logged in.")
      return
    }

    const finalData = {
      userId: experienceData.userId,
      company: searchTerm,
      position: experienceData.position,
      startDate: experienceData.startDate,
      endDate: experienceData.currentlyWorking ? null : experienceData.endDate,
      description: experienceData.description,
      currentlyWorking: experienceData.currentlyWorking,
    }

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      })

      const data = await response.json()

      if (response.ok) {
        success("Experience added successfully!")

        if (redirectAfterSubmit) {
          nextStep()
        } else {
          setSearchTerm("")
          setExperienceData({
            userId: userId,
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
            currentlyWorking: false,
          })
          thisStep()
        }
      } else {
        error(data.message || "Failed to add experience.")
      }
    } catch (err) {
      console.error("Error:", err)
      error("An error occurred. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
      <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb] p-4 rounded-lg">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: "44%" }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 4 of 9: Experience Information</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700  items-center">
              <Building className="w-4 h-4 mr-2 text-[#591B0C]" />
              Company
            </label>
            <input
              type="text"
              name="company"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              placeholder="Search for company..."
              required
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}

            {/* Dropdown for companies */}
            {showDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <div
                      key={company._id}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#ffefdb]"
                      onClick={() => handleCompanySelect(company.name)}
                    >
                      {company.name}
                    </div>
                  ))
                ) : searchTerm ? (
                  <div
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#ffefdb]"
                    onClick={() => handleCompanySelect(searchTerm)}
                  >
                    Use "{searchTerm}"
                  </div>
                ) : (
                  <div className="py-2 pl-3 pr-9 text-gray-500">Type to search companies</div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  items-center">
              <Briefcase className="w-4 h-4 mr-2 text-[#591B0C]" />
              Position
            </label>
            <input
              type="text"
              name="position"
              value={experienceData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              placeholder="Software Engineer, Project Manager, etc."
              required
            />
            {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  items-center">
              <Calendar className="w-4 h-4 mr-2 text-[#591B0C]" />
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={experienceData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              required
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  items-center">
              <Calendar className="w-4 h-4 mr-2 text-[#591B0C]" />
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={experienceData.endDate}
              onChange={handleInputChange}
              disabled={experienceData.currentlyWorking}
              className={`mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3 ${
                experienceData.currentlyWorking ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}

            <div className="mt-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={experienceData.currentlyWorking}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ff3003] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#591B0C]"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">I currently work here</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <FileText className="w-4 h-4 mr-2 text-[#591B0C]" />
            Description
          </label>
          <textarea
            name="description"
            value={experienceData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full h-20 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3 py-2"
            placeholder="Describe your responsibilities, achievements, and projects..."
            required
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={skipStep}
            className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white rounded-md transition-colors duration-300"
          >
            Skip
          </button>
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => submitExperienceData(false)}
              className="px-6 py-2 border border-[#591B0C] text-[#591B0C] rounded-md hover:bg-[#ffefdb] transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add More"}
            </button>
            <button
              type="button"
              onClick={() => submitExperienceData(true)}
              className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white rounded-md transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ExperienceForm

