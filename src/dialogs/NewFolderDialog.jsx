import styled from "styled-components"
import { useContext } from "react"
import { ExtensionContext } from "../ContextRoot"

const Dialog = styled.dialog`
  border-radius: 15px;
  border: .5px solid #000;
  padding: .75em;
`

export function NewFolderDialog() {

    const {stateNewFolderDialog, newFolderDialogRef} = useContext(ExtensionContext)

    return (
    <Dialog ref={newFolderDialogRef}>
        <button onClick={() => stateNewFolderDialog(false)}>Exit</button>
        <h1>Add new folder entry</h1>
        <label htmlFor="new-folder-name-input">
            Folder Name: 
        </label>
        <input type="text" id="new-folder-name-input" placeholder="😎 Socials"></input>
    </Dialog>
    )
}