"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';
import Link from "next/link";
import { useToast } from "../components/ui/toast"
import { User, Mail, Lock } from "lucide-react"; // Import icons from lucide-react
const RegisterForm = () => {
  const { success, error } = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New field
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // To store validation errors

  const validateForm = () => {
    let newErrors = {};
    
    if (!username) {
      newErrors.username = "Username is required.";
    } else if (username.length < 3 || username.length > 30) {
      newErrors.username = "Username must be between 3 and 30 characters long.";
    } else if (!/^[a-z0-9_.-]+$/.test(username)) {
      newErrors.username = "Username can only contain lowercase letters, numbers, underscores, dots, and hyphens.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

   
  
  
    if (!email) {
      newErrors.email = "Email is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    const isValid = validateForm()

    if (!isValid) {
      error("Please fix the errors in the form")
      return
    }
    

    setIsLoading(true);

    const userData = { email, password, username };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        success("Registration successful! Redirecting...");
         
        setTimeout(() => (window.location.href = "/onboarding"), 2000);
      } else {
        if(data.message.includes("Username")){
        setMessage("This Username is already taken.Try another one.");
      }
      else if(data.message.includes("Email")){
      setMessage("This Email Id is already registered.Try logging in.");
    }else{
      setMessage(data.message || "Registration failed.")
    }
    }
    } catch (error) {
      console.error("Registration error:", error);
      error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold mb-6 text-[#591B0C] text-center">Sign Up your account</h2>
      
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <User className="w-4 h-4 mr-1 text-[#591B0C]" />
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <Mail className="w-4 h-4 mr-1 text-[#591B0C]" />
              Email Address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <Lock className="w-4 h-4 mr-1 text-[#591B0C]" />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none  sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className=" text-sm font-medium text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-1 text-[#591B0C]" />
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none  sm:text-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 mt-2 border-2  w-full border-transparent shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          
          <div className="text-center mt-4">
    <p className="text-sm text-gray-600">
      Already have an account?  
      <a href="/login" className="text-blue-600 hover:underline ml-1">
        Log in here
      </a>
    </p>
  </div>
                
        </div>

      </form>
      {message && (
        <div className={`mt-4 text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
