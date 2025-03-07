"use client"

import { useState } from "react"
import { Save, Plus, Trash2, Award, Building, Calendar, Link, Image } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"


const AchievementsEditForm = ({ achievements, onSave }) => {
  const [achievementList, setAchievementList] = useState(achievements || [])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleAdd = () => {
    setAchievementList([
      ...achievementList,
      {
        certificate_name: "",
        issuing_organization: "",
        issue_date: "",
        credential_url: "",
        certificate_image: "",
      },
    ])
    // Add a new empty errors object
    setErrors([...errors, {}])
  }

  const handleChange = (index, field, value) => {
    const newList = [...achievementList]
    newList[index][field] = value
    setAchievementList(newList)

    // Clear error when field is edited
    if (errors[index] && errors[index][field]) {
      const newErrors = [...errors]
      newErrors[index] = { ...newErrors[index], [field]: null }
      setErrors(newErrors)
    }
  }

  const handleRemove = (index) => {
    setAchievementList(achievementList.filter((_, i) => i !== index))
    setErrors(errors.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = achievementList.map((ach) => {
      const achErrors = {}

      if (!ach.certificate_name?.trim()) {
        achErrors.certificate_name = "Certificate name is required"
        isValid = false
      }

      if (!ach.issuing_organization?.trim()) {
        achErrors.issuing_organization = "Issuing organization is required"
        isValid = false
      }

      if (!ach.issue_date) {
        achErrors.issue_date = "Issue date is required"
        isValid = false
      }

      if (ach.credential_url && !/^https?:\/\/.+/.test(ach.credential_url)) {
        achErrors.credential_url = "Invalid URL format"
        isValid = false
      }

      if (ach.certificate_image && !/^https?:\/\/.+/.test(ach.certificate_image)) {
        achErrors.certificate_image = "Invalid URL format"
        isValid = false
      }

      return achErrors
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(achievementList)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving achievements:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {achievementList.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No achievements added</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your certifications and achievements.</p>
          <div className="mt-6">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Achievement
            </button>
          </div>
        </div>
      ) : (
        <>
          {achievementList.map((ach, index) => (
            <div key={index} className={styles.itemCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">Achievement #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  aria-label="Remove achievement"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className={styles.grid}>
                <div className={styles.fullWidth}>
                  <label htmlFor={`certificate_name-${index}`} className={styles.label}>
                    Certificate Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`certificate_name-${index}`}
                      type="text"
                      value={ach.certificate_name}
                      onChange={(e) => handleChange(index, "certificate_name", e.target.value)}
                      className={`${styles.input} ${errors[index]?.certificate_name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Bar Certification"
                    />
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.certificate_name && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].certificate_name}</p>
                  )}
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor={`issuing_organization-${index}`} className={styles.label}>
                    Issuing Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`issuing_organization-${index}`}
                      type="text"
                      value={ach.issuing_organization}
                      onChange={(e) => handleChange(index, "issuing_organization", e.target.value)}
                      className={`${styles.input} ${errors[index]?.issuing_organization ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="State Bar Association"
                    />
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.issuing_organization && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].issuing_organization}</p>
                  )}
                </div>

                <div>
                  <label htmlFor={`issue_date-${index}`} className={styles.label}>
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`issue_date-${index}`}
                      type="date"
                      value={ach.issue_date}
                      onChange={(e) => handleChange(index, "issue_date", e.target.value)}
                      className={`${styles.input} ${errors[index]?.issue_date ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.issue_date && <p className="mt-1 text-sm text-red-500">{errors[index].issue_date}</p>}
                </div>

                <div>
                  <label htmlFor={`credential_url-${index}`} className={styles.label}>
                    Credential URL
                  </label>
                  <div className="relative">
                    <input
                      id={`credential_url-${index}`}
                      type="url"
                      value={ach.credential_url}
                      onChange={(e) => handleChange(index, "credential_url", e.target.value)}
                      className={`${styles.input} ${errors[index]?.credential_url ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="https://example.com/credential"
                    />
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.credential_url && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].credential_url}</p>
                  )}
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor={`certificate_image-${index}`} className={styles.label}>
                    Certificate Image URL
                  </label>
                  <div className="relative">
                    <input
                      id={`certificate_image-${index}`}
                      type="url"
                      value={ach.certificate_image}
                      onChange={(e) => handleChange(index, "certificate_image", e.target.value)}
                      className={`${styles.input} ${errors[index]?.certificate_image ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="https://example.com/certificate.jpg"
                    />
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  </div>
                  {errors[index]?.certificate_image && (
                    <p className="mt-1 text-sm text-red-500">{errors[index].certificate_image}</p>
                  )}

                  {ach.certificate_image && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-10 h-10 rounded overflow-hidden border-2 border-primary">
                        <img
                          src={ach.certificate_image || "/placeholder.svg"}
                          alt="Certificate preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=40&width=40"
                            e.target.alt = "Invalid image URL"
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">Preview</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Another Achievement
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

export default AchievementsEditForm

