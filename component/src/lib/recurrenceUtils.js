// export function getRecurringDates({ frequency, interval, startDate, endDate, daysOfWeek = [] }) {
//   const results = []

//   if (!startDate) return results

//   const start = new Date(startDate)
//   const stop = endDate ? new Date(endDate) : new Date()
//   stop.setFullYear(stop.getFullYear() + 1) // Default to 1 year ahead

//   let current = new Date(start)

//   while (current <= stop) {
//     const day = current.getDay()

//     if (frequency === 'daily') {
//       results.push(new Date(current))
//       current.setDate(current.getDate() + interval)
//     }

//     if (frequency === 'weekly') {
//       if (daysOfWeek.includes(day)) {
//         results.push(new Date(current))
//       }
//       current.setDate(current.getDate() + 1)
//     }

//     if (frequency === 'monthly') {
//       results.push(new Date(current))
//       current.setMonth(current.getMonth() + interval)
//     }

//     if (frequency === 'yearly') {
//       results.push(new Date(current))
//       current.setFullYear(current.getFullYear() + interval)
//     }
//   }

//   return results
// }


import { addDays, addWeeks, addMonths, addYears, format, isBefore, isSameDay, parseISO } from 'date-fns'

export function generateRecurringDates({ frequency, interval = 1, startDate, endDate, daysOfWeek = [] }) {
  const result = []
  let current = parseISO(startDate)
  const end = endDate ? parseISO(endDate) : addYears(current, 1) // default 1 year span

  while (isBefore(current, end) || isSameDay(current, end)) {
    const formatted = format(current, 'yyyy-MM-dd')

    if (frequency === 'weekly' && daysOfWeek.length > 0) {
      // Only include if day of week matches
      const weekday = current.getDay()
      if (daysOfWeek.includes(weekday)) result.push(formatted)
      current = addDays(current, 1)
    } else {
      result.push(formatted)
      switch (frequency) {
        case 'daily':
          current = addDays(current, interval)
          break
        case 'weekly':
          current = addWeeks(current, interval)
          break
        case 'monthly':
          current = addMonths(current, interval)
          break
        case 'yearly':
          current = addYears(current, interval)
          break
        default:
          break
      }
    }
  }

  return result
}
