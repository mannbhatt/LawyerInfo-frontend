'use client';

import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { useToast } from "../ui/toast"; // Import useToast hook for toast notifications
import { Briefcase, Calendar, FileText, Tag } from "lucide-react"; // Import icons from lucide-react

const ContributionForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const [contributionData, setContributionData] = useState({
    user_id: userId,
    title: "",
    description: "",
    category: "Blog",
    external_link: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast(); // Destructure success and error from useToast hook

  const handleInputChange = (e) => {
    setContributionData({ ...contributionData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!contributionData.title.trim()) newErrors.title = "Title is required.";
    if (!contributionData.description.trim()) newErrors.description = "Description is required.";
    if (!contributionData.category) newErrors.category = "Category is required.";
    if (
      contributionData.external_link &&
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(contributionData.external_link)
    ) {
      newErrors.external_link = "Enter a valid URL.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitContributionData = async (redirectAfterSubmit) => {
    if (!validateForm()){
      error("Please fix the errors in the form")
      return}

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. User might not be logged in.");
      error("No token found. User might not be logged in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contribution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contributionData),
      });

      const data = await response.json();
      if (response.ok) {
        success("Contribution added successfully!"); // Added toast notification for success
        if (redirectAfterSubmit) {
          nextStep();
        } else {
          setContributionData({user_id: userId, title: "", description: "", category: "Blog", external_link: "" });
          thisStep();
        }
      } else {
        error(data.message || "Failed to add contribution."); // Added toast notification for error
      }
    } catch (error) {
      console.error("Error:", error);
      error("An error occurred. Please try again."); // Added toast notification for error
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
       <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb] p-4">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '88%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 8 of 9: Add Your Notable Works</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <Briefcase className="h-5 w-5 mr-2 text-[#591B0C]" /> Title
            </label><input
              type="text"
              name="title"
              value={contributionData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />
          
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <Tag className="h-5 w-5 mr-2 text-[#591B0C]" /> Category
            </label>
            <select
              name="category"
              value={contributionData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            >
              <option value="Blog">Blog</option>
              <option value="Research Paper">Research Paper</option>
              <option value="Project">Project</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
         
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <FileText className="h-5 w-5 mr-2 text-[#591B0C]" /> Description
            </label>
            <textarea
              name="description"
              value={contributionData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full h-20 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            ></textarea>
          
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#591B0C]" /> External Link (Optional)
            </label><input
              type="url"
              name="external_link"
              value={contributionData.external_link}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            />
          
          {errors.external_link && <p className="mt-1 text-sm text-red-600">{errors.external_link}</p>}
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={skipStep}
            className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white"
          >
            Skip
          </button>
          <div className="flex justify-between w-[24%]">
            <button 
              type="button" 
              onClick={() => submitContributionData(false)} 
              className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white text-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add More"}
            </button>
            <button 
              type="button" 
              onClick={() => submitContributionData(true)} 
              className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContributionForm;
