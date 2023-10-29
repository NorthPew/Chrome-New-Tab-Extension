import styled from "styled-components"

import "./app.css"
import "../font-awesome.js"

import { NavBar } from "./components/NavBar"
import { Search } from "./components/Search"
import { Folders } from "./components/Folders"

// Main Container
const CenterContainer = styled.section`
  display: grid;
  place-content: center;
  height: calc(100vh - 45px);
  width: 100vw;
  row-gap: 10px;
`

function App() {
  return (
    <>
      <NavBar />
      <CenterContainer>
        <Search />
        <Folders />
      </CenterContainer>
    </>
  )
}

export default App
