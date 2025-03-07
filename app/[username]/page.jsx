"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { Share2, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import EducationView from "../components/dashboard/viewprofile/EducationView"
import EducationEditForm from "../components/dashboard/editprofile/EducationEditForm"
import ExperienceView from "../components/dashboard/viewprofile/ExperienceView"
import ExperienceEditForm from "../components/dashboard/editprofile/ExperienceEditForm"
import AboutView from "../components/dashboard/viewprofile/AboutView"
import AboutEditForm from "../components/dashboard/editprofile/AboutEditForm"
import AchievementsView from "../components/dashboard/viewprofile/AchievementsView"
import AchievementsEditForm from "../components/dashboard/editprofile/AchievementsEditForm"
import SkillsView from "../components/dashboard/viewprofile/SkillsView"
import SkillsEditForm from "../components/dashboard/editprofile/SkillsEditForm"
import SocialLinksView from "../components/dashboard/viewprofile/SocialLinksView"
import SocialLinksEditForm from "../components/dashboard/editprofile/SocialLinksEditForm"
import ContributionView from "../components/dashboard/viewprofile/ContributionView"
import ContributionEditForm from "../components/dashboard/editprofile/ContributionEditForm"
import ProfileSection from "../components/dashboard/viewprofile/ProfileSection"

