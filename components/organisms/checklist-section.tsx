"use client"

import { Checkbox } from "@/components/atoms/checkbox"
import { Button } from "@/components/atoms/button"
import { ChecklistItem } from "@/lib/types"
import { useChecklist } from "@/hooks/use-checklist"

interface ChecklistSectionProps {
  items: ChecklistItem[]
  title?: string
  onComplete?: () => void
}

export function ChecklistSection({ items, title = "Tasks", onComplete }: ChecklistSectionProps) {
  const { items: checklistItems, toggleItem, progress, allCompleted } = useChecklist(items)

  const handleComplete = () => {
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <div className="mt-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {Math.round(progress)}% Complete
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {checklistItems.map((item) => (
          <Checkbox 
            key={item.id} 
            label={item.label} 
            checked={item.completed} 
            onChange={() => toggleItem(item.id)} 
          />
        ))}
      </div>

      <div className="mt-6">
        <Button 
          onClick={handleComplete}
          disabled={!allCompleted}
          className={allCompleted ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {allCompleted ? "Complete!" : "Complete Tasks"}
        </Button>
      </div>
    </div>
  )
}
