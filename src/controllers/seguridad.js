
import * as da from '../connection/connexPostgres.js'
import crypto from 'crypto'

//usuarios
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
  let {operacion,id_usuario,fid_rol,fid_sucursal,cuenta,pass,tipo_acceso,ci,fecha_nacimeinto,nombres,paterno,materno,correo,telefonos,estado} = datos.query;

  let hash = null
  if(pass) hash = crypto.createHash('sha256').update(pass).digest('hex');
  if(!pass && operacion == 'I') hash = crypto.createHash('sha256').update(`${ci}#${paterno}*`).digest('hex');
  if(!cuenta && operacion == 'I') cuenta = (`${nombres.split(' ')[0]}.${paterno}`).toUpperCase();
  if(fid_sucursal && operacion) tipo_acceso = 'INTERNO';

  let q = `select * from seguridad.pra_crud_usuario('${operacion}',${id_usuario},${fid_rol},${fid_sucursal},'${cuenta}','${hash}','${tipo_acceso}','${ci}','${fecha_nacimeinto}','${nombres}','${paterno}','${materno}','${correo}','${telefonos}','${estado}');`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//clasificador
export const listarClasificador  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.clasificador c`;
  if(opcion != 'T') q = `select * from seguridad.clasificador c where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudClasificador   = async  (datos, respuesta, next) => {
  const {operacion,id_clasificador,grupo,orden,nombre,sub_grupo} = datos.query;

  let q = `select * from seguridad.pra_crud_clasificador('${operacion}',${id_clasificador},'${grupo}',${orden},'${nombre}','${sub_grupo}');`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

// //cuenta
// export const listarCuentas = async  (datos, respuesta, next) => {
//   const {opcion,id} = datos.query
//   let q = ''
//   if(opcion == 'T') q = `select * from seguridad.cuenta c `;
//   if(opcion != 'T') q = `select * from seguridad.cuenta c where ${opcion} = '${id}';`;

//   try {
//     const consulta = await da.consulta(q);
//     respuesta.status(200).json(consulta);
//   } catch (error) {
//     next(error)
//   }
// };

// export const crudCuenta  = async  (datos, respuesta, next) => {
//   const {operacion,id_cuenta,fid_rol,nombre,correo,pass,tipo_acceso,fid_usuario,estado} = datos.query;

//   let q = `select * from seguridad.pra_crud_cuenta('${operacion}',${id_cuenta},${fid_rol},'${nombre}','${correo}','${pass}','${tipo_acceso}',${fid_usuario},'${estado}');`;

//   const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);
  
//   try {
//     const consulta = await da.consulta(mod);
//     respuesta.status(200).json(consulta);
//   } catch (error) {
//     next(error)
//   }
// };

//cuenta
export const listarSucursales = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.sucursal s`;
  if(opcion != 'T') q = `select * from seguridad.sucursal s where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudSucursal  = async  (datos, respuesta, next) => {
  const {operacion,id_sucursal,codigo,nombre,direccion,fid_encargado} = datos.query;

  let q = `select * from seguridad.pra_crud_sucursal('${operacion}',${id_sucursal},'${codigo}','${nombre}','${direccion}',${fid_encargado});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);
  
  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};