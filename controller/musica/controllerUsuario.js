/**************************************************************************************
 * Objetivo: Controller responsavel pela manipulação do CRUD de dados de música
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const musicaDAO = require('../../model/DAO/usuario.js')

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


const atualizarUsuario = async function(usuario, id, contentType){
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


module.exports = {

    inserirUsuario,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario

}