import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'encryption_key';

const getStorage = () => localStorage;

const encrypt = (text: string): string => {
  if (!text) return '';

  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i);
    const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    const encryptedChar = textChar ^ keyChar;
    encrypted += String.fromCharCode(encryptedChar);
  }

  return btoa(encrypted);
};

const decrypt = (encryptedText: string): string => {
  if (!encryptedText) return '';

  try {
    const encrypted = atob(encryptedText);

    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      const encryptedChar = encrypted.charCodeAt(i);
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      const decryptedChar = encryptedChar ^ keyChar;
      decrypted += String.fromCharCode(decryptedChar);
    }

    return decrypted;
  } catch (error) {
    console.error('Failed to decrypt token:', error);
    return '';
  }
};

export const setStorageItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  const storage = getStorage();

  if (typeof value === 'string') {
    storage.setItem(key, encrypt(value));
  } else if (typeof value === 'object') {
    storage.setItem(key, encrypt(JSON.stringify(value)));
  } else {
    storage.setItem(key, encrypt(String(value)));
  }
};

export const getStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  const storage = getStorage();

  const encryptedValue = storage.getItem(key);
  if (!encryptedValue) return null;

  return decrypt(encryptedValue);
};

export const removeStorageItem = (key: string) => {
  if (typeof window === 'undefined') return;
  getStorage().removeItem(key);
};
