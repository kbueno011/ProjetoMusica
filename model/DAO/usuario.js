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
        let sql = `UPDATE tbl_usuario SET 
        nome = '${usuario.nome}',
        email = '${usuario.email}',
        senha = '${usuario.senha}',
        foto_perfil = '${usuario.foto_perfil}'
         WHERE id = ${usuario.id}`

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


module.exports = {
    insertUsuario,
    updateUsuario,
    selectByIdUsuario,
    deletUsuario,
    selectAllUsuarios
}