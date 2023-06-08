import { config } from "./shard.constants";
import { getShardLevel } from "./shard.calculator";

export class Shard {
  public red = 0;
  public green = 0;
  public blue = 0;
  public aquamarine = 0;
  public yellow = 0;
  public orange = 0;
  public pink = 0;
  public violet = 0;

  constructor(data: Partial<Shard>) {
    if (data.red) this.red = data.red;
    if (data.green) this.green = data.green;
    if (data.blue) this.blue = data.blue;
    if (data.aquamarine) this.aquamarine = data.aquamarine;
    if (data.yellow) this.yellow = data.yellow;
    if (data.orange) this.orange = data.orange;
    if (data.pink) this.pink = data.pink;
    if (data.violet) this.violet = data.violet;
  }

  public toString(): string {
    return '' +
      Shard.format(this.red) + '.' +
      Shard.format(this.green) + '.' +
      Shard.format(this.blue) + '.' +
      Shard.format(this.aquamarine) + '.' +
      Shard.format(this.yellow) + '.' +
      Shard.format(this.orange) + '.' +
      Shard.format(this.pink) + '.' +
      Shard.format(this.violet) + ':' + getShardLevel(this);
  }

  private static format(value: number) {
    let str = value.toString(10);
    if (str === "100") str = "XX";
    return '0'.repeat(2 - str.length) + str;
  }

}

export type ShardType = Exclude<keyof Shard, 'toString'>;
export const shardTypes: ShardType[] = ['red', 'green', 'blue', 'aquamarine', 'yellow', 'orange', 'pink', 'violet'];

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ShardsConfig {
  redShardColor: Color;
  greenShardColor: Color;
  blueShardColor: Color;
  aquamarineShardColor: Color;
  yellowShardColor: Color;
  orangeShardColor: Color;
  pinkShardColor: Color;
  violetShardColor: Color;
}

export function getLevel(quantity: number) {
  const o = config.triangularPyramids;
  for (let i = o.length - 1; i >= 0; i--) {
    if (o[i] <= quantity) {
      return i + 1;
    }
  }
  return 1;
}


export const getQuantity = (shard: Shard | Array<number>) =>
{
  if (Array.isArray(shard)) {
    let quantity = 0;
    for (const number of shard) {
      quantity += number;
    }
    return quantity;
  } else {
    return shard.red + shard.green + shard.blue + shard.aquamarine +
      shard.yellow + shard.orange + shard.pink + shard.violet;
  }
}

export const toArray = (shard: Shard) => ([
  shard.red,
  shard.green,
  shard.blue,
  shard.aquamarine,
  shard.yellow,
  shard.orange,
  shard.pink,
  shard.violet,
]);

export const getMax = (shard: Shard) => Math.max(...toArray(shard));
export const getMin = (shard: Shard) => Math.min(...toArray(shard));
