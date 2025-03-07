"use client"

import { useState } from "react"
import { Save, FileText, List, Heart, Globe } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"


const AboutEditForm = ({ about, onSave }) => {
  const [formState, setFormState] = useState(about || { highlights: [], hobbies: [] })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleArrayChange = (e, field) => {
    const { value } = e.target
    setFormState((prev) => ({
      ...prev,
      [field]: value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    }))

    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formState.summary?.trim()) {
      newErrors.summary = "Summary is required"
    }

    if (formState.personal_website && !/^https?:\/\/.+/.test(formState.personal_website)) {
      newErrors.personal_website = "Invalid URL format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(formState)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving about information:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.grid}>
      <div className={styles.fullWidth}>
        <label htmlFor="summary" className={styles.label}>
          Professional Summary <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="summary"
            name="summary"
            value={formState.summary || ""}
            onChange={handleChange}
            rows={4}
            className={`${styles.textarea} ${errors.summary ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
            placeholder="Provide a brief overview of your professional background, expertise, and what makes you unique as a legal professional..."
          />
          <FileText className="absolute left-3 top-6 text-primary w-5 h-5" />
        </div>
        {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
      </div>

      <div className={styles.fullWidth}>
        <label htmlFor="highlights" className={styles.label}>
          Professional Highlights (comma-separated)
        </label>
        <div className="relative">
          <textarea
            id="highlights"
            name="highlights"
            value={formState.highlights?.join(", ") || ""}
            onChange={(e) => handleArrayChange(e, "highlights")}
            rows={3}
            className={`${styles.textarea} pl-11`}
            placeholder="Specialized in corporate law, Successfully defended 50+ cases, Published in Harvard Law Review..."
          />
          <List className="absolute left-3 top-6 text-primary w-5 h-5" />
        </div>
        <p className="mt-1 text-xs text-gray-500">Enter key professional achievements, separated by commas</p>
      </div>

      <div className={styles.fullWidth}>
        <label htmlFor="hobbies" className={styles.label}>
          Hobbies & Interests (comma-separated)
        </label>
        <div className="relative">
          <input
            id="hobbies"
            type="text"
            name="hobbies"
            value={formState.hobbies?.join(", ") || ""}
            onChange={(e) => handleArrayChange(e, "hobbies")}
            className={`${styles.input} pl-11`}
            placeholder="Reading, Hiking, Chess, Photography..."
          />
          <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
        <p className="mt-1 text-xs text-gray-500">Share your interests outside of work to add a personal touch</p>
      </div>

      <div className={styles.fullWidth}>
        <label htmlFor="personal_website" className={styles.label}>
          Personal Website
        </label>
        <div className="relative">
          <input
            id="personal_website"
            type="url"
            name="personal_website"
            value={formState.personal_website || ""}
            onChange={handleChange}
            className={`${styles.input} ${errors.personal_website ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
            placeholder="https://yourwebsite.com"
          />
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
        {errors.personal_website && <p className="mt-1 text-sm text-red-500">{errors.personal_website}</p>}
      </div>

      <div className={styles.fullWidth}>
        <div className="flex justify-end">
          <button type="submit" className={styles.button.primary} disabled={loading}>
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
      </div>
    </form>
  )
}

export default AboutEditForm

