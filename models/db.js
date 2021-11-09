const Sequelize = require("sequelize")

const sequelize = new Sequelize('aula6','root','031717440',{
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(()=>{
    console.log("conectado com sucesso ao banco")
}).catch((erro)=>{
    console.log(`erro ao conectar ao banco: ${erro}`)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}