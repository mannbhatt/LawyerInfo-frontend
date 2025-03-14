import { Suspense } from "react";
import ResetPassword from '../components/resetPassword'; 

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
