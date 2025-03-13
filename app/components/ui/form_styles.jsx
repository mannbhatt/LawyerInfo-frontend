export const formStyles = {
  container: "w-full max-w-4xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  fullWidth: "col-span-1 md:col-span-2",
  label: "block text-sm font-medium text-gray-700 mb-1",
  input:
    "w-full  border-2 border-[#591B0C] h-9 shadow-sm  focus:border-[#ff3003] outline-none  transition-colors",
  textarea:
    "w-full  py-2 border-2 border-[#591B0C] shadow-sm focus:border-[#ff3003] outline-none transition-colors",
  select:
    "w-full  border-2 border-[#591B0C] h-9 shadow-sm  focus:border-[#ff3003] outline-none transition-colors",
  checkbox: "h-4 w-4 text-[#591B0C] border-gray-300 rounded focus:ring-[#ff3003] focus:ring-opacity-20",
  radio: "h-4 w-4 text-[#591B0C] border-gray-300 focus:ring-[#591B0C] focus:ring-opacity-20",
  error: "mt-1 text-sm text-red-600",
  hint: "mt-1 text-sm text-gray-500",
  itemCard: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6",
  button: {
    primary:
      "inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#591B0C] text-white rounded-md hover:bg-[#ff3003] transition-colors disabled:opacity-70 disabled:cursor-not-allowed",
    secondary:
      "inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#591B0C] border-2 border-[#591B0C] rounded-md hover:bg-[#ffefdb] transition-colors",
    danger:
      "inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors",
  },
}

