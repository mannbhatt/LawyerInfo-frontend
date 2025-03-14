"use client";

import { useState } from "react";
import {Mail} from 'lucide-react'
import { useToast } from "../components/ui/toast";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const {success,error}=useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
    success(data.message)
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold mb-6 text-[#591B0C] text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
       
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="flex text-sm font-medium text-gray-700 items-center">
              <Mail className="w-4 h-4 mr-1 text-[#591B0C]" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-2 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none sm:text-sm"
              required
            />
          </div>
        </div>
        <div>{message && <p className="items-center mt-1 text-sm text-red-600">{message}</p>}</div>
        <div className="flex flex-col items-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 mt-2 border border-transparent w-full shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <p className="mt-4 text-sm text-gray-600">
   Remembered your password ?
    <a href="/login" className="text-blue-600 hover:underline ml-1">
      Sign In here
    </a>
  </p>
        </div>
      </form>
    </div>
  );
}
