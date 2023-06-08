import { ChartOptions } from "chart.js";

export const options: ChartOptions = {
  responsive: true,
  animation: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
};
