const {load} = require("../lib/load")

function main(args={
    amount:20,
    page:1
}){
    if(!args.amount)args.amount=20
    if(!args.page)args.page=1
    var arrList = []
    var arrdata =  load(["result_asing.json","result_local.json"]);
    var maxpage = arrdata/args.amount;
    for(var i = args.amount*(args.page-1); i < args.amount*args.page && arrdata[i]!=null; i++){
        arrList.push(arrdata[i]);
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
    };
}

module.exports={
    main
}