export default function ProfilePage() {
  const { username } = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])
  const [about, setAbout] = useState({})
  const [achievements, setAchievements] = useState([])
  const [skills, setSkills] = useState([])
  const [socialLinks, setSocialLinks] = useState({})
  const [contribution, setContribution] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState({
    profiles: false,
    education: false,
    experience: false,
    about: false,
    achievements: false,
    skills: false,
    socialLink: false,
    contribution: false,
  })
  const [userId, setUserId] = useState(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  // Get current user ID from token
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setUserId(decodedToken.id || decodedToken._id)
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }
  }, [])

  // Fetch profile data when username or userId changes
  useEffect(() => {
    if (username && userId !== undefined) {
      fetchUserProfile()
    }
  }, [username, userId])

  // Fetch user profile based on username
  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

      // Fetch user data
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${username}`, {
        headers: {},
      })

      if (!userRes.ok) {
        throw new Error("User not found")
      }

      const userData = await userRes.json()
      setUser(userData)

      // Check if this is the user's own profile
      if (userId && (userId === userData._id || userId === userData.id)) {
        setIsOwnProfile(true)
      } else {
        setIsOwnProfile(false)
      }

      // Fetch all profile sections
      const fetchData = async (endpoint, setter) => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${userData._id || userData.id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
          if (res.ok) {
            const data = await res.json()
            return data
          }
          return null
        } catch (err) {
          console.error(`Error fetching ${endpoint}:`, err)
          return null
        }
      }

      // Fetch all data in parallel
      const [
        profileData,
        educationData,
        experienceData,
        aboutData,
        achievementsData,
        skillsData,
        socialLinksData,
        contributionData,
      ] = await Promise.all([
        fetchData("profiles", setProfile),
        fetchData("education", setEducation),
        fetchData("experience", setExperience),
        fetchData("about", setAbout),
        fetchData("achievements", setAchievements),
        fetchData("skills", setSkills),
        fetchData("socialLink", setSocialLinks),
        fetchData("contribution", setContribution),
      ])

      // Set state with fetched data
      setProfile(profileData?.profile || null)
      setEducation(educationData?.educationRecords || [])
      setExperience(experienceData?.experiences || [])
      setAbout(aboutData?.about || {})
      setAchievements(achievementsData?.certifications || [])
      setSkills(skillsData?.skills || [])
      setSocialLinks(socialLinksData?.links || {})
      setContribution(contributionData?.contributions || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (collection, data) => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) throw new Error("User not authenticated")

      // Don't allow editing if not own profile
      if (!isOwnProfile) {
        throw new Error("You can only edit your own profile")
      }

      let formattedData = data
      if (collection === "skills") {
        formattedData = { skills: data }
      } else if (collection === "socialLink") {
        formattedData = { links: data }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${collection}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) throw new Error(`Failed to update ${collection}`)
      const updatedData = await response.json()

      // Update state for respective section
      switch (collection) {
        case "profiles":
          setProfile(updatedData.profile)
          break
        case "education":
          setEducation(updatedData.updatedEducation)
          break
        case "experience":
          setExperience(updatedData.updatedExperience)
          break
        case "about":
          setAbout(updatedData.about)
        
          
          break
        case "achievements":
          setAchievements(updatedData.updatedCertifications)
          break
        case "skills":
          setSkills(updatedData.skillRecord?.skills || updatedData.updatedSkills)
          break
        case "socialLink":
          setSocialLinks(updatedData.socialLinkRecord?.links || updatedData.updatedSocialLinks)
          break
        case "contribution":
          setContribution(updatedData.updatedContributions)
          break
      }

      // Close edit mode for the section
      setEditMode((prev) => ({ ...prev, [collection]: false }))
    } catch (error) {
      console.error("Error saving data:", error)
      alert(error.message)
    }
  }

  const toggleEditMode = (section) => {
    if (!isOwnProfile) return
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#591B0C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#591B0C] font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-[#591B0C] text-white rounded-md hover:bg-[#3d1208] transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* LinkedIn-style Cover Photo */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#591B0C] to-[#3d1208] overflow-hidden">
        {/* Optional: Add a cover photo if available */}
        {profile?.coverImage && (
          <Image src={profile.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover opacity-30" />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* LinkedIn-style Profile Header */}
        <div className="relative -mt-20 mb-8">
          <div className="bg-white shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
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

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-[#591B0C]">
                        {profile?.fullName || user?.username || username}
                      </h1>
                      <p className="text-xl text-[#ff3003] font-medium mt-1">
                        {profile?.title || "Legal Professional"}
                      </p>

                      {profile?.location && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700 mt-2">
                          <MapPin className="w-4 h-4 text-[#591B0C]" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Edit Profile Button - Only visible to profile owner */}
                    {isOwnProfile && (
                      <div className="mt-4 md:mt-0">
                        <button
                          onClick={() => toggleEditMode("profiles")}
                          className="px-4 py-2 bg-[#591B0C] text-white  hover:bg-[#3d1208] transition-colors"
                        >
                          Edit Profile
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {profile?.email && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-[#591B0C]" />
                        <a href={`mailto:${profile.email}`} className="hover:text-[#591B0C] transition-colors">
                          {profile.email}
                        </a>
                      </div>
                    )}

                    {profile?.phone && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-[#591B0C]" />
                        <a href={`tel:${profile.phone}`} className="hover:text-[#591B0C] transition-colors">
                          {profile.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Bio Preview */}
                  {profile?.bio && (
                    <div className="mt-4 text-gray-700">
                      <p className="line-clamp-3">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Owner Badge */}
              {isOwnProfile && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5  text-xs font-medium bg-[#ffefdb] text-[#591B0C]">
                    Your Profile
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            
            {/* About Section */}
            <ProfileSection
              title="About"
              editMode={editMode.about}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("about") : null}
              ViewComponent={<AboutView about={about} />}
              EditComponent={<AboutEditForm about={about} onSave={(data) => handleSave("about", data)} />}
            />

            {/* Experience Section */}
            <ProfileSection
              title="Experience"
              editMode={editMode.experience}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("experience") : null}
              ViewComponent={<ExperienceView experience={experience} />}
              EditComponent={
                <ExperienceEditForm experience={experience} onSave={(data) => handleSave("experience", data)} />
              }
            />

            {/* Education Section */}
            <ProfileSection
              title="Education"
              editMode={editMode.education}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("education") : null}
              ViewComponent={<EducationView education={education} />}
              EditComponent={
                <EducationEditForm education={education} onSave={(data) => handleSave("education", data)} />
              }
            />

            {/* Achievements Section */}
            <ProfileSection
              title="Licenses & Certifications"
              editMode={editMode.achievements}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("achievements") : null}
              ViewComponent={<AchievementsView achievements={achievements} />}
              EditComponent={
                <AchievementsEditForm achievements={achievements} onSave={(data) => handleSave("achievements", data)} />
              }
            />

            {/* Contributions Section */}
            <ProfileSection
              title="Publications & Contributions"
              editMode={editMode.contribution}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("contribution") : null}
              ViewComponent={<ContributionView contributions={contribution} />}
              EditComponent={
                <ContributionEditForm
                  contributions={contribution}
                  onSave={(data) => handleSave("contribution", data)}
                />
              }
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills Section */}
            <ProfileSection
              title="Skills & Expertise"
              editMode={editMode.skills}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("skills") : null}
              ViewComponent={<SkillsView skills={skills} />}
              EditComponent={<SkillsEditForm skills={skills} onSave={(data) => handleSave("skills", data)} />}
            />

            {/* Social Links Section */}
            <ProfileSection
              title="Connect"
              editMode={editMode.socialLink}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("socialLink") : null}
              ViewComponent={<SocialLinksView socialLinks={socialLinks} />}
              EditComponent={
                <SocialLinksEditForm socialLinks={socialLinks} onSave={(data) => handleSave("socialLink", data)} />
              }
            />

            {/* Contact Card */}
            {profile && (
              <div className="bg-white  shadow-md overflow-hidden border border-gray-100">
                <div className="px-6 py-4 bg-gradient-to-r from-[#591B0C] to-[#3d1208] text-white">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  {profile.email && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10  bg-[#591B0C]/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[#591B0C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a href={`mailto:${profile.email}`} className="text-[#591B0C] font-medium">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10  bg-[#591B0C]/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-[#591B0C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <a href={`tel:${profile.phone}`} className="text-[#591B0C] font-medium">
                          {profile.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10  bg-[#591B0C]/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[#591B0C]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-[#591B0C] font-medium">{profile.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <button
                      className="w-full py-2 bg-[#ff3003] text-white  hover:bg-[#d62a03] transition-colors flex items-center justify-center gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href)
                        alert("Profile link copied to clipboard!")
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                      Share Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

