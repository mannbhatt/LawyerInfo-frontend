"use client"

import { useState } from "react"
import { Save, Linkedin, Twitter, Instagram, Facebook, Youtube, Globe, Github } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"

const SocialLinksEditForm = ({ socialLinks, onSave }) => {
  const [links, setLinks] = useState(socialLinks || {})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const socialPlatforms = [
    { name: "linkedin", icon: Linkedin, color: "#0077B5", placeholder: "https://linkedin.com/in/yourprofile" },
    { name: "twitter", icon: Twitter, color: "#1DA1F2", placeholder: "https://twitter.com/yourusername" },
    { name: "instagram", icon: Instagram, color: "#E1306C", placeholder: "https://instagram.com/yourusername" },
    { name: "facebook", icon: Facebook, color: "#1877F2", placeholder: "https://facebook.com/yourprofile" },
    { name: "youtube", icon: Youtube, color: "#FF0000", placeholder: "https://youtube.com/c/yourchannel" },
    { name: "github", icon: Github, color: "#333333", placeholder: "https://github.com/yourusername" },
    { name: "website", icon: Globe, color: "#4CAF50", placeholder: "https://yourwebsite.com" },
  ]

  const handleChange = (platform, value) => {
    setLinks({ ...links, [platform]: value })

    // Clear error when field is edited
    if (errors[platform]) {
      setErrors((prev) => ({ ...prev, [platform]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    Object.entries(links).forEach(([platform, url]) => {
      if (url && !/^https?:\/\/.+/.test(url)) {
        newErrors[platform] = "Invalid URL format. Must start with http:// or https://"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(links)
      // Success notification could be added here
    } catch (error) {
      console.error("Error saving social links:", error)
      // Error notification could be added here
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-dark p-4 rounded-lg text-white mb-6">
        <h3 className="font-semibold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Connect with clients and colleagues
        </h3>
        <p className="text-sm mt-1 opacity-90">
          Adding your social media profiles helps potential clients find and connect with you across platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon
          return (
            <div key={platform.name} className="group">
              <label htmlFor={platform.name} className={styles.label + " capitalize flex items-center gap-2"}>
                <Icon className="w-4 h-4" style={{ color: platform.color }} />
                {platform.name}
              </label>
              <div className="relative">
                <input
                  id={platform.name}
                  type="url"
                  value={links[platform.name] || ""}
                  onChange={(e) => handleChange(platform.name, e.target.value)}
                  placeholder={platform.placeholder}
                  className={`${styles.input} ${errors[platform.name] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} pl-11 transition-all duration-200 group-hover:border-primary`}
                />
                <Icon
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200"
                  style={{ color: errors[platform.name] ? "#EF4444" : platform.color }}
                />
              </div>
              {errors[platform.name] && <p className="mt-1 text-sm text-red-500">{errors[platform.name]}</p>}
            </div>
          )
        })}
      </div>

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

export default SocialLinksEditForm

