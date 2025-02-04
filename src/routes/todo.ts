import { FastifyTypeProvider } from "../types";
import { PrismaClient } from '@prisma/client'
import z from "zod";
import { randomUUID, UUID } from "node:crypto";

interface Todo {
    id: UUID,
    task: string,
    done?: boolean
    endDate?: Date | null
}

const todoList: Todo[] = [
    {
        id: "9f30fc79-312c-403e-8a05-d154703222ee",
        task: "xablau",
        done: false,
        endDate: null
    }
]

export async function todoRoutes(app: FastifyTypeProvider) {
    const prisma = new PrismaClient()

    app.get("/todo", {
        schema: {
            tags: ["Utilitários"],
            description: "List todo items",
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    task: z.string(),
                    done: z.boolean().default(false).optional(),
                    endDate: z.date().nullable().optional()
                }))
            }
        }
        // implementar queries pelo prisma
    }, (): Todo[] => todoList)

    app.post("/todo", {
        schema: {
            tags: ["Utilitários"],
            description: "Create a new Todo Task",
            body: z.object({ task: z.string() }),
            response: {
                201: z.null().describe("Task Created")
            }
        }
    }, async (request, reply) => {
        const { task } = request.body
        todoList.push({
            id: randomUUID(),
            task,
            done: false,
            endDate: null
        })
        return reply.status(201).send()
    })

    app.put("/todo", {
        schema: {
            tags: ["Utilitários"],
            description: "Create a new Todo Task",
            body: z.object({ 
                id: z.string(), 
                done: z.boolean()
            }),
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    task: z.string(),
                    done: z.boolean().default(false).optional(),
                    endDate: z.date().nullable().optional()
                }))
            }
        }
    }, async (req, res) => {
        const {id, done} = req.body
      
        const filteredList = todoList.filter(task => task.id !== id);
        
        // Encontra o item correspondente pelo ID
        const findTask = todoList.find(task => task.id === id);
        if (findTask) {
            todoList.length = 0; 
            todoList.push(...filteredList, { ...findTask, endDate: new Date(), done });
        }
         
        return res.status(200).send(todoList)
    })

}