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



const insertArtista = async function(artista){
    try{
            let sql = `insert into tbl_artista ( 
                                            nome,
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

const updateArtista = async function(artista){

    try {
        let sql = `update tbl_artista set        nome = '${artista.nome}',
                                nome_artistico       = '${artista.nome_artistico}',
                                biografia            = '${artista.biografia}',
                                nacionalidade        = '${artista.nacionalidade}',
                                foto_perfil          = '${artista.foto_perfil}'
                    
                            where id= ${artista.id}`

    
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


module.exports = {

    insertArtista,
    updateArtista

}