import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Download, Image as ImageIcon } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'chat_image.jpg';
    link.click();
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
      <ChatHeader />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              className={`flex items-end gap-3 ${message.senderId === authUser._id ? 'flex-row-reverse' : ''}`}
            >
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
                className="size-10 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className={`max-w-[70%] ${message.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
                {message.image && (
                  <div className="relative group mb-2">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[250px] rounded-lg shadow-md cursor-pointer"
                      onClick={() => setExpandedImage(message.image)}
                    />
                    <button 
                      onClick={() => downloadImage(message.image)}
                      className="absolute top-2 right-2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Download className="size-4 text-gray-700" />
                    </button>
                  </div>
                )}
                {message.text && (
                  <div 
                    className={`
                      inline-block px-4 py-2 rounded-2xl 
                      ${message.senderId === authUser._id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-800'}
                    `}
                  >
                    {message.text}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messageEndRef} />
      </motion.div>

      <MessageInput />

      {expandedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-8"
          onClick={() => setExpandedImage(null)}
        >
          <motion.img 
            src={expandedImage} 
            alt="Expanded" 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
          <button 
            onClick={() => downloadImage(expandedImage)}
            className="absolute top-4 right-4 bg-white/80 p-3 rounded-full"
          >
            <Download className="size-6 text-gray-700" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ChatContainer;