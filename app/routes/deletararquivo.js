module.exports = function(app){
// AWS
var s3 = require('aws-sdk')
// GET
app.get('/deletararquivoXXX',function(req,res){

    var params = {
      Bucket: req.body.bucketname,
      Key: 'arquivo.txt'
    };
    s3.deleteObject(params, function(err, data) {
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
        var body = '<html>'
  		    +'	<head>'
  		    +'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
  		    +'	</head>'
  		    +'	<body>'
  		    +	result
  		    +'	</body>'
  	         +'</html>';
        console.log(result);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write(body);
        res.end();
    }
	
});
}