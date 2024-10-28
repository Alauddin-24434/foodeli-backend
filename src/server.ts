import mongoose from "mongoose";
import app from "./app";

import { Server } from "http";
import config from "./app/config/config";

let server: Server;

// Function for graceful server shutdown on specific signals
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received`);
  if (server) {
    server.close(() => {
      console.log("Server closed gracefully");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Handle unexpected errors and promise rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  if (server) {
    server.close(() => {
      console.error("Server closed due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Main function to connect to the database and start the server
async function startServer() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("✅ Database connected successfully");

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  }
}

startServer();

// Handle SIGINT and SIGTERM for graceful shutdown
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});
