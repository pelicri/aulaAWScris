module.exports = function(app){
    var AWS = require('aws-sdk')
    // AWS
    var s3 = new AWS.S3();
    var resultado;

    //formulário de testes das API's
    app.get('/forms/teste', function(req,res){
        res.render('forms/teste');
    });

    //APIs AWS - salvar irá identificar a seleção do formulário e chamar a api correta
    app.post('/teste/salvar', function(req,res){
        var nome = req.body;
        //res.render('Fteste');
        //res.send(req.body);
        //console.log(nome);

        switch (req.body.opt) {
            //chamada da API para criação do Bucket
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

            //Chamada da API para criar um arquivo no bucket selecionado
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
            
            //deletar o arquivo selecionado
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

            //deletar o bucket selecionado
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