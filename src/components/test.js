   let id = event.target.id;
    let chosenWord = definitions[id];

    let storageJSON;

    localStorage.getItem("dojoDeck") === null ? (storageJSON = JSON.stringify([])) : (storageJSON = localStorage.getItem("dojoDeck"));

    let storageDeck = JSON.parse(storageJSON);

    storageDeck.forEach((item) => {
      let index;
      name === "syn" ? (index = 4) : (index = 5);
      let chosenArr = chosenWord[index];

      index === 4 ? chosenArr.push(component.syn) : chosenArr.push(component.ant);

      index === 4 ? chosenWord.splice(4, 1, chosenArr) : chosenWord.splice(5, 1, chosenArr);

      console.log(chosenArr, "chosenArr", chosenWord, "chosenWord");

      // item[1] === chosenWord[1] ? console.log(true) : console.log(false);
    });

    // setState((prevState) => {
    //   return { ...prevState, definitions: definitions };
    // });
    // setComponent(() => {
    //   return { syn: "", ant: "" };
    // });
  }

  function addToDojoDeck(event, id) {
    let index = event.target.id;
    let chosenDef = definitions[index];
    let storageJSON;

    localStorage.getItem("dojoDeck") === null ? (storageJSON = JSON.stringify([])) : (storageJSON = localStorage.getItem("dojoDeck"));

    // adjust this function so it checks dojo deck and see if the chosen array is already in array and if so,
    // find if so, it modifies the deck in dojo either by adjusting it or just replacing it all together
    // adjust the index comnination so its not coming out as combined nubmers like 1 + 7 = 17

    let storageDeck = JSON.parse(storageJSON);

    storageDeck.map((item) => {
      console.log(chosenDef);
      if (item[1] === chosenDef[1]) {
        console.log(item[id]);
        return item[id].splice(0, item[id].length, chosenDef[id]);
      }
    });

    console.log(storageDeck);

    // setState((prevState) => {
    //   return { ...prevState, dojoDeck:

    //   };
    // });

    let newDeck = [...storageDeck, chosenDef];
    let newDeckJSON = JSON.stringify(newDeck);
    localStorage.setItem("dojoDeck", newDeckJSON);