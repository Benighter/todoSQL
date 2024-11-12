import express from "express";
import cors from "cors";
import path from "path";
import router from "../Router/Router.js";
import pool from "../dataDase/dataBaseConnection.js";
import  {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/api", router);

export{app}