const express = require("express");
const app = express();
const fspromise = require("fs/promises");
const pathlib = require("path");
const cookieparser = require('cookie-parser');
var notfound = `<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=404.html">
<script type="text/javascript">
    window.location.href = "404.html"
</script>
<title>Not Found</title>
</head>`

app.use(cookieparser());
//currently for express
app.use("/api/*",async function(req,res,next){
    var apiname = RegExp(/\w+$/).exec(req.baseUrl)[0]
    try{
        var data = require(pathlib.join(__dirname,"api",apiname)).main(req.query);
        res.json(data);
        res.end();
    }catch(err){
    console.log(err)
    res.writeHead(500);
    res.write("internal server error");
    res.end();
    return;
    }

})

function pathresolver(lang,path){
    var arrpath = path.split("/",2)
    switch (arrpath[0]) {
        case "css":
            return 'css/'+arrpath[1];
        default:
            return `${lang}/${path}`;
    }
}

app.use(async function(req,res,next){
    console.time('requesttime');
    var path = req.path.substring(1, req.path.length).toLowerCase();
    var cookielang = req.cookies.lang;
    if(path==null||path==""){
        path="index.html";
    }
    if(cookielang===undefined){
        res.cookie('lang','id');
        cookielang='id'
    }else{
        if(cookielang!='en'&&cookielang!='id'){
            res.cookie('lang','id');
            cookielang='id';
        }
    }

    console.log(cookielang);
    //console.log(path.toLowerCase());
    try {
        console.log(path);
        await fspromise.readFile(pathlib.join('pages',pathresolver(cookielang,path)),{encoding:"utf-8"})
        .catch(err => {
            console.log(err)
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(notfound);
            res.end();
            return;
        })
        .then(data => {
            if(data!=null){
                res.writeHead(200);
                res.write(data);
                res.end();
                console.timeEnd('requesttime');
                return
            }
        })
    } catch (error) {
        console.log(error)
    }
})

console.log("app started");
app.listen(3000);