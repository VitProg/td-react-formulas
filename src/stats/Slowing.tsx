import React, { useMemo } from "react";
import { calculateSlowingParams } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard } from "../data.utils";


export const Slowing = () => {
  const props: ParameterMultiStatProps<keyof ReturnType<typeof calculateSlowingParams>> = useMemo(() => {
    return ({
      minMax: [1, 100],
      calcData: (quantity: number) => calculateSlowingParams(generateShard(quantity, 'blue' )),
      calcLabels: (quantity: number) => generateShard(quantity, 'blue').toString(),
      datasetsConfig: {
        duration: {
          label: "Slowing Duration",
          color: "rgb(45,148,152)",
        },
        power: {
          label: "Power of Slowing",
          color: "rgb(36,57,194)",
        }
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
