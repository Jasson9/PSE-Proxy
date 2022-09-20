const path = require("path");
const fs = require("fs");

/**
 * 
 * @param {object} files object of string contain .json file for fetch
 * @returns
 */
function load(files) {
    if (typeof files != "object") {
        return new Error("files must be type of Array");
    }
    var resArray = [];
    for (var i = 0; i < files.length; i++) {
        var data = JSON.parse(fs.readFileSync(path.join(__dirname,"../data" ,files[i]), { encoding: "utf-8" }));
        for (var t = 0; t < data.result.length; t++) {
            resArray.push(data.result[t]);
        }
    }
    return resArray;
};

module.exports={
    load
}