import React from "react";

// hook to store data in local storage, given a key and default value
// returns an array with the value and a function to update the value
const useLocalStorage = (key, defaultValue) => {
  // get the value from local storage
  const [value, setValue] = React.useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  // update the value in local storage
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;