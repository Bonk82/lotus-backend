
import * as da from '../connection/connexPostgres.js'
import crypto from 'crypto'

//usuarios
export const listarUsuarios  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.usuario u order by u.cuenta`;
  if(opcion != 'T') q = `select * from seguridad.usuario u where ${opcion} = '${id}' order by u.cuenta;`;
  if(opcion == 'AA') q = `select u.id_usuario,u.cuenta,u.ci,u.fecha_nacimiento,u.telefonos,u.estado,u.fid_rol from seguridad.usuario u where (u.estado = 'ALTA' and u.fid_rol in(2,3,4)) or (u.estado = 'ASIGNADO' and u.fid_sucursal = ${id}) order by u.cuenta;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudUsuario   = async  (datos, respuesta, next) => {
  let {operacion,id_usuario,fid_rol,fid_sucursal,cuenta,pass,tipo_acceso,ci,fecha_nacimiento,nombres,paterno,materno,correo,telefonos,estado} = datos.query;

  let hash = null
  if(pass) hash = crypto.createHash('sha256').update(pass).digest('hex');
  if(!pass && operacion == 'I') hash = crypto.createHash('sha256').update(`${ci}#${(paterno || '').toLowerCase()}*`).digest('hex');
  if(!cuenta && operacion == 'I') cuenta = (`${nombres.split(' ')[0]}.${paterno}`).toUpperCase();
  if(fid_sucursal && operacion) tipo_acceso = 'INTERNO';

  let q = `select * from seguridad.pra_crud_usuario('${operacion}',${id_usuario},${fid_rol},${fid_sucursal},'${cuenta}','${hash}','${tipo_acceso}','${ci}','${fecha_nacimiento}','${nombres}','${paterno}','${materno}','${correo}','${telefonos}','${estado}');`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

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
  if(opcion == 'T') q = `select * from seguridad.clasificador c where c.activo = 1;`;
  if(opcion != 'T') q = `select * from seguridad.clasificador c where c.activo = 1 and ${opcion} = '${id}';`;

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

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//SUCURSALES
export const listarSucursales = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select s.*,u.cuenta encargado from seguridad.sucursal s
         left join seguridad.usuario u on s.fid_encargado =u.id_usuario
         where s.activo = 1 order by s.codigo;`;
  if(opcion != 'T') q = `select s.*,u.cuenta encargado from seguridad.sucursal s
         left join seguridad.usuario u on s.fid_encargado =u.id_usuario
         where s.activo = 1 and ${opcion} = '${id}' order by s.codigo;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudSucursal  = async  (datos, respuesta, next) => {
  const {operacion,id_sucursal,codigo,nombre,direccion,ip,fid_encargado} = datos.query;

  let q = `select * from seguridad.pra_crud_sucursal('${operacion}',${id_sucursal},'${codigo}','${nombre}','${direccion}','${ip}',${fid_encargado});`;

  const mod = q.replace(/undefined/gi,`null`).replace(/'null'/gi,`null`).replace(/''/g,`null`).replace(/,,/g,`,null,`);
  
  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//rol_menu
export const listarMenu = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.rol_menu rm`;
  if(opcion != 'T') q = `select * from seguridad.rol_menu rm where ${opcion} = '${id}';`;
  if(opcion == 'ROL') q = `select m.id_menu,m.descripcion,m.ruta,m.nivel from seguridad.rol_menu rm
      join seguridad.menu m on rm.fid_menu = m.id_menu where rm.fid_rol =${id};`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//roles
export const listarRoles  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from seguridad.rol r`;
  if(opcion != 'T') q = `select * from seguridad.rol r where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//obtener API
export const obtenerAPI  = async  (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    respuesta.status(200).json({ip});
  } catch (error) {
    next(error)
  }
};