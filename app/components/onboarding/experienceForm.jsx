import React, { useState ,useEffect} from 'react';
import 'tailwindcss/tailwind.css';
import { toast } from 'react-toastify';

const ExperienceForm = ({ nextStep, thisStep, skipStep, userId }) => {
  const [experienceData, setExperienceData] = useState({
    userId: userId,
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [companies, setCompanies] = useState([]);
  const [customCompany, setCustomCompany] = useState(""); // For user-entered company
  const [showInput, setShowInput] = useState(false); // Toggle input field
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
      const data = await response.json();
      if (data.success) setCompanies(data.companies);
      else console.error("Failed to fetch companies");
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If user selects "Other," keep customCompany field
    if (name === "company" && value !== "Other") {
      setCustomCompany(""); // Reset if not "Other"
    }

    setExperienceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomCompanyChange = (e) => {
    setCustomCompany(e.target.value);
  };
 
  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();

    if (!experienceData.company?.trim() || experienceData.company === "Other") {
      if (!experienceData.company?.trim()) {
        newErrors.company = "Company name is required.";
      } else if (customCompany === "") {
        newErrors.company = "Write a valid company name.";
      }
    }
    
    if (!experienceData.position.trim()) newErrors.position = "Position is required.";
    if (!experienceData.startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (new Date(experienceData.startDate) > currentDate) {
      newErrors.startDate = "Start date cannot be in the future.";
    }
    if (experienceData.endDate) {
      if (new Date(experienceData.endDate) < new Date(experienceData.startDate)) {
        newErrors.endDate = "End date cannot be before start date.";
      }
    }
    if (!experienceData.description?.trim()) newErrors.description = "Short description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitExperienceData = async (redirectAfterSubmit) => {
    if (!validateForm()) return;
    const token = localStorage.getItem("authToken");
   
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
    const finalCompany = experienceData.company === "Other" ? customCompany : experienceData.company;
    
    
    if (!finalCompany) {
      alert("Please select or enter a company.");
      return;
    }
    const finalData = {
      userId: experienceData.userId,
      company: finalCompany, 
      position: experienceData.position,
      startDate: experienceData.startDate,
      endDate: experienceData.endDate,
      description: experienceData.description,
    };
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Experience details added successfully!");

        toast.success("Experience added successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (redirectAfterSubmit) {
          nextStep(); 
         
        } else {
          
          
          setExperienceData({ 
            userId: userId,
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
          });
          thisStep(); 
        }
        setLoading(false);
        
      } else {
        toast.error(data.message || "Failed to add experience.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSkip = () => {
    skipStep();
  };

 

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg  border border-gray-200">
       <h2 className="text-4xl text-center font-bold mb-6 text-[#591B0C]">Create Your Profile</h2>
      <div className="mb-6 bg-[#ffefdb]  p-4">
        <div className="w-full bg-[#ffdbb5] rounded-full h-2.5">
          <div className="bg-[#591B0C] h-2.5 rounded-full" style={{ width: '44%' }}></div>
        </div>
        <p className="text-center text-sm mt-2 text-[#591B0C]">Step 4 of 9: Experience Information</p>
      </div>
      <form  className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${experienceData.company === "Other" ? "hidden" :""}`}>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <select
          name="company"
          value={experienceData.company}
          onChange={handleInputChange}
          className="mt-1 block w-full h-9 border-[#591B0C] border-2 focus:border-[#ff3003] outline-none"
          required
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company.name}>
              {company.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
      </div>

      {/* Show text field only if "Other" is selected */}
      {experienceData.company === "Other" && (
        <div><label className="block text-sm font-medium text-gray-700">Enter Company Name</label>
          
          <input
            type="text"
            name="customCompany"
            value={customCompany}
            onChange={handleCustomCompanyChange}
            className="mt-1 block w-full h-9 border-[#591B0C] border-2 focus:border-[#ff3003] outline-none"
            required
          />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
        </div>
        
      )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position
              <input
                type="text"
                name="position"
                value={experienceData.position}
                onChange={handleInputChange}
                className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
                required
              />
            </label>
            {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
              <input
                type="date"
                name="startDate"
                value={experienceData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
                required
              />
            </label>
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date (or expected)
              <input
                type="date"
                name="endDate"
                value={experienceData.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              />
            </label>
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
            <textarea
              name="description"
              value={experienceData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full h-20 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] outline-none sm:text-sm"
              required
            />{errors.description && <p className="text-red-500">{errors.description}</p>}
          </label>
          
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white"
          >
            Skip
          </button>
          <div className='flex  justify-between w-[24%]'>
          <button
            type="button"
            onClick={() => submitExperienceData(false)}
            className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white text-sm"
          >
           {loading ? "Saving..." : "Add More"}
          </button>
          <button
            type="button"
            onClick={() => submitExperienceData(true)}
            className="px-6 py-2 bg-[#591B0C] hover:bg-[#ff3003] text-white "
          >
           {loading ? "Saving..." : "Next"}
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;

