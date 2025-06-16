import { Router } from "express";
import * as seguridad from "../controllers/seguridad.js";

const router = Router();

/**********LOGIN*/
router.get('/usuarios/', seguridad.listarUsuarios)
router.get('/crudUsuarios/', seguridad.crudUsuario)

export default router;