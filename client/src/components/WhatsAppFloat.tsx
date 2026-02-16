import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_CONFIG } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={CONTACT_CONFIG.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
}
