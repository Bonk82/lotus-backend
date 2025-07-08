import * as da from '../connection/connexPostgres.js'

//componente
export const listarComponentes  = async  (datos, respuesta, next) => {
  const {opcion,id} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.componente c where c.activo=1`;
  if(opcion != 'T') q = `select * from venta.componente c where c.activo=1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudComponente   = async  (datos, respuesta, next) => {
  const {operacion,id_componente,fid_producto_main,fid_producto,unidad,cantidad,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_componente('${operacion}',${id_componente},${fid_producto_main},${fid_producto},'${unidad}',${cantidad},${usuario_registro});`;

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
  if(opcion == 'T') q = `select * from venta.control_caja cc`;
  if(opcion != 'T') q = `select * from venta.control_caja cc where ${opcion} = '${id}';`;
  if(opcion == 'ACTIVA') q = `select * from venta.control_caja cc where cc.estado = 'APERTURA' and cc.fid_sucursal = ${id} ;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudControlCaja  = async  (datos, respuesta, next) => {
  const {operacion,id_control_caja,fid_sucursal,fid_usuario_inicio,monto_inicio,fid_usuario_cierre,monto_cierre_qr,monto_cierre_tarjeta,monto_cierre_efectivo,observaciones,estado} = datos.query;

  let q = `select * from venta.pra_crud_control_caja('${operacion}',${id_control_caja},${fid_sucursal},${fid_usuario_inicio},${monto_inicio},${fid_usuario_cierre},${monto_cierre_qr},${monto_cierre_tarjeta},${monto_cierre_efectivo},'${observaciones}','${estado}');`;

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
  if(opcion == 'T') q = `select i.*,s.nombre sucursal,p.nombre proveedor
    from venta.ingreso i join seguridad.sucursal s on i.fid_sucursal =s.id_sucursal
    join venta.proveedor p on p.id_proveedor =i.fid_proveedor
    where i.activo=1;`;
  if(opcion != 'T') q = `select i.*,s.nombre sucursal,p.nombre proveedor
    from venta.ingreso i join seguridad.sucursal s on i.fid_sucursal =s.id_sucursal
    join venta.proveedor p on p.id_proveedor =i.fid_proveedor
    where i.activo=1 and ${opcion} = '${id}';`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudIngreso  = async  (datos, respuesta, next) => {
  const {operacion,id_ingreso,fid_proveedor,fid_sucursal,motivo,fecha_ingreso,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_ingreso('${operacion}',${id_ingreso},${fid_proveedor},${fid_sucursal},'${motivo}','${fecha_ingreso}',${usuario_registro});`;

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
  if(opcion == 'T') q = `select * from venta.ingreso_detalle id where id.activo=1`;
  if(opcion != 'T') q = `select * from venta.ingreso_detalle id where id.activo=1 and ${opcion} = '${id}';`;

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
  const {opcion,id,id_sucursal} = datos.query
  let q = ''
  if(opcion == 'T') q = `select * from venta.pedido p`;
  if(opcion != 'T') q = `select * from venta.pedido p where ${opcion} = '${id}';`;
  if(opcion == 'PEDIDOS') q = `select p.*,pd.*,pr.descripcion from venta.pedido p
    join venta.control_caja cc on cc.id_control_caja = p.fid_control_caja 
    join venta.pedido_detalle pd on pd.fid_pedido =p.id_pedido
    join venta.producto pr on pr.id_producto =pd.fid_producto
    where cc.estado ='APERTURA' and p.fid_usuario = ${id} and cc.fid_sucursal = ${id_sucursal};`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudPedido = async  (datos, respuesta, next) => {
  const {operacion,id_pedido,fid_usuario,fid_control_caja,mesa,metodo_pago,codigo_sync,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_pedido('${operacion}',${id_pedido},${fid_usuario},${fid_control_caja},'${mesa}','${metodo_pago}','${codigo_sync}',${usuario_registro});`;

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
  if(opcion == 'T') q = `select * from venta.pedido_detalle pd where pd.activo=`;
  if(opcion != 'T') q = `select * from venta.pedido_detalle pd where pd.activo=1 and ${opcion} = '${id}';`;

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
  if(opcion == 'T') q = `select p.*,(select array_to_json(array_agg(row_to_json(det)))
      from (select pd.descripcion item, c.cantidad , c.unidad ,c.id_componente
        from venta.componente c join venta.producto pd on c.fid_producto =pd.id_producto 
        where c.fid_producto_main = p.id_producto and c.activo =1 
      ) det
    )componentes
    from venta.producto p where p.activo=1 order by p.descripcion;`;
  if(opcion != 'T') q = `select p.*,(select array_to_json(array_agg(row_to_json(det)))
      from (select pd.descripcion item, c.cantidad , c.unidad ,c.id_componente
        from venta.componente c join venta.producto pd on c.fid_producto =pd.id_producto 
        where c.fid_producto_main = p.id_producto and c.activo =1 
      ) det
    )componentes
    from venta.producto p where p.activo=1 and ${opcion} = '${id}' order by p.descripcion;`;
  if(opcion == 'PEDIDO') q = `select p.id_producto ,p.descripcion,p.unidad,p.grupo
      ,sp.id_sucursal_producto,sp.existencia,sp.precio,sp.promocion
      from venta.producto p join venta.sucursal_producto sp
      on sp.fid_producto =p.id_producto and sp.fid_sucursal = ${id}
      where p.tipo_producto ='VENTA' and activo =1 order by p.grupo, p.descripcion;`;

  try {
    const consulta = await da.consulta(q);
    respuesta.status(200).json(consulta);
  } catch (error) {
    next(error)
  }
};

export const crudProducto = async  (datos, respuesta, next) => {
  const {operacion,id_producto,codigo,descripcion,unidad,capacidad,pedido_minimo,tipo_producto,grupo,usuario_registro} = datos.query;

  let q = `select * from venta.pra_crud_producto('${operacion}',${id_producto},'${codigo}','${descripcion}','${unidad}','${capacidad}',${pedido_minimo},'${tipo_producto}','${grupo}',${usuario_registro});`;

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
  if(opcion == 'T') q = `select * from venta.promocion p where p.activo=1`;
  if(opcion != 'T') q = `select * from venta.promocion p where p.activo=1 and ${opcion} = '${id}';`;

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
  if(opcion == 'T') q = `select * from venta.proveedor p where p.activo=1`;
  if(opcion != 'T') q = `select * from venta.proveedor p where p.activo=1 and ${opcion} = '${id}';`;

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