import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle, FaPhoneAlt, FaVideo } from "react-icons/fa";

export default function ChatWindow({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUser(data?.user));
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("timestamp");
      setMessages(data || []);
    };

    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [chatId]);

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#0b141a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#202c33] border-b border-[#2a3942] shadow-sm">
        <div className="flex items-center gap-3 px-4 py-2 bg-[#202c33] rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-[6px] bg-gradient-to-tr from-[#2a3942] to-[#1e2a30] rounded-full shadow-md hover:scale-105 transition-transform duration-300">
            <FaUserCircle className="text-white text-4xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight tracking-wide">
              Roshansai
            </span>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>

        {/* Icon Box with custom styling */}
        <div className="flex items-center gap-2 ml-auto backdrop-blur-sm bg-[#2a3942]/80 border border-[#3a484f] rounded-[12px] shadow-md px-2 py-1">
          {/* Video Call */}
          <button
            className="p-[10px] rounded-xl bg-gradient-to-br from-[#00bfa5] to-[#00796b] text-white hover:brightness-110 transition shadow-sm"
            title="Video Call"
          >
            <FaVideo className="text-lg" />
          </button>

          {/* Voice Call */}
          <button
            className="p-[10px] rounded-xl bg-gradient-to-br from-[#00bfa5] to-[#1e88e5] text-white hover:brightness-110 transition shadow-sm"
            title="Voice Call"
          >
            <FaPhoneAlt className="text-lg" />
          </button>
        </div>

        {/* More Options Button */}
        <button
          className="ml-4 p-2 rounded-full bg-gradient-to-br from-[#757575] to-[#424242] text-white hover:brightness-110 transition shadow-sm"
          title="More"
        >
          <BsThreeDotsVertical className="text-xl" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
        {messages.map((msg) => {
          const isSender = msg.sender_id === currentUser?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              {!isSender && (
                <FaUserCircle className="text-2xl text-gray-400 mr-3 self-end" />
              )}

              <div
                className={`relative flex flex-col max-w-[98%] ${
                  isSender ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`px-8 py-5 text-[18px] font-normal leading-relaxed break-words transition-all duration-200
                  ${
                    isSender
                      ? "bg-[#1f2c3b] text-white rounded-[24px_24px_8px_24px]"
                      : "bg-[#202c33] text-[#e9edef] rounded-[24px_24px_24px_8px]"
                  }`}
                >
                  {msg.content}
                </div>

                {/* Timestamp */}
                <span className="text-[12px] text-gray-400 mt-[6px] pr-2">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
