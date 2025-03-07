import { FileText, Award, Heart, Globe } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const AboutView = ({ about }) => {
  if (!about || Object.keys(about).length === 0) {
    return (
      <div className={styles.emptyState}>
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No about information available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {about.summary && (
        <div>
          <h3 className={styles.heading.secondary}>
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#591B0C]" />
              Professional Summary
            </span>
          </h3>
          <p className="text-gray-700 leading-relaxed">{about.summary}</p>
        </div>
      )}

      {about.highlights && about.highlights.length > 0 && (
        <div>
          <h3 className={styles.heading.secondary}>
            <span className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#591B0C]" />
              Professional Highlights
            </span>
          </h3>
          <ul className="mt-3 space-y-2">
            {about.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-[#ff3003] mr-2 flex-shrink-0">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {about.hobbies && about.hobbies.length > 0 && (
        <div>
          <h3 className={styles.heading.secondary}>
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#591B0C]" />
              Interests & Hobbies
            </span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {about.hobbies.map((hobby, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1  text-sm font-medium bg-[#ffefdb] text-[#591B0C]"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      )}

      {about.personal_website && (
        <div>
          <h3 className={styles.heading.secondary}>
            <span className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#591B0C]" />
              Personal Website
            </span>
          </h3>
          <a
            href={about.personal_website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff3003] hover:text-[#591B0C] transition-colors duration-200 font-medium flex items-center gap-2"
          >
            {about.personal_website}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
        </div>
      )}
    </div>
  )
}

export default AboutView

