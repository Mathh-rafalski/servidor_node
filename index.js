const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const moment = require('moment');
const socket = require('socket.io');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tarefas'
})

connection.connect(function (err) {
    if (err) {
        console.error('erro conectando ao banco: ' + err.stack);
        return;
    }
    console.log('Banco conectado')
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rotas
app.get('/contas', function (req, res) {
    connection.query('select descricao,data_hora from tarefas',
        function (error, results, fields) {
            if (error)
                res.json(error);
            else {
                results.forEach(element => {
                    element.data_hora = moment(element.data_hora).format('DD/MM/YYYY HH:mm')
                });
                res.json(results);
                //connection.end();
            }
                
            console.log("executed");
        });
});
app.get('/gjson', function (req, res) {
    let retorno = { ola: "Mundo" }
    res.send(retorno)
});
app.post('/pjson', function (req, res) {
    console.log(req.body.dataHora);
    var sql = "INSERT INTO `tarefas` (`descricao`,`data_hora`) VALUES ('" + req.body.descricao + "', '" + req.body.dataHora + "')";
    connection.query(sql, function(err, result)  {
    res.send(req.body.descricao)
});
});

app.get('/', function (req, res) {
    res.send('Hello')
});

app.listen(80, function () {
    console.log('Example app listening on port 3000');
});