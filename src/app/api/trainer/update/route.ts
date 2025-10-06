/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { payload } = await req.json()
    const { id, firstName, lastName, email, phone } = payload

    try {
        const existedTrainer = await prisma.user.findFirst({
            where: { id },
        })

        if (!existedTrainer) {
            return NextResponse.json(
                { error: 'Cannot find this trainer' },
                { status: 400 },
            )
        }

        const trainer = await prisma.user.update({
            where: { id },
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
            },
        })

        return NextResponse.json({ trainer: trainer })
    } catch (error: any) {
        console.error('Error creating trainer:', error)
        return NextResponse.json(
            { error: 'Failed to create trainer' },
            { status: 500 },
        )
    }
}
