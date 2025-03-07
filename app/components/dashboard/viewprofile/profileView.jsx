import Image from "next/image"
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const ProfileView = ({ profile }) => {
  if (!profile) {
    return (
      <div className={styles.emptyState}>
        <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No profile information available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={profile.profileImage || "/placeholder.svg?height=128&width=128"}
            alt={profile.fullName || "Profile"}
            width={128}
            height={128}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#591B0C]">{profile.fullName || "N/A"}</h1>
          <p className="text-xl text-[#ff3003] font-medium mt-1">{profile.title || "Legal Professional"}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-[#591B0C]" />
              <span>{profile.email || "N/A"}</span>
            </div>

            {profile.phone && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#591B0C]" />
                <span>{profile.phone}</span>
              </div>
            )}

            {profile.location && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-[#591B0C]" />
                <span>{profile.city}</span>
              </div>
            )}

            {profile.dateOfBirth && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-[#591B0C]" />
                <span>Born: {new Date(profile.dateOfBirth).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {profile.bio && (
        <div className="bg-[#ffefdb]/30 p-4  border border-[#ffefdb] mt-6">
          <h3 className="text-lg font-semibold text-[#591B0C] mb-2">About Me</h3>
          <p className="text-gray-700 italic">{profile.bio}</p>
        </div>
      )}
    </div>
  )
}

export default ProfileView

