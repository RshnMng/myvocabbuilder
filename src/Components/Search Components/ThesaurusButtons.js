import {useState} from 'react';
import NymsDisplay from './NymsDisplay';
import AddNyms from './AddNyms';

export default function ThesaurusButtons(props){
    let {synonyms, antonyms} = props
    let [buttonState, setButtonState] = useState({
        showSyns: false,
        showAnts: false,
        addSyns: false,
        addAnts: false, 
    })

    console.log(synonyms)

    return <>
       {buttonState.showSyns && <NymsDisplay nyms={synonyms} type={'Synonym'} />} {/*When state is changed to true, these components are shown displaying the selected words */}
       {synonyms.length > 0 ? buttonState.showSyns ?  <button onClick={() => setButtonState((prevState) => {return {...prevState, showSyns: !buttonState.showSyns}})}>Close Synonyms</button> : <button onClick={() => setButtonState((prevState) => {return {...prevState, showSyns: !buttonState.showSyns}})}>Show Synonyms</button> : <AddNyms type={'Synonyms'} nyms={synonyms}/>  } 
      
       {/*this code is set up so it checks to see if there are any synonyms or antonyms, if there arent it shows add button, if not it shows a show button, once the button is clicked it changes the state and the button says close while displaying the selected words */}
       {buttonState.showAnts && <NymsDisplay nyms={antonyms} type={'Antonym'} />} {/*When state is changed to true, these components are shown displaying the selected words */}
       {antonyms.length > 0 ? buttonState.showAnts ?  <button onClick={() => setButtonState((prevState) => {return {...prevState, showAnts: !buttonState.showAnts}})}>Close Aynonyms</button> : <button onClick={() => setButtonState((prevState) => {return {...prevState, showAnts: !buttonState.showAnts}})}>Show Antonyms</button> : <AddNyms type={'Antonyms'} nyms={antonyms}/>   } 
     
    </>
}

//next step, when show synonyms is clicked it looping infinitely, find out why and stop it