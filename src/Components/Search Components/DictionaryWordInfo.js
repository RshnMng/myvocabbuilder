import { useState, useEffect } from "react";
import DictionaryDefinition from "./DictionaryDefinition";


export default function DictionaryWordInfo(props){
 let key = 0;
 const {defInfo} = props; // import passed in props and save to definfo variable
 const [defState, setDefState] = useState({
    partOfSpeech: defInfo.fl, // set state for part of speech and the array of definitions we will map through in the next component
    defArray: [],
 })


 useEffect(() => {
    defInfo.def === undefined ? setDefState((prevState) => { return {...prevState, defArray : []}}) : setDefState((prevstate) => {return {...prevstate, defArray : defInfo.def[0].sseq}}); // ask if defInfo has a key named def, if so go into the nested key and get the nested info and save it as defarray - if not then save it as an empty array
 }, [defState.defArray])

    return <>
    <div>{defState.partOfSpeech}</div> {/*display part of speech, map through defarray, passing each item in that array to its own component as props where that information can be further broken down and manipulated inside its own component - in this case dictionarydefinition+5 */}
    { 
    
    defState.defArray.map((item) => { // map through defState defArray and pass the info and the unique key through props to a component named Dictionary Definition
      key++
        return <DictionaryDefinition info={item} key={key}/>
    })} 
    </>
}

