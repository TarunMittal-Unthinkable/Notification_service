import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import bodyParser from 'body-parser';
import { startConsumer } from './consumer.js';
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

async function init() {
  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  startConsumer();
}

init().catch((e) => {
    console.log("=====eeeee=", e);
    throw e;
  });
