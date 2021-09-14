import { setupCharts } from './charts'
import { years } from './helpers'
import './style.scss'
import { updateMonthSelect } from './ui'

const monthSelect = document.querySelector(
  '.js-statistics-month',
) as HTMLSelectElement

const yearSelect = document.querySelector(
  '.js-statistics-year',
) as HTMLSelectElement

yearSelect.innerHTML = years()
  .map((year) => `<option value="${year}">${year}</option>`)
  .join(' ')

updateMonthSelect(monthSelect, new Date().getFullYear())

yearSelect.addEventListener('change', () => {
  const year = parseInt(yearSelect.value, 10)
  updateMonthSelect(monthSelect, year)
})

setupCharts('.js-statistics-chart', yearSelect)
