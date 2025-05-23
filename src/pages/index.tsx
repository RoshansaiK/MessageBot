// src/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/signup");
      else router.push("/chat");
    });
  }, []);

  return <p className="text-center mt-20">Redirecting...</p>;
}
