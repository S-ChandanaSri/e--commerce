
import React, { createContext, useContext, useState } from 'react';
//const React = require('react');
//const { createContext, useContext, useState } = require('react');


const ThirdGlobalStateContext = createContext();

export const useThirdGlobalState = () => useContext(ThirdGlobalStateContext);

export const ThirdGlobalStateProvider = ({ children }) => {
  const [userDta, setUserDta] = useState(null);
  const [register, setRegister] = useState(false);

  const registerUser = (userDta) => {
    setUserDta(userDta);
    setRegister(true);
    console.log("100",userDta)
   
  };

  const registerlogoutUser = () => {
    setUserDta(null);
    setRegister(false);
  };

  return (
    <ThirdGlobalStateContext.Provider value={{ userDta, registerUser, registerlogoutUser,register  }}>
      {children}
    </ThirdGlobalStateContext.Provider>
  );
};


