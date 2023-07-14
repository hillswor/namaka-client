"use client";

import SignupForm from "./SignupForm";

export default function Signup() {
  const containerStyles =
    "flex flex-col bg-slate-600 rounded-md max-w-xl mx-6 p-8 mt-16 mb-16 shadow-2xl sm:mx-auto md:mx-auto";

  return (
    <main className={containerStyles}>
      <SignupForm />
    </main>
  );
}
