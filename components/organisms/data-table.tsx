interface DataTableProps {
  title: string
}

export function DataTable({ title }: DataTableProps) {
  const columns = Array.from({ length: 6 }, (_, i) => `Heading`)
  const rows = Array.from({ length: 5 }, (_, i) => Array.from({ length: 6 }, (_, j) => "Value"))

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-3 px-4 font-medium text-slate-700">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-100">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-3 px-4 text-slate-600">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
