export const months = [
  ['January', 1, 'Jan'],
  ['February', 2, 'Feb'],
  ['March', 3, 'Mar'],
  ['April', 4, 'Apr'],
  ['May', 5, 'May'],
  ['June', 6, 'Jun'],
  ['July', 7, 'Jul'],
  ['August', 8, 'Aug'],
  ['September', 9, 'Sep'],
  ['October', 10, 'Oct'],
  ['November', 11, 'Nov'],
  ['December', 12, 'Dec'],
]

export function years(maxPreviousYears = 6) {
  const years = [] as number[]
  const currentYear = new Date().getFullYear()

  for (let i = 0; i < maxPreviousYears; i += 1) {
    const year = currentYear - i
    years.push(year)
  }

  return years
}

export function monthsForYear(year: number) {
  const isCurrentYear = year === new Date().getFullYear()
  if (isCurrentYear) {
    return months.filter((item) => item[1] <= new Date().getMonth() + 1)
  }

  return months
}
