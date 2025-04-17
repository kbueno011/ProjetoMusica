/**************************************************************************************
 * Objetivo: Controller responsavel pela manipulação do CRUD de dados de música
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const musicaDAO = require('../../model/DAO/musica.js')
//Função para inserir uma musica
const inserirMusica = async function(musica, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                musica.nome               == undefined || musica.nome == ''              || musica.nome == null            || musica.nome.length > 80            ||
                musica.nome_artistico              == undefined  || musica.link == ''              || musica.link == null            || musica.link.length > 200           ||
                musica.duracao           == undefined  || musica.duracao == ''           || musica.duracao == null         || musica.duracao.length > 5          ||
                musica.data_lancamento   == undefined  || musica.data_lancamento == ''   || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
                musica.foto_capa         == undefined  || musica.foto_capa.length > 200  ||
                musica.letra             == undefined
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS
            }else{
                let resultMusica = await musicaDAO.insertMusica(musica)
    
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }
       
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


//Função para atualizar uma musica
const atualizarMusica = async function(musica, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( 
                    musica.nome               == undefined || musica.nome == ''              || musica.nome == null            || musica.nome.length > 80            ||
                    musica.link              == undefined  || musica.link == ''              || musica.link == null            || musica.link.length > 200           ||
                    musica.duracao           == undefined  || musica.duracao == ''           || musica.duracao == null         || musica.duracao.length > 5          ||
                    musica.data_lancamento   == undefined  || musica.data_lancamento == ''   || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
                    musica.foto_capa         == undefined  || musica.foto_capa.length > 200  ||
                    musica.letra             == undefined  ||
                    id =='' || id == undefined || id == null || isNaN(id) || id <= 0
                    
                
                ){
                    return MESSAGE.ERROR_REQUIRED_FIEDLS //400
                }else{
                    // validar se o id existe no banco bd

                    let resultMusica = await buscarMusica(id)

                    if (resultMusica.status_code == 200){
                        //update
                        // Adiciona o atributo ID no JSON e coloca o id da musica que chegou na controller 
                        musica.id = id
                        let result = await musicaDAO.updateMusica(musica)

                        if(result){
                            return MESSAGE.SUCCESS_UPDATE_ITEM //200
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else if (resultMusica.status_code == 404){
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
        
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//Função para excluir uma musica
const excluirMusica = async function(id){
    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0 ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS//400      
        }else{
            //VALIDAR se o ID existe
            let resultMusica = await buscarMusica(id)

            if(resultMusica.status_code == 200){
                //DELETE
                let result = await musicaDAO.deletMusica(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultMusica.status_code == 404){
                return  MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
}


//Função para listar todas as musica
const listarMusica = async function(){
    
    try {

        let dadosMusica = {}

        //Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllMusica()
        
        if (resultMusica != false || typeof(resultMusica) == 'object'){


            if(resultMusica.length > 0){
                //Criando um JSON para retornar a lista de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica
                
                
                return dadosMusica
                
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}


//Função para buscar uma musica pelo id 
const buscarMusica = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            let dadosMusica = {}
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if (resultMusica != false || typeof(resultMusica) == 'object'){

                if (resultMusica.length > 0){
                    //Criando um JSON para retornar a lista de musicas
                    dadosMusica.status = true
                    dadosMusica.status_code = 200

                    dadosMusica.musics = resultMusica
                    return dadosMusica //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }

            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}


const inserirGenero = async function(genero, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                genero.nome               == undefined || genero.nome == ''              || genero.nome == null            || genero.nome.length > 80   
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS
            }else{
                let resultMusica = await musicaDAO.insertGenero(genero)
    
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }
       
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


const atualizarGenero = async function(genero, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( 
                    genero.nome               == undefined || genero.nome == ''              || genero.nome == null            || genero.nome.length > 80            ||
                    id =='' || id == undefined || id == null || isNaN(id) || id <= 0
                    
                
                ){
                    return MESSAGE.ERROR_REQUIRED_FIEDLS //400
                }else{
                    // validar se o id existe no banco bd

                    let resultMusica = await buscarGenero(id)

                    if (resultMusica.status_code == 200){
                        //update
                        // Adiciona o atributo ID no JSON e coloca o id do genero que chegou na controller 
                        genero.id = id
                        let result = await musicaDAO.updateGenero(genero)

                        if(result){
                            return MESSAGE.SUCCESS_UPDATE_ITEM //200
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else if (resultMusica.status_code == 404){
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
        
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const excluirGenero = async function(id){
    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0 ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS//400      
        }else{
            //VALIDAR se o ID existe
            let resultMusica = await buscarMusica(id)

            if(resultMusica.status_code == 200){
                //DELETE
                let result = await musicaDAO.deletGenero(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultMusica.status_code == 404){
                return  MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
}


const buscarGenero = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            let dadosGenero = {}
            let resultGenero = await musicaDAO.selectByIdGenero(id)

            if (resultGenero != false || typeof(resultGenero) == 'object'){

                if (resultGenero.length > 0){
                    //Criando um JSON para retornar a lista de Generos
                    dadosGenero.status = true
                    dadosGenero.status_code = 200

                    dadosGenero.musics = resultGenero
                    return dadosGenero //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }

            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}


const listarGenero = async function(){
    
    try {

        let dadosMusica = {}

        //Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllGenero()
        
        if (resultMusica != false || typeof(resultMusica) == 'object'){


            if(resultMusica.length > 0){
                //Criando um JSON para retornar a lista de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica
                
                
                return dadosMusica
                
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}


const inserirUsuario = async function(usuario, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                usuario.nome               == undefined || usuario.nome == ''              || usuario.nome == null            || usuario.nome.length > 80            ||
                usuario.email              == undefined || usuario.email == ''             || usuario.email == null           || usuario.email.length > 200          ||
                usuario.senha              == undefined || usuario.senha == ''             || usuario.senha == null           || usuario.senha.length > 200          
                
                ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS
            }else{
                let resultMusica = await musicaDAO.insertUsuario(usuario)
    
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }
       
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


const atualizarUsuario = async function(musica, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( 
                        usuario.nome               == undefined || usuario.nome == ''              || usuario.nome == null            || usuario.nome.length > 80            ||
                        usuario.email              == undefined || usuario.email == ''             || usuario.email == null           || usuario.email.length > 200          ||
                        usuario.senha              == undefined || usuario.senha == ''             || usuario.senha == null           || usuario.senha.length > 200          
                ){
                    return MESSAGE.ERROR_REQUIRED_FIEDLS //400
                }else{
                    // validar se o id existe no banco bd

                    let resultMusica = await buscarUsuario(id)

                    if (resultMusica.status_code == 200){
                        //update
                        // Adiciona o atributo ID no JSON e coloca o id da musica que chegou na controller 
                        usuario.id = id
                        let result = await musicaDAO.updateUsuario(usuario)

                        if(result){
                            return MESSAGE.SUCCESS_UPDATE_ITEM //200
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else if (resultMusica.status_code == 404){
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
        
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const buscarUsuario = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //400
        }else{
            let dadosMusica = {}
            let resultMusica = await musicaDAO.selectByIdUsuario(id)

            if (resultMusica != false || typeof(resultMusica) == 'object'){

                if (resultMusica.length > 0){
                    //Criando um JSON para retornar a lista de musicas
                    dadosMusica.status = true
                    dadosMusica.status_code = 200

                    dadosMusica.musics = resultMusica
                    return dadosMusica //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }

            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}


const excluirUsuario = async function(id){
    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0 ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS//400      
        }else{
            //VALIDAR se o ID existe
            let resultMusica = await buscarUsuario(id)

            if(resultMusica.status_code == 200){
                //DELETE
                let result = await musicaDAO.deletUsuario(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultMusica.status_code == 404){
                return  MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
}


const listarUsuario = async function(){
    
    try {

        let dadosMusica = {}

        //Chamar a função que retorna todas as musicas
        let resultMusica = await musicaDAO.selectAllUsuarios()
        
        if (resultMusica != false || typeof(resultMusica) == 'object'){


            if(resultMusica.length > 0){
                //Criando um JSON para retornar a lista de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica
                
                
                return dadosMusica
                
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}


const inserirArtista = async function(artista, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                artista.nome             == undefined  ||artista.nome == ''              ||artista.nome == null            ||artista.nome.length > 80             ||
                artista.nome_artistico   == undefined  || artista.nome_artistico == ''   || artista.nome_artistico == null || artista.nome_artistico.length > 200 ||
                artista.biografia        == undefined  || artista.biografia == ''        || artista.biografia == null      || artista.biografia.length > 5        ||
                artista.nacionalidade    == undefined  || artista.nacionalidade == ''    || artista.nacionalidade == null  || artista.nacionalidade.length > 10   
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS
            }else{
                let resultMusica = await musicaDAO.insertArtista(artista)
    
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }
       
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}







module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica,
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero,
    inserirUsuario,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    inserirArtista,
}