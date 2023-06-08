import React, { useMemo } from "react";
import { getTowerRadius } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard } from "../data.utils";


export const Radius = () => {
  const props: ParameterMultiStatProps<'radius'> = useMemo(() => {
    return ({
      calcData: (quantity: number) => ({radius: getTowerRadius(generateShard(quantity, 'red', 'yellow' ))}),
      calcLabels: (quantity: number) => generateShard(quantity, 'red', 'yellow').toString(),
      datasetsConfig: {
        radius: {
          label: "Tower Radius",
          color: "rgb(122,105,11)",
        },
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
