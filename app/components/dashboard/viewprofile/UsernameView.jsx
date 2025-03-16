"use client"

import { User, Link } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const UsernameView = ({ user }) => {
  if (!user) {
    return (
      <div className={styles.emptyState}>
        <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No username information available</p>
      </div>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-0">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#591B0C]/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-[#591B0C]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">@{user.username}</h3>
              <p className="text-sm text-gray-500">Your unique username on the platform</p>
            </div>
          </div>

          <div className="flex items-start gap-4 mt-2">
            <div className="w-10 h-10 rounded-full bg-[#591B0C]/10 flex items-center justify-center flex-shrink-0">
              <Link className="h-5 w-5 text-[#591B0C]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Profile URL</h3>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600 break-all">{`${siteUrl}/${user.username}`}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${siteUrl}/${user.username}`)
                    alert("Profile URL copied to clipboard!")
                  }}
                  className="ml-2 text-xs text-[#591B0C] hover:text-[#3d1208] transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Your username appears in your profile URL and is visible to others. Choose a username that represents you
              professionally.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsernameView

