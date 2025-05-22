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


module.exports = {
    insertGenero,
    updateGenero,
    selectByIdGenero,
    deletGenero,
    selectAllGenero,
}