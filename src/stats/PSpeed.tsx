import React, { useMemo } from "react";
import { getFireRate, getProjectileSpeed } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard, generateShardComplex } from "../data.utils";

const getShard1 = (q: number) => generateShardComplex(q, [
  ['green'],
  ['green', 'blue'],
  ['green', 'blue', 'aquamarine'],
  ['green', 'blue', 'aquamarine', 'yellow'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange', 'violet'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange', 'violet', 'pink'],
])
const getShard2 = (q: number) => generateShardComplex(q, [
  ['red'],
  ['red', 'green'],
  ['red', 'green', 'blue'],
  ['red', 'green', 'blue', 'aquamarine'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange', 'violet'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange', 'violet', 'pink'],
])

export const PSpeed = () => {
  const props: ParameterMultiStatProps<'pspeed' | 'pspeedRed'> = useMemo(() => {
    return ({
      multiAxis: false,
      max: 700,
      calcData: (quantity: number) => ({
        pspeed: getProjectileSpeed(getShard1(quantity)),
        pspeedRed: getProjectileSpeed(getShard2(quantity)),
      }),
      calcLabels: (quantity: number) => getShard2(quantity).toString(),
      datasetsConfig: {
        pspeed: {
          label: "Projectile Speed",
          color: "rgb(77,208,65)",
        },
        pspeedRed: {
          label: "Projectile Speed + RED",
          color: "rgb(208,65,65)",
        },
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
