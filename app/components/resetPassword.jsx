"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "../components/ui/toast";
export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const {success,error}=useToast();
  useEffect(() => {
    if (!token) {
      setMessage("Invalid reset link.");
      error("Invalid reset link")
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
    
    setLoading(false);

    if (res.ok) {
        success(data.message)
      setTimeout(() => router.push("/login"), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold mb-6 text-[#591B0C] text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {message && <p className="mt-1 text-sm text-red-600">{message}</p>}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="flex text-sm font-medium text-gray-700 items-center">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 px-2 block w-full h-9 border-[#591B0C] border-2 shadow-sm focus:border-[#ff3003] focus:ring-[#ff3003] outline-none sm:text-sm"
                required
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 mt-2 border border-transparent w-full shadow-sm text-sm font-medium text-white bg-[#591B0C] hover:bg-[#ff3003] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3003]"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
