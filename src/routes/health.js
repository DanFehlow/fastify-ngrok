"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = healthRoutes;
const zod_1 = __importDefault(require("zod"));
function healthRoutes(app) {
    app.get("/health", {
        schema: {
            tags: ["healthcheck"],
            description: "API para verificar a saúde do servidor",
            response: {
                200: zod_1.default.object({
                    status: zod_1.default.string(),
                    uptime: zod_1.default.number()
                })
            }
        }
    }, () => {
        return {
            status: "HealthCheck Ok!",
            uptime: process.uptime()
        };
    });
}
