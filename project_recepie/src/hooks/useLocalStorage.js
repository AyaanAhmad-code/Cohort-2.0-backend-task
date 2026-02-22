import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage operations with state synchronization
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get stored value from localStorage
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function for same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

/**
 * Get all recipes from localStorage
 */
export const getRecipesFromStorage = () => {
  try {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
  } catch (error) {
    console.error('Error reading recipes from localStorage:', error);
    return [];
  }
};

/**
 * Save recipes to localStorage
 */
export const saveRecipesToStorage = (recipes) => {
  try {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    return true;
  } catch (error) {
    console.error('Error saving recipes to localStorage:', error);
    return false;
  }
};

/**
 * Clear all recipes from localStorage
 */
export const clearRecipesStorage = () => {
  try {
    localStorage.removeItem('recipes');
    return true;
  } catch (error) {
    console.error('Error clearing recipes from localStorage:', error);
    return false;
  }
};

/**
 * Export recipes to JSON file
 */
export const exportRecipesToJSON = (recipes) => {
  try {
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recipes_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting recipes:', error);
    return false;
  }
};

/**
 * Import recipes from JSON file
 */
export const importRecipesFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const recipes = JSON.parse(e.target.result);
        if (Array.isArray(recipes)) {
          saveRecipesToStorage(recipes);
          resolve(recipes);
        } else {
          reject(new Error('Invalid JSON format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};
