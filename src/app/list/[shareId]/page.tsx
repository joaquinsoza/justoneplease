import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import GiftListView from '@/components/GiftListView'

interface PageProps {
  params: Promise<{ shareId: string }>
}

export default async function GiftListPage({ params }: PageProps) {
  const { shareId } = await params
  
  const giftList = await prisma.giftList.findUnique({
    where: { shareId },
    include: {
      items: {
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  if (!giftList) {
    notFound()
  }

  return <GiftListView giftList={giftList} />
}