import { useState, useEffect } from 'react'
import { DashboardData } from '@/lib/types'
import { generateDashboardData } from '@/lib/data-generators'

/**
 * Custom hook for managing dashboard data
 */
export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 100))
        const dashboardData = generateDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        // Provide fallback data
        setData(generateDashboardData())
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const refreshData = () => {
    const newData = generateDashboardData()
    setData(newData)
  }

  return {
    data,
    loading,
    refreshData,
  }
}