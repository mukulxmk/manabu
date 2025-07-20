'use client'

import RecurrenceOptions from './RecurrenceOptions'
import CustomPatternSelector from './CustomPatternSelector'
import DateRangePicker from './DateRangePicker'
import CalendarPreview from './CalendarPreview'

export default function RecurringDatePicker() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6">
      <h2 className="text-xl text-gray-900 font-bold text-center">Recurring Date Picker</h2>

      <RecurrenceOptions />
      <CustomPatternSelector />
      <DateRangePicker />
      <CalendarPreview />
    </div>
  )
}
