"use client"

import { useState } from "react"
import { Save, Plus, Trash2, BookOpen, Building, Calendar, Award } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"

const EducationEditForm = ({ education, onSave }) => {
  const [educationList, setEducationList] = useState(education || [])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        grade: "",
        description:"",
      },
    ])
    // Add a new empty errors object
    setErrors([...errors, {}])
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

  const handleRemove = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index))
    setErrors(errors.filter((_, i) => i !== index))
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

                <div>
                  <label htmlFor={`institution-${index}`} className={styles.label}>
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`institution-${index}`}
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleChange(index, "institution", e.target.value)}
                      className={`${styles.input} ${errors[index]?.institution ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Harvard Law School"
                    />
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.institution && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].institution}</p>
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
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      id={`description-${index}`}
                      value={edu.description}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                      rows={3}
                      className={`${styles.textarea} pl-11`}
                      placeholder="Describe your responsibilities, achievements, and the types of cases you handled..."
                    />
                    <Award className="absolute left-3 top-6 text-primary w-5 h-5" />
                  </div>
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

