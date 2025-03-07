import { Briefcase, Building, Calendar, MapPin } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const ExperienceView = ({ experience }) => {
  if (!experience || experience.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No experience history available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={index} className={styles.item}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-xl font-semibold text-[#591B0C]">{exp.position}</h3>
              <div className="flex items-center gap-2 text-gray-700 mt-1">
                <Building className="w-4 h-4 text-[#591B0C]" />
                <span>{exp.company}</span>
              </div>

              {exp.location && (
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 text-[#591B0C]" />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 bg-[#ffefdb] text-[#591B0C] px-3 py-1  text-sm font-medium mt-2 md:mt-0 self-start">
              <Calendar className="w-3 h-3" />
              <span>
                {exp.startDate} - {exp.endDate || "Present"}
              </span>
            </div>
          </div>

          {exp.description && (
            <div className="mt-3">
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ExperienceView

