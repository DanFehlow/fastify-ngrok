import { FastifyTypeProvider } from "../types";
import z from "zod";

export function healthRoutes(app: FastifyTypeProvider) {
    app.get("/health", {
        schema: {
            tags: ["healthcheck"],
            description: "API para verificar a saúde do servidor",
            response: {
                200: z.object({
                    status: z.string(),
                    uptime: z.number()
                })
            }
        }
    }, () => {
        return {
            status: "HealthCheck Ok!",
            uptime: process.uptime()
        }
    })
}