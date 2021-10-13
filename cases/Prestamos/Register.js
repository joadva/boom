'use strict'

const { generateResponse } = require('../../helpers/generateResponse');
const { Prestamos } = require('../../models/Prestamos');




    const Register = async (event) => {
        try {
            const {cantidad_prestamo,tasa_interes,estado_prestamo,numero_meses,fecha_comienzo,fecha_finalizado
            } = JSON.parse(event['body'])

            const data = {
                cantidad_prestamo,tasa_interes,
                estado_prestamo,numero_meses,
                fecha_comienzo,fecha_finalizado

            }

          let  resp = await Prestamos.create(data);
        return generateResponse(200,{
            message: "Datos Agregados",
             Prestamo: resp
        })

        }catch(e){
            return generateResponse(500,{
                message:"error",
                err: e.stack
            })

    }
}
module.exports.Register = Register;