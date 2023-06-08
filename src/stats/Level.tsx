import React, { useMemo } from "react";
import { getShardLevel } from "../shard.calculator";
import { Shard } from "../shard.utils";
import { ParameterStat, ParameterStatProps } from "../ParameterStat";

export const Level = () => {
  const props: ParameterStatProps = useMemo(() => ({
    label: "Shard Level",
    color: "rgb(99, 132, 255)",
    calcData: q => getShardLevel(new Shard({ orange: q })),
    datasetFilter: (current, index, array) => {
      if (index === 0) return true;
      const prev = array[index - 1];
      return current.value !== prev.value;
    }
  }), []);

  return (
    <ParameterStat {...props}/>
  );
};
