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
import ProfileView from "../components/dashboard/viewprofile/profileView"
import ProfileEditForm from "../components/dashboard/editprofile/ProfileEditForm"

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
  const [users,SetUsers]=useState(null)
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
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  
      // Fetch user data based on username
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${username}`, {
        headers: {},
      });
  
      if (!userRes.ok) {
        throw new Error("User not found");
      }
  
      const userData = await userRes.json();
      setUser(userData);
  
      // Check if the logged-in user is viewing their own profile
      if (userId && (userId === userData._id || userId === userData.id)) {
        setIsOwnProfile(true);
      } else {
        setIsOwnProfile(false);
      }
  
      // Fetch all profile-related data in a single API call
      const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiledata/${userData._id || userData.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
  
      if (!profileRes.ok) {
        throw new Error("Profile data not found");
      }
  
      const profileData = await profileRes.json();
  	//console.log(profileData);
      // Set state with fetched data
      setProfile(profileData.data.profile || null);
      setEducation(profileData.data.education || []);
      setExperience(profileData.data.experience || []);
      setAbout(profileData.data.about || {});
      setAchievements(profileData.data.achievements || []);
      setSkills(profileData.data.skills?.skills || []);
      SetUsers(profileData.data.users ||null)

      setSocialLinks(profileData.data.socialLinks?.links || {});
      setContribution(profileData.data.contributions || []);
  
    } catch (err) {
      setError(err.message);
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };
  
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
      }else if (collection === "achievements") {
        formattedData = data.achievements || data;
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
      <div className="relative h-48 md:h-48 bg-gradient-to-r from-[#591B0C] to-[#3d1208] overflow-hidden">
        {/* Optional: Add a cover photo if available */}
        {profile?.coverImage && (
          <Image src={profile.coverImage || "https://i.sstatic.net/jGlzr.png"} alt="Cover" fill className="object-cover opacity-30" />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* LinkedIn-style Profile Header */}
        <div className="relative -mt-20 mb-8">
            <ProfileSection
              title="Profile"
              editMode={editMode.profiles}
              onToggleEdit={isOwnProfile ? () => toggleEditMode("profiles") : null}
              
                            ViewComponent={<ProfileView profile={profile} />}
              EditComponent={<ProfileEditForm profile={profile} onSave={(data) => handleSave("profiles", data)} />}
            />
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
           
          </div>
        </div>
      </div>
    </div>
  )
}

