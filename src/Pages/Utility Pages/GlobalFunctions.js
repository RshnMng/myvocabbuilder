const globalFunctions = {
  getRandomNumber: function (array) {
    let maxNum = array.length;
    let randomNum = Math.floor(Math.random() * maxNum);
    return randomNum;
  },
  removeSpecialChars: function (data){
    let regex;
    typeof(data) === 'object' ? data = '' : 
     regex = /[^0-9a-zA-Z]+/g
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

