import styled from "styled-components"
import { useEffect, useState } from "react"

import "./app.css"
import "../font-awesome.js"

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
  border-radius: 15px;
  width: 100px;
  height: 100px;
`

const FolderName = styled.legend`
  font-size: 16px;
`

const FolderStructure = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: center;
`

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  const getTime = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours} : ${minutes}`
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      window.location = `https://www.google.com/search?q=${searchTerm}`;
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
        {
          getTime()
        }
        <SearchBarContainer>
          <form onSubmit={handleSubmit}>
            <SearchBar type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search using Google or for bookmarks"></SearchBar>
            <SearchOptionButton type="submit"><i className="fa-brands fa-google"></i></SearchOptionButton>
          </form>
        </SearchBarContainer>

        <FolderContainer>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
          <FolderStructure>
            <FolderButton></FolderButton>
            <FolderName>Google</FolderName>
          </FolderStructure>
        </FolderContainer>
        
      </CenterContainer>
    </>
  )
}

export default App
