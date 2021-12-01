const { promises: fsp } = require('fs');
var path = require('path');

//var words = ;
//Скопировать сюда с words.js



var text = '';
words = words.sort((a, b) => a.localeCompare(b));
words.forEach(w => {
    text += w + '\n';
})






fsp.writeFile(path.join(__dirname, 'allWordsText.txt'), text);