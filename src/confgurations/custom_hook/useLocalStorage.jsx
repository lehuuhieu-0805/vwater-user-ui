import { useState } from "react";

export const useLocalStorage = (key, value) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (err) {
      return value;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log('Error when setValue to LocalStorage -> ', err);
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
