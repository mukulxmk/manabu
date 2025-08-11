import { create } from 'zustand'

// const useRecurrenceStore = create((set) => ({
//   frequency: 'daily',
//   startDate: '',
//   endDate: '',
//   setFrequency: (value) => set({ frequency: value }),
//   setStartDate: (date) => set({ startDate: date }),
//   setEndDate: (date) => set({ endDate: date }),
// }))



const useRecurrenceStore = create((set) => ({
  frequency: 'daily',
  interval: 1,
  startDate: '',
  endDate: '',
  daysOfWeek: [],

  setFrequency: (value) => set({ frequency: value }),
  setInterval: (value) => set({ interval: value }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  toggleDay: (dayIndex) =>
    set((state) => {
      const exists = state.daysOfWeek.includes(dayIndex)
      return {
        daysOfWeek: exists
          ? state.daysOfWeek.filter((d) => d !== dayIndex)
          : [...state.daysOfWeek, dayIndex],
      }
    }),
}))

export default useRecurrenceStore