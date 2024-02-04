const { promises: fsp } = require('fs');

var fs = require('fs');
var path = require('path');
var archiver = require('archiver');



let notIncludesFiles = ['.DS_Store', 'manifest-icon.png', 'yandex-manifest.json', 'precache-manifest', 'asset-manifest', 'sw.js', 'service-worker.js'];
let notEndFiles = ['.map', 'LICENSE.txt'];
function isFileGood(name) {
    for(let i = 0; i < notIncludesFiles.length; i++){
        if(name.indexOf(notIncludesFiles[i]) !== -1) return false;
    }
    for(let i = 0; i < notEndFiles.length; i++){
        if(name.substr(-notEndFiles[i].length) === notEndFiles[i]) {
            return false;
        }
    }
    return true
}
var getFiles = function (dir, files_){

    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};

let allFiles = getFiles('./dist');
allFiles = allFiles.filter((file)=>{
    return isFileGood(file);
});
allFiles = allFiles.map((file) => {
    return '"' + file.replace('./dist/', '') + '"';
});

const allFilesString = allFiles.join(',\n');
const version = Date.now();

const  contentSW = `var CACHE_NAME = 'v${version}';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([${allFilesString}]);
        })
    );
});
var CACHE_PREFIX = 'game-v';

this.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

this.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0 ||
        event.request.url.indexOf('an.yandex.ru') !== -1
    ) {
        return;
    }
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
`;
const gameColor = "#309e7e";
const contentManifest = `
{
  "icons": [{
    "src": "icon.png",
    "sizes": "512x512",
    "type": "image/png"
  }],
  "yandex": {
    "splash_screen_color": "${gameColor}",
    "cache": {
      "resources": [
        ${allFilesString}
      ]
    }
  }
}
`;

console.log('sw version:', version);

fsp.writeFile(path.join(__dirname, 'dist/sw.js'), contentSW);
fsp.writeFile(path.join(__dirname, 'dist/yandex-manifest.json'), contentManifest);

var output = fs.createWriteStream(path.join(__dirname, 'archiveBuild/archive.zip'));
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(path.join(__dirname, 'dist/'), false);

// // append files from a sub-directory and naming it `new-subdir` within the archive
// archive.directory('subdir/', 'new-subdir');

archive.finalize();