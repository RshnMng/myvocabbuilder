import {useState, useEffect, createContext} from 'react';
import AddNyms from './AddNyms';

let NymContext = createContext();


export default function NymsDisplay(props){
    let {nyms, type} = props;
    let [nymsState, setNymsState] = useState({
        nyms : nyms,
        showAmount: 6,
        display: nyms,
        displayLength: nyms.length,
        showAdded: 0,
    })




useEffect(() => { 
// loops through array passed in through props either an array of syns or ants, and pushes each word to a new array that is saved in display state, it by defaults at showing 6 words only
    let words = []
    for(let x = 0; x < nymsState.showAmount; x++){
          words.push(<div>{nymsState.display[x]}</div>)
       }
     
    setNymsState((prevState) => {return {...prevState, display: words}}) 
}, [nymsState.displayLength, nymsState.showAmount])


    return <>
        <NymContext.Provider value={[nymsState, setNymsState]}>
        {nymsState.display} {/*displays nyms*/} {console.log(nymsState.display)}
        {nymsState.showAmount < nyms.length && <button onClick={() => setNymsState((prevState) => {return {...prevState, showAmount: nymsState.showAmount + 6, showAdded: nymsState.showAdded + 1}})}>Show More</button>} {/*on click it adds 6 to the show amount so it updates state and rerenders showing 6 more items in the display */}
        <AddNyms type={type} nyms={nyms}/>
        </NymContext.Provider>
    </>
}

export {NymContext}

// everything is working as it should besides nymsState.display isnt updating in the return block although when i console log it - it shows the correct data