import {consulta as da} from '../connection/connexPostgres.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const login = async (datos, respuesta, next) => {
  const {operacion,user,pass,new_pass} = datos.query

  let hash = pass ? crypto.createHash('sha256').update(pass).digest('hex') : null;
  let new_hash = new_pass ? crypto.createHash('sha256').update(new_pass).digest('hex') : null;

  console.log("encriptado", hash);
  var q =`select * from seguridad.pr_login ('${operacion}','${user}','${hash}','${new_hash}');`;
  let newToken = null;
  let ip = null;
  try {
    console.log(crypto.createHash('sha256').update(`${789456}#${'LIMS'}*`).digest('hex'))
    const consulta = await da(q);
    console.log("del login", consulta);
    if(consulta[0]){
      newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*14),cnx: consulta[0].id_con,id_rol: consulta[0].id_rol,usuario: consulta[0].id_usuario, sucursal: consulta[0].id_sucursal,cuenta:user, rol:consulta[0].rol}, process.env.TOKEN_PWD);
      ip = datos.headers['x-forwarded-for'] || datos.socket.remoteAddress || null;
    }else{
      return respuesta.status(401).json({error: 'Usuario o contraseña incorrectos'});
    }
    respuesta.status(200).send({newToken,ip});
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