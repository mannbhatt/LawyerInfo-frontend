"use client"

import { useState, useEffect, useRef } from "react"
import { useToast } from "../ui/toast"
import "tailwindcss/tailwind.css"
import { School, Book, Calendar, Info, Star } from "lucide-react"

const EducationForm = ({ nextStep, skipStep, userId }) => {
  const { success, error } = useToast()
  const [educationData, setEducationData] = useState({
    userId: userId,
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
  })
  const [customInstitution, setCustomInstitution] = useState("")
  const [institutions, setInstitutions] = useState([]) // Store fetched institutions
  const [filteredInstitutions, setFilteredInstitutions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  // Fetch Institutions from Backend
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutions`)
        const data = await response.json()
        if (response.ok) {
          setInstitutions(
            data.institutions || [
              { _id: "1", name: "Harvard University" },
              { _id: "2", name: "Stanford University" },
              { _id: "3", name: "MIT" },
              { _id: "4", name: "Yale University" },
              { _id: "5", name: "Princeton University" },
              { _id: "6", name: "Columbia University" },
              { _id: "7", name: "University of Chicago" },
              { _id: "8", name: "University of Pennsylvania" },
              { _id: "9", name: "California Institute of Technology" },
              { _id: "10", name: "Duke University" },
            ],
          )
        } else {
          console.error("Failed to fetch institutions:", data.message)
        }
      } catch (error) {
        console.error("Error fetching institutions:", error)
      }
    }

    fetchInstitutions()
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

  // Filter institutions based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = institutions.filter((inst) => inst.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredInstitutions(filtered)
    } else {
      setFilteredInstitutions([])
    }
  }, [searchTerm, institutions])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEducationData((prev) => ({ ...prev, [name]: value }))

    // Handle institution search
    if (name === "institution") {
      setSearchTerm(value)
      setShowDropdown(true)
    }
  }

  const handleInstitutionSelect = (institutionName) => {
    setEducationData((prev) => ({ ...prev, institution: institutionName }))
    setSearchTerm(institutionName)
    setShowDropdown(false)
    setCustomInstitution("")
  }

  const validateForm = () => {
    if (!educationData) {
      console.error("Error: educationData is undefined.")
      return false
    }

    const newErrors = {}
    const currentDate = new Date()

    if (!educationData.institution?.trim()) {
      newErrors.institution = "Institution name is required."
    }

    if (!educationData.degree?.trim()) {
      newErrors.degree = "Degree is required."
    }

    if (!educationData.description?.trim()) {
      newErrors.description = "Short description is required."
    }

    if (!educationData.startDate) {
      newErrors.startDate = "Start date is required."
    } else if (new Date(educationData.startDate) > currentDate) {
      newErrors.startDate = "Start date cannot be in the future."
    }

    if (educationData.endDate) {
      if (new Date(educationData.endDate) < new Date(educationData.startDate)) {
        newErrors.endDate = "End date cannot be before start date."
      }
    }

    if (educationData.grade && !/^[0-9]\.[0-9]$|^[0-4]\.00$/.test(educationData.grade)) {
      newErrors.grade = "Grade should be in the format 0.0 to 9.9"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitEducationData = async (redirectAfterSubmit) => {
    const isValid = validateForm()

    if (!isValid) {
      error("Please fix the errors in the form")
      return
    }

    const token = localStorage.getItem("authToken")

    if (!token) {
      error("No token found. User might not be logged in.")
      return
    }

    const finalInstitution = searchTerm

    if (!finalInstitution || finalInstitution.trim() === "") {
      error("Please select or enter an institution.")
      return
    }

    const finalData = {
      ...educationData,
      institution: finalInstitution,
    }

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(finalData),
      })

      const data = await response.json()
      if (response.ok) {
        success("Education added successfully!")

        if (redirectAfterSubmit) {
          nextStep()
        } else {
          setSearchTerm("")
          setCustomInstitution("")
          setEducationData({
            userId: userId,
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
            grade: "",
            description: "",
          })
        }
      } else {
        error(data.message || "Failed to add education.")
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
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: "33%" }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 3 of 9: Education Information</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative" ref={dropdownRef}>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <School size={16} className="mr-2 text-[#591B0C]" /> Institution
            </label>
            <input
              type="text"
              name="institution"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              placeholder="Search for institution..."
              required
            />
            {errors.institution && <p className="mt-1 text-sm text-red-600">{errors.institution}</p>}

            {/* Dropdown for institutions */}
            {showDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                {filteredInstitutions.length > 0 ? (
                  filteredInstitutions.map((inst) => (
                    <div
                      key={inst._id}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#ffefdb]"
                      onClick={() => handleInstitutionSelect(inst.name)}
                    >
                      {inst.name}
                    </div>
                  ))
                ) : searchTerm ? (
                  <div
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#ffefdb]"
                    onClick={() => handleInstitutionSelect(searchTerm)}
                  >
                    Use "{searchTerm}"
                  </div>
                ) : (
                  <div className="py-2 pl-3 pr-9 text-gray-500">Type to search institutions</div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <Book size={16} className="mr-2 text-[#591B0C]" /> Degree
            </label>
            <input
              type="text"
              name="degree"
              value={educationData.degree}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              placeholder="Bachelor of Science, Master's, etc."
              required
            />
            {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree}</p>}
          </div>

          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <Calendar size={16} className="mr-2 text-[#591B0C]" />
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={educationData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              required
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          <div>
            <label className="flex text-sm font-medium text-gray-700 items-center">
              <Calendar size={16} className="mr-2 text-[#591B0C]" />
              End Date (or expected)
            </label>
            <input
              type="date"
              name="endDate"
              value={educationData.endDate}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
          </div>
        </div>

        <div>
          <label className="flex text-sm font-medium text-gray-700  items-center">
            <Star size={16} className="mr-2 text-[#591B0C]" />
            Grade (GPA)
            </label>
            <input
              type="text"
              name="grade"
              value={educationData.grade}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3"
              placeholder="e.g., 3.5"
            />
          
          {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
        </div>

        <div>
          <label className="flex text-sm font-medium text-gray-700  items-center">
            <Info size={16} className="mr-2 text-[#591B0C]" />
            Description
            </label>
            <textarea
              name="description"
              value={educationData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full h-20 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm px-3 py-2"
              placeholder="Describe your studies, achievements, and relevant coursework..."
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
              onClick={() => submitEducationData(false)}
              className="px-6 py-2 border border-[#591B0C] text-[#591B0C] rounded-md hover:bg-[#ffefdb] transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add More"}
            </button>
            <button
              type="button"
              onClick={() => submitEducationData(true)}
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

export default EducationForm