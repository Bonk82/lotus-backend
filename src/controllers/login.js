import {consulta as da} from '../connection/connexPostgres.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const login = async (datos, respuesta, next) => {
  const {user,pass,id} = datos.query

  let hash = crypto.createHash('sha256').update(pass).digest('hex');

  console.log("encriptado", hash);
  var q =`select * from seguridad.pr_login ('${user}','${hash}',${id});`;
  let newToken = null;
  try {
    const consulta = await da(q);
    console.log("consulta", consulta);
    if(consulta[0]){
      newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*14),cnx: consulta[0].id_con,rol: consulta[0].id_rol,usuario: consulta[0].id_usuario, sucursal: consulta[0].id_sucursal}, process.env.TOKEN_PWD);
      // consulta.push({ruta:newToken})
    }else{
      return respuesta.status(401).json({error: 'Usuario o contraseña incorrectos'});
    }
    respuesta.status(200).send(newToken);
  } catch (error) {
    next(error)
  }
}

export const controlUsuario   = async  (datos, respuesta, next) => {
  const {operacion,id_usuario,estado,fid_sucursal} = datos.query;

  let q = ``
  if(operacion == 'H') `update seguridad.usuario set estado = '${estado}', fid_sucursal = ${fid_sucursal} where id_usuario = ${id_usuario};`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};