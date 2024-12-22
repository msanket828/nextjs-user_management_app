"use client";
import { addNewUserFormInitialState } from "@/utils";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentEditedUserId, setCurrentEditedUserId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [addNewUserFormData, setAddNewUserFormData] = useState(
    addNewUserFormInitialState
  );

  return (
    <UserContext.Provider
      value={{
        currentEditedUserId,
        setCurrentEditedUserId,
        openPopup,
        setOpenPopup,
        addNewUserFormData,
        setAddNewUserFormData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
