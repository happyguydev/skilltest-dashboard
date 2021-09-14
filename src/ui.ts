import { monthsForYear } from './helpers'

export function updateMonthSelect(element: HTMLSelectElement, year: number) {
  const months = monthsForYear(year)
  element.innerHTML = months
    .map(([title, value]) => `<option value="${value}">${title}</option>`)
    .join(' ')

  const isCurrent = year === new Date().getFullYear()
  if (!isCurrent) return

  element.selectedIndex = months.findIndex(
    ([_, month]) => month === new Date().getMonth() + 1,
  )
}
