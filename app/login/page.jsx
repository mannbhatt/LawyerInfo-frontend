"use client"
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useRouter} from "next/navigation";

import { useAuth } from "../Provider";
export default  function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); 
    }
  }, [isAuthenticated, router]);

  return (
    <main>

     
      <LoginForm />
    
    </main>
  );
}