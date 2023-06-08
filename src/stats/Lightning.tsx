import React, { useMemo } from "react";
import { calculateLightningParams } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard } from "../data.utils";

export const Lightning = () => {
  const props: ParameterMultiStatProps<keyof ReturnType<typeof calculateLightningParams>> = useMemo(() => {
    return ({
      minMax: [0, 100],
      calcData: (quantity: number) => calculateLightningParams(generateShard(quantity, 'aquamarine' )),
      calcLabels: (quantity: number) => generateShard(quantity, 'aquamarine').toString(),
      datasetsConfig: {
        damage: {
          label: "Begin Damage",
          color: "rgb(152,45,45)",
        },
        chainReaction: {
          label: "Chain Reaction",
          color: "rgb(34,178,173)",
        },
        radius: {
          label: "Chain Radius",
          color: "rgb(87,178,34)",
        },
        damageReduction: {
          label: "Damage Reduction",
          color: "rgba(213,143,143)",
          yAxis: 'r',
        },
        radiusReduction: {
          label: "Chain Radius Reduction",
          color: "rgb(180,224,142)",
          yAxis: 'y',
        },
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
