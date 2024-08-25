import { openDB } from 'idb';

let dbPromise;

if (typeof window !== 'undefined') {
  dbPromise = openDB('hn-enhanced', 1, {
    upgrade(db) {
      db.createObjectStore('savedItems', { keyPath: 'id' });
    },
  });
}

export async function saveItem(item) {
  if (!dbPromise) return null;
  const db = await dbPromise;
  return db.put('savedItems', item);
}

export async function getSavedItems() {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return db.getAll('savedItems');
}

export async function removeSavedItem(id) {
  if (!dbPromise) return null;
  const db = await dbPromise;
  return db.delete('savedItems', id);
}

export async function isSaved(id) {
  if (!dbPromise) return false;
  const db = await dbPromise;
  const item = await db.get('savedItems', id);
  return !!item;
}