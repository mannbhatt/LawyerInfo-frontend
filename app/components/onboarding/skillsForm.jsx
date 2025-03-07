"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { useToast } from "../ui/toast"; // Import useToast hook for toast notifications
import { Code, X } from 'lucide-react'; // Import icons

const SkillsForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast(); // Destructure success and error from useToast hook

  const handleInputChange = (e) => {
    setSkill(e.target.value);
  };

  const validateForm = () => {
    if (!skill.trim()) {
      setErrors("Skill cannot be empty.");
      return false;
    }
    setErrors("");
    return true;
  };

  const addSkill = () => {
    if (!validateForm()) {
      error("Please fix the errors in the form")
      return};
    setSkills([...skills, skill]);
    setSkill("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const submitSkillsData = async (redirectAfterSubmit) => {
    if (skills.length === 0) {
      setErrors("Please add at least one skill.");
      return;
    }
    
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. User might not be logged in.");
      error("No token found. User might not be logged in.")
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId,skills}),
      });
      
      const data = await response.json();
      if (response.ok) {
        success("Skills added successfully!"); // Added toast notification for success
        if (redirectAfterSubmit) {
          nextStep();
        } else {
          setSkills([]);
          thisStep();
        }
      } else {
        error(data.message || "Failed to add skills."); // Added toast notification for error
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
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '66%' }}></div>
        </div>
        <p className="text-center text-sm text-[#591B0C] mt-2">Step 6 of 9: Add Your Skills</p>
      </div>
      <label className="flex text-sm font-medium text-gray-700  items-center">
        <Code className="w-4 h-4 mr-2 text-[#591B0C]" />
        Enter Your Skills
      </label>
      <div className="flex w-full items-center justify-between mt-1 mb-6">
        <input
          type="text"
          value={skill}
          onChange={handleInputChange}
          className="w-[84%]  h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
          
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-6 py-2 h-9 bg-[#591B0C] hover:bg-[#ff3003] text-white"
        >
        Add Skill
        </button>
      </div>
      {errors && <p className="text-red-600 mb-4">{errors}</p>}

      <ul className="mb-6">
        {skills.map((s, index) => (
          <li key={index} className="flex justify-between items-center bg-[#ffefdb] p-2 mb-2">
            {s}
            <button onClick={() => removeSkill(index)} className="text-red-600">
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={skipStep}
          className="px-6 py-2 bg-[#591B0C] text-white hover:bg-[#ff3003]"
        >
          Skip
        </button>
        <div className="flex justify-between w-[24%]">
          <button
            type="button"
            onClick={() => submitSkillsData(false)}
            className="px-6 py-2 bg-[#591B0C] text-white hover:bg-[#ff3003]"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add More"}
          </button>
          <button
            type="button"
            onClick={() => submitSkillsData(true)}
            className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white text-sm"
            disabled={loading}
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
