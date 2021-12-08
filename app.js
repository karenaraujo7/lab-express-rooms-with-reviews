// 1- Importar express
const express = require("express")

const connectToDb = require('./config/db.config') 

// 2- Instanciar o express
const app = express()

app.use(express.json());

// Ligar os roteadores na instância do Express
const roomsRouter = require('./routes/rooms.routes')

app.use('/api', roomsRouter)


// Esperando conexão com o banco de dados antes de subir o servidor Express.
connectToDb
    .then(() => {
        // Escutar requisições em uma porta específica
        app.listen(4000, () => {
            console.log('Servidor subiu com sucesso!')
        });
    })
    .catch((err) => {
        console.log(err)
        process.exit()
    });

