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

  const formatDate = (dateString) => {
    if (!dateString) return "Present"
    try {
      return new Date(dateString).toLocaleString("default", { month: "short", year: "numeric" })
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div
          key={index}
          className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
        >
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

            <div className={styles.dateTag}>
              <Calendar className="w-3 h-3" />
              <span>
                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
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

