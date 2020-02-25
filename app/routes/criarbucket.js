module.exports = function(app){
// AWS
var AWS = require('aws-sdk');
var s3 = require('aws-sdk')
// GET
app.get('/criarbucketXXX',function(req,res){
	
    var params = {
        Bucket: req.body.bucketname   
    };
    s3.createBucket(params, function(err, data) {
        if (err) {
          returnS3(err);
          console.log(err);
        } else {
          returnS3(data);
          console.log(data);
          console.log("Bucket: " + req.body.bucketname + " criado com sucesso");
        }
    });

    var returnS3 = function(result){
        
        result = JSON.stringify(result);
        
    }
	
});
}