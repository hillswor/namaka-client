"use client";

import LoginForm from "./LoginForm";

export default function Login() {
  const containerStyles =
    "flex flex-col bg-slate-600 rounded-md max-w-xl mx-6 p-8 mt-16 mb-16 shadow-2xl sm:mx-auto md:mx-auto";

  return (
    <main className={containerStyles}>
      <LoginForm />
    </main>
  );
}
