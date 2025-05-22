/**************************************************************************************
 * Objetivo: Controller responsavel pela manipulação do CRUD de dados de música
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const musicaDAO = require('../../model/DAO/genero.js')

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


module.exports = {
   
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero

}