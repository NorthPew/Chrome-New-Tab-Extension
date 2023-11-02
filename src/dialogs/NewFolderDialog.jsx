import styled from "styled-components"
import { useContext, useState } from "react"
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

export function NewFolderDialog() {

    const {stateNewFolderDialog, newFolderDialogRef, LS_KEY} = useContext(ExtensionContext)

    const [openedTab, setOpenedTab] = useState("visuals")

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

        <Form method="dialog" onSubmit={handleSubmit}>
            <DialogTitle>Add a new folder</DialogTitle>
            <ButtonSection>
                <TabButton onClick={() => setOpenedTab("visuals")} style={{backgroundColor: openedTab === "visuals" ? "blue" : null, color: openedTab === "visuals" ? "white" : null}}>Visuals</TabButton>
                <TabButton disabled>Position</TabButton>
                <TabButton disabled>Preview</TabButton>
            </ButtonSection>
            <FormContainer>
            {
                openedTab === "visuals" && (
                    <>
                        <label htmlFor="new-folder-title-input">Folder title: </label>
                        <input type="text" id="new-folder-title-input" placeholder="😎 Socials" onChange={handleOnChangeNewFolderTitle} value={newFolderTitle}></input>
                    </>
                )
            }
            </FormContainer>
            <ButtonSection>
                <ActionButton type="button" onClick={() => stateNewFolderDialog(false)}>Cancel</ActionButton>
                <ActionButton type="reset">Reset</ActionButton>
                <ActionButton type="submit" onClick={() => stateNewFolderDialog(false)}>Create</ActionButton>
            </ButtonSection>

        </Form>
    </Dialog>
    )
}