/**
 * 
 * @param {object} data 
 * @param {string} keyword 
 * @returns 
 */
function search(data, keyword) {
    var resIndex = [];
    var results = [];
    var words = keyword.toUpperCase().split(" ");
    var target;
    for (var i = 0; i < data.length; i++) {
        target = Object.values(words);
        data[i].attributes.nama.split(/\W+/).forEach(word => {
            for(var k = 0; k < target.length;){
                if(target[k] == word){
                    target.splice(k,1);
                }else{
                    k++;
                }
            }
        })

        if (target.length>0) {
            data[i].attributes.nama_perusahaan.split(" ").forEach(word => {
                for(var v = 0; v < target.length;){
                if (target[v] == word) {
                    target.splice(v,1);
                }else{
                    v++
                }
            }
            })
        }
        if(target.length<=0){
            resIndex.push(i);
        }
    }
    resIndex.forEach(index => {
        results.push(data[index]);
    })
    return results;
};

module.exports={
    search
}