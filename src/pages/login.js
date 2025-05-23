import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert("Login failed: " + error.message);

    // Fetch profile data (handle error or remove unused variable)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", loginData.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError.message);
    }

    if (!profile && name) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: loginData.user.id,
          name,
        },
      ]);
      if (insertError) {
        console.error("Profile insert error:", insertError.message);
      }
    }

    router.push("/chat");
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleLogin} className="signup-form">
        <h1>Log In</h1>

        <div>
          <label className="label">Name</label>
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
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
