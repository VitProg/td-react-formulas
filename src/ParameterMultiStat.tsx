import React, { useMemo, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import { ChartOptions, ChartData, DefaultDataPoint } from "chart.js";
import { Slider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { options } from "./constants";

export type ParameterMultiStatProps<K extends keyof any> = {
  minMax?: [number, number],
  multiAxis?: boolean;
  chartHeight?: number;
  max?: number;
  calcData: (quantity: number) => Record<K, number>;
  calcLabels: (quantity: number) => string;
  datasetsConfig: Record<K, {
    label: string,
    color: string,
    yAxis?: string,
  }>
}

type Datum<K extends string> = {id: number, label: string} & Record<K, number>;

type TChardData = ChartData<"line", DefaultDataPoint<"line">, string>;

const valueFormatter = (params: GridValueFormatterParams) => params.value ? params.value.toFixed(8) : "";

export const ParameterMultiStat = <K extends string>(
  {
    minMax: startedMinMax = [1, 150],
    multiAxis = true,
    max = 800,
    chartHeight = 250,
    datasetsConfig,
    calcData,
    calcLabels,
  }: ParameterMultiStatProps<K>
) => {
  const [minMax, setMinMax] = useState(startedMinMax);
  const [tableWidth, setTableWidth] = useState(0);

  const [dirtData, keys] = useMemo(() => {
    const result = [];
    let keys: K[] = [];

    for (let index = minMax[0]; index <= minMax[1]; index++) {
      const data = calcData(index);
      if (keys.length === 0) {
        keys = Object.keys(data) as K[];
      }

      result.push({
        index,
        data,
        label: calcLabels(index),
      });
    }

    return [result, keys];
  }, [calcData, calcLabels, minMax]);

  // prepare chart data
  const chartData: TChardData = useMemo(() => {
    const labels: string[] = [];
    const datasets: ChartData['datasets'] = [];

    for (const key of keys) {
      const cfg = datasetsConfig[key as K];

      datasets.push({
        label: cfg.label,
        backgroundColor: cfg.color,
        data: [],
        yAxisID: cfg.yAxis ? cfg.yAxis : (multiAxis ? key : undefined),
      })
    }

    for (const {data, label} of dirtData) {
      labels.push(label);
      keys.forEach((key, index) => {
        datasets[index].data.push(data[key]);
      });
    }

    // console.log(JSON.stringify({labels,datasets}, undefined, 2));

    return {
      labels,
      datasets,
    } as never;
  }, [datasetsConfig, dirtData, keys]);

  const chartOptions: ChartOptions = useMemo(() => {
    const result: ChartOptions = {...options};

    result.scales = {};
    let index = 0;
    if (multiAxis) {
      for (const key of keys) {
        result.scales[key] = {
          type: 'linear',
          display: true,
          position: (index % 2 ? 'right' : 'left'),
        }
        index++;
      }
    }

    return result;
  }, [keys]);

  // prepare table data
  const columns: GridColDef[] = useMemo(() => {
    const columns: GridColDef[] = [{field: 'label', headerName: 'Label', type: "string", width: 200}];

    setTableWidth(200);

    for (const k of keys) {
      columns.push({
        field: k,
        headerName: datasetsConfig[k].label,
        type: "number",
        width: 165,
        valueFormatter,
      })
      setTableWidth(w => w + 165);
    }

    console.log(tableWidth);

    return columns;
  }, [datasetsConfig, keys]);

  const rows: GridRowsProp<Datum<K>> = useMemo(
    () => {
      const result: Array<Datum<K>> = [];

      for (const dirtDatum of dirtData) {
        const item: Datum<K> = { id: dirtDatum.index + minMax[0], label: dirtDatum.label } as never;

        for (const k of keys) {
          item[k] = dirtDatum.data[k] as never;
        }

        result.push(item);
      }

      return result;
    },
    [dirtData, keys, minMax]
  );

  const handleChangeMinMax = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setMinMax(newValue as never);
  };

  return (
    <>
      <Slider
        getAriaLabel={() => 'Min/Max'}
        value={minMax}
        onChange={handleChangeMinMax}
        valueLabelDisplay="auto"
        disableSwap
        min={1}
        max={max}
      />
      <Line data={chartData} options={chartOptions} key={"aaa"} height={chartHeight}/>
      <div style={{width: tableWidth, margin: "20px auto"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {page: 0, pageSize: 10},
            },
          }}
          pageSizeOptions={[10, 50, 100]}
        />
      </div>
    </>
  );
}
