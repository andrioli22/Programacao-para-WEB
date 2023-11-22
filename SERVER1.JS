const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

// Conecta com o banco de dados
const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudequipe'
})

// Conecta ao banco de dados
db.connect((err) => {
    console.log('Conectado ao banco de dados!');
});


// Obter todos os Clientes
app.get('/equipes', cors(), (req, res) => {
    let sql = 'SELECT * FROM equipe';
    db.query(sql, (err, results) => {
        res.json(results);
    });
});

// Obter um Cliente
app.get('/equipes/:cpf', cors(), (req, res) => {
    let sql = `SELECT * FROM equipe WHERE cpf=${req.params.cpf}`;
    db.query(sql, (err, results) => {
        res.json(results);
    });
});

// Adiciona Clientes
app.post('/equipes', (req, res) => {
    let equipe = req.body;
    let sql = 'INSERT INTO equipe SET ?';
    db.query(sql, equipe, (err, result) => {
        console.log(result);
    });
    res.status(201).json(equipe);
});

// Deleta clientes
app.delete('/equipes/:cpf', (req, res) => {
    let sql = `DELETE FROM equipe
    WHERE cpf=${req.params.cpf}`;
    db.query(sql, (err, result) => {
        res.send('Equipe Deletada!');
    });
});

// Altera clientes
app.put('/equipes/:cpf', (req, res) => {
    let equipe = req.body;
    let sql = `UPDATE equipe 
    SET 
    cpf='${equipe.cpf}',
    nome='${equipe.nome}',
    email='${equipe.email}',
    senha='${equipe.senha}',
    quantidade='${equipe.quantidade}', 
    especialidade='${equipe.especialidade}'
    WHERE cpf='${req.params.cpf}'`;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Ocorreu um erro durante a atualização da equipe.' });
        } else {
            console.log(result);
            res.json(equipe);
        }
    });
});


app.get('/', (request, response) => {
    response.send("Ola mundo")
})

app.listen(3002, () => {
    console.log("Servidor aberto na porta 3002")
})
