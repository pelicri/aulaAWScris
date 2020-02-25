module.exports = function(app){
    var AWS = require('aws-sdk')
    // AWS
    var s3 = new AWS.S3();
    
    app.get('/forms/teste', function(req,res){
        res.render('forms/teste');
    });

    app.post('/teste/salvar', function(req,res){
        var nome = req.body;
        //res.render('Fteste');
        //res.send(req.body);
        //console.log(nome);

        switch (req.body.opt) {
            case "criarbucket":
                var params = {
                    Bucket: req.body.nome   
                };
                s3.createBucket(params, function(err, data) {
                    if (err) {
                      returnS3(err);
                      console.log(err);
                    } else {
                      returnS3(data);
                      console.log(data);
                      console.log("Bucket: " + req.body.bucketname + " criado com sucesso");
                      res.render('teste', {resultado: req.body.nome});
                      
                    }
                });
                break;

            case "criararquivo":
                console.log(req.body);
                var dstKey = 'arquivo.txt';
                
                s3.putObject({
                    Bucket: req.body.nome,
                    Key: dstKey,
                    Body: req.body.texto
                },
                function(err, data) {
                    if (err) {
                        console.log("deu merda");
                    } else {
                        res.render('teste', req.body);
                    }
                });
                break;
            case "deletararquivo":
                res.render('teste', {resultado: req.body.opt});
                break;
            case "deletarbucket":
                res.render('teste', {resultado: req.body.opt});
                break;
        }
        
        var returnS3 = function(result){
        
            result = JSON.stringify(result);
            
        }
    });

}