export function getGradient(
  ctx: CanvasRenderingContext2D,
  chartArea: any,
  configureGradient: (gradient: CanvasGradient) => void,
) {
  let width: number = 0
  let height: number = 0
  let gradient: any

  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top,
    ) as any
    configureGradient(gradient)
  }

  return gradient
}
