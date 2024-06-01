const local = {
  initialDeckSetUp: function () {
    // checks if our storage decks are null or undefined - if so - it makes it an empty array and saves it to local storage
    let study = local.IfStorageNullMakeEmptyArray("studyDeck");
    let fav = local.IfStorageNullMakeEmptyArray("favDeck");
    let struggle = local.IfStorageNullMakeEmptyArray("struggleDeck");
    let dojo = local.IfStorageNullMakeEmptyArray("dojoDeck");
    this.saveToLocal("studyDeck", study);
    this.saveToLocal("favDeck", fav);
    this.saveToLocal("struggleDeck", struggle);
    this.saveToLocal("dojoDeck", dojo);
    let areEmpty = this.AreAllDecksEmpty(); // checks if study decks are empty and returns boolean to app file
    return areEmpty;
  },
  saveToLocal: function (name, data) {
    let dataJSON = JSON.stringify(data);
    localStorage.setItem(name, dataJSON);
  },
  getFromLocal: function (name) {
    let storageJSON = localStorage.getItem(name);
    let storage = JSON.parse(storageJSON);
    return storage;
  },
  IfStorageNullMakeEmptyArray: function (name) {
    // takes name of variable and checks if the local storage for that name, if returns null or undefined it makes it an empty array, if not it returns whatever is saved
    let storage = local.getFromLocal(name);
    storage == null || storage == undefined ? (storage = []) : (storage = storage);

    return storage;
  },
  AreAllDecksEmpty: function () {
    let areEmpty;
    let dataNames = ["studyDeck", "dojoDeck", "struggleDeck", "favDeck"];
    let dataLength = 0;
    dataNames.map((name) => {
      // maps through deck names
      let data = this.getFromLocal(name); // uses the name to get them from local
      dataLength += data.length; // adds length of study array saved in storay to data length
    });
    dataLength == 0 ? (areEmpty = true) : (areEmpty = false); // if all the lengths == 0 then all the decks are empty if not then they arent all empty
    return areEmpty; // returns boolean if decks are empty or not
  },
};

export { local };
