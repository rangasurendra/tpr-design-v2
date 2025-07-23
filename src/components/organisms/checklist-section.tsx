"use client"

import { Checkbox } from "@/components/atoms/checkbox"
import { Button } from "@/components/atoms/button"
import { useState } from "react"

export function ChecklistSection() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(8).fill(false))

  const handleCheckChange = (index: number) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  return (
    <div className="bg-white p-6">
      <div className="space-y-3">
        {Array.from({ length: 8 }, (_, index) => (
          <Checkbox key={index} label="Item" checked={checkedItems[index]} onChange={() => handleCheckChange(index)} />
        ))}
      </div>

      <div className="mt-6">
        <Button>Button</Button>
      </div>
    </div>
  )
}
