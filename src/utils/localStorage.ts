export const getLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error parsing localStorage item with key "${key}":`, error);
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error serializing value for localStorage item with key "${key}":`, error);
  }
};
