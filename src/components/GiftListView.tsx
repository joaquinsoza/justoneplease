'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface GiftItem {
  id: string
  name: string
  isBought: boolean
  boughtAt: Date | null
}

interface GiftList {
  id: string
  name: string
  shareId: string
  items: GiftItem[]
}

interface GiftListViewProps {
  giftList: GiftList
}

export default function GiftListView({ giftList }: GiftListViewProps) {
  const [items, setItems] = useState(giftList.items)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const toggleItem = async (itemId: string, currentStatus: boolean) => {
    setIsLoading(itemId)
    
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isBought: !currentStatus,
        }),
      })

      if (response.ok) {
        const updatedItem = await response.json()
        setItems(items.map(item => 
          item.id === itemId ? updatedItem : item
        ))
      } else {
        alert('Failed to update item. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}/list/${giftList.shareId}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    } catch {
      alert('Failed to copy link. Please copy the URL manually.')
    }
  }

  const availableCount = items.filter(item => !item.isBought).length
  const totalCount = items.length

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="mb-6 text-purple-600 hover:text-purple-700 flex items-center gap-2 text-sm font-medium"
          >
            ← Create New List
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{giftList.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {availableCount} of {totalCount} items available
                </p>
              </div>
              
              <button
                onClick={copyShareLink}
                className="mt-4 md:mt-0 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                📋 Copy Share Link
              </button>
            </div>

            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all ${
                    item.isBought
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        item.isBought ? 'line-through text-gray-500' : ''
                      }`}>
                        {item.name}
                      </h3>
                      {item.isBought && item.boughtAt && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          ✅ Claimed on {new Date(item.boughtAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleItem(item.id, item.isBought)}
                      disabled={isLoading === item.id}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                        item.isBought
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isLoading === item.id ? '...' : item.isBought ? 'Mark Available' : 'Mark as Bought'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No items in this list yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}