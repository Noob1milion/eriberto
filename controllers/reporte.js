const { response, request } = require('express');
const reporte = require('../models/reporte');
const trabajador = require('../models/trabajador');



const crearReporte = async (req, res) => {

    const {CI} = req.params
    const  {Hora_entrada, Hora_salida}  = req.body

  
    
    const Trabajador = await trabajador.findOne({CI})
    const nombre = Trabajador.nombre
    const apellido = Trabajador.apellido

    const fcha = Date();
    const fecha = fcha.split(' ')
    const Fecha = fecha[fecha.length - 6]
    const Fecha2 = fecha[fecha.length - 8]
    const Fecha1 = fecha[fecha.length - 7]
    const Fecha3 = fecha[fecha.length - 9]
    
    
    
    
    const fechaReporte = Fecha3 + "/" + Fecha1 + "/" + Fecha2 + "/" +Fecha
        
    
    const data = {
        Hora_entrada,
         Hora_salida,
        nombre,
        apellido,
        CI,
        fechaReporte
    }




    const Reporte = await new reporte(data)

    await Reporte.save()
    return res.status(200).json({ Reporte })



}

module.exports = {
    crearReporte

}