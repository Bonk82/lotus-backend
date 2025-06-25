import { Router } from "express";
import * as seguridad from "../controllers/seguridad.js";

const router = Router();

router.get('/listarUsuarios/', seguridad.listarUsuarios)
router.get('/crudUsuario/', seguridad.crudUsuario)
router.get('/listarClasificador/', seguridad.listarClasificador)
router.get('/crudClasificador/', seguridad.crudClasificador)
router.get('/listarSucursales/', seguridad.listarSucursales)
router.get('/crudSucursal/', seguridad.crudSucursal)
router.get('/listarMenu/', seguridad.listarMenu)

export default router;