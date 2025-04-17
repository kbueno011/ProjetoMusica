/***********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados de musica no banco de dados
 * Data: 13/02/25
 * Autor: Kaike Bueno
 * Versão: 1.0
 **********************************************************************************/

//Import da biblioteca do prisma/client
const { PrismaClient } = require('@prisma/client')

        //Instanciando (criar um novo objeto) para realizar a manipulação do script SQL
        const prisma = new PrismaClient()

//Função para inserir uma nova musica no banco de dados
const insertMusica = async function(musica){
    try{
            let sql = `insert into tbl_musica ( nome,
                                            link,
                                            duracao,
                                            data_lancamento,
                                            foto_capa,
                                            letra
                                        ) 
                                        
                                values (
                                            '${musica.nome}',
                                            '${musica.link}',
                                            '${musica.duracao}',
                                            '${musica.data_lancamento}',
                                            '${musica.foto_capa}',
                                            '${musica.letra}'
                                        )`


        //Executa o script SQL no Banco de Dados e aguarda o retorno do mesmo
        let result = await prisma.$executeRawUnsafe(sql)

            

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){ console.log(error)
        return false
    }
    

}

//Função para atualizar uma musica exstente no banco de dados
const updateMusica = async function(musica){

    try {
        let sql = `update tbl_musica set        nome            = '${musica.nome}',
                                link            = '${musica.link}',
                                duracao         = '${musica.duracao}',
                                data_lancamento = '${musica.data_lancamento}',
                                foto_capa       = '${musica.foto_capa}',
                                letra           = '${musica.letra}'
                            where id= ${musica.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
                                            
    } catch (error) {
        console.log(error)
        return false
    }



}

//Função para deletar uma musica existente no banco de dados
const deletMusica = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_musica where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}

//Função para retornar todas as musicas cadastradas no banco de dados
const selectAllMusica = async function(){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'select * from tbl_musica order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

       

        if(result.length >= 0)
            return result
        else
            return false
    } catch (error) {console.log(error)
        return false
        
    }
}

const selectByIdMusica = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'select * from tbl_musica where id='+id

        let result = await prisma.$queryRawUnsafe(sql)

        if(result.length >= 0)
            return result
        else
            return false
    } catch (error) {(error)
        return false
        
    }   
}

const insertGenero = async function(genero){
    try{
            let sql = `insert into tbl_genero ( 
                                            nome
                                        ) 
                                        
                                values (
                                            '${genero.nome}'
                                        )`


        //Executa o script SQL no Banco de Dados e aguarda o retorno do mesmo
        let result = await prisma.$executeRawUnsafe(sql)

            

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){ console.log(error)
        return false
    }
    

}

//Função para atualizar um genero exstente no banco de dados
const updateGenero = async function(genero){

    try {
        let sql = `update tbl_musica set        nome            = '${genero.nome}'
                            where id= ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
                                            
    } catch (error) {
        console.log(error)
        return false
    }



}


const deletGenero = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_genero where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}


const selectByIdGenero = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'select * from tbl_genero where id='+id

        let result = await prisma.$queryRawUnsafe(sql)

        if(result.length >= 0)
            return result
        else
            return false
    } catch (error) {(error)
        return false
        
    }   
}


const selectAllGenero = async function(){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'select * from tbl_genero order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

       

        if(result.length >= 0)
            return result
        else
            return false
    } catch (error) {console.log(error)
        return false
        
    }
}


const insertUsuario = async function(usuario){
    try{
            let sql = `insert into tbl_usuario (
                                            nome,
                                            email,
                                            senha,
                                            foto_perfil
                                        ) 
                                        
                                values (
                                            '${usuario.nome}',
                                            '${usuario.email}',
                                            '${usuario.senha}',
                                            '${usuario.foto_perfil}'
                                        )`


        //Executa o script SQL no Banco de Dados e aguarda o retorno do mesmo
        let result = await prisma.$executeRawUnsafe(sql)

            

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){ console.log(error)
        return false
    }
    

}


const updateUsuario = async function(usuario){

    try {
        let sql = `update tbl_usuario set        nome            = '${usuario.nome}',
                                email            = '${usuario.email}',
                                senha         = '${usuario.senha}',
                                foto_perfil = '${usuario.foto_perfil}',
                            where id= ${musica.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
                                            
    } catch (error) {
        console.log(error)
        return false
    }



}


const selectByIdUsuario = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'select * from tbl_usuario where id='+id

        let result = await prisma.$queryRawUnsafe(sql)

        if(result.length >= 0)
            return result
        else
            return false
    } catch (error) {(error)
        return false
        
    }   
}


const deletUsuario = async function(id){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'delete  from tbl_usuario where id='+id

        let result = await prisma.$executeRawUnsafe(sql)
       
        if(result)
            return true
        else
            return false
    } catch (error) {(error)
        return false
        
    }
}


const selectAllUsuarios = async function(){
    try {
        //executa o script SQL no banco de dados e aguarda o retorno dos dados
        let sql = 'select * from tbl_usuario order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

       

        if(result.length >= 0)
            return result
        else
            return false
    } catch (error) {console.log(error)
        return false
        
    }
}


const insertArtista = async function(artista){
    try{
            let sql = `insert into tbl_artista ( nome,
                                            nome_artistico,
                                            biografia,
                                            nacionalidade,
                                            foto_perfil
                                        ) 
                                        
                                values (
                                            '${artista.nome}',
                                            '${artista.nome_artistico}',
                                            '${artista.biografia}',
                                            '${artista.nacionalidade}',
                                            '${artista.foto_perfil}'
                                        )`


        //Executa o script SQL no Banco de Dados e aguarda o retorno do mesmo
        let result = await prisma.$executeRawUnsafe(sql)

            

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){ console.log(error)
        return false
    }
    

}





module.exports = {
    insertMusica,
    updateMusica,
    deletMusica,
    selectAllMusica,
    selectByIdMusica,
    insertGenero,
    updateGenero,
    selectByIdGenero,
    deletGenero,
    selectAllGenero,
    insertUsuario,
    updateUsuario,
    selectByIdUsuario,
    deletUsuario,
    selectAllUsuarios,
    insertArtista,
}