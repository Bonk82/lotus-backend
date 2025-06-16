
import * as da from '../connection/connexPostgres.js'

export const listarUsuarios  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.usuario u`;
  if(opcion != 'T') q = `select * from seguridad.usuario u where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudUsuario   = async  (datos, respuesta, next) => {
  const {operacion,id_usuario,ci,fecha_nacimeinto,nombres,paterno,materno,estado} = datos.query;

  let q = `select * from seguridad.pra_crud_usuario('${operacion}',${id_usuario},'${ci}','${fecha_nacimeinto}','${nombres}','${paterno}','${materno}','${estado}');`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};