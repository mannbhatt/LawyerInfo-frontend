"use client"

import { Edit2, X } from "lucide-react"

const ProfileSection = ({ title, editMode, onToggleEdit, ViewComponent, EditComponent }) => {
  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
      {title && (
        <div className="px-6 py-4 bg-gradient-to-r from-[#591B0C] to-[#3d1208] text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          {onToggleEdit && (
            <button
              onClick={onToggleEdit}
              className="flex items-center gap-1 text-white hover:text-[#ffefdb] transition-colors duration-200 bg-[#591B0C]/30 hover:bg-[#591B0C]/50 rounded-md px-3 py-1.5"
              aria-label={editMode ? "Cancel editing" : "Edit section"}
            >
              {editMode ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              <span className="text-sm font-medium">{editMode ? "Cancel" : "Edit"}</span>
            </button>
          )}
        </div>
      )}
      <div className="p-6">{editMode ? EditComponent : ViewComponent}</div>
    </section>
  )
}

export default ProfileSection

