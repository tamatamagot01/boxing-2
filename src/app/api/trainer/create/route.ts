/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { payload } = await req.json()
    const { firstName, lastName, email, phone } = payload

    try {
        const existedTrainer = await prisma.user.findFirst({
            where: {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
            },
        })

        if (existedTrainer) {
            return NextResponse.json(
                { error: 'This is existed trainer' },
                { status: 400 },
            )
        }

        const trainer = await prisma.user.create({
            data: {
                is_trainer: true,
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
