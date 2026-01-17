import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('query') || ''
        const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
        const pageSize = parseInt(searchParams.get('pageSize') || '10')

        const skip = (pageIndex - 1) * pageSize

        // Build where clause for search
        const where = query
            ? {
                  OR: [
                      {
                          first_name: {
                              contains: query,
                              mode: 'insensitive' as const,
                          },
                      },
                      {
                          last_name: {
                              contains: query,
                              mode: 'insensitive' as const,
                          },
                      },
                      {
                          email: {
                              contains: query,
                              mode: 'insensitive' as const,
                          },
                      },
                      {
                          phone: {
                              contains: query,
                              mode: 'insensitive' as const,
                          },
                      },
                  ],
              }
            : {}

        // Get total count
        const count = await prisma.user.count({ where })

        // Get users with pagination
        const users = await prisma.user.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: {
                id: 'desc',
            },
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

        return NextResponse.json(
            {
                success: true,
                users: {
                    users: users.map((user) => ({
                        id: user.id,
                        email: user.email,
                        phone: user.phone,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        img: user.img,
                        is_backOffice: user.is_backOffice,
                        is_trainer: user.is_trainer,
                        createdAt: user.createdAt,
                    })),
                    count,
                },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error('Get users API error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching users',
            },
            { status: 500 },
        )
    } finally {
        await prisma.$disconnect()
    }
}
