const mysql = require('mysql');
var moment = require('moment');
require('dotenv').config()
const variables = process.env;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: variables.PASSWORD,
  database: 'mydb'
});




connection.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Connected to MySQL Server!');
});



function logIn(correo,pasword,res){

    connection.query(`
    SELECT correo,contraseña,isAdmin
    from mydb.Usuario
    where correo = '${correo}'
    && contraseña = '${pasword}';`
    ,(err, rows) => {
        if(err) return err;
        let lenRows  = rows.length
       
        if(lenRows == 1){
            if(rows[0].isAdmin == true){
                 res.send(true)
                 return;
            }
            res.send(false)
        }else{
            res.send(null)
        }
        return rows
    });

}
function Register(codigo,nombre,correo,contraseña){

    connection.query(`
    INSERT INTO mydb.Usuario (codigo, nombre, correo, contraseña)
    VALUES ('${codigo}','${nombre}','${correo}','${contraseña}');`
    ,(err, rows) => {
        if(err) throw err;
    });

}
// hacer reservas
async function getAulas(res,horario){

    await connection.query(`
    SELECT Código FROM aula;`
    ,(err, rows) => {
        if(err) throw err;

        const aulas = [];
        for (const ite of rows) {
            aulas.push(ite['Código'])
        }

        res.render('reservarComputadora', {
            usuario: "tomascaell",
            aulas,
            horario,
        })

        return rows;
    });
    
    
}
function getAvailableTimes(time,aula,res){

    let hour = time.substring(0,2);
    let today = moment();

    let date = today.format('YYYY')+'-'+today.format('MM')+'-'+today.format('DD')+'T'+hour+':00:00'
    let todayStart = today.format('YYYY-MM-DDT') + '00:00:00';
    let todayEnd = today.format('YYYY-MM-DDT') + '23:59:00';
    
    
    connection.query(`
    SELECT idComputador
    from computador 
    LEFT JOIN mydb.\`Reservas en el Tiempo\` on (Computador_id = idComputador)
    where Aula_Código = '${aula}'
    && Fecha = '${date}';`
    ,(err, rows) => {
      
        if(err) return err;
        let idComputadores = []
        for (const ite of rows) {
            idComputadores.push(ite['idComputador']) 
        }

        getComputersByID(aula,idComputadores,res)
        
        
        
       
    });

}
function getInformationOfComputer(computerID,res){

    connection.query(`
    SELECT tipoGPU,tipoCPU,idComputador,GBRAM
    FROM computador
    WHERE idComputador = ${computerID};   `
    ,(err, rows) => {
        if(err) throw err;
        
        
        res.send({ text: `GPU: ${rows[0]['tipoGPU']}<br> 
        CPU: ${rows[0]['tipoCPU']}<br>
        GBRAM : ${rows[0]['GBRAM']}  
        ` })
        
    });

}
function hacerReserva(codigoUsario,IdComputador,time){

    let today = moment();
    let hour = time.substring(0,2);
    let date = today.format('YYYY')+'-'+today.format('MM')+'-'+today.format('DD')+'T'+hour+':00:00'
    hour++;
    let dateEnd = today.format('YYYY')+'-'+today.format('MM')+'-'+today.format('DD')+'T'+(hour)+':00:00'

    connection.query(`
    INSERT INTO mydb.\`Reservas en el Tiempo\`(Usuario_codigo,Computador_id,Fecha,FechaFinal)
    VALUES (${codigoUsario},${IdComputador},'${date}','${dateEnd}');      `
    ,(err, rows) => {
        if(err) throw err;
        console.log(rows)
    });


}
function getComputersByID(aula,idDecomputadoresReservados,res){

    connection.query(`
    SELECT idComputador
    FROM computador
    WHERE Aula_Código = '${aula}';  `
    ,(err, rows) => {
        if(err) throw err;

        let idCompuadoresTotal = []
        for (const ite of rows) {
            if(!idDecomputadoresReservados.includes(ite['idComputador'])){
                idCompuadoresTotal.push(ite['idComputador']) 
            }
        }

        res.send(idCompuadoresTotal);
        
    });

}
// hacer solicitud mantenimiento
function getAulasNumbers(res){

  
    connection.query(`
    SELECT Código FROM aula;`
    ,(err, rows) => {
        if(err) return err;

        const aulas = [];
        for (const ie of rows) {
            aulas.push(ie['Código'])
        }

        res.render('SolicitudMante',{
            aulas 
        })
        
    });
}
function getComputadoresInAula(codigoAula,res){

    connection.query(`
    SELECT idComputador
    FROM Computador
    WHERE Aula_Código = ${codigoAula};`
    ,(err, rows) => {
        if(err) return err;
        const ids = []
        for (const ite of rows) {
            ids.push(ite['idComputador'])
        }
        
        res.send(ids)
        
    });

}
function hacerSolicitudDeMantenimiento(computerId,idstudent,descripcion){

    connection.query(`
    SELECT SolicitudMantenimiento
    FROM computador
    WHERE idComputador = ${computerId};
    `
    ,(err, rows) => {
        if(err) return err;

        
        let solicitud = JSON.parse(rows[0].SolicitudMantenimiento);
        solicitud["Solicitudes"].push({
            Fecha: moment().format('YYYY-MM-DD HH:00:00'),
            codigo: idstudent.toString(),
            Descripcion: descripcion
        })
        connection.query(`
        UPDATE computador
        SET  SolicitudMantenimiento = '${JSON.stringify(solicitud)}'
        where idComputador = ${computerId};`
        ,(err, rows) => {
            if(err) return err;
            console.log('The data from users table is: \n', rows);
          
        });
            
        
    });

}
function getNumeroAulasgetAsistenteTecnico(res){
    connection.query(`
    SELECT Código FROM aula;`
    ,(err, rows) => {
        if(err) return err;

        const aulas = [];
        for (const ie of rows) {
            aulas.push(ie['Código'])
        }

        res.render('buscarTecnico',{
            aulas : aulas
        })
        
    });
}
function buscarTecnicoPorAula(codigoAula,res){

    connection.query(`
    SELECT Nombre,correo,celular,Código
    FROM aula 
    join mydb.\`Asistente Tecnico\` on (mydb.\`Asistente Tecnico\`.\`idAsistente Tecnico\` = idAsistenteTecnico)
    where Código = ${codigoAula};`
    ,(err, rows) => {
        if(err) return err;
        console.log(rows[0])


        res.send({
            Nombre : rows[0].Nombre,
            text : `cell : ${rows[0].celular} <br>
            correo: ${rows[0].correo}`
        })
    
    });

}

