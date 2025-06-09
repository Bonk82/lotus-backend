import express from "express";
import cors from 'cors';
import morgan from "morgan";
import http from 'http';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import loginRoutes from './src/routes/login.routes.js';
import logger from './src/middlewares/logReq.js';
import {errorHandler as error} from './src/middlewares/errorHandler.js';
import {tokenAuth} from './src/middlewares/seguridadToken.js';
import {consulta as da} from './src/connection/connexPostgres.js';

dotenv.config();
const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(tokenAuth);

// app.use(logger);//para activar el log de las consultas a la API

const sql =  neon(process.env.DATABASE_URL);
//ROUTES
app.use(loginRoutes);

app.get('/login',async(req,res)=>{
  // const sql =  neon(process.env.DATABASE_URL);
    // res.send('Hola mundo');
  // const result = await sql(`SELECT * from security.user`);
  const result = await sql(`SELECT * from security.pr_crud_user(0,'n88','e88','p','s','rt')`);
  console.log('login',result);
  
  // const { version } = result[0];
  // res.writeHead(200, { "Content-Type": "text/plain" });
  res.send(result);
})

app.get('/message',(req,res)=>{
  res.send('API de ejemplo con Neon y Express');
});
app.get('/insert',async(req,res,next)=>{
  try {
    const result = await sql(`INSERT INTO auth.module (name, description, icon, access_path, module_type)
    VALUES ('stats', 'Módulo para revisar las estadísticas del negocio', 'chart', '/stats', 'PUBLIC');`);
    console.log('insert',result);
  } catch (error) {
    next(error);
  }
});
app.get('/insertdocker',async(req,res,next)=>{
  var q =`INSERT INTO auth.module (name, description, icon, access_path, module_type)
  VALUES ('stats', 'Módulo para revisar las estadísticas del negocio', 'chart', '/stats', 'PUBLIC');`;
    try {
      const consulta = await da(q);
      if(consulta[0]){
        const newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*16),cnx: consulta[0].id_conexion}, process.env.TOKEN_PWD);
        consulta.push({ruta:newToken})
      }
      res.json(consulta);
    } catch (error) {
      // console.log('error insertdocker',error.message || error);
      // res.status(500).json({message: 'Error en la consulta: '+ error.message});
      next(error);
    }
});

app.get('/insertdocker2',async(req,res,next)=>{
  var q =`INSERT INTO auth.module (name, description, icon, access_path, module_type)
  VALUES ('admin', 'Módulo para adminsitración rrot del negocio Ñn "como"', 'chart', '/stats', 'PUBLIC');`;
    try {
      const consulta = await da(q);
      if(consulta[0]){
        const newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*16),cnx: consulta[0].id_conexion}, process.env.TOKEN_PWD);
        consulta.push({ruta:newToken})
      }
      res.json(consulta);
    } catch (error) {
      // console.log('error insertdocker',error.message || error);
      // res.status(500).json({message: 'Error en la consulta: '+ error.message});
      next(error);
    }
});

app.use(error)

app.listen(process.env.PORT,()=> console.log(`Corriendo en el puerto ${process.env.PORT}`))