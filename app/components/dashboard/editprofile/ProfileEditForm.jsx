"use client"

import { useState } from "react"
import { Save, User, Mail, Phone, Calendar, Image, FileText } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"

const ProfileEditForm = ({ profile, onSave }) => {
  const [formState, setFormState] = useState(profile || {})
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

  const validateForm = () => {
    const newErrors = {}

    if (!formState.fullName?.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formState.city?.trim()) {
      newErrors.city = "city is required"
    }

    if (!formState.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Invalid email format"
    }

    if (formState.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formState.phone)) {
      newErrors.phone = "Invalid phone number format"
    }

    if (formState.profileImage && !/^https?:\/\/.+/.test(formState.profileImage)) {
      newErrors.profileImage = "Invalid URL format"
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
      console.error("Error saving profile:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.grid}>
      <div className={styles.fullWidth}>
        <div className="relative">
          <label htmlFor="fullName" className={styles.label}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formState.fullName || ""}
              onChange={handleChange}
              className={`${styles.input} ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
              placeholder="John Doe"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
          </div>
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={styles.label}>
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            value={formState.email || ""}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
            placeholder="johndoe@example.com"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={styles.label}>
          Phone
        </label>
        <div className="relative">
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formState.phone || ""}
            onChange={handleChange}
            className={`${styles.input} ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
            placeholder="+1 (555) 123-4567"
          />
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="gender" className={styles.label}>
          Gender
        </label>
        <div className="relative">
          <select
            id="gender"
            name="gender"
            value={formState.gender || ""}
            onChange={handleChange}
            className={`${styles.select} pl-11`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="dateOfBirth" className={styles.label}>
          Date of Birth
        </label>
        <div className="relative">
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={formState.dateOfBirth ? new Date(formState.dateOfBirth).toISOString().split("T")[0] : ""}
            onChange={handleChange}
            className={`${styles.input} pl-11`}
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
      </div>

      <div>
        <label htmlFor="profileImage" className={styles.label}>
          Profile Image URL
        </label>
        <div className="relative">
          <input
            id="profileImage"
            type="url"
            name="profileImage"
            value={formState.profileImage || ""}
            onChange={handleChange}
            className={`${styles.input} ${errors.profileImage ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
            placeholder="https://example.com/your-image.jpg"
          />
          <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
        {errors.profileImage && <p className="mt-1 text-sm text-red-500">{errors.profileImage}</p>}

        {formState.profileImage && (
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
              <img
                src={formState.profileImage || "/placeholder.svg"}
                alt="Profile preview"
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

      <div className={styles.fullWidth}>
        <label htmlFor="bio" className={styles.label}>
          Bio
        </label>
        <div className="relative">
          <textarea
            id="bio"
            name="bio"
            value={formState.bio || ""}
            onChange={handleChange}
            rows={4}
            className={`${styles.textarea} pl-11`}
            placeholder="Tell us about yourself and your legal practice..."
          />
          <FileText className="absolute left-3 top-6 text-primary w-5 h-5" />
        </div>
        </div>
        <div className="relative">
          <label htmlFor="city" className={styles.label}>
            city <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="city"
              type="text"
              name="city"
              value={formState.city || ""}
              onChange={handleChange}
              className={`${styles.input} ${errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11`}
              placeholder="India"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
          </div>
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

export default ProfileEditForm

