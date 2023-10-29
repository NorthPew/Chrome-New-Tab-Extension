import styled from "styled-components"
import { useEffect, useState, useRef, useContext } from "react"


import { NewFolderDialog } from "../dialogs/NewFolderDialog"
import { ExtensionContext } from "../ContextRoot"

// Folder
const FolderSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  column-gap: 10px;
  row-gap: 10px;
`

const FolderButton = styled.button`
  font-size: 16px;
  border-radius: 15px;
  padding: .25em .65em;
`

const FolderStructure = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: center;
  min-height: 30px;
`

const FolderContainer = styled.section`
  min-width: 20vw;
  min-height: 5vh;
  border: .5px solid #000;
  display: flex;
  column-gap: 15px;
  flex-flow: row wrap;
`

const FolderItem = styled.div`
    height: 75px;
    width: 65px;
`

const FolderItemLegend = styled.legend`
    text-align: center;
`

const FolderItemImage = styled.img`
    width: 65px;
    height: 65px;
`

const FolderItemLink = styled.a`
    text-decoration: none;
`

// Adding new folder
const AddFolderButton = styled.button`
    font-size: 16px;
    border-radius: 15px;
    padding: .25em .65em;
`

export function Folders() {
  const {LS_KEY} = useContext(ExtensionContext)

  // Folder is open
  const [isFolderOpen, setIsFolderOpen] = useState({})
  // Loading the data
  const [data, setData] = useState(null)

  const {stateNewFolderDialog} = useContext(ExtensionContext)

  // Folder is open
  const onOpenFolder = (folder) => {
    if (isFolderOpen.id === folder.id) {
        setIsFolderOpen({}); // close the folder if it's already open
    } else {
        setIsFolderOpen(folder); // open the folder
    }
  }

  // Loading the data
  useEffect(() => {
    // If user is using the chrome extension or uses the preview
    if (chrome.storage) {
        chrome.storage.local.get(["SK"], function(result) {
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
        <FolderSection>
        {
        data.folders.map((folder) => (
                <FolderStructure key={folder.id}>
                  <FolderButton onClick={() => onOpenFolder(folder)}>{folder.title}</FolderButton>
                    {
                      isFolderOpen.id === folder.id && (
                        <FolderContainer>
                          {
                            folder.contents.map((content) => (
                              <FolderItem key={"Folder " + folder.id + " Item " + content.title}>
                                <FolderItemLink  href={content.link}>
                                    <FolderItemImage src={content.icon} alt={content.title} />
                                  <FolderItemLegend>{content.title}</FolderItemLegend>
                                </FolderItemLink>
                              </FolderItem>
                          ))
                          }
                        </FolderContainer>
                        
                      )
                    }
                </FolderStructure>
            ))}
            <FolderStructure>
                <AddFolderButton onClick={() => stateNewFolderDialog(true)}>
                    <i className="fa-solid fa-plus"></i>
                </AddFolderButton>
                <NewFolderDialog />
            </FolderStructure>
        </FolderSection>
    )
}