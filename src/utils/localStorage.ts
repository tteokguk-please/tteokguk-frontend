export const getLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item);
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
