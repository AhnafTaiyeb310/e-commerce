'use client'
import { useSignup } from '@/features/auth/hooks/useSignup'
import React, { useState } from 'react'
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

function page() {
  const [form, setForm] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
  });

  const {mutate:signup, isLoading} = useSignup();

  const handleChange = (e)=> {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();
    signup(form)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password1"
          placeholder="password"
          value={form.password1}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="confirm_password"
          value={form.password2}
          onChange={handleChange}
        />
        <button>
          {isLoading ? "Creating an account" : "Create an account"}
        </button>
      </form>
      <div className="mt-4 border-t pt-4">
        <GoogleSignInButton />
      </div>
    </div>
  );
}

export default page
