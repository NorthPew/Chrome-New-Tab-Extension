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

    // Edit folder
    const editFolderDialogRef = useRef();
    const stateEditFolderDialog = (state, folder) => {
        if (state) {
            editFolderDialogRef.current.showModal()
            setSelectOnEditFolder(folder)
        } else {
            editFolderDialogRef.current.close()
        }
    }


    // Adding a new (empty) folder
    const addNewFolder = (newFolder) => {
        // Update foldersData state
        setFoldersData(prevFolders => [...prevFolders, newFolder]);
      
        // Save updated foldersData to chrome.storage or localStorage
        if (chrome.storage) {
          chrome.storage.local.set({ key: { folders: [...foldersData.folders, newFolder] } });
        } else {
          localStorage.setItem(LS_KEY, JSON.stringify({ folders: [...foldersData, newFolder] }));
        }
      }
      

      const deleteFolder = (folderIdToDelete) => {
        // Filter out the folder to delete
        const updatedFolders = foldersData.filter(folder => folder.id !== folderIdToDelete);
      
        // Update foldersData state
        setFoldersData(updatedFolders);
      
        // Get current data from chrome.storage or localStorage
        let currentData;
        if (chrome.storage) {
          chrome.storage.local.get('key', (result) => {
            currentData = result.key;
          });
        } else {
          currentData = JSON.parse(localStorage.getItem(LS_KEY));
        }
      
        // Update the folders property of the current data
        currentData.folders = updatedFolders;
      
        // Save updated data to chrome.storage or localStorage
        if (chrome.storage) {
          chrome.storage.local.set({ key: currentData });
        } else {
          localStorage.setItem(LS_KEY, JSON.stringify(currentData));
        }
      }

    // Edit mode
    const [editMode, setEditMode] = useState(false)

    // Folder data stream
    const [foldersData, setFoldersData] = useState(null)

    //Options data stream
    const [optionsData, setOptionsData] = useState(null)

    // Select the opened folder
    const [selectOpenedFolder, setSelectOpenedFolder] = useState({})

    // Folder to select in order to delete
    const [selectOnDeleteFolder, setSelectOnDeleteFolder] = useState({})

    // Select the folder to edit
    const [selectOnEditFolder, setSelectOnEditFolder] = useState({})

    return (
        <ExtensionContext.Provider value={{addNewFolder, deleteFolder, foldersData, setFoldersData, optionsData, setOptionsData, selectOpenedFolder, setSelectOpenedFolder, selectOnDeleteFolder, setSelectOnDeleteFolder, selectOnEditFolder, setSelectOnEditFolder, stateEditFolderDialog, stateNewFolderDialog, stateNewFolderBookmarkDialog, stateDeleteFolderDialog, newFolderBookmarkDialogRef, newFolderDialogRef, deleteFolderDialogRef, editFolderDialogRef, LS_KEY, editMode, setEditMode}}>
            {children}
        </ExtensionContext.Provider>
    )
}

export default ContextRoot