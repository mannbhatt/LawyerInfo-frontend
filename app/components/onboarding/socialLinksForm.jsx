"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';

const SocialLinksForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const socialIcons = {
    linkedin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#591B0C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-black"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#591B0C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
    instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#591B0C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#591B0C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    youtube: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#591B0C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
  }
  const nextIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 ml-2"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSocialLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(socialLinks).forEach(([key, value]) => {
      if (value && !/^https?:\/\//.test(value)) {
        newErrors[key] = "Invalid URL format. Use https://";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitSocialLinks = async (redirectAfterSubmit) => {
    if (!validateForm()) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/socialLink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, links: socialLinks }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Social links updated successfully!");
        if (redirectAfterSubmit) {
          window.location.href = "/";
        } else {
          thisStep();
        }
      } else {
        alert(data.message || "Failed to update social links.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  };
  const handleSkip = () => {
    window.location.href = "/"; 
  };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
       <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb] p-4">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 9 of 9: Add Your Social Links</p>
      </div>
      {Object.keys(socialLinks).map((platform) => (
        <div key={platform} className="mb-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{socialIcons[platform]}</div>
         
            <input
              type="text"
              name={platform}
             placeholder={`Enter your ${platform} profile URL`}
              value={socialLinks[platform]}
              onChange={handleInputChange}
              className="block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] sm:text-sm pl-10"
            />
            
          </div>
          {errors[platform] && <p className="text-red-500 text-sm">{errors[platform]}</p>}
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button  onClick={handleSkip} className="px-6 h-10 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white">Skip</button>
        
          <button onClick={() => submitSocialLinks(true)} className="px-6 py-2 h-10 bg-[#591B0C] hover:bg-[#ff3003] text-white" disabled={loading}>
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        
      </div>
    </div>
  );
};

export default SocialLinksForm;
