import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const { payload } = await request.json()
        const { id, firstName, lastName, email, phone, password } = payload

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User ID is required',
                },
                { status: 400 },
            )
        }

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'First name, last name, and email are required',
                },
                { status: 400 },
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        })

        if (!existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: 404 },
            )
        }

        // Check if email is already taken by another user
        const emailTaken = await prisma.user.findFirst({
            where: {
                email,
                NOT: {
                    id: parseInt(id),
                },
            },
        })

        if (emailTaken) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email is already taken by another user',
                },
                { status: 400 },
            )
        }

        // Build update data
        const updateData: any = {
            email,
            phone: phone || null,
            first_name: firstName,
            last_name: lastName,
        }

        // Only update password if provided
        if (password && password.trim() !== '') {
            updateData.password = await bcrypt.hash(password, 10)
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updateData,
        })

        return NextResponse.json(
            {
                success: true,
                message: 'User updated successfully',
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    firstName: updatedUser.first_name,
                    lastName: updatedUser.last_name,
                },
            },
            { status: 200 },
        )
    } catch (error) {
        console.error('Update user API error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while updating user',
            },
            { status: 500 },
        )
    } finally {
        await prisma.$disconnect()
    }
}
