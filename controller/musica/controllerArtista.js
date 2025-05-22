/**************************************************************************************
 * Objetivo: Controller responsavel pela manipulação do CRUD de dados de música
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 *************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const musicaDAO = require('../../model/DAO/artista.js')

const inserirArtista = async function(artista, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                artista.nome             == undefined  || artista.nome == ''             || artista.nome == null           || artista.nome.length > 80            ||
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


const atualizarArtista = async function(artista, id, contentType){
    try{

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                artista.nome             == undefined  || artista.nome == ''             || artista.nome == null           || artista.nome.length > 80            ||
                artista.nome_artistico   == undefined  || artista.nome_artistico == ''   || artista.nome_artistico == null || artista.nome_artistico.length > 200 ||
                artista.biografia        == undefined  || artista.biografia == ''        || artista.biografia == null      || artista.biografia.length > 5        ||
                artista.nacionalidade    == undefined  || artista.nacionalidade == ''    || artista.nacionalidade == null  || artista.nacionalidade.length > 10   ||
                id =='' || id == undefined || id == null || isNaN(id) || id <= 0 
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS
            }else{
                let resultMusica = await musicaDAO.updateArtista(artista)
    
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }
       
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
 
    inserirArtista,
    atualizarArtista,

}