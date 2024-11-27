const { response } = require('express');
const bcryptjs = require('bcryptjs');

const  {generarJWT}  = require('../helpers/generar-jwt');
const trabajador = require('../models/trabajador');


const login = async (req, res = response) => {



    const { username, password } = req.body;


    try {


        const user = await trabajador.findOne({ username });

        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }


        const match = bcryptjs.compareSync(password,user.password);
        
        

        if (!match) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }



        
        
        const token = await generarJWT(user.id);
        
         res.status(200).json({ user, token });

        


    } catch (error) {
        return res.status(500).json({ msg: 'tas comiendo pinga chama' });
    }
}

module.exports = { login };