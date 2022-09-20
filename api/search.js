const {search} = require("../lib/search.js");
const {load} = require("../lib/load.js");

//will be merge with fetch soon
function main(args={
    keyword,amount,page
}){
    if(!args.keyword||args.keyword==" "){
        return {
            "status":400,
            "message":"Bad Request",
            "data":{}
    }}
    if(!args.amount)args.amount=10;
    if(!args.page)args.page=1;
    var arrList = [];
    var searchres = search(load(["result_asing.json","result_local.json"]),decodeURIComponent(args.keyword));
    var maxpage = searchres/args.amount;
    for(var i = args.amount*(args.page-1); i < args.amount*args.page && searchres[i]!=null; i++){
        arrList.push(searchres[i]);
    }
    return {
        "status":200,
        "message":"ok",
        "data":{
            "page":args.page,
            "maxpage":maxpage,
            "amount":args.amount,
            "result":arrList
        }
    }
}

module.exports={
    main
}