const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyparser = require('body-parser')

const app = express();

app.use(cors())
app.use(bodyparser.json());

// Conecta com o banco de dados
const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})

// Conecta ao banco de dados
db.connect((err) => {
    console.log('Conectado ao banco de dados!');
});

// Obter todos os produtos
app.get('/equipe', cors(), (req, res) => {
    let sql = 'SELECT * FROM equipe';
    db.query(sql, (err, results) => {
        res.json(results);
    });
});

// Adiciona Produtos
app.post('/equipe', (req, res) => {
    let equipe = req.body;
    let sql = 'INSERT INTO equipe SET ?';
    db.query(sql, equipe, (err, result) => {
        console.log(result);
        
    });
    res.json(equipe);
    
});

// Deleta Produtos
app.delete('/equipe/:id', (req, res) => {
    let sql = `DELETE FROM equipe WHERE id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Equipe Deletada!');
    });
});

// Altera Produtos
app.put('/equipe/:id', (req, res) => {
    let equipe = req.body;
    let sql = `UPDATE equipe 
    SET id='${equipe.id}',
    nome='${equipe.nome}',
    email='${equipe.email}',
    quantidade='${equipe.quantidade}',
    especialidade='${equipe.especialidade}'
    WHERE id='${req.params.id}'`;
    
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(equipe);
    });
});

app.get('/', (request, response) => {
    response.send("Ola mundo")
})

app.listen(3001, () => {
    console.log("Servidor aberto na porta 3001")
})