"use client"

import type React from "react"

import { Button } from "@/components/atoms/button"
import { MoreHorizontal } from "lucide-react"

interface ContentCardProps {
  title: string
  children?: React.ReactNode
  action?: string
  onActionClick?: () => void
}

export function ContentCard({ title, children, action, onActionClick }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex items-center space-x-2">
          {action && (
            <Button variant="ghost" size="sm" onClick={onActionClick}>
              {action}
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}
