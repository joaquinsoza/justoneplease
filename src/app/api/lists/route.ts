import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, items } = await request.json()

    if (!name || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Name and items are required' },
        { status: 400 }
      )
    }

    const giftList = await prisma.giftList.create({
      data: {
        name,
        items: {
          create: items.map((item: string) => ({
            name: item,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({ 
      id: giftList.id, 
      shareId: giftList.shareId,
      name: giftList.name,
      items: giftList.items
    })
  } catch (error) {
    console.error('Error creating gift list:', error)
    return NextResponse.json(
      { error: 'Failed to create gift list' },
      { status: 500 }
    )
  }
}