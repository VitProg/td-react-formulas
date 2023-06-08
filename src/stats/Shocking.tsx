import React, { useMemo } from "react";
import { calculateShockingParams, calculateSlowingParams } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard } from "../data.utils";


export const Shocking = () => {
  const props: ParameterMultiStatProps<keyof ReturnType<typeof calculateShockingParams>> = useMemo(() => {
    return ({
      minMax: [1, 200],
      calcData: (quantity: number) => calculateShockingParams(generateShard(quantity, 'violet' )),
      calcLabels: (quantity: number) => generateShard(quantity, 'violet').toString(),
      datasetsConfig: {
        probability: {
          label: "Shocking Pobability",
          color: "rgb(72,152,45)",
        },
        duration: {
          label: "Shocking Duration",
          color: "rgb(45,148,152)",
        },
        radius: {
          label: "Shocking Radius",
          color: "rgb(36,57,194)",
        }
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
