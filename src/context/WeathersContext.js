import { createContext, useState } from "react";

export const WeathersContext = createContext({
  weathers: [],
  setWeathers: () => {},
});

export const WeathersProvider = ({ children }) => {
  const [weathers, setWeathers] = useState([]);
  const value = { weathers, setWeathers };

  return (
    <WeathersContext.Provider value={value}>
      {children}
    </WeathersContext.Provider>
  );
};
