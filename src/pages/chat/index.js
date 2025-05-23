import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data: chats } = await supabase.from("chats").select("*").limit(1);
      if (chats?.length > 0) {
        setSelectedChat(chats[0].id);
      } else {
        const { data: newChat } = await supabase
          .from("chats")
          .insert({ name: "Roshansai" })
          .select()
          .single();
        setSelectedChat(newChat.id);
      }
    };

    init();
  }, [router]); // added router to dependencies

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSelectChat={setSelectedChat} />
      <div className="flex flex-col w-3/4">
        {selectedChat && <ChatWindow chatId={selectedChat} />}
        {selectedChat && <MessageInput chatId={selectedChat} />}
      </div>
    </div>
  );
}
