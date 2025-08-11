'use client'

import useRecurrenceStore from '@/store/useRecurrenceStore'
import { generateRecurringDates } from '@/lib/recurrenceUtils'

export default function CalendarPreview() {
  const { frequency, interval, startDate, endDate, daysOfWeek } = useRecurrenceStore()

  const recurringDates = generateRecurringDates({
    frequency,
    interval,
    startDate,
    endDate,
    daysOfWeek,
  })

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-500">Calendar Preview</h3>
      {recurringDates.length === 0 ? (
        <p className="text-red-500">No recurring dates to display.</p>
      ) : (
        <ul className="space-y-1 max-h-60 overflow-y-auto text-sm text-gray-800">
          {recurringDates.map((date, idx) => (
            <li key={idx}>{new Date(date).toDateString()}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
