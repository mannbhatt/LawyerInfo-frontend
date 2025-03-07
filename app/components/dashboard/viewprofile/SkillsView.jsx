import { Award } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const SkillsView = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Award className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No skills available</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className={styles.heading.secondary}>
        <span className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#591B0C]" />
          Professional Skills & Expertise
        </span>
      </h3>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-[#ffefdb] text-[#591B0C] border border-[#ffdbb5]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillsView

