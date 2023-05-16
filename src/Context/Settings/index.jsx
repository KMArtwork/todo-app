import React, { useState } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider (props) {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('difficulty');

  return (
    <SettingsContext.Provider value={{itemsPerPage, setItemsPerPage, hideCompleted, setHideCompleted, sortBy, setSortBy}}>
      {props.children}
    </SettingsContext.Provider>    
  )

}

export default SettingsProvider;