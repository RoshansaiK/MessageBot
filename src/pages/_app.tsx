import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import "../styles/signup.css"; // or your global CSS file

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session);
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
      }
      // You can handle other events here too
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />;
}
