const express = require("express")
const app = express()
const port = 8081
const moment = require("moment")
const Aluno = require('./models/Aluno')
const handlebars = require("express-handlebars")
app.engine("handlebars", handlebars({
    defaultLayout: 'main',
    helpers:{
        formatDate: (date)=>{
            return moment(date).format('DD/MM/YYYY')
        } 
    }
}))
app.set('view engine', "handlebars")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req, res)=>{
    Aluno.findAll().then((alunos)=>{
        res.render('home',{alunos: alunos})
    })
})
app.get("/cadastro", (req, res)=>{
    res.render('cadastroAluno')
})
app.post("/criar_cadastro", (req, res)=>{
    Aluno.create({
        nome: req.body.nome,
        sobreNome: req.body.sobreNome,
        email: req.body.email
    }).then(()=>{
        res.redirect('/')
    }).catch((erro)=>{
        console.log(`erro ao inserir aluno: ${erro}`)
    })
})

app.listen(port, ()=>{
    console.log(`servidor rodando na url http://localhost${port}`)
})

