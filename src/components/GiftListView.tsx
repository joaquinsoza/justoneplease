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
      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share({
          title: `${giftList.name} - Gift List`,
          text: `Check out my gift list: ${giftList.name}`,
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert('Link copied to clipboard!')
      }
    } catch {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        alert('Link copied to clipboard!')
      } catch {
        alert(`Copy this link: ${shareUrl}`)
      }
      document.body.removeChild(textArea)
    }
  }

  const availableCount = items.filter(item => !item.isBought).length
  const totalCount = items.length

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => router.push('/')}
            className="mb-4 sm:mb-6 text-purple-600 hover:text-purple-700 flex items-center gap-2 text-sm font-medium touch-manipulation min-h-[44px] px-2 -mx-2 rounded-lg"
          >
            ← Create New List
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight break-words">{giftList.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {availableCount} of {totalCount} items available
                </p>
              </div>
              
              <button
                onClick={copyShareLink}
                className="w-full sm:w-auto px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 active:bg-purple-800 transition-colors font-medium touch-manipulation min-h-[52px] flex items-center justify-center gap-2"
              >
                <span className="hidden sm:inline">📋 Copy Share Link</span>
                <span className="sm:hidden">📱 Share List</span>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    item.isBought
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium text-base sm:text-lg break-words ${
                        item.isBought ? 'line-through text-gray-500' : ''
                      }`}>
                        {item.name}
                      </h3>
                      {item.isBought && item.boughtAt && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2 sm:mt-1">
                          ✅ Claimed on {new Date(item.boughtAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleItem(item.id, item.isBought)}
                      disabled={isLoading === item.id}
                      className={`w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 rounded-xl font-medium transition-colors disabled:opacity-50 touch-manipulation min-h-[48px] flex items-center justify-center text-sm sm:text-base ${
                        item.isBought
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
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
                <div className="text-4xl mb-4">🎁</div>
                <p className="text-base sm:text-lg">No items in this list yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}