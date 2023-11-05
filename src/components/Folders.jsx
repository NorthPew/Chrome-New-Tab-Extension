import styled from "styled-components"
import { useEffect, useState, useRef, useContext } from "react"

// Context
import { ExtensionContext } from "../ContextRoot"

// Dialogs
import { NewFolderDialog } from "../dialogs/NewFolderDialog"
import { NewFolderBookmarkDialog } from "../dialogs/NewFolderBookmarkDialog"
import { FolderDialog } from "../dialogs/FolderDialog"
import { DeleteFolderDialog } from "../dialogs/DeleteFolderDialog"
import { EditFolderDialog } from "../dialogs/editFolderDialog"

// Styled
// Folder
const FoldersSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 125px);
  column-gap: 10px;
`

const FolderButton = styled.button`
  font-size: 16px;
  border-radius: 15px;
  padding: .25em .65em;
  border: .5px solid #000;
`

const FolderTitleSummary = styled.summary`
  font-size: 18px;
  border-radius: 15px;
  border: .5px solid #000;
  list-style: none;
  min-width: 125px;
  text-align: center;
  height: 54px;
  flex-flow: row wrap;
  display: flex;
  place-content: center;
`

const FolderStructure = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: center;
  min-height: 30px;
  min-width: 125px;
`

const ButtonSection = styled.section`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 36px;
    border: .5px solid #000;
`

const TabButton = styled.button`
    flex-grow: 1;
    border: 0px solid transparent;
    background-color: transparent;
`




export function Folders() {
  const {LS_KEY, stateNewFolderDialog, stateDeleteFolderDialog, stateEditFolderDialog, editMode, foldersData, setFoldersData} = useContext(ExtensionContext)

  // Loading the data
  useEffect(() => {
    // If user is using the chrome extension or uses the preview
    if (chrome.storage) {
        chrome.storage.local.get(["key"], function(result) {
            let data = result.key
            setFoldersData(data.folders)
          });
    } else {
        setFoldersData(JSON.parse(localStorage.getItem(LS_KEY)).folders)
    }
  }, []);

  if (!foldersData) {
    return <div>Loading folders...</div>
  }


  return (
    <>
      <FoldersSection>
        {
          foldersData.map((folder) => (
            <>
            <FolderStructure key={folder.id}>
              <details>
                <FolderTitleSummary>
                  {folder.title}
                  {
                    editMode && (
                      <ButtonSection>
                        <TabButton disabled title="Move folder to the left"><i className="fa-solid fa-arrow-left" /></TabButton>
                        <TabButton disabled title="Move folder to the right"><i className="fa-solid fa-arrow-right" /></TabButton>
                        <TabButton onClick={() => stateEditFolderDialog(true, folder)} title="Edit folder name"><i className="fa-solid fa-rotate-right" /></TabButton>
                        <TabButton onClick={() => stateDeleteFolderDialog(true, folder)} title="Remove folder"><i className="fa-solid fa-trash-can" /></TabButton>
                      </ButtonSection>
                    )
                  }</FolderTitleSummary>
                <FolderDialog folder={folder} />
              </details>
            </FolderStructure>
            
            </>
          ))
        }
        {
          editMode && (
            <FolderStructure>
            <FolderButton onClick={() => stateNewFolderDialog(true)}>
              <i className="fa-solid fa-plus" />
            </FolderButton>
            <NewFolderDialog />
          </FolderStructure>
          )
        }
        </FoldersSection>
        {/* Folder dialogs */}
        <NewFolderBookmarkDialog />
        <DeleteFolderDialog />
        <EditFolderDialog />
    </>
  )
}