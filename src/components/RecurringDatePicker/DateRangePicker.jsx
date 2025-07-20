'use client'

import useRecurrenceStore from '@/store/useRecurrenceStore'

export default function DateRangePicker() {
  const startDate = useRecurrenceStore((state) => state.startDate)
  const endDate = useRecurrenceStore((state) => state.endDate)
  const setStartDate = useRecurrenceStore((state) => state.setStartDate)
  const setEndDate = useRecurrenceStore((state) => state.setEndDate)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-600 font-medium mb-1">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">End Date (Optional):</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  )
}
