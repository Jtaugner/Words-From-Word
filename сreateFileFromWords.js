const { promises: fsp } = require('fs');
const fs = require("fs");

var path = require('path');
let str = '';
words = words.sort((a, b) => a.localeCompare(b));
for(let i = 0; i < words.length; i++){
    str += words[i] + '\n';
}
let newWords;
// fs.readFile("newWords.txt", "utf8",
//     function(error,data){
//         newWords = data.split('\n');
//         let deleted = 0;
//         for(let i = 0; i < words.length; i++){
//             if(!newWords.includes(words[i])) deleted++;
//         }
//         console.log('Удалено слов: ', deleted);
//         let added = 0;
//         for(let i = 0; i < newWords.length; i++){
//             if(!words.includes(newWords[i])) added++;
//         }
//         console.log('Добавлено слов: ', added);
//         fsp.writeFile(path.join(__dirname, 'newAllWords.js'), JSON.stringify(newWords));
//     });

fsp.writeFile(path.join(__dirname, 'words.txt'), str)