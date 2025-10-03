/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    // const classType = searchParams.get('classType') ?? ''

    try {
        const result = await prisma.$transaction(async (tx) => {
            const customers = await tx.user.findMany()

            const count = await tx.user.count()

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
