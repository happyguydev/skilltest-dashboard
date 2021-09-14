import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js'
import { monthsForYear, years as generateYears } from './helpers'
import { randomWithinInterval } from './random'
import { getGradient } from './gradients'

Chart.register(
  LineController,
  LineElement,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
)

export function setupCharts(selector: string, yearSelect: HTMLSelectElement) {
  const canvas = document.querySelector<HTMLCanvasElement>(selector)
  if (!canvas) {
    return
  }

  const selectedYear = parseInt(yearSelect.value, 10)
  const chartData = generateChartData()

  const getDataForYear = (year: number) => {
    const values = chartData.find((data) => data.year === year)?.data ?? []
    const data = values.map((set) => set.value)
    const months = monthsForYear(year)

    return {
      labels: months.map(([_, __, shortName]) => shortName),
      datasets: [
        {
          label: 'Random value',
          data,
          tension: 0.35,
          borderColor: (context: any) => {
            const chart = context.chart
            const { ctx, chartArea } = chart
            if (!chartArea) return null
            return getGradient(ctx, chartArea, (gradient) => {
              gradient.addColorStop(0, '#ffb767')
              gradient.addColorStop(1, '#ff3a4c')
            })
          },
          pointRadius: 5,
          pointBackgroundColor: 'white',
          pointBorderWidth: 2,
          fill: {
            target: 'origin',
            above: ((context: any) => {
              const chart = context.chart
              const { ctx, chartArea } = chart
              if (!chartArea) return null
              return getGradient(ctx, chartArea, (gradient) => {
                gradient.addColorStop(0, 'rgba(255, 183, 103, 0.05)')
                gradient.addColorStop(1, 'rgba(255, 58, 76, 0.05)')
              })
            }) as any,
          },
          pointBorderColor: (context: any) => {
            const chart = context.chart
            const { ctx, chartArea } = chart
            if (!chartArea) return null
            return getGradient(ctx, chartArea, (gradient) => {
              gradient.addColorStop(0, '#ffb767')
              gradient.addColorStop(1, '#ff3a4c')
            })
          },
        },
      ],
    }
  }

  Chart.defaults.font.family = 'Poppins'
  Chart.defaults.font.weight = '500'

  const chart = new Chart(canvas, {
    type: 'line',
    data: getDataForYear(selectedYear),
    options: {
      plugins: {
        filler: {
          propagate: true,
        },
      },
      scales: {
        y: {
          display: true,
          min: 0,
          max: 500,
          grid: {
            tickColor: '#fff1e1',
            borderColor: '#fff1e1',
            color: '#fff1e1',
            borderDash: [10, 5],
          },
        },
        x: {
          grid: {
            tickColor: '#fff1e1',
            borderColor: '#fff1e1',
            color: '#fff1e1',
          },
          ticks: {
            color: '#b1b5b8',
          },
        },
      },
    },
  })

  yearSelect.addEventListener('change', () => {
    const year = parseInt(yearSelect.value, 10)
    const { labels, datasets } = getDataForYear(year)
    chart.data.labels = labels
    chart.data.datasets = datasets
    chart.update()
  })
}

export function generateChartData(
  years = generateYears(),
  [minValue, maxValue] = [50, 350],
) {
  const data = years.map((year) => {
    const months = monthsForYear(year)
    const data = months.map(([month]) => {
      const value = randomWithinInterval(maxValue, minValue)
      return {
        month,
        value,
      }
    })

    return {
      year,
      data,
    }
  })

  return data
}
