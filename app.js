/*********************************************************************************************
 * Objetivo: API responsável pelas requisições do projeto de controle de músicas
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 * 
 * Observações: 
 * Para criar a API precisamos instalar:
 *   express           -> npm install express --save
 *   cors              -> npm install cors --save
 *   body-parser       -> npm install body-parser --save
 * 
 * Para criar conexão com banco de dados MySQL:
 *   prisma            -> npm install prisma --save
 *   @prisma/client    -> npm install @prisma/client --save
 * 
 * Após a instalação do Prisma, é necessário inicializar com:
 *   npx prisma init
 * 
 * Para sincronizar o Prisma com o banco de dados:
 *   npx prisma migrate dev
 ********************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controllerMusica = require('./controller/musica/controllerMusica.js')
const controllerGenero = require('./controller/musica/controllerGenero.js')
const controllerUsuario = require('./controller/musica/controllerUsuario.js')
const controllerArtista = require('./controller/musica/controllerArtista.js')

const app = express()

// Middlewares globais
app.use(cors())
app.use(bodyParser.json())

// ROTAS DE MÚSICA
app.post('/v1/controle-musicas/musica', async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerMusica.inserirMusica(dadosBody, contentType)
    response.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/musica', async (request, response) => {
    const result = await controllerMusica.listarMusica()
    response.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/musica/:id', async (request, response) => {
    const idMusica = request.params.id
    const result = await controllerMusica.buscarMusica(idMusica)
    response.status(result.status_code).json(result)
})

app.delete('/v1/controle-musicas/musica/:id', async (request, response) => {
    const idMusica = request.params.id
    const result = await controllerMusica.excluirMusica(idMusica)
    response.status(result.status_code).json(result)
})

app.put('/v1/controle-musicas/musica/:id', async (request, response) => {
    const contentType = request.headers['content-type']
    const idMusica = request.params.id
    const dadosBody = request.body

    const result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)
    response.status(result.status_code).json(result)
})

// ROTAS DE GÊNERO
app.post('/v1/controle-musicas/genero', async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerGenero.inserirGenero(dadosBody, contentType)
    response.status(result.status_code).json(result)
})

app.put('/v1/controle-musicas/genero/:id', async (request, response) => {
    const contentType = request.headers['content-type']
    const idGenero = request.params.id
    const dadosBody = request.body

    const result = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(result.status_code).json(result)
})

app.delete('/v1/controle-musicas/genero/:id', async (request, response) => {
    const idGenero = request.params.id
    const result = await controllerGenero.excluirGenero(idGenero)
    response.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/genero', async (request, response) => {
    const result = await controllerGenero.listarGenero()
    response.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/genero/:id', async (request, response) => {
    const idGenero = request.params.id
    const result = await controllerGenero.buscarGenero(idGenero)
    response.status(result.status_code).json(result)
})

// ROTAS DE USUÁRIO
app.post('/v1/controle-musicas/usuario', async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerUsuario.inserirUsuario(dadosBody, contentType)
    response.status(result.status_code).json(result)
})

app.put('/v1/controle-musicas/usuario/:id', async (request, response) => {
    const contentType = request.headers['content-type']
    const idUsuario = request.params.id
    const dadosBody = request.body

    const result = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)
    response.status(result.status_code).json(result)
})

app.delete('/v1/controle-musicas/usuario/:id', async (request, response) => {
    const idUsuario = request.params.id
    const result = await controllerUsuario.excluirUsuario(idUsuario)
    response.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/usuario', async (request, response) => {
    const result = await controllerUsuario.listarUsuario()
    response.status(result.status_code).json(result)
})

app.get('/v1/controle-musicas/usuario/:id', async (request, response) => {
    const idUsuario = request.params.id
    const result = await controllerUsuario.buscarUsuario(idUsuario)
    response.status(result.status_code).json(result)
})

// ROTAS DE ARTISTA
app.post('/v1/controle-musicas/artista', async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerMusica.inserirArtista(dadosBody, contentType)
    response.status(result.status_code).json(result)
})

// Inicializa o servidor
app.listen(8080, () => {
    console.log('Servidor aguardando novas requisições na porta 8080')
})
