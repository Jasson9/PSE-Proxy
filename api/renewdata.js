const {getdata} = require("../lib/data"); 
const metadata = require("../data/metadata.json");

function main(){
    if(Date.now()-metadata.updated_at >= 3600000){
        try {
            getdata(false,true);
            getdata(true,true);
            return {
                "status": 200,
                "message": "ok",
                "data": {
                    "result":"success"
                }
            }
        } catch (error) {
            return {
                "status": 400,
                "message": "bad request",
                "data": {}
            }
        }

    }else{
        return{
            "status": 200,
            "message": "ok",
            "data": {
                "result":"on cooldown"
            }
        }
    }
}