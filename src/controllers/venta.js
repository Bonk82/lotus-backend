import * as da from '../connection/connexPostgres.js'

//componente
export const listarComponentes  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.componente c`;
  if(opcion != 'T') q = `select * from venta.componente c where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudComponente   = async  (datos, respuesta, next) => {
  const {operacion,id_componente,fid_producto,unidad,cantidad,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_componente('${operacion}',${id_componente},${fid_producto},'${unidad}',${cantidad},${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//controlCaja
export const listarControlCajas  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.control_caja cc `;
  if(opcion != 'T') q = `select * from venta.control_caja cc where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudControlCaja  = async  (datos, respuesta, next) => {
  const {operacion,id_control_caja,fecha,fid_usuario_inicio,inicio,monto_inicio,fid_usuario_cierre,cierre,monto_cierre_qr,monto_cierre_tarjeta,monto_cierre_efectivo,observaciones,estado} = datos.query;

  let q = `select * from venta.pra_crud_control_caja('${operacion}',${id_control_caja},'${fecha}',${fid_usuario_inicio},'${inicio}',${monto_inicio},${fid_usuario_cierre},'${cierre}',${monto_cierre_qr},${monto_cierre_tarjeta},${monto_cierre_efectivo},'${observaciones}','${estado}');`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//ingreso
export const listarIngresos  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.ingreso i `;
  if(opcion != 'T') q = `select * from venta.ingreso i where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudIngreso  = async  (datos, respuesta, next) => {
  const {operacion,id_ingreso,fid_proveedor,fid_saucursal,motivo,fecha_ingreso,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_ingreso('${operacion}',${id_ingreso},${fid_proveedor},${fid_saucursal},'${motivo}','${fecha_ingreso}',${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//ingresoDetalle
export const listarIngresoDetalles  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.ingreso_detalle id `;
  if(opcion != 'T') q = `select * from venta.ingreso_detalle id where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudIngresoDetalle = async  (datos, respuesta, next) => {
  const {operacion,id_ingreso_detalle,fid_ingreso,fid_producto,cantidad,precio_compra,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_ingreso_detalle('${operacion}',${id_ingreso_detalle},${fid_ingreso},${fid_producto},${cantidad},${precio_compra},${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//pedido
export const listarPedidos  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.pedido p`;
  if(opcion != 'T') q = `select * from venta.pedido p where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPedido = async  (datos, respuesta, next) => {
  const {operacion,id_pedido,fid_usuario,fid_saucursal,mesa,metodo_pago,codigo_sync,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_pedido('${operacion}',${id_pedido},${fid_usuario},${fid_saucursal},'${mesa}','${metodo_pago}','${codigo_sync}',${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//pedidoDetalle
export const listarPedidoDetalles  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.pedido_detalle pd`;
  if(opcion != 'T') q = `select * from venta.pedido_detalle pd where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPedidoDetalle = async  (datos, respuesta, next) => {
  const {operacion,id_pedido_detalle,fid_pedido,fid_producto,cantidad,descuento,precio_unidad,fid_codigo_sync} = datos.query;

  let q = `select * from venta.pra_crud_pedido_detalle('${operacion}',${id_pedido_detalle},${fid_pedido},${fid_producto},${cantidad},${descuento},${precio_unidad},'${fid_codigo_sync}');`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//producto
export const listarProductos  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.producto p `;
  if(opcion != 'T') q = `select * from venta.producto p where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudProducto = async  (datos, respuesta, next) => {
  const {operacion,id_producto,codigo,descripcion,unidad,capacidad,existencia,precio,promocion,pedido_minimo,tipo_pruducto,grupo,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_producto('${operacion}',${id_producto},'${codigo}','${descripcion}','${unidad}','${capacidad}',${existencia},${precio},${promocion},${pedido_minimo},'${tipo_pruducto}','${grupo}',${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//promocion
export const listarPromociones  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.promocion p`;
  if(opcion != 'T') q = `select * from venta.promocion p where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPromocion= async  (datos, respuesta, next) => {
  const {operacion,id_promocion,nombre,dias,hora_inicio,hora_fin,grupo_producto,fid_producto,descuento,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_promocion('${operacion}',${id_promocion},'${nombre}','${dias}','${hora_inicio}','${hora_fin}','${grupo_producto}',${fid_producto},${descuento},${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

//PROVEEDOR
export const listarProveedores  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.proveedor p`;
  if(opcion != 'T') q = `select * from venta.proveedor p where ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudProveedor = async  (datos, respuesta, next) => {
  const {operacion,id_proveedor,nombre,direccion,referencia,telefonos,cuenta,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_proveedor('${operacion}',${id_proveedor},'${nombre}','${direccion}','${referencia}','${telefonos}','${cuenta}',${usuario_registro});`;

  const mod = q.replace(/'null'/gi,`null`).replace(/''/g,`null`);

  try {
    const consulta = await da.consulta(mod);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};