const globalFunctions = {
  getRandomNumber: function (array) {
    let maxNum = array.length;
    let randomNum = Math.floor(Math.random() * maxNum);
    return randomNum;
  },
  removeSpecialChars: function (data){
    console.log(data, typeof(data))
    let regex = /[^0-9a-zA-Z]+/g
    let newDef = data.replace(regex, ' ');

    let newerDef = newDef.replace( /bc/g, '');
    let def1 = newerDef.replace(/sx/g, '');
    let def2 = def1.replace(/dx/g, '');
    let def3 = def2.replace(/dxt/g, '');
    let def4 = def3.replace(/d link/g, '')
    let def5 = def4.replace(/def/g , '')
    let def6 = def5.replace(/1 1e/g , '')
    let def7 = def6.replace(/see t/g , '');
    let def8 = def7.replace(/it /g, '');
    let def9 = def8.replace(/wi /g, '');
    let def10 = def9.replace(/ wa/g, '');
    
    return def10
  }
};

export { globalFunctions };

 // i think that data.replace is throwing an error when its being applied to an object, make it so if the data passed into the function is an
 // object we do not run the function on it, or further destructure the object inside of the removespecial characgters function