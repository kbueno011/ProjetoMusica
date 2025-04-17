/*********************************************************************************************
 * Objetivo: API responsavel pelas requisições do projeto de controle de musicas
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 * Observações: 
 * *******Para criar a APi precisamos instalar:
 *           express            npm install express --save
 *           cors               npm install cors --save
 *           body-parse         npm install body-parse --save
 * 
 * *******Para criar conexão com banco de dados MYSQL precisamos instalar:
 *           prisma             npm install prisma --save
 *           prisma/cliente     npm install @prisma/client --save
 *           
 * 
 * Apos a instalação do prisma é necessario inicializar o prisma:
 * ------  npx prisma init  ------
 * 
 * Para sincronizar o prisma com o banco de dados podemos utilizar :
 *         npx prisma migrate dev
 ********************************************************************************************/

//Import das bibliotecas para criar API
const express = require ('express')
const cors = require('cors')
const bodyParse = require('body-parser')

//import das controlers do projeto
const controllerMusica = require ('./controller/musica/controllerMusica.js')

//Criando o formato que sera recebido no body da requisição(POST/PUT)
const bodyParseJSON = bodyParse.json()

//Cria o objeto para criar a API
const app = express()

app.use((request, express,response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//MUSICA
app.post('/v1/controle-musicas/musica', cors(), bodyParseJSON, async function (request, response){
    //Recebe o content type para requisições para validar o formato de dados
    let contentType = request.headers['content-type']
    //recebe os dados encaminhados no body da requisição 
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})
//MUSICA
app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let result = await controllerMusica.listarMusica()

    response.status(result.status_code)
    response.json(result)
})
//MUSICA
app.get('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let idMusica = request.params.id

    let result = await controllerMusica.buscarMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})
//MUSICA
app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let idMusica = request.params.id

    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})
//MUSICA
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParseJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o ID da musica
    let idMusica = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)

    response.status(result.status_code)
    response.json(result)
})
//GENERO
app.post('/v1/controle-musicas/genero', cors(), bodyParseJSON, async function (request, response){
    //Recebe o content type para requisições para validar o formato de dados
    let contentType = request.headers['content-type']
    //recebe os dados encaminhados no body da requisição 
    let dadosBody = request.body

    let result = await controllerMusica.inserirGenero(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})
//GENERO
app.put('/v1/controle-musicas/genero/:id', cors(), bodyParseJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o ID da musica
    let idGenero = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerMusica.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(result.status_code)
    response.json(result)
})
//GENERO
app.delete('/v1/controle-musicas/genero/:id', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let idGenero = request.params.id

    let result = await controllerMusica.excluirGenero(idGenero)

    response.status(result.status_code)
    response.json(result)
})
//GENERO
app.get('/v1/controle-musicas/genero', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let result = await controllerMusica.listarGenero()

    response.status(result.status_code)
    response.json(result)
})
//GENERO
app.get('/v1/controle-musicas/genero/:id', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let idGenero = request.params.id

    let result = await controllerMusica.buscarGenero(idGenero)

    response.status(result.status_code)
    response.json(result)
})
//USUARIO
app.post('/v1/controle-musicas/usuario', cors(), bodyParseJSON, async function (request, response){
    //Recebe o content type para requisições para validar o formato de dados
    let contentType = request.headers['content-type']
    //recebe os dados encaminhados no body da requisição 
    let dadosBody = request.body

    let result = await controllerMusica.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})
//USUARIO
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParseJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o ID da musica
    let idUsuario = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerMusica.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(result.status_code)
    response.json(result)
})
//USUARIO
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let idUsuario = request.params.id

    let result = await controllerMusica.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})
//USUARIO
app.get('/v1/controle-musicas/usuario', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let result = await controllerMusica.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})
//USUARIO
app.get('/v1/controle-musicas/usuario/:id', cors(), async function (request, response) {

    //Chama a função para retornar a lista de musica
    let idUsuario = request.params.id

    let result = await controllerMusica.buscarUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})
//ARTISTA
app.post('/v1/controle-musicas/artista', cors(), bodyParseJSON, async function (request, response){
    //Recebe o content type para requisições para validar o formato de dados
    let contentType = request.headers['content-type']
    //recebe os dados encaminhados no body da requisição 
    let dadosBody = request.body

    let result = await controllerMusica.inserirArtista(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})








app.listen(8080,function(){
    console.log('Servidor aguardando novas requisições')
})