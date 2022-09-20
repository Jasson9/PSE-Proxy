const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs")
const path = require("path");
async function getdata(local=false,writeFile=false) {
    if(local==null){
        return "Please define local true or false";
    };
    var result = [];
    var firsttime = true;
    var pages;
    var index = 0;
    do {
        var response = await fetch(`https://pse.kominfo.go.id/static/json-static/${local ? "LOKAL_TERDAFTAR" : "ASING_TERDAFTAR"}/${index}.json?page[page]=1&page[limit]=10&filter[search_term]=`, {
            "body": null,
            "method": "GET"
        });
        var data = await response.json();
        if (firsttime) {
            firsttime = false;
            pages = data.meta.page.lastPage;
        }
        for (let i = 0; i < data.data.length; i++) {
            result.push(data.data[i]);
        }
        index++;
    } while (index < pages);
    if(writeFile){
        fs.writeFileSync(path.join(__dirname,"../data",`result_${local ? "local" : "asing"}.json`), JSON.stringify({ result }, null, 4))
        fs.writeFileSync(path.join(__dirname, "../data", "metadata.json"),JSON.stringify({"updated_at":Date.now()},null, 4))
    }
    console.log(result);
    return result;
};
getdata(false,true);
getdata(true,true);
module.exports={
    getdata
}