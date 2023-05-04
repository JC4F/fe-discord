export const getAndParseItemFromLocalStorage = (key: string) => {
  const userData = localStorage.getItem(key);
  if (userData) {
    return JSON.parse(userData);
  }

  return null;
};
