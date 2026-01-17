import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const userID = searchParams.get('userID')

        if (!userID) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User ID is required',
                },
                { status: 400 },
            )
        }

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userID) },
            select: {
                id: true,
                email: true,
                phone: true,
                first_name: true,
                last_name: true,
                img: true,
                is_backOffice: true,
                is_trainer: true,
                createdAt: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: 404 },
            )
        }

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    img: user.img,
                    is_backOffice: user.is_backOffice,
                    is_trainer: user.is_trainer,
                    created_at: user.createdAt,
                },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error('Get user API error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching user',
            },
            { status: 500 },
        )
    } finally {
        await prisma.$disconnect()
    }
}
