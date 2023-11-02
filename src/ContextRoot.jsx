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

    // New folder bookmark
    const newFolderBookmarkDialogRef = useRef();
    const stateNewFolderBookmarkDialog = (state, folder) => {
        if (state) {
            newFolderBookmarkDialogRef.current.showModal();
            setSelectOpenedFolder(folder)
        } else {
            newFolderBookmarkDialogRef.current.close();
        }
    }

    // Delete folder
    const deleteFolderDialogRef = useRef();
    const stateDeleteFolderDialog = (state, folder) => {
        if (state) {
            deleteFolderDialogRef.current.showModal()
            setSelectOnDeleteFolder(folder)
        }
         else {
            deleteFolderDialogRef.current.close()
         }
    }

    // Edit mode
    const [editMode, setEditMode] = useState(false)

    // Folder data stream
    const [foldersData, setFoldersData] = useState(null)

    //Options data stream
    const [optionsData, setOptionsData] = useState(null)

    // Opened folder
    const [selectOpenedFolder, setSelectOpenedFolder] = useState({})

    const [selectOnDeleteFolder, setSelectOnDeleteFolder] = useState({})

    return (
        <ExtensionContext.Provider value={{foldersData, setFoldersData, optionsData, setOptionsData, selectOpenedFolder, setSelectOpenedFolder, selectOnDeleteFolder, setSelectOnDeleteFolder, stateNewFolderDialog, stateNewFolderBookmarkDialog, stateDeleteFolderDialog, newFolderBookmarkDialogRef, newFolderDialogRef, deleteFolderDialogRef, LS_KEY, editMode, setEditMode}}>
            {children}
        </ExtensionContext.Provider>
    )
}

export default ContextRoot