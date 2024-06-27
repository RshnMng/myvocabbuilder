const wordInfoAndApi = {
  synKey: process.env.REACT_APP_SYN_KEY,
  dictionary: require("an-array-of-english-words"),
  getDefinition: (data) => { // checks to see if data is undefined, if it is we save it to an empty string so it doesnt through an error, if its not undefined then we we save the def to the variable definition
    let definition
    data === undefined ? definition = ' ' : definition = data[0][1];
    return definition;
  },
  getExample: (data) => { // the example sentence is a little more nested and has more places it can be located in the api so we use nested conditional logic to find where it is and turn undefined errors into empty strings
    let example;
    if(data === undefined){ // if there is no array provided at all we assign example an empty string
      example = ' ';
    }else if(data.length === 2){ // if there is an array provided, we look to see if there is two items in that array, our example (if provided) is usually in the second array
      if(data[1][1][0] === undefined){ // if there is a second array, we want to go into it and see if there is a second level nested array, if not assign example to empty string
        example = ' ';
      }else if(data[1][1][0].t === undefined) { // if there is a second level array, we then want to see if there is a key in an object that holds our example sentence, if this is undefined we then want to assign example an empty string
        example = ' ';
      } else {  
        example = data[1][1][0].t // if not none of these are true, then we know that there is indeed data located here and that data is our example sentence so we save it to example
      }
    }else if(data.length === 3){ // if we check if there is two items in data and it is false, we then want to check if there is three items
      if(data[2][1][0] === undefined) { // if there is no nested array here then we want to save an empty string to example
        example = ' '
      } else {
        example = data[2][1][0].t // if not, then we know that we have our example sentence here and save it to example
      }
    } else {
      example = ' ' // if none of the above is true, then we know that only a definition was provided and we save example as an empty string
    } 
    return example; // return example out of function
  },
  getAnts: (data) => { // both getAnts and getSyns map through various arrays and push the items into an array called full list and then returns the full list out of the function
    let fullList = []
    let antList =  data[1].ant_list
    let antList2 = data[1].near_list;


    antList === undefined ? antList = [] : antList.map((wordArr) => {
      wordArr.map((word) => {
        fullList.push(word.wd);
      })
        
    });
    antList2 === undefined ? antList2 = [] : antList2.map((wordArr) => {
        wordArr.map((word) => {
            fullList.push((word.wd))
        })
    })

  return fullList;
},
 getSyns : (data) => {
  let fullList = []
  let synList =  data[1].syn_list;
  let synList2 = data[1].rel_list;

 

  synList === undefined ? synList = [] : synList.map((wordArr) => {
    wordArr.map((word) => {
      fullList.push(word.wd);
    })
      
  });
   synList2 === undefined ? synList2 = [] : synList2.map((wordArr) => {
      wordArr.map((word) => {
          fullList.push((word.wd))
      })
  })

return fullList;
}
};

export { wordInfoAndApi };






















