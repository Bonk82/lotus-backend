import { Router } from "express";
import * as login from "../controllers/login.js";

const router = Router();

/**********LOGIN*/
router.get('/sisupre_seguridad/', login.login)
// router.get('/sisupre_loginEmpresa/:nit/:pass/:tipo', login.loginEmpresa)
// //proceso lista modulos filtrados por rol
// router.get('/sisupre_listamoduloxrol/:idcon', login.listamoduloxrol)
// //proceso lista sub menu FORMULARIOS ADMINISTRATIVOS
// router.get('/sisupre_listasubmenumodulos/:idcon/:idmod', login.listasubmenumodulos)
// //lista menu
// router.get('/sisupre_listamenu/:idcon', login.listamenu)
// router.get('/sisupre_registraConexion/:usuario/:tipo', login.registraConexion)
// //proceso lista sub menu FORMULARIOS ADMINISTRATIVOS
// router.get('/sisupre_listalogin/:idcon/:idmod', login.listalogin)
// //Verifica Conexion empresas y otros
// router.get('/sisupre_conexion/:idcon', login.sisupre_conexion)
// //Cerrar Sesion
// router.get('/sisupre_cerrarsesion/:idcon', login.cerrarsesion)
// //Fecha Servidor
// router.get('/sisupre_fechasrv', login.fechasrv)

// router.get('/sisupre_rolesasignados/:id_usu', login.sisupre_rolesasignados)
// //Lista roles del usuario administracion
// router.get('/sisupre_administracion_roles/:id_usu', login.sisupre_administracion_roles)
// /*UBICACIONES DEPARTAMENTO PROVINCIA MUNICIPIO*/
// router.get('/sisupre_listas', login.sisupre_listas)//para dep,prov y mun
// /*********************************************************************
// MANEJO DE PARAMETRICAS DE SEGURIDAD
// /********************************************************************/
// router.get('/1_listaParametricaSeguridad/:tipo', login.listaParametricaSeguridad);        
// /*********************************************************************
// CONEXION A SERVICIO DE IMPUESTOS NACIONALES
// ********************************************************************/
// router.get('/loginEmpresa', login.servicioImpuestos);
// /*********************************************************************
// parametros configuracion RRHH
// ********************************************************************/
// router.get('/11_parametrosConfiguracionRRHH/:codigo', login.parametrosConfiguracionRRHH);

export default router;