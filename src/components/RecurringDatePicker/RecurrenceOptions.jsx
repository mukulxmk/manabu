'use client'

import useRecurrenceStore from '@/store/useRecurrenceStore'

const OPTIONS = ['daily', 'weekly', 'monthly', 'yearly']

export default function RecurrenceOptions() {
  const frequency = useRecurrenceStore((state) => state.frequency)
  const setFrequency = useRecurrenceStore((state) => state.setFrequency)

  return (
    <div>
      <label className="block text-gray-600 font-medium mb-2">Repeat:</label>
      <div className="flex gap-3 flex-wrap">
        {OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setFrequency(option)}
            className={`px-4 py-2 rounded-full text-sm border ${
              frequency === option
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            } hover:shadow-md transition`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
