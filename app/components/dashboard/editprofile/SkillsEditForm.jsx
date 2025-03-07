"use client"

import { useState } from "react"
import { Save, Plus, X, Award } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"


const SkillsEditForm = ({ skills, onSave }) => {
  const [formState, setFormState] = useState(skills || [])
  const [newSkill, setNewSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim() === "") {
      setError("Please enter a skill")
      return
    }

    if (formState.includes(newSkill.trim())) {
      setError("This skill is already in your list")
      return
    }

    setFormState([...formState, newSkill.trim()])
    setNewSkill("")
    setError("")
  }

  const handleRemoveSkill = (index) => {
    setFormState(formState.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      await onSave(formState)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving skills:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-dark p-4 rounded-lg text-white mb-6">
        <h3 className="font-semibold flex items-center gap-2">
          <Award className="h-5 w-5" />
          Showcase Your Legal Expertise
        </h3>
        <p className="text-sm mt-1 opacity-90">
          Add skills that highlight your legal expertise and specializations to help clients find you.
        </p>
      </div>

      <div>
        <label htmlFor="newSkill" className={styles.label}>
          Add a Skill
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              id="newSkill"
              type="text"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value)
                setError("")
              }}
              onKeyDown={handleKeyDown}
              className={`${styles.input} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
              placeholder="e.g., Corporate Law, Contract Negotiation, Litigation"
            />
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
          </div>
          <button type="button" onClick={handleAddSkill} className={styles.button.secondary}>
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      {formState.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {formState.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center bg-white border-2 border-primary text-primary px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-primary group-hover:text-white focus:outline-none"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No skills added</h3>
          <p className="mt-1 text-sm text-gray-500">Add skills to showcase your expertise</p>
        </div>
      )}

      <div className="flex justify-end mt-8">
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
    </form>
  )
}

export default SkillsEditForm

