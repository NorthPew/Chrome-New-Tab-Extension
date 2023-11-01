import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { ExtensionContext } from "../ContextRoot"

const Dialog = styled.dialog`
  border-radius: 15px;
  border: .5px solid #000;
  padding: 0px;
`

const DialogTitle = styled.h1`
    padding: .05em .75em;
`

const Form = styled.form`
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: 100%;
`

const ButtonSection = styled.section`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`

const TabButton = styled.button`
    flex-grow: 1;
    border: 0px solid transparent;
    background-color: transparent;
`

const ActionButton = styled.button`
    flex-grow: 1;
`

const FormContainer = styled.section`
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    padding: .75em;
`

export function NewFolderBookmarkDialog() {

    const {stateNewFolderBookmarkDialog, newFolderBookmarkDialogRef, selectOpenedFolder, LS_KEY} = useContext(ExtensionContext)


    // Inputs
    const [newFolderBookmarkTitle, setNewFolderBookmarkTitle] = useState("")
    const [newFolderBookmarkIcon, setNewFolderBookmarkIcon] = useState("")
    const [newFolderBookmarkLink, setNewFolderBookmarkLink] = useState("")
    
    const [openedTab, setOpenedTab] = useState("visuals")

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

        <Form method="dialog" onSubmit={handleSubmit}>
            <DialogTitle>Add a new bookmark in folder {selectOpenedFolder.title}</DialogTitle>
            <ButtonSection>
                <TabButton onClick={() => setOpenedTab("visuals")} style={{backgroundColor: openedTab === "visuals" ? "blue" : null, color: openedTab === "visuals" ? "white" : null}}>Visuals</TabButton>
                <TabButton onClick={() => setOpenedTab("address")} style={{backgroundColor: openedTab === "address" ? "blue" : null, color: openedTab === "address" ? "white" : null}}>Address</TabButton>
                <TabButton onClick={() => setOpenedTab("position")} disabled>Position</TabButton>
                <TabButton onClick={() => setOpenedTab("preview")} disabled>Preview</TabButton>
            </ButtonSection>
            <FormContainer>

                {
                    openedTab === "visuals" && (
                        <>
                            <label htmlFor="new-folder-bookmark-title-input">Bookmark title: </label>
                            <input type="text" id="new-folder-bookmark-title-input" placeholder="Google Fonts" onChange={handleOnChangeNewFolderItemTitle} value={newFolderBookmarkTitle}></input>
                            
                            <label htmlFor="new-folder-bookmark-icon-input">Bookmark icon: </label>
                            <input type="text" id="new-folder-bookmark-icon-input" placeholder="https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg" onChange={handleOnChangeNewFolderItemIcon} value={newFolderBookmarkIcon}></input>
                        </>

                    )
                }
                {
                    openedTab === "address" && (
                        <>
                            <label htmlFor="new-folder-bookmark-link-input">Bookmark address: </label>
                            <input type="text" id="new-folder-bookmark-link-input" placeholder="https://fonts.google.com/icons" onChange={handleOnChangeNewFolderItemLink} value={newFolderBookmarkLink}></input>
                        </>
                    )
                }

                

            </FormContainer>
            <ButtonSection>
                <ActionButton onClick={() => stateNewFolderBookmarkDialog(false)}>Cancel</ActionButton>
                <ActionButton type="submit" onClick={() => stateNewFolderBookmarkDialog(false)}>Create</ActionButton>
            </ButtonSection>
        </Form>
    </Dialog>
    )
}