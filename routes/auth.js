const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    try {
     
      //verifica que exista
      if (!email || !password) {
          return next(400);
      }

       //verifica q exista en la bd
       const userExist = await User.findOne({email:req.body.email});
       if(!userExist){
           return next(404);
       }
       //match en el password
       const isPasswordMatched = await bcrypt.compare(password,userExist.password);
       if(!isPasswordMatched){
           return res.json({message:'Wrong credentials pass'});
       }
       const token = await jwt.sign({ id: userExist._id }, secret);
       return resp.cookie({"token":token}).json({ "accessToken":token})//devuelve el token
    } catch (error) {
          return resp.json({ error: error });
      }
  });

  return nextMain();
};
