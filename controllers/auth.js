const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')



const CrearUsuario = async (req, res = response) => {

    const { email, name, password } = req.body;

    try {
        // Verificar mail
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esiste con ese mail'
            })
        }

        //crear user con modelo
        const dbUser = new Usuario(req.body);


        //hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt)



        //crear usuario de DB
        await dbUser.save();

        //generar JWT
        const token = await generarJWT(dbUser.id, name);

        //generar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'contactarse con Admin'
        })
    }




}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'email incorrecto'
            });
        }

        //confirmar password

        const validPassword = bcrypt.compareSync(password, dbUser.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            });
        }

        //generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name)

        //respuesta
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'contacte al admin'
        })
    }
}

const revalidarToken = async (req, res) => {

    const {uid, name } = req;
    
    const token = await generarJWT(uid, name)

    return res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    CrearUsuario,
    loginUsuario,
    revalidarToken
}