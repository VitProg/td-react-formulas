import React, { useMemo } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Slider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { options } from "./constants";

type Datum = {quantity: number, value: number};

export type ParameterStatProps = {
  chartHeight?: number;
  max?: number;
  label?: string;
  color?: string;
  calcData: (quantity: number) => number;
  datasetFilter?: (current: Datum, index: number, array: Datum[]) => boolean;
}

export const ParameterStat = (
  {
    max = 800,
    chartHeight = 250,
    label = "???",
    color = "rgb(70,70,70)",
    calcData,
    datasetFilter = () => true,
  }: ParameterStatProps
) => {
  const [minMax, setMinMax] = React.useState([1, 150]);

  const data = useMemo(() => {
    const data = [];
    const labels = [];

    for (let q = minMax[0]; q <= minMax[1]; q++) {
      data.push(calcData(q));
      labels.push(q);
    }

    return {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
        }
      ]
    }
  }, [calcData, color, label, minMax]);

  const columns: GridColDef[] = useMemo(() => ([
    {field: 'quantity', headerName: 'Quantity', type: "number", width: 100},
    {field: 'value', headerName: label, type: "number", width: 200, valueFormatter: params => params.value ? params.value.toFixed(8) : '',},
  ]), [label]);

  const rows: GridRowsProp = useMemo(
    () => (
      data.datasets[0].data
        .map<Datum>((value, index) => ({quantity: index + minMax[0], value}))
        .filter((value, index, array) => datasetFilter(value, index, array))
        .map((value, index) => ({
          id: value.quantity,
          ...value,
        }))
    ),
    [data.datasets, minMax, datasetFilter]
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
      <Line data={data} options={options} key={"aaa"} height={chartHeight}/>
      <div style={{maxWidth: 600, minWidth: 400, margin: "20px auto"}}>
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
