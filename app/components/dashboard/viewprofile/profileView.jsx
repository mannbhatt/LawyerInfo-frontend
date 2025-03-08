import Image from "next/image"
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const ProfileView = ({ profile }) => {
  if (!profile) {
    return (
      <div className={`${styles.emptyState} text-center mx-auto`}>
        <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No profile information available</p>
      </div>
    )
  }

  return (
    <div className={`${styles.container} mx-auto`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0">
          <Image
            src={profile?.profileImage || "/placeholder.svg?height=160&width=160"}
            alt={profile?.fullName || "Profile"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1   text-center md:text-left">
          <div className="flex  justify-center flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#591B0C] ">
                {profile?.fullName  || username}
              </h1>
              {profile?.bio && (
            <div className="mt-2 sm:w-full lg:w-[50%] text-gray-700">
              <p className="line-clamp-3">{profile.bio}</p>
            </div>
          )}
               <div className=" flex gap-6 mt-2">
              {profile?.city && (
                <div className=" flex items-center justify-center md:justify-start gap-2 text-gray-700 ">
                  <MapPin className="w-4 h-4 text-[#591B0C]" />
                  <span>{profile.city}</span>
                </div>
              )}
              
              {profile?.city && (
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700 ">
              <Mail className="w-4 h-4 text-[#591B0C]" />
              <span>{profile.email || "N/A"}</span>
            </div>
              )}
            {profile.phone && (
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700 ">
                <Phone className="w-4 h-4 text-[#591B0C]" />
                <span>{profile.phone}</span>
              </div>
            )}
            </div>
            </div>

           
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileView

