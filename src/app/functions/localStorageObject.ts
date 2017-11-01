export const setLocalStorageObject = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageObject = (key) => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

export const getLocalStorageObjectProperty = (key, property) => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value)[property];
};
