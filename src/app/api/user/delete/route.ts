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

        await prisma.user.delete({
            where: { id: parseInt(userID) },
        })

        return NextResponse.json(
            {
                success: true,
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
