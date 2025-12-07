import { app } from "./interfaces/app";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5500;

const startingServer = async () => {
  try {
    app.listen(port, () => {
      setTimeout(() => {
        console.log(`Servidor rodando na porta: ${port}`);
      });
    });
  } catch (err: any) {
    console.error(`Error ao iniciar o servidor: ${err.message}`);
    process.exit(1);
  }
};

startingServer();
