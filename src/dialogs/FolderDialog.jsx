import styled from "styled-components"
import { useEffect, useState, useRef, useContext } from "react"
import { ExtensionContext } from "../ContextRoot"

const FolderContentDialog = styled.dialog`
  min-width: 50vw;
  min-height: 130px;
  padding: .25em;
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

const FolderItemIcon = styled.div`
    width: 65px;
    height: 65px;
    display: grid;
    place-content: center;
`

const FolderItemButton = styled.div`
  border: none;
  height: 75px;
  width: 65px;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
`

export function FolderDialog({folder}) {
    const {editMode, stateNewFolderItemDialog} = useContext(ExtensionContext)

    return (
        <>
            <FolderContentDialog key={"Folder " + folder.id + "Folder Title: " + folder.title}>
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
            {
                editMode && (
                <>
                    <FolderItemButton onClick={() => stateNewFolderItemDialog(true)}>
                    <FolderItemLink>
                        <FolderItemIcon>
                        <i className="fa-solid fa-plus"></i>
                        </FolderItemIcon>
                        <FolderItemLegend>Add new bookmark</FolderItemLegend>
                    </FolderItemLink>
                </FolderItemButton>

                </>
        
                )
            }
            </FolderContentDialog> 
        </>
    )
}