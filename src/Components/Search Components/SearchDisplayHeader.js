
export default function SearchDisplayHeader(props){
    const { searchState }= props
    return <>
    {searchState.dictionaryInfo.length === 0 ? // checks if wordInfo array is empty
      <div>Search New Word</div> : <div><div>{searchState.searchedWord}</div><button>Save All Definitions to Deck</button></div>
      //if empty display Search New as display label if not display word that was last searched for
      // also displays save all defs button that allows user to save all the listed definitions to the study deck
      }
    </>
}