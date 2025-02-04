import { FastifyTypeProvider } from "../types";
import z from "zod";
import { randomUUID, UUID } from "node:crypto";
enum Sexo {
  Masculino = "Masculino",
  Feminino = "Feminino",
}
interface User {
  id: UUID;
  cpf: string;
  email: string;
  celular: string;
  nome: string;
  nome_social: string;
  data_nascimento: Date;
  data_obito: Date;
  sexo: Sexo;
}
const users: User[] = [];
const sexoEnumValues = Object.values(Sexo) as [Sexo, ...Sexo[]];

export async function usersRoutes(app: FastifyTypeProvider) {
  app.get(
    "/users",
    {
      schema: {
        tags: ["Usuários"],
        description: "List users",
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              cpf: z.string(),
              email: z.string(),
              celular: z.string(),
              nome: z.string(),
              nome_social: z.string(),
              data_nascimento: z.date(),
              data_obito: z.date(),
              sexo: z.enum(sexoEnumValues),
            })
          ),
        },
      },
    },
    () => {
      return users;
    }
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["Usuários"],
        description: "Criar novo usuário",
        body: z.object({
          id: z.string(),
          cpf: z.string(),
          email: z.string(),
          celular: z.string(),
          nome: z.string(),
          nome_social: z.string(),
          data_nascimento: z.string().transform((val) => new Date(val)),
          data_obito: z.string().transform((val) => new Date(val)),
          // data_nascimento: z.date(),
          // data_obito: z.date(),
          sexo: z.enum(sexoEnumValues),
        }),
        response: {
          201: z.null().describe("Usuário registrado com sucesso!"),
        },
      },
    },
    async (request, reply) => {
      const { body } = request;
      users.push({
        ...body,
        id: randomUUID(),
      });
      return reply.status(201).send();
    }
  );
}
