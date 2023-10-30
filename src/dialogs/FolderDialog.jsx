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

const FolderBookmark = styled.div`
    height: 75px;
    width: 65px;
`

const FolderBookmarkLegend = styled.legend`
    text-align: center;
`

const FolderBookmarkImage = styled.img`
    width: 65px;
    height: 65px;
`

const FolderBookmarkLink = styled.a`
    text-decoration: none;
`

const FolderBookmarkIcon = styled.div`
    width: 65px;
    height: 65px;
    display: grid;
    place-content: center;
`

const FolderBookmarkButton = styled.div`
  border: none;
  height: 75px;
  width: 65px;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
`

export function FolderDialog({folder}) {
    const {editMode, stateNewFolderBookmarkDialog} = useContext(ExtensionContext)

    return (
        <>
            <FolderContentDialog key={"Folder " + folder.id + " Folder Title: " + folder.title}>
            {
                folder.contents.map((content) => (
                <FolderBookmark key={"Folder " + folder.id + " Bookmark " + content.title + " Id " + content.id}>
                    <FolderBookmarkLink  href={content.link}>
                    <FolderBookmarkImage src={content.icon} alt={content.title} />
                    <FolderBookmarkLegend>{content.title}</FolderBookmarkLegend>
                    </FolderBookmarkLink>
                </FolderBookmark>
                ))
            }
            {
                editMode && (
                <>
                    <FolderBookmarkButton onClick={() => stateNewFolderBookmarkDialog(true, folder)}>
                    <FolderBookmarkLink>
                        <FolderBookmarkIcon>
                        <i className="fa-solid fa-plus"></i>
                        </FolderBookmarkIcon>
                        <FolderBookmarkLegend>Add new bookmark</FolderBookmarkLegend>
                    </FolderBookmarkLink>
                </FolderBookmarkButton>

                </>
        
                )
            }
            </FolderContentDialog> 
        </>
    )
}