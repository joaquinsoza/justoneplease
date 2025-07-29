import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{ itemId: string }>
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { itemId } = await context.params
    const { isBought } = await request.json()

    if (typeof isBought !== 'boolean') {
      return NextResponse.json(
        { error: 'isBought must be a boolean' },
        { status: 400 }
      )
    }

    const updatedItem = await prisma.giftItem.update({
      where: { id: itemId },
      data: {
        isBought,
        boughtAt: isBought ? new Date() : null,
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating gift item:', error)
    return NextResponse.json(
      { error: 'Failed to update gift item' },
      { status: 500 }
    )
  }
}