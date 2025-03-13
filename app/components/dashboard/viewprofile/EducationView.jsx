import { BookOpen, Calendar, Award, MapPin } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"
import React from "react"
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
        <div
          key={index}
          className=" border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
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

            <div className={styles.dateTag}>
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(edu.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : "Present"}
              </span>
            </div>
          </div>

          {edu.grade && (
            <div className="mt-4 flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-[#ff3003]" />
              <span className="font-medium">Grade: {edu.grade}</span>
            </div>
          )}

         
          <p className="text-gray-700 text-justify leading-relaxed mt-4">
  {edu.description.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))}
</p>
        </div>
      ))}
    </div>
  )
}

export default EducationView

