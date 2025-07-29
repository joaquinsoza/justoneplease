'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateListForm() {
  const [listName, setListName] = useState('')
  const [items, setItems] = useState([''])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const addItem = () => {
    setItems([...items, ''])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const validItems = items.filter(item => item.trim() !== '')
      
      if (!listName.trim() || validItems.length === 0) {
        alert('Please enter a list name and at least one item')
        return
      }

      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: listName.trim(),
          items: validItems,
        }),
      })

      if (response.ok) {
        const { shareId } = await response.json()
        router.push(`/list/${shareId}`)
      } else {
        alert('Failed to create list. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label htmlFor="listName" className="block text-sm font-medium mb-2">
            List Name
          </label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="e.g., Diego's Birthday List"
            className="w-full px-4 py-4 text-base rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-foreground placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
            autoComplete="off"
            autoCapitalize="words"
          />
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <label className="block text-sm font-medium">Gift Items</label>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-3 text-sm font-medium bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors touch-manipulation min-h-[44px] flex items-center justify-center"
            >
              + Add Item
            </button>
          </div>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  placeholder="Enter gift item..."
                  className="flex-1 px-4 py-4 text-base rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-foreground placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  autoComplete="off"
                  autoCapitalize="sentences"
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors touch-manipulation"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 sm:py-5 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation min-h-[52px]"
        >
          {isLoading ? 'Creating List...' : 'Create & Share List'}
        </button>
      </form>
    </div>
  )
}