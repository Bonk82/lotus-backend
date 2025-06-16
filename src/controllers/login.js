import {consulta as da} from '../connection/connexPostgres.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const login = async (datos, respuesta, next) => {
  const {user,pass} = datos.query

  let hash = crypto.createHash('sha256').update(pass).digest('hex');

  console.log("encriptado", hash);
  var q =`select * from seguridad.pr_login ('${user}','${hash}')`;
  try {
    const consulta = await da(q,'security');
    if(consulta[0]){
      const newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*14),cnx: consulta[0].id_conexion}, process.env.TOKEN_PWD);
      consulta.push({ruta:newToken})
    }
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
}