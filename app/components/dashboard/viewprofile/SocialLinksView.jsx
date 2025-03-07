import { Linkedin, Twitter, Instagram, Facebook, Youtube, Globe, Github } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const SocialLinksView = ({ socialLinks = {} }) => {
  const socialIcons = {
    linkedin: { icon: Linkedin, color: "#0077B5" },
    twitter: { icon: Twitter, color: "#1DA1F2" },
    instagram: { icon: Instagram, color: "#E1306C" },
    facebook: { icon: Facebook, color: "#1877F2" },
    youtube: { icon: Youtube, color: "#FF0000" },
    github: { icon: Github, color: "#333333" },
    website: { icon: Globe, color: "#4CAF50" },
  }

  const links = Object.entries(socialLinks).filter(([_, link]) => link)

  if (!links.length) {
    return (
      <div className={styles.emptyState}>
        <Globe className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No social links available</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className={styles.heading.secondary}>Connect With Me</h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map(([platform, link]) => {
          const IconInfo = socialIcons[platform] || { icon: Globe, color: "#591B0C" }
          const Icon = IconInfo.icon

          return (
            <a
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#591B0C] hover:bg-[#ffefdb]/30 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${IconInfo.color}20` }}
              >
                <Icon style={{ color: IconInfo.color }} className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 capitalize">{platform}</p>
                <p className="text-sm text-gray-500 truncate">{link.replace(/^https?:\/\//, "")}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinksView

