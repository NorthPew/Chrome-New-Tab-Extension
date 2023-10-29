import styled from "styled-components"
import { useContext, useState } from "react"
import { ExtensionContext } from "../ContextRoot"

const Dialog = styled.dialog`
  border-radius: 15px;
  border: .5px solid #000;
  padding: .75em;
`

export function NewFolderDialog() {

    const {stateNewFolderDialog, newFolderDialogRef, LS_KEY} = useContext(ExtensionContext)

    const [newFolderTitle, setNewFolderTitle] = useState("")

    function handleOnChangeNewFolderTitle(e) {
        setNewFolderTitle(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (newFolderTitle !== "") {

            console.log("Creating a new empty folder. Title: ", newFolderTitle);

            if (chrome.storage) {
                chrome.storage.local.get(['key'], function(result) {
                    let parseTemplate = result.key;

                    let newEmptyFolder = {
                        id: parseTemplate.folders.length + 1,
                        title: newFolderTitle,
                        contents: []
                    }
                
                    parseTemplate.folders.push(newEmptyFolder);

                    console.log("Chrome storage local: New folder: ", newEmptyFolder);
                
                    // Save the updated template back to chrome.storage.local
                    chrome.storage.local.set({key: parseTemplate}, function() {
                        console.log('Value is now set to ', parseTemplate);
                    });
                });

            } else {
                let parseTemplate = JSON.parse(localStorage.getItem(LS_KEY))

                let newEmptyFolder = {
                    id: parseTemplate.folders.length + 1,
                    title: newFolderTitle,
                    contents: []
                }

                console.log("Local storage: New folder: ", newEmptyFolder);
    
                parseTemplate.folders.push(newEmptyFolder)
    
                localStorage.setItem(LS_KEY, JSON.stringify(parseTemplate))
            }
        } 
    }

    return (
    <Dialog ref={newFolderDialogRef}>
        <button onClick={() => stateNewFolderDialog(false)}>Exit</button>
        <form method="dialog" onSubmit={handleSubmit}>
            <h1>Add new folder entry</h1>
            <label htmlFor="new-folder-name-input">Folder Title: </label>
            <input type="text" id="new-folder-name-input" placeholder="😎 Socials" onChange={handleOnChangeNewFolderTitle} value={newFolderTitle}></input>
            <button type="submit" onClick={() => stateNewFolderDialog(false)}>Create</button>
        </form>
    </Dialog>
    )
}