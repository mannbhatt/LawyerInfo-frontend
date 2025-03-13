"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Trash2, FileText, Tag, Calendar, ExternalLink, Globe } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"

const ContributionEditForm = ({ contributions, onSave }) => {
  const [contributionList, setContributionList] = useState(contributions || [])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [categories, setCategories] = useState([
    "Blog Post",
    "Research Paper",
    "Book",
    "Article",
    "Case Study",
    "Legal Analysis",
    "Conference Paper",
    "Journal Publication",
    "White Paper",
    "Other",
  ])

  // Initialize errors array based on contributionList length
  useEffect(() => {
    setErrors(Array(contributionList.length).fill({}))
  }, [contributionList.length])

  const handleAdd = () => {
    setContributionList([
      ...contributionList,
      {
        title: "",
        description: "",
        category: "",
        external_link: "",
      },
    ])
    // Add a new empty errors object
    setErrors([...errors, {}])
  }

  const handleChange = (index, field, value) => {
    const newList = [...contributionList]
    newList[index][field] = value
    setContributionList(newList)

    // Clear error when field is edited
    if (errors[index] && errors[index][field]) {
      const newErrors = [...errors]
      newErrors[index] = { ...newErrors[index], [field]: null }
      setErrors(newErrors)
    }
  }

  const handleRemove = (index) => {
    setContributionList(contributionList.filter((_, i) => i !== index))
    setErrors(errors.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = contributionList.map((contribution) => {
      const contribErrors = {}

      if (!contribution.title?.trim()) {
        contribErrors.title = "Title is required"
        isValid = false
      }

      if (!contribution.description?.trim()) {
        contribErrors.description = "Description is required"
        isValid = false
      }

      if (!contribution.category?.trim()) {
        contribErrors.category = "Category is required"
        isValid = false
      }

      return contribErrors
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(contributionList)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving contributions:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {contributionList.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No contributions added</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your publications and contributions.</p>
          <div className="mt-6">
            <button type="button" onClick={handleAdd} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add Contribution
            </button>
          </div>
        </div>
      ) : (
        <>
          {contributionList.map((contribution, index) => (
            <div key={index} className={styles.itemCard}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-[#591B0C]">Contribution #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  aria-label="Remove contribution"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className={styles.grid}>
                <div className={styles.fullWidth}>
                  <label htmlFor={`title-${index}`} className={styles.label}>
                    Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={`title-${index}`}
                      type="text"
                      value={contribution.title}
                      onChange={(e) => handleChange(index, "title", e.target.value)}
                      className={`${styles.input} ${errors[index]?.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Your contribution title"
                    />
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-[#591B0C] w-5 h-5" />
                  </div>
                  {errors[index]?.title && <p className="mt-1 text-sm text-red-500">{errors[index].title}</p>}
                </div>

                <div>
                  <label htmlFor={`category-${index}`} className={styles.label}>
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id={`category-${index}`}
                      value={contribution.category}
                      onChange={(e) => handleChange(index, "category", e.target.value)}
                      className={`${styles.select} ${errors[index]?.category ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category, i) => (
                        <option key={i} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#591B0C] w-5 h-5" />
                  </div>
                  {errors[index]?.category && <p className="mt-1 text-sm text-red-500">{errors[index].category}</p>}
                </div>

                

                <div className="">
                  <label htmlFor={`external_link-${index}`} className={styles.label}>
                    External Link
                  </label>
                  <div className="relative">
                    <input
                      id={`external_link-${index}`}
                      type="url"
                      value={contribution.external_link || ""}
                      onChange={(e) => handleChange(index, "external_link", e.target.value)}
                      className={`${styles.input} pl-11`}
                      placeholder="https://example.com/your-contribution"
                    />
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-[#591B0C] w-5 h-5" />
                  </div>
                  
                </div>

                <div className={styles.fullWidth}>
                  <label htmlFor={`description-${index}`} className={styles.label}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id={`description-${index}`}
                      value={contribution.description || ""}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                      rows={3}
                      className={`${styles.textarea} ${errors[index]?.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
                      placeholder="Describe your contribution, its significance, and your role..."
                    />
                    <Globe className="absolute left-3 top-6 text-[#591B0C] w-5 h-5" />
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
              Add Another Contribution
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

export default ContributionEditForm

