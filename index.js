import express from "express";
import cors from 'cors';
import morgan from "morgan";
import http from 'http';
import dotenv from 'dotenv';
import loginRoutes from './src/routes/login.routes.js';
import seguridadRoutes from './src/routes/seguridad.routes.js';
import ventaRoutes from './src/routes/venta.routes.js';
import logger from './src/middlewares/logReq.js';
import {errorHandler as error} from './src/middlewares/errorHandler.js';
import {tokenAuth} from './src/middlewares/seguridadToken.js';

dotenv.config();
const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(tokenAuth);

app.use(logger);//para activar el log de las consultas a la API

// Servir carpeta de imágenes
app.use("/uploads", express.static("uploads"));

//ROUTES
app.use(loginRoutes);
app.use(seguridadRoutes);
app.use(ventaRoutes);

app.use(error)

app.listen(process.env.PORT,()=> console.log(`Corriendo en el puerto ${process.env.PORT}`))