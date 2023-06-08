import { Shard, ShardType, shardTypes } from "./shard.utils";

export const generateShard = (quantity: number, type: ShardType, secondType?: ShardType) => {
  const q = quantity - 1;

  const arr = shardTypes.filter(t => t !== type ? !(secondType && t === secondType) : false);

  const shard = new Shard({});

  shard[type] = q % 100 + 1;

  let index = 0;

  if (secondType) {
    shard[secondType] = q >  99 ? ((q + 100) % 100) + 1 : 0;
    index++;
  }

  for (const t of arr) {
    const n99 = index * 100 + 99;
    const n100 = n99 + 1;
    shard[t] = q > n99 ? ((q + n100) % 100) + 1 : 0;
    index++;
  }

  return shard;
};

export const generateShardComplex = (quantity: number, typesArray: Array<Array<ShardType>>) => {
  const q = quantity - 1;

  const shard = new Shard({});

  const typesArrayIndex = (q / 100) >> 0;

  for (const type of typesArray[typesArrayIndex]) {
    shard[type] = q % 100 + 1;
  }

  return shard;
};
