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
//cadastro
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
        res.redirect('/')
    })
})
//Editar
app.get('/editar/:id',(req, res)=>{
    id=req.params.id
    res.render('editar')
})
app.post('/editar', (req, res)=>{
    Aluno.update({
        nome: req.body.nome,
        sobreNome: req.body.sobreNome,
        email: req.body.email
    },{
        where: {id: id},
    }).then(()=>{
        res.redirect('/')
    }).catch((erro)=>{
        console.log(`Erro ao editar: ${erro}`)
    })
})
//exclusão
app.get('/deletar/:id', (req, res)=>{
    Aluno.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        res.redirect('/')
        console.log('registro excluído com sucesso!')
    }).catch((erro)=>{
        console.log(`erro ao excluir registro: ${erro}`)
    })
})


app.listen(port, ()=>{
    console.log(`servidor rodando na url http://localhost${port}`)
})

