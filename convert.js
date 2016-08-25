/**
 * Author: John Pinkster
 * Description: This file will take all the zipped or unzipped properties
 *              files, unzip them and turn them into JSONs
 */

// Pull in node modules
var fs = require('fs'),
    unzip = require('unzip');


// Declare out direcotry in / out
var inDir = 'strings/',
    outDir = 'jsons/';


// Create the JSONs folder if it doesn't exist
if (fs.existsSync(outDir)===false) {
    fs.mkdir(outDir);
}

// Read all the files in the input directory
fs.readdir(inDir, function (err, filenames) {
    if (err) {
        onError(err);
        return;
    }

    // iterate through files
    filenames.forEach(function (filename) {
        // if it is a zip, unzip it and pass the readable stream to the writeJson function
        if (filename.indexOf('.zip') != -1) {
            fs.createReadStream(inDir + filename)
                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    writeJson(entry, filename);
                });
        }
        // otherwise take the non-zipped properties files and pass readable stream to writeJson
        else if (filename.indexOf('.zip') === -1 && filename.indexOf('.properties') !== -1) {
            writeJson(fs.createReadStream(inDir + filename), filename);
        }
    });
});


// Function that reads each line, converts to key value pair, and writes JSON
function writeJson(entry, filename) {
    var remaining = '',
        file = {};

    // make my json filename
    var jsonFileName = filename.substring(filename.indexOf('_') + 1, filename.indexOf('.'));

    // get the data from the file
    entry.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        // iterate line by line
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);

            // split into key/val pair
            var keyVal = line.split('=');
            file[keyVal[0]] = keyVal[1];

            index = remaining.indexOf('\n');
        }
    });

    // when all read, write out the file to the out folder
    entry.on('end', function () {

        fs.writeFile(outDir+jsonFileName + '.json', sanitizeData(JSON.stringify(file)));
    });
}

function sanitizeData(value) {
    return value.replace(/\\\\/g, '\\');
}
