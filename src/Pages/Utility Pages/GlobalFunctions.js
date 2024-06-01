const globalFunctions = {
  getRandomNumber: function (array) {
    let maxNum = array.length;
    let randomNum = Math.floor(Math.random() * maxNum);
    return randomNum;
  },
};

export { globalFunctions };
