"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { useToast } from "../ui/toast"
import Imgupload from "../imgupload";
import { Briefcase, Calendar, Building, FileText } from "lucide-react"; // Import icons from lucide-react
const AchievementForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const [certificationData, setCertificationData] = useState({
    user_id: userId,
    certificate_name: "",
    issuing_organization: "",
    issue_date: "",
    credential_url: "",
    certificate_image: "",
    imageKey:"",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageUploadWarning, setImageUploadWarning] = useState(""); // Added to store image upload warning
  const [imageKey,setImageKey]=useState("");
  const { success, error } = useToast(); // Added to use toast notifications

  const handleInputChange = (e) => {
    setCertificationData({ ...certificationData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!certificationData.certificate_name.trim()) newErrors.certificate_name = "Certificate name is required.";
    if (!certificationData.issuing_organization.trim()) newErrors.issuing_organization = "Issuing organization is required.";
    if (!certificationData.issue_date) newErrors.issue_date = "Issue date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitCertificationData = async (redirectAfterSubmit) => {
    if (!validateForm()) return;
    if (!uploadedImage) {
      setImageUploadWarning("Certificate image is required. Please upload an image.");
      return;
    } else {
      setImageUploadWarning(""); // Clear the warning if image is uploaded
    }
    if (!imageKey) {
      setImageUploadWarning("Image key is required. Please upload an image.");
      return;
    } else {
      setImageUploadWarning(""); // Clear the warning if image key is uploaded
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
    const finalData={
      user_id:certificationData.user_id,
      certificate_name:certificationData.certificate_name,
    issuing_organization: certificationData.issuing_organization,
    issue_date: certificationData.issue_date,
    credential_url: certificationData.credential_url,
    certificate_image: uploadedImage,
    imageKey:imageKey,

    };
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/achievements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      if (response.ok) {
        success("Certification added successfully!"); // Added toast notification for success
        if (redirectAfterSubmit) {
          nextStep();
        } else {
          setCertificationData({
            user_id: userId,
            certificate_name: "",
            issuing_organization: "",
            issue_date: "",
            credential_url: "",
            certificate_image: "",
            imageKey:"",
            uploadedImage:"",
          });
          thisStep();
        }
      } else {
        error(data.message || "Failed to add certification."); // Added toast notification for error
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
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '77%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 7 of 9:Add Your Achievements</p>
      </div>
      <form className="space-y-4">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
        
        <div className="">
              <label className="block text-sm   font-medium text-gray-700  items-center">
                <Building className="h-5 w-5 mr-2 text-[#591B0C]" /> Profile Image
              </label>
              <Imgupload onUploadComplete={setUploadedImage} onImageKeyChange={setImageKey}/>
              {imageUploadWarning && <p className="text-sm text-red-600">{imageUploadWarning}</p>}
            </div>
        <div className="flex flex-col justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <Briefcase className="h-5 w-5 mr-2 text-[#591B0C]" /> Certificate Name
            </label><input
              type="text"
              name="certificate_name"
              value={certificationData.certificate_name}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />
         
          {errors.certificate_name && <p className="text-sm text-red-600">{errors.certificate_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <Building className="h-5 w-5 mr-2 text-[#591B0C]" /> Issuing Organization
            </label>  <input
              type="text"
              name="issuing_organization"
              value={certificationData.issuing_organization}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />
         
          {errors.issuing_organization && <p className="text-sm text-red-600">{errors.issuing_organization}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700  items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#591B0C]" /> Issue Date
            </label>   <input
              type="date"
              name="issue_date"
              value={certificationData.issue_date}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />
         
          {errors.issue_date && <p className="text-sm text-red-600">{errors.issue_date}</p>}
        </div>
          


        </div>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700  items-center">
            <FileText className="h-5 w-5 mr-2" /> Credential URL (optional)
            </label><input
              type="text"
              name="credential_url"
              value={certificationData.credential_url}
              onChange={handleInputChange}
              className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
            />
         
          </div>
        
        <div className="flex justify-between">
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
              onClick={() => submitCertificationData(false)}
              className="px-6 py-2 bg-[#591B0C] text-white hover:bg-[#ff3003] text-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add More"}
            </button>
            <button 
              type="button" 
              onClick={() => submitCertificationData(true)}
              className="px-6 py-2 bg-[#591B0C] text-white hover:bg-[#ff3003]"
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

export default AchievementForm;
