import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');


function compressDataObj(wordsFromWords){
  try{
    const newData = {};
    const doneLevels = [];
    Object.keys(wordsFromWords).forEach(el => {
      let lvl = allWords.indexOf(el);
      if(wordsFromWords[el] === 1){
        doneLevels.push(lvl);
        return;
      }
      wordsFromWords[el].forEach(w => {
        if(newData[w]){
          newData[w].push(lvl);
        }else{
          newData[w] = [lvl];
        }
      })
    });
    newData.doneLevels = doneLevels;
    return newData;
  }catch(e){
    return wordsFromWords;
  }

}
function decompressDataObj(compressedWords){
  const data = {};
  const dl = compressedWords.doneLevels;
  if(dl){
    for(let i = 0; i < dl.length; i++){
      data[ allWords[dl[i]] ] = 1;
    }
  }
  const midData = {};
  Object.keys(compressedWords).forEach(el => {

    if(el === 'doneLevels') return;
    compressedWords[el].forEach(l => {
      if(midData[l]){
        midData[l].push(el);
      }else{
        midData[l] = [el];
      }
    })
  });
  Object.keys(midData).forEach(el => {
    data[allWords[el]] = midData[el];
  })
  return data;
}
function testData(data){
  console.log(JSON.stringify(data) === JSON.stringify(decompressDataObj(compressDataObj(data))));
}