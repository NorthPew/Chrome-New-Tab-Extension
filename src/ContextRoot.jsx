import { createContext, useState, useEffect, useRef } from "react";

export const ExtensionContext = createContext()

import templateData from "../data.json"

const ContextRoot = ({children}) => {    

    const LS_KEY = "NewTabExtension_LSK"
    
    if (!localStorage.getItem(LS_KEY)) {
            // If user is using the preview or using the extension in chrome directly
        if (chrome.storage) {
            console.log("Using Chrome storage local!");
            chrome.storage.local.get(['key'], function(result) {
                // If 'key' doesn't exist in chrome.storage.local
                if (result.key === undefined) {
                    // Set 'key' in chrome.storage.local
                    chrome.storage.local.set({ key: templateData }, function() {
                        console.log('Value is set to ' + templateData);
                    });
                }
            });
        } else {
            console.log("Using local storage!");
            localStorage.setItem(LS_KEY, JSON.stringify(templateData))
        }
    }

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
        <ExtensionContext.Provider value={{stateNewFolderDialog, newFolderDialogRef, LS_KEY}}>
            {children}
        </ExtensionContext.Provider>
    )
}

export default ContextRoot