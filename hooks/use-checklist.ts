import { useState, useCallback } from 'react'
import { ChecklistItem } from '@/lib/types'

/**
 * Custom hook for managing checklist state
 */
export function useChecklist(initialItems: ChecklistItem[]) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems || [])

  const toggleItem = useCallback((id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }, [])

  const toggleAll = useCallback((completed: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, completed })))
  }, [])

  const completedCount = items?.filter(item => item.completed).length || 0
  const allCompleted = completedCount === items.length && items.length > 0
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0

  return {
    items,
    toggleItem,
    toggleAll,
    completedCount,
    totalCount: items.length,
    allCompleted,
    progress,
  }
}