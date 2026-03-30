export const setLocalStorage = (key: string, value: object): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Local storage parse error', error);
      return null;
    }
  }
  return null;
};
