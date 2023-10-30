import styled from "styled-components"
import { useEffect, useState, useRef, useContext } from "react"

// Context
import { ExtensionContext } from "../ContextRoot"

// Dialogs
import { NewFolderDialog } from "../dialogs/NewFolderDialog"
import { NewFolderItemDialog } from "../dialogs/NewFolderItemDialog"
import { FolderDialog } from "../dialogs/FolderDialog"

// Styled
// Folder
const FoldersSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  column-gap: 10px;
`

const FolderButton = styled.button`
  font-size: 16px;
  border-radius: 15px;
  padding: .25em .65em;
  border: .5px solid #000;
`

const FolderTitleSummary = styled.summary`
  font-size: 16px;
  border-radius: 15px;
  padding: .25em .65em;
  border: .5px solid #000;
  list-style: none;
`

const FolderStructure = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: center;
  min-height: 30px;
`


export function Folders() {
  const {LS_KEY, stateNewFolderDialog, editMode, data, setData} = useContext(ExtensionContext)

  // Loading the data
  useEffect(() => {
    // If user is using the chrome extension or uses the preview
    if (chrome.storage) {
        chrome.storage.local.get(["key"], function(result) {
            setData(result.key);
          });
    } else {
        setData(JSON.parse(localStorage.getItem(LS_KEY)))
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>
  }


  return (
    <>
      <FoldersSection>
        {
          data.folders.map((folder) => (
            <FolderStructure key={folder.id}>
              <details>
                <FolderTitleSummary>{folder.title}</FolderTitleSummary>
                <FolderDialog folder={folder} />
              </details>
            </FolderStructure>
          ))
        }
        {
          editMode && (
            <FolderStructure>
            <FolderButton onClick={() => stateNewFolderDialog(true)}>
              <i className="fa-solid fa-plus"></i>
            </FolderButton>
            <NewFolderDialog />
          </FolderStructure>
          )
        }
        </FoldersSection>
        <NewFolderItemDialog />
        
    </>
  )
}