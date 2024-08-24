
import { openDB } from 'idb';

const dbPromise = openDB('hn-enhanced', 1, {
  upgrade(db) {
    db.createObjectStore('savedItems', { keyPath: 'id' });
  },
});

export async function saveItem(item) {
  const db = await dbPromise;
  await db.put('savedItems', item);
}

export async function getSavedItems() {
  const db = await dbPromise;
  return db.getAll('savedItems');
}

export async function removeSavedItem(id) {
  const db = await dbPromise;
  await db.delete('savedItems', id);
}
