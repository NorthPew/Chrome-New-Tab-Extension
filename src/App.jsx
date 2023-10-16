import styled from "styled-components"
import { useState } from "react"

import "./app.css"
import "../font-awesome.js"
import data from "../data.json"

// Navbar
const NavBar = styled.nav`
  position: relative;
  top: 0px;
  height: 45px;
  width: 100vw;
  display: flex;
  flex-flow: row-reverse wrap;
  align-content: space-around;
  column-gap: 10px;
  padding: 0px 10px;
`

const NavBarCircleButton = styled.button`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`
// Main Container
const CenterContainer = styled.section`
  display: grid;
  place-content: center;
  height: calc(100vh - 45px);
  width: 100vw;
  row-gap: 10px;
`

// Search
const SearchBar = styled.input`
   border-radius: 100px;
   width: 50vw;
   height: 40px;
`

const SearchBarContainer = styled.section`
  width: calc(50vw + 50px);
`

const SearchBarForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  column-gap: 10px;
`

const SearchOptionButton = styled.button`
  border-radius: 100px;
  height: 40px;
  width: 40px;
`

// Folder
const FolderContainer = styled.section`
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
`

const FolderContent = styled.section`
  min-width: 20vw;
  min-height: 5vh;
  border: .5px solid #000;
`

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [isFolderOpen, setIsFolderOpen] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      window.location = `https://www.google.com/search?q=${searchTerm}`;
    }
    
  }

  const onOpenFolder = (folder) => {
    if (isFolderOpen.id === folder.id) {
        setIsFolderOpen({}); // close the folder if it's already open
    } else {
        setIsFolderOpen(folder); // open the folder
    }
}

  return (
    <>
      <NavBar>
        <NavBarCircleButton><i className="fa-solid fa-cog"></i></NavBarCircleButton>
        <NavBarCircleButton><i className="fa-brands fa-google"></i></NavBarCircleButton>
        <NavBarCircleButton><i className="fa-brands fa-microsoft"></i></NavBarCircleButton>
      </NavBar>
      <CenterContainer>
        <SearchBarContainer>
          <SearchBarForm onSubmit={handleSubmit}>
            <SearchBar type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search using Google or for bookmarks"></SearchBar>
            <SearchOptionButton type="submit"><i className="fa-brands fa-google"></i></SearchOptionButton>
          </SearchBarForm>
        </SearchBarContainer>

        <FolderContainer>
        {data.folders.map((folder) => (
                <FolderStructure key={folder.id}>
                  <FolderButton onClick={() => onOpenFolder(folder)}>{folder.title}</FolderButton>
                    {
                      isFolderOpen.id === folder.id && (
                        <FolderContent>
                          {
                            folder.contents.map((content) => (
                              <>
                                  <img src={content.icon} alt={content.title} width={"75px"} height={"75px"} />
                                  <legend><a href={content.link}>{content.title}</a></legend>
                              </>

                          ))
                          }
                        </FolderContent>
                        
                      )
                    }
                </FolderStructure>
            ))}
        </FolderContainer>
        
      </CenterContainer>
    </>
  )
}

export default App
