import styled from "styled-components"
import { useContext, useState } from "react"
import { ExtensionContext } from "../ContextRoot"

const Dialog = styled.dialog`
  border-radius: 15px;
  border: .5px solid #000;
  padding: .75em;
`

export function NewFolderItemDialog() {

    const {stateNewFolderItemDialog, newFolderItemDialogRef, LS_KEY} = useContext(ExtensionContext)

    const [newFolderItemTitle, setNewFolderItemTitle] = useState("")
    const [newFolderItemIcon, setNewFolderItemIcon] = useState("")

    function handleOnChangeNewFolderItemTitle(e) {
        setNewFolderItemTitle(e.target.value)
    }

    function handleOnChangeNewFolderItemIcon(e) {
        setNewFolderItemIcon(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
    <Dialog ref={newFolderItemDialogRef}>
        <button onClick={() => stateNewFolderItemDialog(false)}>Exit</button>
        <form method="dialog" onSubmit={handleSubmit}>
            <h1>Add new folder item entry</h1>
            <label htmlFor="new-folder-item-title-input">Folder item title: </label>
            <input type="text" id="new-folder-item-title-input" placeholder="Google Fonts" onChange={handleOnChangeNewFolderItemTitle} value={newFolderItemTitle}></input>
            <label htmlFor="new-folder-item-icon-input">Folder item icon: </label>
            <input type="text" id="new-folder-item-icon-input" placeholder="https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg" onChange={handleOnChangeNewFolderItemIcon} value={newFolderItemTitle}></input>
            <button type="submit" onClick={() => stateNewFolderItemDialog(false)}>Create</button>
        </form>
    </Dialog>
    )
}