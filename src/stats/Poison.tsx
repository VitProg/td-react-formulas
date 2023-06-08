import React, { useMemo } from "react";
import { calculatePoisonParams, getShardAmplifier } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard } from "../data.utils";

export const Poison = () => {
  const props: ParameterMultiStatProps<'duration' | 'damage' | 'sumDamage'> = useMemo(() => {
    return ({
      calcData: (quantity: number) => {
        const {damage, duration} = calculatePoisonParams(generateShard(quantity, 'green' ));
        return {
          damage,
          duration,
          sumDamage: damage * Math.round(duration),
        };
      },
      calcLabels: (quantity: number) => generateShard(quantity, 'green').toString(),
      datasetsConfig: {
        damage: {
          label: "One Damage",
          color: "rgb(152,45,45)",
          yAxis: "d",
        },
        duration: {
          label: "Poison Duration / Count",
          color: "rgb(58,178,34)",
        },
        sumDamage: {
          label: "Summary Damage",
          color: "rgba(187,78,78,0.65)",
          yAxis: "d",
        },
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
