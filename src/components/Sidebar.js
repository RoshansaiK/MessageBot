import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { FaUserCircle } from "react-icons/fa";
import {
  FiUser,
  FiEdit3,
  FiFilter,
  FiUsers,
  FiMessageCircle,
  FiSettings,
  FiClock,
  FiLogOut,
  FiMenu,
  FiHome,
} from "react-icons/fi";

const Sidebar = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("chats")
      .select("*")
      .then(({ data }) => {
        const realChats = data || [];
        const placeholders = [];

        if (realChats.length < 9) {
          for (let i = realChats.length; i < 9; i++) {
            placeholders.push({
              id: `mock-${i}`,
              name: `Mock Chat ${i + 1}`,
              avatar_url: null,
              last_message: "Hi",
              type: "individual",
              isMock: true,
            });
          }
        }

        const groupChat = {
          id: "group-chat",
          name: "Periscope Team Chat",
          last_message: "Test message",
          type: "group",
          tags: ["Demo", "internal"],
          muted: false,
          online: true,
          members: ["Roshan", "Priynak", "Aditya", "Sanjana"],
        };

        setChats([groupChat, ...realChats, ...placeholders]);
      });
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#111b21]">
      {/* Left Icon Sidebar */}
      <div className="flex flex-col justify-between w-20 bg-white border-r border-gray-200 shadow-md py-4">
        {/* Top menu icon and account avatar with updates */}
        <div className="flex flex-col items-center">
          {/* Menu Icon */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Menu"
          >
            <FiMenu size={18} />
            {/* Vertical line below */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] h-5 bg-gray-300"></div>
          </button>
          <br />
          {/* Account Avatar with notification dot */}
          <div className="relative cursor-pointer my-6 text-white">
            <FaUserCircle size={36} className="text-white" />{" "}
            {/* Avatar icon */}
            {/* Notification red dot */}
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
          <br />
          {/* Dashboard Icon */}
          <button
            className="relative p-3 hover:bg-gray-100 rounded-full transition mb-6"
            aria-label="Dashboard"
          >
            <FiHome size={18} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] h-5 bg-gray-300"></div>
          </button>
          <br />
          {/* Messages Icon */}
          <button
            className="relative p-3 hover:bg-gray-100 rounded-full transition mb-6"
            aria-label="Messages"
          >
            <FiMessageCircle size={18} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] h-5 bg-gray-300"></div>
          </button>
          <br />
          {/* Recent Icon */}
          <button
            className="relative p-3 hover:bg-gray-100 rounded-full transition mb-6"
            aria-label="Recent"
          >
            <FiClock size={18} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] h-5 bg-gray-300"></div>
          </button>
          <br />
          {/* Contacts Icon */}
          <button
            className="p-3 hover:bg-gray-100 rounded-full transition"
            aria-label="Contacts"
          >
            <FiUsers size={18} />
          </button>
        </div>
        <br />
        {/* Bottom icons */}
        <div className="flex flex-col items-center">
          <button
            className="relative p-3 hover:bg-gray-100 rounded-full transition mb-6"
            aria-label="Settings"
          >
            <FiSettings size={18} />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] h-5 bg-gray-300"></div>
          </button>
          <br />
          <button
            className="p-3 hover:bg-red-100 rounded-full transition text-red-600 hover:text-red-700"
            aria-label="Logout"
            onClick={() => alert("Logout clicked")}
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="relative w-[360px] bg-[#111b21] text-white flex flex-col border-r border-[#2a3942]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a3942]">
          <h2 className="text-xl font-semibold">Chats</h2>
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-full hover:bg-[#2a2f32] transition"
              aria-label="New chat"
            >
              <FiEdit3 className="text-white text-lg" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-[#2a2f32] transition"
              aria-label="Filter chats"
            >
              <FiFilter className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 bg-[#111b21] flex justify-center">
          <div className="relative w-[85%] max-w-[280px]">
            <input
              type="text"
              placeholder="Search or start chat"
              className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-[#2a2f32]/90 text-sm text-white placeholder-gray-400 border border-[#3a464b] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#2a3942] scrollbar-track-transparent px-2 pb-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => !chat.isMock && onSelectChat(chat.id)}
              className="flex items-center gap-4 px-4 py-3 hover:bg-[#2a2f32] cursor-pointer rounded-lg transition-all duration-200 group"
            >
              {/* Icon */}
              <div className="min-w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
                {chat.type === "group" ? (
                  <FiUsers className="text-[white] text-xl" />
                ) : (
                  <FiUser className="text-[white] text-xl" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 overflow-hidden">
                <div className="font-medium text-sm truncate">{chat.name}</div>
                <div className="text-xs text-gray-400 truncate">
                  {chat.type === "group"
                    ? `${chat.members?.join(", ").slice(0, 40)}`
                    : chat.last_message || "Hai Hai"}
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-500 whitespace-nowrap">
                12:30 PM
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Main chat content placeholder */}
      <div className="flex-1 bg-[#121b22]">
        {/* This would be the chat conversation area */}
      </div>
    </div>
  );
};

export default Sidebar;
