/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { payload } = await req.json()
    const { id, firstName, lastName, email, phone } = payload

    try {
        const existedCustomer = await prisma.user.findFirst({
            where: { id },
        })

        if (!existedCustomer) {
            return NextResponse.json(
                { error: 'Cannot find this customer' },
                { status: 400 },
            )
        }

        const customer = await prisma.user.update({
            where: { id },
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
            },
        })

        return NextResponse.json({ customer: customer })
    } catch (error: any) {
        console.error('Error creating customer:', error)
        return NextResponse.json(
            { error: 'Failed to create customer' },
            { status: 500 },
        )
    }
}
