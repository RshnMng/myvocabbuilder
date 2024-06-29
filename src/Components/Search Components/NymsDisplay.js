import {useState, useEffect} from 'react';
import AddNyms from './AddNyms';

export default function NymsDisplay(props){
    let {nyms, type} = props;
    let [nymsState, setNymsState] = useState({
        nyms : nyms,
        showAmount: 6,
        display: []
    })
    
   
useEffect(() => { // loops through array passed in through props either an array of syns or ants, and pushes each word to a new array that is saved in display state, it by defaults at showing 6 words only
    let words = []
    for(let x = 0; x < nymsState.showAmount; x++){
          words.push(<div>{nyms[x]}</div>)
       }
    setNymsState((prevState) => {return {...prevState, display: words}})
}, [nymsState.display, nymsState.showAmount])



    return <>
        {nymsState.display} {/*displays nyms*/}
        {nymsState.showAmount < nyms.length && <button onClick={() => setNymsState((prevState) => {return {...prevState, showAmount: nymsState.showAmount + 6}})}>Show More</button>} {/*on click it adds 6 to the show amount so it updates state and rerenders showing 6 more items in the display */}
        {/* <AddNyms type={type} nyms={nyms}/> */}
    </>
}