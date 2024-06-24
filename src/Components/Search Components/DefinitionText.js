import { useState, useEffect } from "react";
import { globalFunctions } from "../../Pages/Utility Pages/GlobalFunctions";


export default function DefinitionText(props){
    const {content} = props;
    const [textState, setTextState] = useState({
        defText: '',
        defExample: ''
    })
    let definition;
    let example;
    let cleanDef;
    let cleanExample;

   
  
    content[1].dt === undefined ?  definition = ' ' : definition = content[1].dt[0][1]; // checks api data to make sure array holding definition is there, if it is there then save definition to definition variable, if not there save '' to definition variable so it doesnt through an undefined error
    content[1].dt === undefined ? example = ' ' : content[1].dt.length === 2 ? content[1].dt[1][1][0] === undefined ? example = ' ' :  example = content[1].dt[1][1][0].t : content[1].dt.length === 3 ? example = content[1].dt[2][1][0].t : example = ' '; // checks to see if array holding example sentence is there, if so then checks to see if the array has two nested arrays or three. Depending on whether it has two or three it will save the corresponding example sentence into the example variable. If not there it will save '' to example variable so it doesnt throw and undefined error
    example === undefined ? example = ' ' : example = example; // if for some reason am example/definition variable gets through still marked as undefined we save as '' or allow it to stay what it already is before moving on with the code - this is a sort of safe guard.
    definition === undefined ? definition = ' ' : definition = definition;

    definition !== ' ' ? cleanDef = globalFunctions.removeSpecialChars(definition) : cleanDef = cleanDef; // if definition variable is blank we dont want to do anything, if it isnt blank then we want to run the function that removes special characters on it by passing it through the function and saving the new clean definition into a variable
    example !== ' ' ?  cleanExample = globalFunctions.removeSpecialChars(example) : cleanExample = cleanExample; // does the same thing as above but with the example sentence instead


   useEffect(() => {
    setTextState((prevState) => { return {...prevState, defText: cleanDef, defExample: cleanExample}})
   }, [textState.defText, textState.defExample]) // cleanDef and cleanExample are saved in text state as deftext and defexample

  
   
    return <>
    <div>{textState.defText}</div> {/*both are displayed on the screen for the user after being saved to the state */}
    <div>{textState.defExample}</div>
    </>
}

//NEXT STEPS: 


// put notes by all the new code and new files we created // better name files, functions, components, variables if need be
// save to github
// continue with dictionary display and getting all the proper info on the screen