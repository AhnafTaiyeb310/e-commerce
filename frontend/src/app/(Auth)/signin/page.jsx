'use client'
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useState } from "react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

function page() {
    const [form, setForm] = useState({
      email: "",
      password: "",
    });
    const loginMutation = useLogin();
    const handleChange = (e)=> {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        loginMutation.mutate(form);
        
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        name="email" 
        type="email" 
        value={form.email} 
        onChange={handleChange}/>

        <input 
        name="password" 
        type="password" 
        value={form.password} 
        onChange={handleChange}/>
        <button type="submit">submit</button>
      </form>
      <div className="mt-4 border-t pt-4">
        <GoogleSignInButton />
      </div>
    </div>
  );
}

export default page
