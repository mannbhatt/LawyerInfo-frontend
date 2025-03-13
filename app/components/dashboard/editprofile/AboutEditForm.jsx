"use client"

import { useState } from "react"
import { Save, FileText, List, Heart, Globe, Plus, X } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"


const AboutEditForm = ({ about, onSave }) => {
  const [formState, setFormState] = useState(about || { highlights: [], hobbies: [] })
  const [newHighlight, setNewHighlight] = useState("")
  const [newHobby, setNewHobby] = useState("")
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
    const { value } = e.target;
  
    setFormState((prev) => {
      // Split input by commas, trim spaces, and remove empty values
      const updatedArray = value
        .split(",") // Split by comma
        .map((item) => item.trim()) // Remove spaces around each item
        .filter((item) => item.length > 0); // Remove empty values
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: null }))
        }
      return {
        ...prev,
        [field]: updatedArray, // Store as an array
      };
    });
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim() === "") {
      setErrors((prev) => ({ ...prev, highlights: "Please enter a highlight" }))
      return
    }

    if (formState.highlights.includes(newHighlight.trim())) {
      setErrors((prev) => ({ ...prev, highlights: "This highlight is already in your list" }))
      return
    }

    setFormState((prev) => ({ ...prev, highlights: [...prev.highlights, newHighlight.trim()] }))
    setNewHighlight("")
    setErrors((prev) => ({ ...prev, highlights: "" }))
  }

  const handleAddHobby = () => {
    if (newHobby.trim() === "") {
      setErrors((prev) => ({ ...prev, hobbies: "Please enter a hobby" }))
      return
    }

    if (formState.hobbies.includes(newHobby.trim())) {
      setErrors((prev) => ({ ...prev, hobbies: "This hobby is already in your list" }))
      return
    }

    setFormState((prev) => ({ ...prev, hobbies: [...prev.hobbies, newHobby.trim()] }))
    setNewHobby("")
    setErrors((prev) => ({ ...prev, hobbies: "" }))
  }

  const handleRemoveHighlight = (index) => {
    setFormState((prev) => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }))
  }

  const handleRemoveHobby = (index) => {
    setFormState((prev) => ({ ...prev, hobbies: prev.hobbies.filter((_, i) => i !== index) }))
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
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                id="newHighlight"
                type="text"
                value={newHighlight}
                onChange={(e) => {
                  setNewHighlight(e.target.value)
                  setErrors((prev) => ({ ...prev, highlights: "" }))
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddHighlight()
                  }
                }}
                className={`${styles.input} ${errors.highlights ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11 h-[40px]`}
                placeholder="e.g., Corporate Law, Contract Negotiation, Litigation"
              />
              <List className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
            </div>
            <button type="button" onClick={handleAddHighlight} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
          {errors.highlights && <p className="mt-1 text-sm text-red-500">{errors.highlights}</p>}
        </div>
        {formState.highlights.length > 0 && (
          <div className="mt-6">
            <h3 className={styles.label}>Your Highlights</h3>
            <div className="flex flex-col gap-2">
              {formState.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group  inline-flex justify-between gap-2 px-4 py-2 bg-white text-[#591B0C] border-2 border-[#591B0C] rounded-md hover:bg-[#ffefdb] transition-colors"
                >
                  {highlight}
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    className="ml-2 text-primary group-hover:text-[#591B0C] focus:outline-none"
                    aria-label={`Remove ${highlight}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.fullWidth}>
        <label htmlFor="hobbies" className={styles.label}>
          Hobbies & Interests (comma-separated)
        </label>
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                id="newHobby"
                type="text"
                value={newHobby}
                onChange={(e) => {
                  setNewHobby(e.target.value)
                  setErrors((prev) => ({ ...prev, hobbies: "" }))
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddHobby()
                  }
                }}
                className={`${styles.input} ${errors.hobbies ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11 h-[40px]`}
                placeholder="e.g., Reading, Hiking, Chess, Photography..."
              />
              <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
            </div>
            <button type="button" onClick={handleAddHobby} className={styles.button.secondary}>
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
          {errors.hobbies && <p className="mt-1 text-sm text-red-500">{errors.hobbies}</p>}
        </div>
        {formState.hobbies.length > 0 && (
          <div className="mt-6">
            <h3 className={styles.label}>Your Hobbies</h3>
            <div className="flex flex-col gap-2">
              {formState.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="group  inline-flex justify-between gap-2 px-4 py-2 bg-white text-[#591B0C] border-2 border-[#591B0C] rounded-md hover:bg-[#ffefdb] transition-colors"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => handleRemoveHobby(index)}
                    className="ml-2 text-primary group-hover:text-[#591B0C] focus:outline-none"
                    aria-label={`Remove ${hobby}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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
