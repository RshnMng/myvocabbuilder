import { useState, useEffect } from "react";
import { globalFunctions } from "../../Pages/Utility Pages/GlobalFunctions";
import { wordInfoAndApi } from "../../Pages/Utility Pages/WordInfoAndAPI";


export default function DefinitionText(props){
    const {content} = props;
    const [textState, setTextState] = useState({
        defText: '',
        defExample: ''
    })
    let definition; // these variables are declared but not assigned because we are going to use them later in the function
    let example;
    let cleanDef;
    let cleanExample;
    
  
   definition = wordInfoAndApi.getDefinition(content[1].dt) // runs functions in wordINFO page that extracts the definition and example and saves it to a variable
   example = wordInfoAndApi.getExample(content[1].dt);
   example === undefined  ? example = ' ' : example = example; // if for some reason am example/definition variable gets through still marked as undefined we save as '' or allow it to stay what it already is before moving on with the code - this is a sort of safe guard.
   definition === undefined ? definition = ' ' : definition = definition;

    

    definition !== ' ' || typeof(definition) !== 'object' ? cleanDef = globalFunctions.removeSpecialChars(definition) : cleanDef = cleanDef; // if definition variable is blank we dont want to do anything, if it isnt blank then we want to run the function that removes special characters on it by passing it through the function and saving the new clean definition into a variable
    example !== ' ' || typeof(example) !== 'object' ?  cleanExample = globalFunctions.removeSpecialChars(example) : cleanExample = cleanExample; // does the same thing as above but with the example sentence instead

   useEffect(() => {
    setTextState((prevState) => { return {...prevState, defText: cleanDef, defExample: cleanExample}})
   }, [textState.defText, textState.defExample]) // cleanDef and cleanExample are saved in text state as deftext and defexample
  
   
    return <>
    <div>{textState.defText}</div> {/*both are displayed on the screen for the user after being saved to the state */}
    <div>{textState.defExample}</div>
    </>
}

