"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { useToast } from "../ui/toast"
import { User, Star, Heart, Globe,FileText } from "lucide-react"; // Importing icons from lucide-react
const AboutForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const [aboutData, setAboutData] = useState({
    user_id: userId,
    summary: "",
    highlights: [],
    hobbies: [],
    personal_website: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast()
  const handleInputChange = (e) => {
    setAboutData({ ...aboutData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field) => {
    setAboutData({ ...aboutData, [field]: e.target.value.split(",") });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!aboutData.summary.trim()) newErrors.summary = "Summary is required.";
    
    if (aboutData.personal_website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(aboutData.personal_website)) {
      
      newErrors.personal_website = "Enter a valid website URL.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitAboutData = async (redirectAfterSubmit) => {
    if (!validateForm()) {
      error("Please fix the errors in the form")
      return};

    const token = localStorage.getItem("authToken");
    if (!token) {
      error("No token found. User might not be logged in.")
      console.error("No token found. User might not be logged in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aboutData),
      });

      const data = await response.json();
      if (response.ok) {
        success("about data added successfully!")

        
        if (redirectAfterSubmit) {
          nextStep();
        } else {
          setAboutData({
            user_id: userId,
            summary: "",
            highlights: [],
            hobbies: [],
            personal_website: "",
          });
          thisStep();
        }
      } else {
        error(data.message || "Failed to save about information.");
      }
    } catch (error) {
      console.error("Error:", error);
      error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
       <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb] p-4">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '55%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 5 of 9: About Information</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <FileText size={16} className="text-[#591B0C]"/> Summary
            </label> <textarea
              name="summary"
              value={aboutData.summary}
              onChange={handleInputChange}
              className="mt-1 block w-full h-20 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm text-[#591B0C]"
              required
            />
         
          {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Star size={16} className="text-[#591B0C]"/> Highlights (comma-separated)
            </label> <input
              type="text"
              name="highlights"
              value={aboutData.highlights.join(",")}
              onChange={(e) => handleArrayChange(e, "highlights")}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            />
          
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Heart size={16} className="text-[#591B0C]"/> Hobbies (comma-separated)
            </label> <input
              type="text"
              name="hobbies"
              value={aboutData.hobbies.join(",")}
              onChange={(e) => handleArrayChange(e, "hobbies")}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            />
         
         
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Globe size={16} className="text-[#591B0C]"/> Personal Website
            </label> <input
              type="url"
              name="personal_website"
              value={aboutData.personal_website}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            />
          
          {errors.personal_website && <p className="mt-1 text-sm text-red-600">{errors.personal_website}</p>}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={skipStep}
            className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
          >
            Skip
          </button>
          <div className="flex justify-between w-[24%]">
            <button
              type="button"
              onClick={() => submitAboutData(false)}
              className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add More"}
            </button>
            <button
              type="button"
              onClick={() => submitAboutData(true)}
              className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
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

export default AboutForm;
