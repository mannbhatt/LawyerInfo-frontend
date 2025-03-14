"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "../components/ui/toast"
import { toast } from 'react-toastify'; 
import { Mail, Lock } from "lucide-react"; // Import icons from lucide-react

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { success, Error } = useToast()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const userData = { email, password }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("authToken", data.token)
        
        success("Login successful!");
        router.push("/")
      } else {
       
      //  Error("Login failed. Please try again.");
        setError(data.error || "Login failed. Please try again.")
      }
    } catch (error) {
      
     // Error("An error occurred. Please try again.");
       
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg  border border-gray-200">
      <h2 className="text-4xl font-bold mb-6 text-[#591B0C] text-center">Sign in to your account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <Mail className="w-4 h-4 mr-1 text-[#591B0C]" />
              Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none 
                sm:text-sm"
                required
              />
            
          </div>
          <div>
            <label className="flex text-sm font-medium text-gray-700  items-center">
              <Lock className="w-4 h-4 mr-1 text-[#591B0C]" />
              Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full h-9  border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none sm:text-sm"
                required
              />
            
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <div className="flex flex-col items-center mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 mt-2 border border-transparent w-full shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
<div className="flex flex-col md:flex-row lg:flex-row gap-2 mt-4">
          <p className="text-sm text-gray-600">
    Don't have an account?  
    <a href="/register" className="text-blue-600 hover:underline ml-1">
      Sign up here
    </a>
  </p>
  <p className="text-sm text-gray-600">
   Forgot your password? 
    <a href="/forgot-password" className="text-blue-600 hover:underline ml-1">
      Reset it here
    </a>
  </p>
  </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
