/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const query = searchParams.get('query') || ''
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    const searchCondition = query
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
                  { email: { contains: query, mode: 'insensitive' as const } },
                  { phone: { contains: query, mode: 'insensitive' as const } },
              ],
          }
        : {}

    const skip = (pageIndex - 1) * pageSize
    const take = pageSize

    try {
        const result = await prisma.$transaction(async (tx) => {
            const customers = await tx.user.findMany({
                where: searchCondition,
                skip: skip,
                take: take,
                orderBy: {
                    id: 'desc',
                },
            })

            const count = await tx.user.count({
                where: searchCondition,
            })

            return { customers, count }
        })

        return NextResponse.json({ customers: result })
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
