import { Color } from "./shard.utils";

export const config = {
  redShardColor: {r: 0.92941177, g: 0.10980392, b: 0.14117648, a: 1} as Color,
  greenShardColor: {r: 0.078431375, g: 0.70980394, b: 0.11764706, a: 1} as Color,
  blueShardColor: {r: 0, g: 0.32941177, b: 0.6509804, a: 1} as Color,
  aquamarineShardColor: {r: 0, g: 0.6627451, b: 0.6156863, a: 1} as Color,
  yellowShardColor: {r: 1, g: 0.9529412, b: 0.11372549, a: 1} as Color,
  orangeShardColor: {r: 0.9490196, g: 0.39607844, b: 0.13333334, a: 1} as Color,
  pinkShardColor: {r: 0.9056604, g: 0.4627451, b: 0.73875153, a: 1} as Color,
  violetShardColor: {r: 0.57254905, g: 0.15294118, b: 0.56078434, a: 1} as Color,

  speedBase: 3,
  speedImpactOfRed: 1.40, // todo to unity

  baseDamage: 0.5,
  baseDamageImpactOfRed: 1.4, //todo unity

  slowPowerDivider: 325,
  slowPowerMin: 0.1,
  slowDurationDivider: 36,
  slowDurationMin: 3,

  explosiveDamageReducer: 6,
  explosiveRadiusAdd: 3,
  explosiveFadingReducer: 6,

  // poisonDamageBase: 0.5,
  poisonDamageReducer: 1,
  poisonInterval: 1,
  // poisonMinDuration: 2,

  fireRateBase: 0.5,
  fireRateImpactOfPink: 1.5, //todo to unity

  radiusBase: 1.5,
  radiusImpactOfYellow: 1.1,
  triangularPyramids: [
    /* 1*/ 1,
    /* 2*/ 4,
    /* 3*/ 10,
    /* 4*/ 20,
    /* 5*/ 35,
    /* 6*/ 56,
    /* 7*/ 84,
    /* 8*/ 120,
    /* 9*/ 165,
    /*10*/ 220,
    /*11*/ 286,
    /*12*/ 364,
    /*13*/ 455,
    /*14*/ 560,
    /*15*/ 680,
  ]
};
