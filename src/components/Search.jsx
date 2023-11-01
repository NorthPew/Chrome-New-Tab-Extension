
import { useContext, useEffect, useState } from "react"
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
    const { LS_KEY, optionsData, setOptionsData } = useContext(ExtensionContext) 
    
    useEffect(() => {
      if (chrome.storage) {
        chrome.storage.local.get(["key"], function(result) {
          let data = result.key
          setOptionsData(data.options)
        });
      } else {
        setOptionsData(JSON.parse(localStorage.getItem(LS_KEY)).options)
      }
    }, []);

    if (!optionsData) {
      return <div>Loading options...</div>
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      if (optionsData.search.engine === ("google") ) {
        window.location = `https://google.com/search?q=${searchTerm}`;
      } else if (optionsData.search.engine === "bing") {
        window.location = `https://bing.com/search?q=${searchTerm}`;
      } else if (optionsData.search.engine === "d2g") {
        window.location = `https://duckduckgo.com/?q=${searchTerm}`;
      }
    }
    
  }
  
    return (
      <SearchBarContainer>
      <SearchBarForm onSubmit={handleSubmit}>
        <SearchBar type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={optionsData.search.engine === "google" ? "Search using Google or for bookmarks" : optionsData.search.engine === "bing" ? "Search using Bing or for bookmarks" : optionsData.search.engine === "d2g" ? "Search using DuckDuckGo or for bookmarks" : null}></SearchBar>
        <SearchOptionButton type="submit">
          {
            optionsData.search.engine === "google" ? <i className="fa-brands fa-google"></i> : optionsData.search.engine === "bing" ? <i className="fa-brands fa-microsoft"></i> : optionsData.search.engine === "d2g" ? <i className="fa-solid fa-magnifying-glass"></i> : null
          }
        </SearchOptionButton>
      </SearchBarForm>
    </SearchBarContainer>
    )
}