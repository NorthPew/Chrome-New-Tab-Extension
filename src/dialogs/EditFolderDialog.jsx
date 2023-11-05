import styled from "styled-components"
import { useContext, useState } from "react"
import { ExtensionContext } from "../ContextRoot"
import { FolderDialog } from "./FolderDialog"

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

export function EditFolderDialog() {
    const {stateEditFolderDialog, editFolderDialogRef, selectOnEditFolder, LS_KEY} = useContext(ExtensionContext)

    // Inputs
    const [editFolderTitle, setEditFolderTitle] = useState("")

    const [openedTab, setOpenedTab] = useState("visuals")

    function handleOnChangeEditFolderTitle(e) {
        setEditFolderTitle(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (editFolderTitle !== "") {
            console.log("Editing a folder. Title: ", editFolderTitle);

            if (chrome.storage) {
                chrome.storage.local.get(['key'], function (result) {
                    let parseTemplate = result.key;
                
                    let saveCurrentFolder = parseTemplate.folders.find(folder => folder.id === selectOnEditFolder.id);

                    saveCurrentFolder.title = editFolderTitle;
                    
                    chrome.storage.local.set({[LS_KEY]: JSON.stringify(parseTemplate)}, () => {
                        console.log('Value is set to ' + JSON.stringify(parseTemplate));
                    });
                });
            } else {
                let parseTemplate = JSON.parse(localStorage.getItem(LS_KEY))

                let saveCurrentFolder = parseTemplate.folders.find(folder => folder.id === selectOnEditFolder.id);

                saveCurrentFolder.title = editFolderTitle;
                
                localStorage.setItem(LS_KEY, JSON.stringify(parseTemplate))
            }
        }
    }

    const activeTabStyle = (tab) => {
        return {backgroundColor: openedTab === tab ? "blue" : null, color: openedTab === tab ? "white" : null}
    }

    return (
        <Dialog ref={editFolderDialogRef}>
            <Form method="dialog" onSubmit={handleSubmit} >
                <DialogTitle>Edit folder {selectOnEditFolder.title}</DialogTitle>
                <ButtonSection>
                    <TabButton onClick={() => setOpenedTab("visuals")} style={activeTabStyle("visuals")}>Visuals</TabButton>
                    <TabButton onClick={() => setOpenedTab("position")} disabled>Position</TabButton>
                </ButtonSection>
                <FormContainer>
                    {
                        openedTab === "visuals" && (
                            <>
                                <label htmlFor="edit-folder-title-input">Folder title: </label>
                                <input type="text" id="edit-folder-title-input" placeholder={selectOnEditFolder.title} onChange= {handleOnChangeEditFolderTitle} value={editFolderTitle}></input>
                            </>
                        )
                    }
                </FormContainer>
                <ButtonSection>
                    <ActionButton type="button" onClick={() => stateEditFolderDialog(false)}>Cancel</ActionButton>
                    <ActionButton type="reset">Reset</ActionButton>
                    <ActionButton type="submit" onClick={() => stateEditFolderDialog(false)}>Edit</ActionButton>
                </ButtonSection>
            </Form>
        </Dialog>
    )
}