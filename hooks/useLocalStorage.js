import { useState } from 'react';

//Try-catch untuk mencegah error saat akses localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {

    // Coba ambil data dari localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {

    // Jika error, log dan return nilai default
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {

        // Simpan ke state dan localStorage
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
        // Log error jika gagal menyimpan
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;