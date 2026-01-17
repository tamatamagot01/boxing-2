import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const { payload } = await request.json()
        const { firstName, lastName, email, phone, password } = payload

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'All required fields must be filled',
                },
                { status: 400 },
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User with this email already exists',
                },
                { status: 400 },
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email,
                phone: phone || null, // Optional field
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                is_backOffice: true,
                is_trainer: false,
                resetPassword: false,
            },
        })

        return NextResponse.json(
            {
                success: true,
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                },
            },
            { status: 201 },
        )
    } catch (error) {
        console.error('Create user API error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred during registration',
            },
            { status: 500 },
        )
    } finally {
        await prisma.$disconnect()
    }
}
