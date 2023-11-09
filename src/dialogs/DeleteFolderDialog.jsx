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

export function DeleteFolderDialog() {

    const {deleteFolder, deleteFolderDialogRef, selectOnDeleteFolder, stateDeleteFolderDialog, LS_KEY} = useContext(ExtensionContext)

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Deleting folder titled: " + selectOnDeleteFolder.title);
        
        deleteFolder(selectOnDeleteFolder.id)
    }

    return (
    <Dialog ref={deleteFolderDialogRef}>

        <Form method="dialog" onSubmit={handleSubmit}>
            <DialogTitle>Delete folder {selectOnDeleteFolder.title} </DialogTitle>

            <ButtonSection>
                <ActionButton type="button" onClick={() => stateDeleteFolderDialog(false)}>Cancel</ActionButton>
                <ActionButton type="submit" onClick={() => stateDeleteFolderDialog(false)}>Delete</ActionButton>
            </ButtonSection>

        </Form>
    </Dialog>
    )
}