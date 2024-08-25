import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { saveItem, removeSavedItem } from '../utils/offlineStorage';

export default function SaveButton({ item }) {
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();

  const saveMutation = useMutation(saveItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('savedItems');
      setIsSaved(true);
    },
  });

  const removeMutation = useMutation(removeSavedItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('savedItems');
      setIsSaved(false);
    },
  });

  const handleSave = async () => {
    if (isSaved) {
      removeMutation.mutate(item.id);
    } else {
      saveMutation.mutate(item);
    }
  };

  return (
    <button
      onClick={handleSave}
      className={`px-4 py-2 rounded-lg ${
        isSaved 
          ? 'bg-primary-light text-white dark:bg-primary-dark' 
          : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
      }`}
    >
      {isSaved ? 'Saved' : 'Save'}
    </button>
  );
}