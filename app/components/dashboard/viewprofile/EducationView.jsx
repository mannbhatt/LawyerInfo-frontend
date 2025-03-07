import { BookOpen, Calendar, Award, MapPin } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const EducationView = ({ education }) => {
  if (!education || education.length === 0) {
    return (
      <div className={styles.emptyState}>
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No education history available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={index} className={styles.item}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-xl font-semibold text-[#591B0C]">{edu.degree}</h3>
              <div className="flex items-center gap-2 text-gray-700 mt-1">
                <BookOpen className="w-4 h-4 text-[#591B0C]" />
                <span>{edu.institution}</span>
              </div>

              {edu.location && (
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 text-[#591B0C]" />
                  <span>{edu.location}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 bg-[#ffefdb] text-[#591B0C] px-3 py-1  text-sm font-medium mt-2 md:mt-0 self-start">
              <Calendar className="w-3 h-3" />
              <span>
                {edu.startDate} - {edu.endDate || "Present"}
              </span>
            </div>
          </div>

          {edu.grade && (
            <div className="mt-3 flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-[#ff3003]" />
              <span className="font-medium">Grade: {edu.grade}</span>
            </div>
          )}

          {edu.description && <p className="mt-3 text-gray-700">{edu.description}</p>}
        </div>
      ))}
    </div>
  )
}

export default EducationView

