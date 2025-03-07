import { FileText, Tag, ExternalLink } from "lucide-react"
import { profileStyles as styles } from "../../ui/profile_styles"

const ContributionView = ({ contributions }) => {
  if (!contributions || contributions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>No contributions available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {contributions.map((contribution, index) => (
        <div key={index} className={styles.item}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-xl font-semibold text-[#591B0C]">{contribution.title}</h3>

              {contribution.category && (
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <Tag className="w-4 h-4 text-[#591B0C]" />
                  <span>{contribution.category}</span>
                </div>
              )}
            </div>

            {contribution.date && (
              <div className="flex items-center gap-1 bg-[#ffefdb] text-[#591B0C] px-3 py-1  text-sm font-medium mt-2 md:mt-0 self-start">
                <span>{contribution.date}</span>
              </div>
            )}
          </div>

          {contribution.description && <p className="mt-3 text-gray-700">{contribution.description}</p>}

          {contribution.external_link && (
            <a
              href={contribution.external_link}
              className="inline-flex items-center mt-3 text-[#ff3003] hover:text-[#591B0C] transition-colors duration-200 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View More
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default ContributionView

