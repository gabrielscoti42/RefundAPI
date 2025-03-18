import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

const CategoriesEnum = z.enum([
    "food",
    "others", 
    "services",
    "transport",
    "accommodation"])

class RefundsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1, {message: "Informe o nome da solicitação"}),
            category: CategoriesEnum,
            amount: z.number().positive({message: "O valor precisa ser positivo"}),
            filename: z.string()
        })

        const {name, category, amount, filename} = bodySchema.parse(request.body)

        if(!request.user?.id) {
            throw new AppError("Não autorizado.")
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userID: request.user.id
            }
        })

        response.status(201).json(refund)
    }

    async index(request: Request, response: Response) {
        const refunds = await prisma.refunds.findMany()

        response.json(refunds)
    }
    
}

export { RefundsController }