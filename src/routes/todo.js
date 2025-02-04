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
exports.todoRoutes = todoRoutes;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const node_crypto_1 = require("node:crypto");
const todoList = [
    {
        id: "9f30fc79-312c-403e-8a05-d154703222ee",
        task: "xablau",
        done: false,
        endDate: null
    }
];
function todoRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        app.get("/todo", {
            schema: {
                tags: ["Utilitários"],
                description: "List todo items",
                response: {
                    200: zod_1.default.array(zod_1.default.object({
                        id: zod_1.default.string(),
                        task: zod_1.default.string(),
                        done: zod_1.default.boolean().default(false).optional(),
                        endDate: zod_1.default.date().nullable().optional()
                    }))
                }
            }
            // implementar queries pelo prisma
        }, () => todoList);
        app.post("/todo", {
            schema: {
                tags: ["Utilitários"],
                description: "Create a new Todo Task",
                body: zod_1.default.object({ task: zod_1.default.string() }),
                response: {
                    201: zod_1.default.null().describe("Task Created")
                }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { task } = request.body;
            todoList.push({
                id: (0, node_crypto_1.randomUUID)(),
                task,
                done: false,
                endDate: null
            });
            return reply.status(201).send();
        }));
        app.put("/todo", {
            schema: {
                tags: ["Utilitários"],
                description: "Create a new Todo Task",
                body: zod_1.default.object({
                    id: zod_1.default.string(),
                    done: zod_1.default.boolean()
                }),
                response: {
                    200: zod_1.default.array(zod_1.default.object({
                        id: zod_1.default.string(),
                        task: zod_1.default.string(),
                        done: zod_1.default.boolean().default(false).optional(),
                        endDate: zod_1.default.date().nullable().optional()
                    }))
                }
            }
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, done } = req.body;
            const filteredList = todoList.filter(task => task.id !== id);
            // Encontra o item correspondente pelo ID
            const findTask = todoList.find(task => task.id === id);
            if (findTask) {
                todoList.length = 0;
                todoList.push(...filteredList, Object.assign(Object.assign({}, findTask), { endDate: new Date(), done }));
            }
            return res.status(200).send(todoList);
        }));
    });
}
