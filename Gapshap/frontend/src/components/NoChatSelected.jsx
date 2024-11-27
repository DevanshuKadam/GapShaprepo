import { Mail, MessageCircle, Inbox } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-6">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <div className="absolute -top-2 -right-2 size-4 bg-red-500 rounded-full animate-ping" />
          </motion.div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800">Welcome to गपशप!</h2>
        <p className="text-gray-600 text-lg">
          Select a conversation from the sidebar to start chatting. Your messages are waiting!
        </p>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-6"
        >
       
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NoChatSelected;