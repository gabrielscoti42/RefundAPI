import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';
import { z } from 'zod';

class UsersController {
    async create(request: Request, response: Response): Promise<any> {
        const bodySchema = z.object({
            name: z.string().nonempty().trim().min(2, {message: "Nome é obrigatório e deve ter no mínimo 2 caracteres"}),
            email: z.string().email({message: "E-mail inválido"}).trim().toLowerCase(),
            password: z.string().min(6, {message: "Senha é obrigatória e deve ter no mínimo 6 caracteres"}),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee),
        });

        const { name, email, password, role } = bodySchema.parse(request.body);

        const userWithSameEmail = await prisma.user.findFirst({where: {email}});

        if (userWithSameEmail) {
            throw new AppError('E-mail já cadastrado', 400);
        }

        const hashedPassword = await hash(password, 8)

        await prisma.user.create({
            data: {
                name,
                email, 
                password: hashedPassword,
                role,
            }
        })

        response.status(201).json()
    }
}

export { UsersController }