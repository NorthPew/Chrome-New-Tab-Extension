import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { ExtensionContext } from "../ContextRoot"

const Dialog = styled.dialog`
  border-radius: 15px;
  border: .5px solid #000;
  padding: .75em;
`

export function NewFolderBookmarkDialog() {

    const {stateNewFolderBookmarkDialog, newFolderBookmarkDialogRef, selectOpenedFolder, LS_KEY} = useContext(ExtensionContext)

    const [newFolderBookmarkTitle, setNewFolderBookmarkTitle] = useState("")
    const [newFolderBookmarkIcon, setNewFolderBookmarkIcon] = useState("")
    const [newFolderBookmarkLink, setNewFolderBookmarkLink] = useState("")

    function handleOnChangeNewFolderItemTitle(e) {
        setNewFolderBookmarkTitle(e.target.value)
    }

    function handleOnChangeNewFolderItemIcon(e) {
        setNewFolderBookmarkIcon(e.target.value)
    }

    function handleOnChangeNewFolderItemLink(e) {
        setNewFolderBookmarkLink(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (newFolderBookmarkTitle !== "" && newFolderBookmarkIcon !== "" && newFolderBookmarkLink !== "") {

            console.log("Creating a new bookmark. Title: ", newFolderBookmarkTitle);

            if (chrome.storage) {
                chrome.storage.local.get(['key'], function(result) {
                    let parseTemplate = result.key;

                    let maxId = parseTemplate.folders.reduce((max, folder) => {
                        return folder.contents.reduce((max, bookmark) => Math.max(max, bookmark.id), 0)
                    })
    
                    let newBookmark = {
                        id: maxId + 1,
                        title: newFolderBookmarkTitle,
                        icon: newFolderBookmarkIcon,
                        link: newFolderBookmarkLink
                    }
                    
                    let findFolder = parseTemplate.folders.find(folder => folder.id === selectOpenedFolder.id);
    
                    if (findFolder) {
                        findFolder.contents.push(newBookmark);
                    } else {
                        console.log(`No folder found with id ${folderId}`);
                    }

                    console.log(`Chrome storage local: New bookmark: ${JSON.stringify(newBookmark)} in folder id: ${selectOpenedFolder.id}`);
                
                    // Save the updated template back to chrome.storage.local
                    chrome.storage.local.set({key: parseTemplate}, function() {
                        console.log('Value is now set to ', parseTemplate);
                    });
                });

            } else {
                let parseTemplate = JSON.parse(localStorage.getItem(LS_KEY))

                let maxId = parseTemplate.folders.reduce((max, folder) => {
                    return folder.contents.reduce((max, bookmark) => Math.max(max, bookmark.id), 0)
                })

                let newBookmark = {
                    id: maxId + 1,
                    title: newFolderBookmarkTitle,
                    icon: newFolderBookmarkIcon,
                    link: newFolderBookmarkLink
                }
                
                let findFolder = parseTemplate.folders.find(folder => folder.id === selectOpenedFolder.id);

                if (findFolder) {
                    findFolder.contents.push(newBookmark);
                } else {
                    console.log(`No folder found with id ${folderId}`);
                }

                console.log(`Local storage: New bookmark: ${JSON.stringify(newBookmark)} in folder id: ${selectOpenedFolder.id}`);
    
                localStorage.setItem(LS_KEY, JSON.stringify(parseTemplate))
            }
        } 
    }

    return (
    <Dialog ref={newFolderBookmarkDialogRef}>
        <button onClick={() => stateNewFolderBookmarkDialog(false)}>Exit</button>
        <form method="dialog" onSubmit={handleSubmit}>
            <h1>Add new folder bookmark in folder {selectOpenedFolder.title}</h1>
            
            <label htmlFor="new-folder-bookmark-title-input">Folder bookmark title: </label>
            <input type="text" id="new-folder-bookmark-title-input" placeholder="Google Fonts" onChange={handleOnChangeNewFolderItemTitle} value={newFolderBookmarkTitle}></input>
            
            <label htmlFor="new-folder-bookmark-icon-input">Folder bookmark icon: </label>
            <input type="text" id="new-folder-bookmark-icon-input" placeholder="https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg" onChange={handleOnChangeNewFolderItemIcon} value={newFolderBookmarkIcon}></input>
            
            <label htmlFor="new-folder-bookmark-link-input">Folder bookmark link: </label>
            <input type="text" id="new-folder-bookmark-link-input" placeholder="https://fonts.google.com/icons" onChange={handleOnChangeNewFolderItemLink} value={newFolderBookmarkLink}></input>
            <button type="submit" onClick={() => stateNewFolderBookmarkDialog(false)}>Create</button>
        </form>
    </Dialog>
    )
}