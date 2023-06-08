import React, { useMemo } from "react";
import { getFireRate } from "../shard.calculator";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";
import { generateShard, generateShardComplex } from "../data.utils";

const getShard1 = (q: number) => generateShardComplex(q, [
  ['red'],
  ['red', 'green'],
  ['red', 'green', 'blue'],
  ['red', 'green', 'blue', 'aquamarine'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange', 'violet'],
])
const getShard2 = (q: number) => generateShardComplex(q, [
  ['pink'],
  ['red', 'pink'],
  ['red', 'green', 'pink'],
  ['red', 'green', 'blue', 'pink'],
  ['red', 'green', 'blue', 'aquamarine', 'pink'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'pink'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange', 'pink'],
  ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange', 'violet', 'pink'],
])

export const FireRate = () => {
  const props: ParameterMultiStatProps<'fireRate' | 'fireRatePink'> = useMemo(() => {
    return ({
      minMax: [1,100],
      multiAxis: false,
      max: 700,
      calcData: (quantity: number) => ({
        fireRate: getFireRate(getShard1(quantity)),
        fireRatePink: getFireRate(getShard2(quantity)),
      }),
      calcLabels: (quantity: number) => getShard2(quantity).toString(),
      datasetsConfig: {
        fireRate: {
          label: "Fire Rate",
          color: "rgb(120,44,185)",
        },
        fireRatePink: {
          label: "Fire Rate + PINK",
          color: "rgb(211,126,207)",
        },
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
