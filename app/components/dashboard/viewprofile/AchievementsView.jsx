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

  return (
    <div className="space-y-6">
      {achievements.map((ach, index) => (
        <div key={index} className={styles.item}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-xl font-semibold text-[#591B0C]">{ach.certificate_name}</h3>
              <div className="flex items-center gap-2 text-gray-700 mt-1">
                <FileText className="w-4 h-4 text-[#591B0C]" />
                <span>{ach.issuing_organization}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#ffefdb] text-[#591B0C] px-3 py-1  text-sm font-medium mt-2 md:mt-0 self-start">
              <Calendar className="w-3 h-3" />
              <span>Issued: {new Date(ach.issue_date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {ach.certificate_image && (
              <div className="sm:w-1/3">
                <img
                  src={ach.certificate_image || "/placeholder.svg"}
                  alt="Certificate"
                  className="w-full h-auto object-cover  border border-gray-200 shadow-sm"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=100&width=200"
                    e.target.alt = "Certificate image not available"
                  }}
                />
              </div>
            )}

            <div className={ach.certificate_image ? "sm:w-2/3" : "w-full"}>
              {ach.description && <p className="text-gray-700 mb-3">{ach.description}</p>}

              {ach.credential_url && (
                <a
                  href={ach.credential_url}
                  className="inline-flex items-center text-[#ff3003] hover:text-[#591B0C] transition-colors duration-200 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Credential
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AchievementsView

