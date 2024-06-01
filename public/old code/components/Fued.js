export default function Fued() {
  return (
    <>
      <div>test</div>
    </>
  );
}

// let index = event.target.id;
// let wordInfo = defs[index][4];

// function isCorrect(word, array) {
//   let inArray = array.includes(word);

//   inArray ? displayAnswer() : showX();
// }

// function displayAnswer() {
//   let answerHTML = document.getElementsByClassName("fued-answer");
//   let answerElem = Array.from(answerHTML);
//   findOpenIndex(answerElem, state.usedIndex);
//   removeFromCopyList(state.userAnswer, synCopy, "synCopy");
// }

// function findOpenIndex(ansarr, arr) {
//   let randomIndex = Math.floor(Math.random() * 6);
//   arr.includes(randomIndex)
//     ? findOpenIndex(ansarr, arr)
//     : setState((prevState) => {
//         ansarr[randomIndex].textContent = state.userAnswer;
//         arr.push(randomIndex);
//         return { ...prevState, usedIndex: arr };
//       });
// }

// function removeFromCopyList(answer, array, name) {
//   let newArr;

//   array.includes(answer) ? (newArr = array.filter((items) => items !== answer)) : (newArr = array);

//   setState((prevState) => {
//     return { ...prevState, [name]: newArr };
//   });
// }

// function showX() {
//   ("X");
// }

/* {defs.length !== 0 && <button>add definition</button>}
        <div className="fued-answer">1</div>
        <div className="fued-answer">2</div>
        <div className="fued-answer">3</div>
        <div className="fued-answer">4</div>
        <div className="fued-answer">5</div>
        <div className="fued-answer">6</div>

        <input type="text" className="fued-input" onChange={(event) => handleChange(event)}></input>
        {synAntChoice === "synonym" ? <button onClick={() => isCorrect(state.userAnswer, synCopy)}>Enter Synonym</button> : <button onClick={() => isCorrect(state.userAnswer, antCopy)}>Enter Antonym</button>}
        {antCopy.length === 0 && synAntChoice === "antonym" && firstUse === false ? (
          <div className="alert alert-light" role="alert">
            there are no antonyms for this word, would you like to add your own? or train synonyms?
            <button
              onClick={() =>
                setState((prevState) => {
                  return { ...prevState, chosenSynAnt: "synonym" };
                })
              }
            >
              Train Synonyms
            </button>
            <button onClick={() => saveToDeck(state, "dojo")}>Add Antonyms</button>
          </div>
        ) : synCopy.length === 0 && synAntChoice === "synonym" && firstUse === false ? (
          <div className="alert alert-light" role="alert">
            there are no synonyms for this word, would you like to add your own? or train antonyms?
            <button className="btn-success">Train Antonyms</button>
            <button className="btn-secondary">Add Synonyms</button>
          </div>
        ) : null} */

//        <div className="study-btn-div d-flex">
//   <button className="study-btn" onClick={() => saveToDeck(state, "studyDeck")}>
//     add to study
//   </button>
//   <button className="fav-btn" onClick={() => saveToDeck(state, "favDeck")}>
//     add to favorites
//   </button>
//   <button className="fav-btn" onClick={() => saveToDeck(state, "dojo")}>
//     add to dojo deck
//   </button>
//   <Link to="/trainer">
//     <button className="def-home-btn">Go To Decks</button>
//   </Link>
//   <Link to="/choose">
//     <button className="def-home-btn">Home</button>
//   </Link>
// </div>
