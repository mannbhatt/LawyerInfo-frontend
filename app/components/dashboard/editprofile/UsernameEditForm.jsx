"use client"

import { useState, useEffect } from "react"
import { Save, User, Link, AlertCircle, Check } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"

const UsernameEditForm = ({ user, onSave }) => {
  const [username, setUsername] = useState(user?.username || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [debounceTimeout, setDebounceTimeout] = useState(null)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

  useEffect(() => {
    setUsername(user?.username || "")
  }, [user])

  // Validate username format
  const validateUsername = (value) => {
    // Username must be at least 3 characters
    if (value.length < 3) {
      setError("Username must be at least 3 characters")
      setIsValid(false)
      return false
    }

    // Username must be less than 30 characters
    if (value.length > 30) {
      setError("Username must be less than 30 characters")
      setIsValid(false)
      return false
    }

    // Username can only contain lowercase letters, numbers, underscores, dots, and hyphens
    if (!/^[a-z0-9_.-]+$/.test(value)) {
      setError("Username can only contain lowercase letters, numbers, underscores, dots, and hyphens")
      setIsValid(false)
      return false
    }

    // Don't update if the username hasn't changed
    if (value === user?.username) {
      setError("Please enter a different username")
      setIsValid(false)
      return false
    }

    setError("")
    setIsValid(true)
    return true
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase()
    setUsername(value)
    setSuccess("")

    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    // Validate immediately
    validateUsername(value)

    // Debounce the validation to avoid too many validations while typing
    const timeout = setTimeout(() => {
      validateUsername(value)
    }, 300)

    setDebounceTimeout(timeout)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateUsername(username)) return

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem("authToken")
      if (!token) throw new Error("User not authenticated")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/username/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update username")
      }

      setSuccess("Username updated successfully! Redirecting to your new profile URL...")

      // Call the onSave function to update the parent component state
      setTimeout(() => {
        onSave(username)
      }, 2000)
    } catch (error) {
      console.error("Error updating username:", error)
      setError(error.message || "Failed to update username")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className={styles.label}>
          Username <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={`${styles.input} pl-11 ${
              !isValid ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
            placeholder="johndoe"
          />
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />

          {isValid && username && username !== user?.username && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
        {error && (
          <div className="mt-2 flex items-center text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </div>

      <div>
        <label className={styles.label}>Profile URL Preview</label>
        <div className="relative">
          <div className="flex items-center pl-11 py-2 px-3 bg-gray-50 border border-gray-300 rounded-md text-gray-500">
            <span>{siteUrl}/</span>
            <span className="font-medium text-gray-700">{username || "username"}</span>
          </div>
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          This is how your profile URL will appear after updating your username.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Important information about changing your username</h3>
            <div className="mt-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Your profile URL will change</li>
                <li>Any links to your previous profile URL will no longer work</li>
                <li>You can only change your username once every 30 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">{success}</div>
      )}

      <div className="flex justify-end">
        <button type="submit" className={styles.button.primary} disabled={loading || !isValid}>
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
              Updating...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Update Username
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default UsernameEditForm

