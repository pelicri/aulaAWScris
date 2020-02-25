// Dependencias
var AWS = require('aws-sdk');
var consign = require('consign');
var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
// Parsear o conteudo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Configuração da requisição, cabeçalhos, etc. CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Métodos que queremos permitir
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())

//configurar utilização de views ejs
app.set('view engine', 'ejs');
app.set('views','app/views');

consign().include('./app/routes')
         .then('./app/models')
         .into(app);


module.exports = app;
//module.exports = AWS;
//module.exports = bodyParser;