import { Linkedin, Twitter, Instagram, Facebook, Youtube, Globe, Github } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const SocialLinksView = ({ socialLinks = {} }) => {
  const socialIcons = {
    linkedin: { icon: Linkedin, color: "#0077B5" },
    twitter: { icon: Twitter, color: "#1DA1F2" },
    instagram: { icon: Instagram, color: "#E1306C" },
    facebook: { icon: Facebook, color: "#1877F2" },
    youtube: { icon: Youtube, color: "#FF0000" },
    
    
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
     
      <div className="mt-2 flex flex-wrap gap-3">
        {links.map(([platform, link]) => {
          const IconInfo = socialIcons[platform] || { icon: Globe, color: "#591B0C" }
          const Icon = IconInfo.icon

          return (
            <a
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-[#ffefdb]/30 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${IconInfo.color}20` }}
              >
                <Icon style={{ color: IconInfo.color }} className="w-5 h-5" />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinksView

