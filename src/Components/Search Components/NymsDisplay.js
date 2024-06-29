import {useState, useEffect, createContext} from 'react';
import AddNyms from './AddNyms';

let NymContext = createContext();


export default function NymsDisplay(props){
    let {nyms, type} = props;
    let [nymsState, setNymsState] = useState({
        nyms : nyms,
        showAmount: 6,
        display: []
    })

console.log(nymsState)
const { display } = nymsState.display; // destructures object key to a single variable containing an array so we can add it as a dependency for the useEffect and keep it from rerendering and looping
console.log(display)

useEffect(() => { // loops through array passed in through props either an array of syns or ants, and pushes each word to a new array that is saved in display state, it by defaults at showing 6 words only
    let words = []
    for(let x = 0; x < nymsState.showAmount; x++){
          words.push(<div>{nyms[x]}</div>)
       }
    setNymsState((prevState) => {return {...prevState, display: words}}) 
}, [display])



    return <>
        <NymContext.Provider value={[nymsState, setNymsState]}>
        {nymsState.display} {/*displays nyms*/}
        {nymsState.showAmount < nyms.length && <button onClick={() => setNymsState((prevState) => {return {...prevState, showAmount: nymsState.showAmount + 6}})}>Show More</button>} {/*on click it adds 6 to the show amount so it updates state and rerenders showing 6 more items in the display */}
        <AddNyms type={type} nyms={nyms}/>
        </NymContext.Provider>
    </>
}

export {NymContext}

// on add of new nyms, the state is being updated, but the useEffect isnt being rerendered, we destructured the state into a variable and use Effect is listening for the variable to change, we have to update the variable to get it change and we have to figure out how to do this without running a bunch of loops that was the original problem that useEffect solved