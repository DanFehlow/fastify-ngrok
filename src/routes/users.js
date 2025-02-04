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
exports.usersRoutes = usersRoutes;
const zod_1 = __importDefault(require("zod"));
const node_crypto_1 = require("node:crypto");
var Sexo;
(function (Sexo) {
    Sexo["Masculino"] = "Masculino";
    Sexo["Feminino"] = "Feminino";
})(Sexo || (Sexo = {}));
const users = [];
const sexoEnumValues = Object.values(Sexo);
function usersRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/users", {
            schema: {
                tags: ["Usuários"],
                description: "List users",
                response: {
                    200: zod_1.default.array(zod_1.default.object({
                        id: zod_1.default.string(),
                        cpf: zod_1.default.string(),
                        email: zod_1.default.string(),
                        celular: zod_1.default.string(),
                        nome: zod_1.default.string(),
                        nome_social: zod_1.default.string(),
                        data_nascimento: zod_1.default.date(),
                        data_obito: zod_1.default.date(),
                        sexo: zod_1.default.enum(sexoEnumValues),
                    })),
                },
            },
        }, () => {
            return users;
        });
        app.post("/users", {
            schema: {
                tags: ["Usuários"],
                description: "Criar novo usuário",
                body: zod_1.default.object({
                    id: zod_1.default.string(),
                    cpf: zod_1.default.string(),
                    email: zod_1.default.string(),
                    celular: zod_1.default.string(),
                    nome: zod_1.default.string(),
                    nome_social: zod_1.default.string(),
                    data_nascimento: zod_1.default.string().transform((val) => new Date(val)),
                    data_obito: zod_1.default.string().transform((val) => new Date(val)),
                    // data_nascimento: z.date(),
                    // data_obito: z.date(),
                    sexo: zod_1.default.enum(sexoEnumValues),
                }),
                response: {
                    201: zod_1.default.null().describe("Usuário registrado com sucesso!"),
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            users.push(Object.assign(Object.assign({}, body), { id: (0, node_crypto_1.randomUUID)() }));
            return reply.status(201).send();
        }));
    });
}
