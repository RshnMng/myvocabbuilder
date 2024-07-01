import {useState, useEffect, createContext} from 'react';
import AddNyms from './AddNyms';

let NymContext = createContext();


export default function NymsDisplay(props){
    let {nyms, type} = props;
    
    let first6 = nyms.slice(0, 6); // grabs the first 6 of the nyms array 

   

    
    let [nymsState, setNymsState] = useState({ // sets state for component
        nyms : nyms, // original array of nyms
        showAmount: 6,  // this is how many words we are showing at a time, its default is set to 6 and increases by 6 on button click
        display: first6, // this is first set to the default 6 and then will be updated with a new array once state changes
        displayLength: nyms.length, // amount of words in original array, we use this to conditionally know when all the nyms have been reached
    })


function showMoreNyms(){
    let newAmount = nymsState.showAmount + 6; // adds 6 to whatever the previous amount of words are being displayed at any given moment
    let words = [] // empty array to add new nyms to

    for(let x = 0; x < newAmount; x++){ // loops through the original nyms array containing all the syns/ants and pushes each word into the empty array up until it x reaches the show amount
          words.push(<div>{nyms[x]}</div>)
       }
    setNymsState((prevState) => {return {...prevState, display: words, showAmount: newAmount}}) // sets new state for display, and showamount
   
    }

    return <>
        <NymContext.Provider value={[nymsState, setNymsState]}>
       {nymsState.display.map((word) => { // loops through modified array held in display that only holds the selected amount of nyms and displays them on the page
        return <div>{word}</div>
       })} {/*displays nyms*/} 
        {nymsState.showAmount < nyms.length && <button onClick={() => showMoreNyms()}>Show More</button>} {/*on click runs show more nyms function above */} 
        <AddNyms type={type} nyms={nyms}/>
        </NymContext.Provider>
    </>
}

export {NymContext}

// Next Steps //
// A functionality that when you modify a word it saves it to study deck
// Add functionality where you can save a word to study deck for both dictionary and thesauraus 
// add functionality where you can favortie a word and it goes to favortie deck, alerts user and asks if they want to add and to study deck as well
// add functionality to add all definitions on a given page to a particular deck