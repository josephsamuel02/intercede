import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  ChevronLeftIcon
} from "@heroicons/react/24/outline";

interface Conversation {
  id: number;
  user: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  senderId: number; // 0 for current user
  text: string;
  time: string;
}

const Messages = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      user: "John Doe",
      avatar: "J",
      lastMessage: "Thank you for your prayers!",
      time: "2m",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "S",
      lastMessage: "See you at the prayer meeting tomorrow",
      time: "1h",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar: "M",
      lastMessage: "God bless you!",
      time: "3h",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      user: "Sarah Williams",
      avatar: "W",
      lastMessage: "Can we schedule a call?",
      time: "Yesterday",
      unread: 1,
      online: false,
    },
  ];

  // Mock messages for the selected conversation
  const mockMessages: Message[] = [
    { id: 1, senderId: 1, text: "Hi! How are you doing today?", time: "10:30 AM" },
    { id: 2, senderId: 0, text: "I'm doing well, thanks for asking! Just finished my morning prayer.", time: "10:32 AM" },
    { id: 3, senderId: 1, text: "That's wonderful to hear. I was just reaching out to share a testimony.", time: "10:33 AM" },
    { id: 4, senderId: 1, text: "Thank you for your prayers!", time: "10:35 AM" },
  ];

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="h-[calc(100vh-4rem)] p-4 flex gap-4 overflow-hidden">
      {/* Left Sidebar - Conversation List */}
      <div className={`w-full md:w-[300px] lg:w-[320px] flex-shrink-0 flex flex-col bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-white/10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Messages</h1>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border-none dark:text-gray-100 placeholder-gray-500 focus:ring-1 focus:ring-[#e68200]"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversationId(conversation.id)}
              className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 ${selectedConversationId === conversation.id ? 'bg-gray-100 dark:bg-white/10' : ''}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#e68200] flex items-center justify-center text-white font-bold text-lg">
                  {conversation.avatar}
                </div>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-[#111]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{conversation.user}</h3>
                  <span className={`text-xs ${conversation.unread > 0 ? 'text-[#e68200] font-medium' : 'text-gray-500'}`}>{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
              </div>

              {conversation.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#e68200] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-medium">{conversation.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Area - Chat Interface */}
      <div className={`flex-1 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col ${!selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversationId(null)}
                  className="md:hidden p-1 -ml-2 text-gray-600 dark:text-gray-300"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 rounded-full bg-[#e68200] flex items-center justify-center text-white font-bold">
                  {selectedConversation.avatar}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">{selectedConversation.user}</h2>
                  <p className="text-xs text-green-500 font-medium">{selectedConversation.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <button className="hover:text-[#e68200] transition-colors"><VideoCameraIcon className="w-6 h-6" /></button>
                <button className="hover:text-[#e68200] transition-colors"><PhoneIcon className="w-5 h-5" /></button>
                <button className="hover:text-[#e68200] transition-colors"><MagnifyingGlassIcon className="w-5 h-5" /></button>
                <button className="hover:text-[#e68200] transition-colors"><EllipsisVerticalIcon className="w-6 h-6" /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/image/background-map.png')] bg-cover bg-center dark:bg-none">
              {/* Date separator example */}
              <div className="flex justify-center">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">Today</span>
              </div>

              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 0 ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.senderId === 0
                    ? 'bg-[#e68200] text-white rounded-tr-none'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-tl-none'
                    }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`text-[10px] mt-1 text-right ${msg.senderId === 0 ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <button className="text-gray-500 hover:text-[#e68200] transition-colors">
                  <FaceSmileIcon className="w-6 h-6" />
                </button>
                <button className="text-gray-500 hover:text-[#e68200] transition-colors">
                  <PaperClipIcon className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[#e68200] transition-colors text-gray-900 dark:text-white placeholder-gray-500"
                />
                <button
                  disabled={!messageInput.trim()}
                  className="p-2 bg-[#e68200] text-white rounded-full hover:bg-[#cc7400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5 transform -rotate-45 translate-x-0.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400">
            <div className="w-32 h-32 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
              <img src="/image/logo.png" alt="Logo" className="w-16 h-16 opacity-50 grayscale" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Intercede Web</h2>
            <p className="max-w-md">
              Send and receive messages with your prayer groups and community friends.
              Select a conversation to start chatting.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 w-full max-w-xs flex items-center justify-center gap-2 text-sm">
              <span className="h-3 w-3 bg-green-500 rounded-full"></span>
              End-to-end encrypted
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
