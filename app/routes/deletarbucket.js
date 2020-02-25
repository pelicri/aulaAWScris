module.exports = function(app){
// AWS
var s3 = require('aws-sdk')
// GET
app.get('/deletarbucketXXX',function(req,res){
	
    var params = {
        Bucket: req.body.bucketname,
    };
    s3.deleteBucket(params, function(err, data) {
        if (err) {
          returnS3(err);
            console.log(err);
        } else {
          returnS3(data);
          console.log(data);
          console.log("Bucket: " + req.body.bucketname + " deletado com sucesso");
        }
    });

    var returnS3 = function(result){
        result = JSON.stringify(result);
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	"Bucket: " + req.body.bucketname + " deletado com sucesso"
  		    +'	</body>'
  	         +'</html>';
        console.log(result);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});

}