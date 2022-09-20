const { search } = require("../lib/search.js");
const { load } = require("../lib/load.js");
const fs = require("fs");
const path = require("path")
//will be merge with fetch soon
function main(args = {
    keyword, amount, page
}) {
    try {
        if (!args.amount||args.amount>50) args.amount = 20;
        if (!args.page) args.page = 1;
        var arrList = [];
        if (args.keyword) {
            var res = search(load(["result_asing.json", "result_local.json"]), decodeURIComponent(args.keyword));
        } else {
            var res = load(["result_asing.json", "result_local.json"])
        }
        var maxpage = Math.ceil(res.length / args.amount);
        for (var i = args.amount * (args.page - 1); i < args.amount * args.page && res[i] != null; i++) {
            arrList.push(res[i]);
        }
        var metadata = JSON.parse(fs.readFileSync(path.join(__dirname,"../","data","metadata.json"),{encoding:"utf-8"}))
        console.log("h")
        return {
            "status": 200,
            "message": "ok",
            "data": {
                "page": args.page,
                "maxpage": maxpage,
                "amount": args.amount,
                "result": arrList,
                "metadata":metadata
            }
        }
    } catch (error) {
        console.log(error)
        return {
            "status": 400,
            "message": "Bad Request",
            "data": {}
        }
    }

}

module.exports = {
    main
}