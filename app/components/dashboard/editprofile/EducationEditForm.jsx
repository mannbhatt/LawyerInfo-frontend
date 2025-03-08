"use client"

import { useState, useEffect, useRef } from "react"
import { Save, Plus, Trash2, BookOpen, Building, Calendar, Award } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"

const EducationEditForm = ({ education, onSave }) => {
  const [educationList, setEducationList] = useState(education || [])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [showDropdowns, setShowDropdowns] = useState([])
  const [searchTerms, setSearchTerms] = useState([])
  const dropdownRefs = useRef([])

  // Initialize state arrays based on educationList length
  useEffect(() => {
    setShowDropdowns(Array(educationList.length).fill(false))
    setSearchTerms(educationList.map((edu) => edu.institution || ""))
    dropdownRefs.current = Array(educationList.length).fill(null)
  }, [educationList.length])

  // Fetch institutions on component mount
  useEffect(() => {
    fetchInstitutions()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      dropdownRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target)) {
          const newShowDropdowns = [...showDropdowns]
          newShowDropdowns[index] = false
          setShowDropdowns(newShowDropdowns)
        }
      })
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdowns])

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
            { _id: "4", name: "Oxford University" },
            { _id: "5", name: "Cambridge University" },
            { _id: "6", name: "Yale University" },
            { _id: "7", name: "Princeton University" },
            { _id: "8", name: "Columbia University" },
            { _id: "9", name: "University of Chicago" },
            { _id: "10", name: "University of California, Berkeley" },
          ],
        )
      } else {
        console.error("Failed to fetch institutions:", data.message)
      }
    } catch (error) {
      console.error("Error fetching institutions:", error)
      // Fallback data in case of error
      setInstitutions([
        { _id: "1", name: "Harvard University" },
        { _id: "2", name: "Stanford University" },
        { _id: "3", name: "MIT" },
        { _id: "4", name: "Oxford University" },
        { _id: "5", name: "Cambridge University" },
      ])
    }
  }

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        grade: "",
        description: "",
      },
    ])
    // Add a new empty errors object
    setErrors([...errors, {}])
    // Add new entries to state arrays
    setShowDropdowns([...showDropdowns, false])
    setSearchTerms([...searchTerms, ""])
    dropdownRefs.current = [...dropdownRefs.current, null]
  }

  const handleChange = (index, field, value) => {
    const newList = [...educationList]
    newList[index][field] = value
    setEducationList(newList)

    // Clear error when field is edited
    if (errors[index] && errors[index][field]) {
      const newErrors = [...errors]
      newErrors[index] = { ...newErrors[index], [field]: null }
      setErrors(newErrors)
    }
  }

  const handleInstitutionChange = (index, value) => {
    // Update the search term
    const newSearchTerms = [...searchTerms]
    newSearchTerms[index] = value
    setSearchTerms(newSearchTerms)

    // Show the dropdown
    const newShowDropdowns = [...showDropdowns]
    newShowDropdowns[index] = true
    setShowDropdowns(newShowDropdowns)

    // Update the education list
    handleChange(index, "institution", value)
  }

  const handleInstitutionSelect = (index, institutionName) => {
    // Update the search term
    const newSearchTerms = [...searchTerms]
    newSearchTerms[index] = institutionName
    setSearchTerms(newSearchTerms)

    // Hide the dropdown
    const newShowDropdowns = [...showDropdowns]
    newShowDropdowns[index] = false
    setShowDropdowns(newShowDropdowns)

    // Update the education list
    handleChange(index, "institution", institutionName)
  }

  const handleRemove = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index))
    setErrors(errors.filter((_, i) => i !== index))
    setShowDropdowns(showDropdowns.filter((_, i) => i !== index))
    setSearchTerms(searchTerms.filter((_, i) => i !== index))
    dropdownRefs.current = dropdownRefs.current.filter((_, i) => i !== index)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = educationList.map((edu) => {
      const eduErrors = {}

      if (!edu.degree?.trim()) {
        eduErrors.degree = "Degree is required"
        isValid = false
      }

      if (!edu.institution?.trim()) {
        eduErrors.institution = "Institution is required"
        isValid = false
      }

      if (!edu.startDate) {
        eduErrors.startDate = "Start date is required"
        isValid = false
      }

      if (!edu.description?.trim()) {
        eduErrors.description = "Description is required"
        isValid = false
      }

      return eduErrors
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(educationList)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving education:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  // Filter institutions based on search term
  const getFilteredInstitutions = (searchTerm) => {
    if (!searchTerm) return []
    return institutions.filter((institution) => institution.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {educationList.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No education added</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your educational background.</p>
          <div className="mt-6">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Education
            </button>
          </div>
        </div>
      ) : (
        <>
          {educationList.map((edu, index) => (
            <div key={index} className={styles.itemCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">Education #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  aria-label="Remove education"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className={styles.grid}>
                <div>
                  <label htmlFor={`degree-${index}`} className={styles.label}>
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`degree-${index}`}
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleChange(index, "degree", e.target.value)}
                      className={`${styles.input} ${errors[index]?.degree ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Bachelor of Laws (LL.B)"
                    />
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.degree && <p className="mt-1 text-sm text-red-500">{errors[index].degree}</p>}
                </div>

                <div ref={(el) => (dropdownRefs.current[index] = el)} className="relative">
                  <label htmlFor={`institution-${index}`} className={styles.label}>
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`institution-${index}`}
                      type="text"
                      value={searchTerms[index]}
                      onChange={(e) => handleInstitutionChange(index, e.target.value)}
                      onFocus={() => {
                        const newShowDropdowns = [...showDropdowns]
                        newShowDropdowns[index] = true
                        setShowDropdowns(newShowDropdowns)
                      }}
                      className={`${styles.input} ${errors[index]?.institution ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Search for institution..."
                    />
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.institution && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].institution}</p>
                  )}

                  {/* Dropdown for institutions */}
                  {showDropdowns[index] && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-300">
                      {getFilteredInstitutions(searchTerms[index]).length > 0 ? (
                        getFilteredInstitutions(searchTerms[index]).map((institution) => (
                          <div
                            key={institution._id}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                            onClick={() => handleInstitutionSelect(index, institution.name)}
                          >
                            {institution.name}
                          </div>
                        ))
                      ) : searchTerms[index] ? (
                        <div
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => handleInstitutionSelect(index, searchTerms[index])}
                        >
                          Use "{searchTerms[index]}"
                        </div>
                      ) : (
                        <div className="py-2 pl-3 pr-9 text-gray-500">Type to search institutions</div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor={`startDate-${index}`} className={styles.label}>
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`startDate-${index}`}
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                      className={`${styles.input} ${errors[index]?.startDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.startDate && <p className="mt-1 text-sm text-red-500">{errors[index].startDate}</p>}
                </div>

                <div>
                  <label htmlFor={`endDate-${index}`} className={styles.label}>
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      id={`endDate-${index}`}
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleChange(index, "endDate", e.target.value)}
                      className={`${styles.input} pl-11`}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Leave blank if currently studying</p>
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor={`grade-${index}`} className={styles.label}>
                    Grade / GPA
                  </label>
                  <div className="relative">
                    <input
                      id={`grade-${index}`}
                      type="text"
                      value={edu.grade}
                      onChange={(e) => handleChange(index, "grade", e.target.value)}
                      className={`${styles.input} pl-11`}
                      placeholder="3.8/4.0 or First Class Honours"
                    />
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                </div>
                <div className={styles.fullWidth}>
                  <label htmlFor={`description-${index}`} className={styles.label}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id={`description-${index}`}
                      value={edu.description}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                      rows={3}
                      className={`${styles.textarea} ${errors[index]?.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Describe your studies, achievements, and projects..."
                    />
                    <Award className="absolute left-3 top-6 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.description && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Another Education
            </button>

            <button type="submit" className={styles.button.primary} disabled={loading}>
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </>
      )}
    </form>
  )
}

export default EducationEditForm

