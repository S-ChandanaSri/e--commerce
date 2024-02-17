//const React = require('react');
//const { createContext, useContext, useState } = React;

import React, { createContext, useContext, useState } from 'react';
//const React = require('react');
//const { createContext, useContext, useState } = require('react');


const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [login, setLogin] = useState(false);

  const loginUser = (userData) => {
    setUserData(userData);
    setLogin(true);
    console.log("100",userData)
    console.log("155",userData.userid)
   
  };

  const logoutUser = () => {
    setUserData(null);
    setLogin(false);
  };

  return (
    <GlobalStateContext.Provider value={{ userData, loginUser, logoutUser,login  }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

