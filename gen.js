const fs = require("fs");

// читаем файл
const input = fs.readFileSync("russian_nouns.txt", "utf8");

// разбиваем по строкам, чистим пробелы
const words = input
    .split("\n")
    .map(w => w.trim())
    .filter(w => w.length > 11); // длина больше 11 символов

// создаём JS файл
const output = `export const words = ${JSON.stringify(words, null, 2)};\n`;

fs.writeFileSync("words_output.js", output, "utf8");

console.log(`Готово: ${words.length} слов сохранено в words_output.js`);
