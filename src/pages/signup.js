import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("Signup failed: " + error.message);

    alert("Signup successful! Check your email to confirm, then log in.");
    router.push("/login");
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h1>Create Account</h1>

        <div>
          <label className="label">Full Name</label>
          <div className="input-wrapper">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Email</label>
          <div className="input-wrapper">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <button type="submit" className="button">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="link">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
