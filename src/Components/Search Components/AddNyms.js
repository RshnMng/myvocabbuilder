import { useState, useContext } from "react"
import AddDisplay from "./AddDisplay"



export default function AddNyms(props){
 let {type, nyms,  id, wordInfo} = props

 let [addState, setAddState] = useState({
    adding: false,
 })


 return <>
    {addState.adding ? <button onClick={() => setAddState((prevState) => { return {...prevState, adding: !addState.adding}})}>Cancel Add</button> : <button id={id}  onClick={() => {
      console.log(wordInfo)
      setAddState((prevState) => {return{...prevState, adding: !addState.adding}})}}>Add {`${type}`}</button>}
    {addState.adding && <AddDisplay nyms={nyms} type={type} id={id} wordInfo={wordInfo}/>}
  </>
}


// next steps //
// word info is being console logged on add button click, find a way to sabe that information along with the updated array after new nym has been added / save that to local deck in local storage
// go back to nyms display file and continue going through those next steps