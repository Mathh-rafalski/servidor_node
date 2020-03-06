const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const moment = require('moment');
const socket = require('socket.io');
const cors = require('cors');
const path = require('path')
const router = express.Router()
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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cad', function (req, res) {
    res.sendFile(path.join('C:','Users','Matheus','Desktop','a','index.html'));
    //C:\Users\Matheus\Desktop\a
})
var server = app.listen(80)
//rotas
app.get('/tarefas', function (req, res) {
    let sql = 'select descricao,data_hora from tarefas where data_hora'
    connection.query(sql,
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
app.get('/mesAtual', function(req, res) {
    connection.query('select descricao,data_hora from tarefas where extract(month from data_hora) = extract(month from current_date) ',
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
app.post('/addCompromisso', function (req, res) {
    console.log(req.body.dataHora);
    let sql = "INSERT INTO `tarefas` (`descricao`,`data_hora`) VALUES ('" + req.body.descricao + "', '" +req.body.data_hora + "')";
    connection.query(sql, function(err, result)  {
    res.send(req.body.descricao)
});
});

app.get('/', function (req, res) {
    res.send('Hello')
});
app.get('/test/:dataBusca', function (req, res) {
    console.log(req.params.dataBusca)
    let sql = 'select descricao,data_hora from tarefas where data_hora like "%'+""+'%"'
    connection.query(sql,
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