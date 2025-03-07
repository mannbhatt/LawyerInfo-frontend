"use client";

import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const EducationForm = ({ nextStep, skipStep, userId }) => {
  const [educationData, setEducationData] = useState({
    userId: userId,
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
  });
  const [customInstitution, setCustomInstitution] = useState("");
  const [institutions, setInstitutions] = useState([]); // Store fetched institutions
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Institutions from Backend
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutions`);
        const data = await response.json();
        if (response.ok) {
          setInstitutions(data.institutions);
        } else {
          console.error("Failed to fetch institutions:", data.message);
        }
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    fetchInstitutions();
  }, []);

  const handleInputChange = (e) => {
    const {name,value} =e.target;
    if(name === "institution" && value !== "Other"){
      setCustomInstitution("");
    }
    setEducationData((prev) => ({...prev,[name]:value}));
      };

  const handleInstitutionChange = (e) => {
    const selectedValue = e.target.value;
    setEducationData((prev) => ({
      ...prev,
      institution: selectedValue === "Other" ? customInstitution : selectedValue,
    }));
  };

  // ✅ Handle user input for "Other" institution
  const handleCustomInstitutionChange = (e) => {
    const customValue = e.target.value;
    setCustomInstitution(customValue);

    // Update institution field dynamically when typing
    
  };

  const validateForm = () => {
    
  
    if (!educationData) {
      console.error("Error: educationData is undefined.");
      return false;
    }
  
    const newErrors = {};
    const currentDate = new Date();
  
    if (!educationData.institution?.trim() || educationData.institution === "Other") {
      if (!educationData.institution?.trim()) {
        newErrors.institution = "Institution name is required.";
      } else if (customInstitution === "") {
        newErrors.institution = "Write a valid Institute name.";
      }
    }  if (!educationData.degree?.trim()) newErrors.degree = "Degree is required.";
    if (!educationData.description?.trim()) newErrors.description = "Short description is required.";
   
    if (!educationData.startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (new Date(educationData.startDate) > currentDate) {
      newErrors.startDate = "Start date cannot be in the future.";
    }
  
    if (educationData.endDate) {
      if (new Date(educationData.endDate) < new Date(educationData.startDate)) {
        newErrors.endDate = "End date cannot be before start date.";
      }
    }
  
    if (educationData.grade && !/^[0-9]\.[0-9]$|^[0-4]\.00$/.test(educationData.grade)) {
      newErrors.grade = "Grade should be in the format 0.0 to 9.9";
    }
  
    
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
   

  const submitEducationData = async (redirectAfterSubmit) => {
    const isValid = validateForm(); 

    if (!isValid) {
      return; 
    }
  
    
    
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
    const finalInstitution = educationData.institution === "Other" ? customInstitution : educationData.institution;

    if (!finalInstitution || finalInstitution.trim() === "") {
      alert("Please select or enter an institution.");
      return;
    }

    const finalData = { ...educationData, institution: finalInstitution };

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Education added successfully!");

        if (redirectAfterSubmit) {
          nextStep();
        } else {
          
          setCustomInstitution("")
          setEducationData({
            userId: userId,
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
            grade: "",
            description:"",
          });
        }
      } else {
        alert(data.message || "Failed to add education.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  };


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
      <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb]  p-4">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '33%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 3 of 9: Education Information</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
        <div className={`${educationData.institution === "Other"?"hidden":""}`}>
          <label className="block text-sm font-medium text-gray-700">Institution</label>
          <select
            name="institution"
            value={educationData.institution}
            onChange={handleInputChange}
            className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            required
          >
            <option value="">Select Institution</option>
            {institutions.map((institution) => (
              <option key={institution._id} value={institution.name}>
                {institution.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
            </div>
          {/* 📌 Show text field if "Other" is selected */}
          {educationData.institution === "Other" && (
           <div>
            <label className="block text-sm font-medium text-gray-700">Enter Institute Name</label>
            <input
              type="text"
              name="customInstitution"
              value={customInstitution}
              onChange={handleCustomInstitutionChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />
            </div>
          )}
        
            {errors.institution && <p className="mt-1 text-sm text-red-600">{errors.institution}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Degree</label>
            <input
              type="text"
              name="degree"
              value={educationData.degree}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />
            {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={educationData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />{errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date (or expected)</label>
            <input
              type="date"
              name="endDate"
              value={educationData.endDate}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            required/>{errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
          </div>
                  </div>
                  <div>
            <label className="block text-sm font-medium text-gray-700">
              Grade (GPA)
              <input
                type="text"
                name="grade"
                value={educationData.grade}
                onChange={handleInputChange}
                className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              />
            </label>
            {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
          </div>
                  <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
            <textarea
              name="description"
              value={educationData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full h-20 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />{errors.description && <p className="text-red-500">{errors.description}</p>}
          </label>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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
              onClick={() => submitEducationData(false)}
              className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add More"}
            </button>
          <button
            type="button"
            onClick={() => submitEducationData(true)}
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

export default EducationForm;
