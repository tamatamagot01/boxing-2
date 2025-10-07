/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const classType = searchParams.get('classType') ?? ''

    if (classType !== 'private' && classType !== 'group') {
        return NextResponse.json(
            { error: 'Please select the class type first' },
            { status: 500 },
        )
    }

    try {
        const times = await prisma.timeList.findMany({
            where: { classType },
        })

        const trainers = await prisma.user.findMany({
            where: { is_trainer: true },
        })

        const results = { times, trainers }

        return NextResponse.json({ results })
    } catch (error: any) {
        console.error('Error fetching data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 },
        )
    }
}
