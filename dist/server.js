"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config/config"));
let server;
// Function for graceful server shutdown on specific signals
const gracefulShutdown = (signal) => {
    console.log(`${signal} received`);
    if (server) {
        server.close(() => {
            console.log("Server closed gracefully");
            process.exit(0);
        });
    }
    else {
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
    }
    else {
        process.exit(1);
    }
});
// Main function to connect to the database and start the server
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            console.log("✅ Database connected successfully");
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`🚀 Server is running on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error("❌ Failed to connect to the database:", err);
            process.exit(1);
        }
    });
}
startServer();
// Handle SIGINT and SIGTERM for graceful shutdown
["SIGTERM", "SIGINT"].forEach((signal) => {
    process.on(signal, () => gracefulShutdown(signal));
});
