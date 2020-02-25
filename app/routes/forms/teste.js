module.exports = function(app){
    var AWS = require('aws-sdk')
    // AWS
    var s3 = new AWS.S3();
    var resultado;

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
                      resultado = "Bucket " + req.body.nome + " criado com sucesso";
                      res.render('teste', {resultado: resultado });
                      
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
                        res.render('teste', "Deu merda");
                    } else {
                        resultado = "Arquivo criado com sucesso";
                        res.render('teste', {resultado: resultado });
                        
                    }
                });
                break;
            case "deletararquivo":
                  var params = {
                    Bucket: req.body.nome,
                    Key: 'arquivo.txt'
                  };
                  s3.deleteObject(params, function(err, data) {
                      if (err) {
                        console.log("deu merda");
                        res.render('teste', "Deu merda");
                      } else {
                        resultado = "Arquivo deletado com sucesso";
                        res.render('teste', {resultado: resultado });
                      }
                  });
                break;
            case "deletarbucket":
                var params = {
                    Bucket: req.body.nome,
                };
                s3.deleteBucket(params, function(err, data) {
                    if (err) {
                        console.log("deu merda");
                        res.render('teste', "Deu merda");
                      } else {
                        resultado = "Bucket deletado com sucesso";
                        res.render('teste', {resultado: resultado });
                      }
                });
                break;
        }
        
        var returnS3 = function(result){
        
            result = JSON.stringify(result);
            
        }
    });

}