function addComputador(idComputador,tipoGPU,tipoCPU,GBRAM,aula_Codigo){

    connection.query(`
    select idComputador
    from Computador
    where idComputador = ${idComputador};`
    ,(err, rows) => {
        if(err) return err;
        let lenRows = rows.length
        if(lenRows == 0){
            connection.query(`
            INSERT INTO mydb.Computador (idComputador,tipoGPU,tipoCPU,GBRAM,Computador.SolicitudMantenimiento,Aula_Código)
            VALUES (${idComputador},'${tipoCPU}','${tipoGPU}',${GBRAM},'{"Solicitudes":[]}',${aula_Codigo});`
            ,(err, rows) => {
                if(err) throw err;
          
               
            });

        }else if(lenRows == 1){
            connection.query(`
            UPDATE Computador
            SET tipoGPU = '${tipoCPU}', tipoCPU = '${tipoGPU}',GBRAM = ${GBRAM},Aula_Código = ${aula_Codigo}
            WHERE idComputador = ${idComputador};
            `
            ,(err, rows) => {
                if(err) throw err;
         
               
            });
        }

     
    });

}

function addAula(codigo,cupoMaximo,idAsistenteTecnico){

    connection.query(`
    select Código
    from Aula
    where Código = ${codigo};   `
    ,(err, rows) => {
        if(err) return err;
        let lenRows = rows.length
        if(lenRows == 0){

            connection.query(`
            INSERT INTO mydb.aula (Código,CupoMaximo,idAsistenteTecnico)
            VALUES (${codigo},${cupoMaximo},${idAsistenteTecnico});
`
            ,(err, rows) => {
                if(err) return err;
            });

        }else if(lenRows == 1){
            connection.query(`
            UPDATE Aula
            SET CupoMaximo = ${cupoMaximo},idAsistenteTecnico = ${idAsistenteTecnico}
            WHERE Código = ${codigo};
            `
            ,(err, rows) => {
                if(err) return err;
           
            });
        }

        
    });

}

function addAsistenteTecnico(id,nombre,correo,celular){


    connection.query(`
    select mydb.\`Asistente Tecnico\`.\`idAsistente Tecnico\`
    from mydb.\`Asistente Tecnico\`
    where mydb.\`Asistente Tecnico\`.\`idAsistente Tecnico\` = ${id};`
    ,(err, rows) => {
        if(err) return err;
        let lenRows = rows.length
        if(lenRows == 0){

            connection.query(`
            INSERT INTO mydb.\`Asistente Tecnico\` (mydb.\`Asistente Tecnico\`.\`idAsistente Tecnico\`,Nombre,correo,celular)
            VALUES (${id},'${nombre}','${correo}',${celular});`
            ,(err, rows) => {
                if(err) return err;
                console.log(rows);
               
            });

        }else if(lenRows == 1){

            connection.query(`
            UPDATE mydb.\`Asistente Tecnico\`
            SET Nombre = '${nombre}', correo = '${correo}',celular = ${celular}
            WHERE mydb.\`Asistente Tecnico\`.\`idAsistente Tecnico\`= ${id};`
            ,(err, rows) => {
                if(err) return err;
                console.log(rows);
            });
        

        }
    });


}


module.exports = {
    logIn,
    Register,
    getAulas,
    getAvailableTimes,
    getInformationOfComputer,
    hacerReserva,
    getAulasNumbers,
    getComputadoresInAula,
    hacerSolicitudDeMantenimiento,
    getNumeroAulasgetAsistenteTecnico,
    buscarTecnicoPorAula,
    addComputador,
    addAula,
    addAsistenteTecnico
}