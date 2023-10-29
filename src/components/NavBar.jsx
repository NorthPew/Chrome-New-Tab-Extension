import { useContext, useState } from "react"
import styled from "styled-components"
import { ExtensionContext } from "../ContextRoot"

// Navbar
const NavBarContainer = styled.nav`
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

export function NavBar() {
  const {editMode, setEditMode} = useContext(ExtensionContext)


  return (
    <NavBarContainer>
    <NavBarCircleButton title="Settings"><i className="fa-solid fa-cog"></i></NavBarCircleButton>
    <NavBarCircleButton title="Edit mode" onClick={() => setEditMode(!editMode)}><i className="fa-solid fa-pen"></i></NavBarCircleButton>
    <NavBarCircleButton title="Google quick menu"><i className="fa-brands fa-google"></i></NavBarCircleButton>
    <NavBarCircleButton title="Microsoft quick menu"><i className="fa-brands fa-microsoft"></i></NavBarCircleButton>
  </NavBarContainer>
  )
}

