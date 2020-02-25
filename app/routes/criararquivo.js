module.exports = function(app){
// AWS
var s3 = require('aws-sdk')
// GET
app.get('/criararquivoxxx',function(req,res){
    
    console.log(req.body);
    var dstBucket = req.body.nome;
    var dstKey = 'arquivo.txt';
    var arquivo = 'Arquivo TXT criado com sucesso!';
    
    s3.putObject({
        Bucket: dstBucket,
        Key: dstKey,
        Body: arquivo
    },
    function(err, data) {
        if (err) {
            returnS3(err);
            console.log(err);
        } else {
            returnS3(data);
            console.log(data);
        }
    });

    var returnS3 = function(result){
        result = JSON.stringify(result);
        return result;
    }
	
});

}