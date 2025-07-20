'use client'

import useRecurrenceStore from '@/store/useRecurrenceStore'

export default function CustomPatternSelector() {
  const frequency = useRecurrenceStore((state) => state.frequency)
  const interval = useRecurrenceStore((state) => state.interval)
  const setInterval = useRecurrenceStore((state) => state.setInterval)
  const daysOfWeek = useRecurrenceStore((state) => state.daysOfWeek)
  const toggleDay = useRecurrenceStore((state) => state.toggleDay)

  const weekdayOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-4 mt-4">
      {/* Every X [unit] */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Repeat every:
        </label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="w-20 px-2 py-1 border rounded-md mr-2"
        />
        <span className="text-sm">{frequency}</span>
      </div>

      {/* Select specific weekdays if 'weekly' */}
      {frequency === 'weekly' && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Repeat on:
          </label>
          <div className="flex gap-2 flex-wrap">
            {weekdayOptions.map((day, index) => (
              <button
                key={day}
                onClick={() => toggleDay(index)}
                className={`w-10 h-10 rounded-full text-sm border ${
                  daysOfWeek.includes(index)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
