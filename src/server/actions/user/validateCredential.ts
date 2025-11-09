'use server'
import type { SignInCredential } from '@/@types/auth'
import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const validateCredential = async (values: SignInCredential) => {
    const { email, password } = values

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || !user.password) {
            return null
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return null
        }

        // Return user data in the format expected by NextAuth
        return {
            id: user.id.toString(),
            userName: `${user.first_name} ${user.last_name}`,
            email: user.email,
            avatar: user.img || '/img/avatars/thumb-1.jpg',
            authority: user.is_backOffice ? ['admin', 'user'] : ['user'],
        }
    } catch (error) {
        console.error('Validation error:', error)
        return null
    } finally {
        await prisma.$disconnect()
    }
}

export default validateCredential
