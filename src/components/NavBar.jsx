import styled from "styled-components"

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

export const NavBar = () => (
    <NavBarContainer>
        <NavBarCircleButton><i className="fa-solid fa-cog"></i></NavBarCircleButton>
        <NavBarCircleButton><i className="fa-brands fa-google"></i></NavBarCircleButton>
        <NavBarCircleButton><i className="fa-brands fa-microsoft"></i></NavBarCircleButton>
      </NavBarContainer>
)