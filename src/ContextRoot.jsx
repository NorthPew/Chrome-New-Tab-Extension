import { createContext, useState, useEffect, useRef } from "react";
export const ExtensionContext = createContext()

const ContextRoot = ({children}) => {    
    
    // New folder
    const newFolderDialogRef = useRef();
    const stateNewFolderDialog = (state) => {
        if (state) {
        newFolderDialogRef.current.showModal();
        } else {
        newFolderDialogRef.current.close();
        }
    }

    return (
        <ExtensionContext.Provider value={{stateNewFolderDialog, newFolderDialogRef}}>
            {children}
        </ExtensionContext.Provider>
    )
}

export default ContextRoot