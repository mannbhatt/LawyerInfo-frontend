// This file contains shared styles for all profile view components
export const profileStyles = {
    // Main colors
    colors: {
      primary: "#591B0C",
      secondary: "#ff3003",
      accent: "#ffefdb",
      light: "#ffdbb5",
      dark: "#3d1208",
      white: "#ffffff",
    },
  
    // Section styles
    section:
      "bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg",
    sectionHeader: "px-6 py-4 bg-gradient-to-r from-[#591B0C] to-[#3d1208] text-white flex justify-between items-center",
    sectionTitle: "text-xl font-semibold",
    sectionBody: "p-6",
  
    // Typography
    heading: {
      primary: "text-2xl font-bold text-[#591B0C] mb-4",
      secondary: "text-xl font-semibold text-[#591B0C] mb-3",
      tertiary: "text-lg font-semibold text-gray-800 mb-1",
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-600",
      muted: "text-gray-500 text-sm",
    },
  
    // Item styles
    item: "border-b border-gray-100 last:border-0 pb-5 last:pb-0 mb-5 last:mb-0",
    itemHeader: "flex justify-between items-start mb-2",
    itemTitle: "text-lg font-semibold text-[#591B0C]",
    itemSubtitle: "text-gray-600",
    itemDate: "text-gray-500 text-sm",
    itemContent: "mt-2 text-gray-700",
  
    // Link styles
    link: "text-[#ff3003] hover:text-[#591B0C] transition-colors duration-200 font-medium",
  
    // List styles
    list: "space-y-2 mt-3",
    listItem: "flex items-start",
    listIcon: "text-[#591B0C] mr-2 mt-1 flex-shrink-0 w-4 h-4",
  
    // Badge styles
    badge:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffefdb] text-[#591B0C] mr-2 mb-2",
  
    // Button styles
    button: {
      primary:
        "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#3d1208] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#591B0C]",
      secondary:
        "inline-flex items-center px-4 py-2 border border-[#591B0C] rounded-md text-sm font-medium text-[#591B0C] bg-white hover:bg-[#ffefdb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#591B0C]",
    },
  
    // Image styles
    profileImage: "w-24 h-24 rounded-full border-4 border-white shadow-md object-cover",
    certificateImage: "w-32 h-20 object-cover mt-2 rounded-md border border-gray-200",
  
    // Empty state
    emptyState: "text-center py-8 text-gray-500",
  }
  
  