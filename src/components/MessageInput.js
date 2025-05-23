import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { FaRegSmile } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { FaPaperclip } from "react-icons/fa6";

export default function MessageInput({ chatId }) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return alert("Login first");

    if (!text.trim()) return;

    await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: data.user.id,
      content: text,
    });

    setText("");
  };

  return (
    <div className="flex items-center px-4 py-2 bg-[#1f2a30] border-t border-[#2a3942] shadow-[0_-2px_10px_rgba(0,0,0,0.4)] rounded-b-xl">
      {/* 🙂 Emoji Icon */}
      <button
        className="text-[#1f2a30] text-xl mr-3 p-2 bg-white hover:bg-gray-100 transition-colors duration-200 rounded-full shadow-lg"
        title="Emoji"
      >
        <FaRegSmile />
      </button>

      {/* 📎 Clip Icon */}
      <button
        className="text-[#1f2a30] text-xl mr-3 p-2 bg-white hover:bg-gray-100 transition-colors duration-200 rounded-full shadow-lg rotate-45"
        title="Attach File"
      >
        <FaPaperclip />
      </button>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 h-[44px] px-5 rounded-2xl bg-[#2a3942] text-white placeholder-gray-400 focus:outline-none text-[15px] border border-[#3a4b53] shadow-inner"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      {/* 🎤 / Send Button */}
      {text.trim() ? (
        <button
          onClick={sendMessage}
          className="ml-3 text-[#1f2a30] text-xl p-3 rounded-full bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg"
          title="Send Message"
        >
          <FiSend />
        </button>
      ) : (
        <button
          className="ml-3 text-[#1f2a30] text-2xl p-3 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          title="Voice Message"
        >
          <IoMdMic />
        </button>
      )}
    </div>
  );
}
