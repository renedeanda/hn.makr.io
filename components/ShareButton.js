
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ShareButton({ item }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        });
        setShared(true);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(item.url || `https://news.ycombinator.com/item?id=${item.id}`);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded ml-2 ${
        shared ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
      }`}
      onClick={handleShare}
    >
      {shared ? 'Shared!' : 'Share'}
    </motion.button>
  );
}
