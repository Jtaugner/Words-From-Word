const { promises: fsp } = require('fs');

var path = require('path');

fsp.readFile(path.join(__dirname, 'dateparse.csv'), {encoding: 'UTF8'}).then((text)=>{
    let arr = [];
    text.split('\n').reverse().forEach((str,ind)=>{
        let arrCSV = str.split(',');
        if(arrCSV[0] === '"badWord"'){
            if(arrCSV[1].length === 5){
                console.log(arrCSV[1], " - ", arrCSV[6]);


            }
        }

    });
});