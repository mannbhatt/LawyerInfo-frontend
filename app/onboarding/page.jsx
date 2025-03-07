"use client";
import React, { useState, useEffect } from "react";
import ProfileForm from "../components/onboarding/profileForm";
import EducationForm from "../components/onboarding/educationForm";
import ExperienceForm from "../components/onboarding/experienceForm";
import AboutForm from "../components/onboarding/aboutForm";
import AchievementForm from "../components/onboarding/achievementForm";
import ContributionForm from "../components/onboarding/contributionForm";
import SkillsForm from "../components/onboarding/skillsForm";
import SocialLinksForm from "../components/onboarding/socialLinksForm"; 
import { jwtDecode } from "jwt-decode";

export default function Details() {
  const [step, setStep] = useState(2);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
   
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        setUserId(decodedToken["id"]);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };
const thisStep=()=>{
  setStep(step);
}
  const skipStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
     
      {step === 1 && <ProfileForm userId={userId} nextStep={nextStep}  skipStep={skipStep} />}
      {step === 2 && <EducationForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep} />}
      {step === 3 && <ExperienceForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep} />}
      {step === 4 && <AboutForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep}/>}
      {step === 5 && <SkillsForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep}/>}
      {step === 6 && <AchievementForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep}/>}
      {step === 7 && <ContributionForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep}/>}
      {step === 8 && <SocialLinksForm userId={userId} nextStep={nextStep} thisStep={thisStep} skipStep={skipStep}/>}
      
    </div>
  );
}
