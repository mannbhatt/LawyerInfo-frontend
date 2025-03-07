"use client"

import { useState } from "react"
import { Save, Plus, Trash2, Briefcase, Building, Calendar, FileText } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"


const ExperienceEditForm = ({ experience, onSave }) => {
  const [experienceList, setExperienceList] = useState(experience || [])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleAdd = () => {
    setExperienceList([
      ...experienceList,
      {
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
    // Add a new empty errors object
    setErrors([...errors, {}])
  }

  const handleChange = (index, field, value) => {
    const newList = [...experienceList]
    newList[index][field] = value
    setExperienceList(newList)

    // Clear error when field is edited
    if (errors[index] && errors[index][field]) {
      const newErrors = [...errors]
      newErrors[index] = { ...newErrors[index], [field]: null }
      setErrors(newErrors)
    }
  }

  const handleRemove = (index) => {
    setExperienceList(experienceList.filter((_, i) => i !== index))
    setErrors(errors.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = experienceList.map((exp) => {
      const expErrors = {}

      if (!exp.position?.trim()) {
        expErrors.position = "Position is required"
        isValid = false
      }

      if (!exp.company?.trim()) {
        expErrors.company = "Company name is required"
        isValid = false
      }

      if (!exp.startDate) {
        expErrors.startDate = "Start date is required"
        isValid = false
      }

      return expErrors
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(experienceList)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving experience:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {experienceList.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No experience added</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your professional experience.</p>
          <div className="mt-6">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Experience
            </button>
          </div>
        </div>
      ) : (
        <>
          {experienceList.map((exp, index) => (
            <div key={index} className={styles.itemCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">Experience #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  aria-label="Remove experience"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className={styles.grid}>
                <div>
                  <label htmlFor={`company-${index}`} className={styles.label}>
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`company-${index}`}
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleChange(index, "company", e.target.value)}
                      className={`${styles.input} ${errors[index]?.company ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Smith & Associates Law Firm"
                    />
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.company && <p className="mt-1 text-sm text-red-500">{errors[index].company}</p>}
                </div>

                <div>
                  <label htmlFor={`position-${index}`} className={styles.label}>
                    Position <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`position-${index}`}
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleChange(index, "position", e.target.value)}
                      className={`${styles.input} ${errors[index]?.position ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Senior Attorney"
                    />
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.position && <p className="mt-1 text-sm text-red-500">{errors[index].position}</p>}
                </div>

                <div>
                  <label htmlFor={`startDate-${index}`} className={styles.label}>
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`startDate-${index}`}
                      type="date"
                      value={exp.startDate}
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
                      value={exp.endDate}
                      onChange={(e) => handleChange(index, "endDate", e.target.value)}
                      className={`${styles.input} pl-11`}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Leave blank if currently working here</p>
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor={`description-${index}`} className={styles.label}>
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      id={`description-${index}`}
                      value={exp.description}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                      rows={3}
                      className={`${styles.textarea} pl-11`}
                      placeholder="Describe your responsibilities, achievements, and the types of cases you handled..."
                    />
                    <FileText className="absolute left-3 top-6 text-primary w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Another Experience
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

export default ExperienceEditForm

