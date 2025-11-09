import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const session = await auth()

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 },
            )
        }

        // Fetch user data from database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                email: true,
                phone: true,
                first_name: true,
                last_name: true,
                img: true,
                is_backOffice: true,
                is_trainer: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 },
            )
        }

        return NextResponse.json({
            success: true,
            user,
        })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch user data' },
            { status: 500 },
        )
    } finally {
        await prisma.$disconnect()
    }
}
