"use client"

import { useState } from "react"
import { Save, User, Mail, Phone, Calendar, FileText } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"
import Imgupload from "../../imgupload"

const ProfileEditForm = ({ profile, onSave }) => {
  // Initialize form state with profile data
  const [formState, setFormState] = useState(profile || {})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Initialize image states with profile's existing values
  const [uploadedImage, setUploadedImage] = useState(profile?.profileImage || "")
  const [imageKey, setImageKey] = useState(profile?.imageKey || "")

  // Handle regular form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Handle image upload completion
  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl)
    // Update the form state with the new image URL
    setFormState((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }))
  }

  // Handle image key change
  const handleImageKeyChange = (key) => {
    setImageKey(key)
    // Update the form state with the new image key
    setFormState((prev) => ({
      ...prev,
      imageKey: key,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formState.fullName?.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formState.city?.trim()) {
      newErrors.city = "City is required"
    }

    if (!formState.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Invalid email format"
    }

    if (formState.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formState.phone)) {
      newErrors.phone = "Invalid phone number format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      // Only send the form state which now correctly includes image data
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
        <Imgupload
          onUploadComplete={handleImageUpload}
          onImageKeyChange={handleImageKeyChange}
          initialImage={profile?.profileImage || ""}
          initialImageKey={profile?.imageKey || ""}
        />
      </div>

      <div className="">
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
            className={`${styles.textarea} pl-11 h-[190px]`}
            placeholder="Tell us about yourself and your legal practice..."
          />
          <FileText className="absolute left-3 top-6 text-primary w-5 h-5" />
        </div>
      </div>

      <div className={styles.fullWidth}>
        <div className="relative">
          <label htmlFor="city" className={styles.label}>
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="city"
              type="text"
              name="city"
              value={formState.city || ""}
              onChange={handleChange}
              className={`${styles.input} ${errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11 w-full`}
              placeholder="New York"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
          </div>
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
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

