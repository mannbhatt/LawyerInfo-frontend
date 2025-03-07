// This file contains shared styles for all form components
export const formStyles = {
    // Main colors
    colors: {
      primary: "#591B0C",
      secondary: "#ff3003",
      accent: "#ffefdb",
      light: "#ffdbb5",
      dark: "#3d1208",
      white: "#ffffff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
    },
  
    // Form elements
    input:
      "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary transition-all duration-200 bg-white",
    label: "block text-sm font-semibold text-gray-700 mb-1.5",
    select:
      "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary transition-all duration-200 bg-white appearance-none",
    textarea:
      "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-primary transition-all duration-200 bg-white min-h-[120px]",
  
    // Buttons
    button: {
      primary:
        "px-6 py-3 bg-black text-white rounded-lg hover:bg-dark focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
      secondary:
        "px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-accent focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
      danger:
        "px-6 py-3 bg-error text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
      success:
        "px-6 py-3 bg-success text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
    },
  
    // Cards and containers
    card: "bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden",
    cardHeader: "px-6 py-4 bg-gradient-to-r from-primary to-dark text-white",
    cardBody: "p-6",
    cardFooter: "px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between",
  
    // Form sections
    formSection: "mb-8 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden",
    formSectionHeader: "px-6 py-4 bg-gradient-to-r from-primary to-dark text-white flex justify-between items-center",
    formSectionBody: "p-6",
    formSectionFooter: "px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between",
  
    // Item lists
    itemList: "space-y-4",
    itemCard: "border-2 border-gray-200 rounded-lg p-5 transition-all duration-200 hover:border-primary",
  
    // Responsive grid
    grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
    fullWidth: "md:col-span-2",
  }
  
  