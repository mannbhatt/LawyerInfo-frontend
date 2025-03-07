"use client";
import React, { useState, useEffect } from "react";

import { useDropzone } from "react-dropzone"; // For drag & drop functionality
import Imgupload from "../imgupload";
const ProfileForm = ({ nextStep, userId }) => {
  const [profileData, setProfileData] = useState({
    userId: userId,
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    profileImage: "",
    imageKey:"",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageUploadWarning, setImageUploadWarning] = useState(""); // Added to store image upload warning
  const [imageKey,setImageKey]=useState("");
  useEffect(() => {
    if (userId) {
      setProfileData((prev) => ({ ...prev, userId }));
      fetchUserEmail();
    }
  }, [userId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchUserEmail = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("User not authenticated");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData((prev) => ({ ...prev, email: data.email }));
      } else {
        console.error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Handle file upload via input or drag-and-drop
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      setImageUploadWarning("Profile image is required. Please upload an image.");
      return;
    } else {
      setImageUploadWarning(""); // Clear the warning if image is uploaded
    }
    if (!imageKey) {
      setImageUploadWarning("Image  is required. Please upload an image.");
      return;
    } else {
      setImageUploadWarning(""); // Clear the warning if image key is uploaded
    }
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not authenticated");
    console.log(token);

    if (Object.values(errors).some((error) => error)) return;

    const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();

    const finalData = {
      userId: profileData.userId,
      fullName,
      email: profileData.email,
      phone: profileData.phone,
      dateOfBirth: profileData.dateOfBirth,
      gender: profileData.gender,
      profileImage: uploadedImage,
      imageKey:imageKey,
      bio: profileData.bio,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        nextStep();
      } else {
        console.error("Profile creation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
      <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb]  p-4">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '22%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 2 of 9: Personal Information</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-[#591B0C] border-2 focus:border-[#ff3003] outline-none"
                required
              />
              {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-[#591B0C] border-2  focus:border-[#ff3003] outline-none"
                required
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email (Auto-filled)</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                className="mt-1 block w-full border-[#591B0C] border-2 bg-gray-200 cursor-not-allowed  focus:border-[#ff3003] outline-none"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border-[#591B0C] border-2  focus:border-[#ff3003] outline-none"
                required
              />
              {errors.phone && <p className="text-sm text-red-600 ">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                className="mt-1 block w-full border-[#591B0C] border-2   focus:border-[#ff3003] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full border-[#591B0C] text-sm border-2 py-1 focus:border-[#ff3003] outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
         
          
            <div className="">
              <label className="block text-sm   font-medium text-gray-700">Profile Image</label>
              <Imgupload onUploadComplete={setUploadedImage} onImageKeyChange={setImageKey}/>
              {imageUploadWarning && <p className="text-sm text-red-600">{imageUploadWarning}</p>}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows="8"
                className="mt-1 block w-full h-48 border-[#591B0C] border-2 shadow-sm  focus:border-[#ff3003] outline-none sm:text-sm"
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            
            <button type="submit" className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white">
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
