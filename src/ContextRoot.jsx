import { createContext, useState, useEffect, useRef } from "react";

export const ExtensionContext = createContext()

import templateData from "../data.json"

const ContextRoot = ({children}) => {    
    // Local storage
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

    // Dialogs

    // New folder
    const newFolderDialogRef = useRef();
    const stateNewFolderDialog = (state) => {
        if (state) {
        newFolderDialogRef.current.showModal();
        } else {
        newFolderDialogRef.current.close();
        }
    }

    // New folder item
    const newFolderBookmarkDialogRef = useRef();
    const stateNewFolderBookmarkDialog = (state, folder) => {
        if (state) {
            newFolderBookmarkDialogRef.current.showModal();
            setSelectOpenedFolder(folder)
        } else {
            newFolderBookmarkDialogRef.current.close();
        }
    }

    // Edit mode
    const [editMode, setEditMode] = useState(false)

    // data stream
    const [data, setData] = useState(null)

    // Open folder
    const [selectOpenedFolder, setSelectOpenedFolder] = useState({})

    // Browser Engine
    const chosenSearchEngine = (engine, searchTerm) => {
        if (engine.includes('google')) {
            window.location = `https://google.com/search?q=${searchTerm}`;
        } else if (engine.includes('bing')) {
            window.location = `https://bing.com/search?q=${searchTerm}`;
        } else if (engine.includes('ddg')) {
            window.location = `https://duckduckgo.com/?q=${searchTerm}`;
        }
    }
    
    return (
        <ExtensionContext.Provider value={{data, setData, chosenSearchEngine, selectOpenedFolder, setSelectOpenedFolder, stateNewFolderDialog, stateNewFolderBookmarkDialog, newFolderBookmarkDialogRef, newFolderDialogRef, LS_KEY, editMode, setEditMode}}>
            {children}
        </ExtensionContext.Provider>
    )
}

export default ContextRoot