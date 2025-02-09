import { testServer } from "./jest.setup";
import prisma from "./src/database/prisma-client";

module.exports = async (): Promise<void> => {
  console.log("Closing server after all tests...");

  if (testServer && testServer.listening) {
    await new Promise<void>((resolve, reject) => {
      testServer.close((err) => {
        if (err) {
          console.error("Error while closing the server:", err);

          return reject(err);
        }

        resolve();
      });
    });
  }

  // Fechando a conexão com o banco
  await prisma.$disconnect();
  console.log("Server closed successfully.");
};
