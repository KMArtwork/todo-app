import React, { useEffect, useState } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider (props) {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('difficulty');

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem('toDoSettings', JSON.stringify({
      itemsPerPage: itemsPerPage,
      hideCompleted: hideCompleted,
      sortBy: sortBy.toLowerCase()
    }))
  }

  useEffect(() => {
    if (localStorage.getItem('toDoSettings')){
      let savedSettings = JSON.parse(localStorage.getItem('toDoSettings'));
      setItemsPerPage(savedSettings.itemsPerPage);
      setHideCompleted(savedSettings.hideCompleted);
      setSortBy(savedSettings.sortBy);
    }
  }, [])

  return (
    <SettingsContext.Provider value={{itemsPerPage, setItemsPerPage, hideCompleted, setHideCompleted, sortBy, setSortBy, saveSettingsToLocalStorage}}>
      {props.children}
    </SettingsContext.Provider>    
  )

}

export default SettingsProvider;