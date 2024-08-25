import { motion } from 'framer-motion';

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        className="w-16 h-16 border-t-4 border-primary-light dark:border-primary-dark rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}