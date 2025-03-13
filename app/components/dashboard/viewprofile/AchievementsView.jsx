import { Award, Calendar, ExternalLink, FileText } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const AchievementsView = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Award className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No achievements available</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      {achievements.map((ach, index) => (
        <div
          key={index}
          className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 flex flex-col md:flex-row gap-4"
        >
          {ach.certificate_image && (
            <div className="w-full md:w-1/3 sm:w-full">
              <img
                src={ach.certificate_image || "/placeholder.svg"}
                alt="Certificate"
                className="w-full h-auto object-cover rounded-md border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=100&width=200"
                  e.target.alt = "Certificate image not available"
                }}
              />
            </div>
          )}
          <div className={`w-full md:w-${ach.certificate_image ? "2/3" : "full"} sm:w-full`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="w-full md:w-[68%]">
                <h3 className="text-xl font-semibold text-[#591B0C] ">{ach.certificate_name}</h3>
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <FileText className="w-4 h-4 text-[#591B0C]" />
                  <span>{ach.issuing_organization}</span>
                </div>
              </div>

              <div className={styles.dateTag}>
                <Calendar className="w-3 h-3" />
                <span>Issued: {formatDate(ach.issue_date)}</span>
              </div>
            </div>

            {ach.credential_url && (
              <a
                href={ach.credential_url}
                className="inline-flex items-center mt-4 text-[#ff3003] hover:text-[#591B0C] transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Credential
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AchievementsView

