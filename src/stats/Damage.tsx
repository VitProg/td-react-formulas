import React, { useMemo } from "react";
import { calculateBaseDamageParams, getFireRate } from "../shard.calculator";
import { Shard } from "../shard.utils";
import { ParameterStat, ParameterStatProps } from "../ParameterStat";
import { generateShardComplex } from "../data.utils";
import { ParameterMultiStat, ParameterMultiStatProps } from "../ParameterMultiStat";

const getShard1 = (q: number) => generateShardComplex(q, [
  ['blue'],
  ['blue', 'aquamarine'],
  ['blue', 'aquamarine', 'yellow'],
  ['blue', 'aquamarine', 'yellow', 'orange'],
  ['blue', 'aquamarine', 'yellow', 'orange', 'pink'],
  ['blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet'],
  ['blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet', 'red'],
  ['blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet', 'red', 'green'],
])
const getShard2 = (q: number) => generateShardComplex(q, [
  ['red'],
  ['red', 'blue'],
  ['red', 'blue', 'aquamarine'],
  ['red', 'blue', 'aquamarine', 'yellow'],
  ['red', 'blue', 'aquamarine', 'yellow', 'orange'],
  ['red', 'blue', 'aquamarine', 'yellow', 'orange', 'pink'],
  ['red', 'blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet'],
  ['red', 'blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet', 'green'],
])

const getShard3 = (q: number) => generateShardComplex(q, [
  ['green'],
  ['green', 'blue'],
  ['green', 'blue', 'aquamarine'],
  ['green', 'blue', 'aquamarine', 'yellow'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange', 'pink'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet'],
  ['green', 'blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet', 'red'],
])

const getShard4 = (q: number) => generateShardComplex(q, [
  [],
  ['green', 'red'],
  ['green', 'red', 'aquamarine'],
  ['green', 'red', 'aquamarine', 'yellow'],
  ['green', 'red', 'aquamarine', 'yellow', 'orange'],
  ['green', 'red', 'aquamarine', 'yellow', 'orange', 'pink'],
  ['green', 'red', 'aquamarine', 'yellow', 'orange', 'pink', 'violet'],
  ['green', 'red', 'aquamarine', 'yellow', 'orange', 'pink', 'violet', 'blue'],
])

//color: "rgb()",
export const Damage = () => {
  const props: ParameterMultiStatProps<'damage' | 'damageRed' | 'damageGreen' | 'damageGreenRed'> = useMemo(() => {
    return ({
      minMax:[101,200],
      max: 700,
      multiAxis: false,
      calcData: (quantity: number) => ({
        damage: calculateBaseDamageParams(getShard1(quantity)).damage,
        damageRed: calculateBaseDamageParams(getShard2(quantity)).damage,
        damageGreen: calculateBaseDamageParams(getShard3(quantity)).damage,
        damageGreenRed: calculateBaseDamageParams(getShard4(quantity)).damage,
      }),
      calcLabels: (quantity: number) => getShard2(quantity).toString(),
      datasetsConfig: {
        damage: {
          label: "Damage",
          color: "rgb(58,58,58)",
        },
        damageRed: {
          label: "Damage + RED",
          color: "rgb(206,109,109)",
        },
        damageGreen: {
          label: "Damage + GREEN",
          color: "rgb(141,206,109)",
        },
        damageGreenRed: {
          label: "Damage + GREEN + RED",
          color: "rgb(206,193,109)",
        },
      }
    });
  }, []);

  return (
    <ParameterMultiStat {...props}/>
  );
};
