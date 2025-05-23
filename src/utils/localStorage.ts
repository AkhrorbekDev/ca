export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string): string => {
  return localStorage.getItem(key) ?? "";
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};