import { useState, useContext } from "react"
import AddDisplay from "./AddDisplay"



export default function AddNyms(props){
 let {type, nyms} = props

 let [addState, setAddState] = useState({
    adding: false,
 })

 return <>
    {addState.adding ? <button onClick={() => setAddState((prevState) => { return {...prevState, adding: !addState.adding}})}>Cancel Add</button> : <button onClick={() => setAddState((prevState) => {return{...prevState, adding: !addState.adding}})}>Add {`${type}`}</button>}
    {addState.adding && <AddDisplay nyms={nyms} type={type}/>}
  </>
}