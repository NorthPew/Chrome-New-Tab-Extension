
import { useContext, useState } from "react"
import styled from "styled-components"
import { ExtensionContext } from "../ContextRoot"

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

export function Search() {

    const [searchTerm, setSearchTerm] = useState('')
    const { chosenSearchEngine } = useContext(ExtensionContext) 
    
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      chosenSearchEngine("google", searchTerm)
    }
    
  }
  
    return (
        <SearchBarContainer>
        <SearchBarForm onSubmit={handleSubmit}>
          <SearchBar type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search using Google or for bookmarks"></SearchBar>
          <SearchOptionButton type="submit"><i className="fa-brands fa-google"></i></SearchOptionButton>
        </SearchBarForm>
      </SearchBarContainer>
    )
}