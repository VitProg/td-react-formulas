import { config } from './shard.constants';
import { getLevel, getQuantity, Shard } from "./shard.utils";
import { bezier } from "./bezier-easing.ts";

export const getShardAmplifier = (quantity: number, allQuantity: number = quantity, pow = 2, pow2 = 0) => {
  const o = quantity;
  const a = allQuantity;
  // @see https://docs.google.com/spreadsheets/d/1Vze5h6492TZL5gN8KHKPSS2ckDovCIrYgW4ylsVhmCk/edit#gid=0
  // return o / a * (Mathf.Log(a) * o + 1) * (Mathf.Pow(2, Mathf.Sqrt(o)) - 1);
  // return o / a * (Math.log(a) * o + 1) * (Math.pow(2, Math.sqrt(o))) / 2 / (Math.sqrt(a / o));
  // return (o / a) * (Math.log(a) * o + 1) * (Math.pow(2, Math.sqrt(o))) / 2 / (Math.sqrt(a / o));
  return (o / a) * (Math.log(a) * o + 1) * Math.pow(o, pow2) * (Math.pow(pow, Math.sqrt(o))) / 2 / (Math.sqrt(a / o));
}

export const getProjectileSpeed = (shard: Shard): number => {
  const speedBase = config.speedBase;

  const quantity = getQuantity(shard);

  const redFactor = shard.red > 0 ? Math.sqrt(shard.red / 65 + (quantity / 800 + 1)) : 1;

  const levelModifier = Math.pow(getLevel(quantity) / 5.35, 2);
  let speed = levelModifier * Math.log10(Math.pow(quantity, 2)) + speedBase;

  if (shard.red > 0) {
    speed /= redFactor;//getReduceAmplifier(shard.red, quantity, config.speedImpactOfRed);
    // speed *= getReduceAmplifier(shard.red, quantity, config.speedImpactOfRed);
  }

  return speed;
};

const getReduceAmplifier = (reducer: number, quantity: number, impact = 1) => {
  // let a = reducer / 100;
  // let b = quantity / reducer;
  // let p = (a + b) * (impact - 0.5);
  // return 1 / Math.sqrt(p);
  const r = reducer;
  const p = Math.pow(100, impact - 1);
  return (Math.pow(100 - r * (impact - 1), impact)) / (p * (impact + 100))
}

const getIncreaseAmplifier = (reducer: number, quantity: number, impact = 1) => {
  const a = reducer / 100;
  const b = quantity / reducer;
  const p = (a + b) * (impact);
  return Math.sqrt(p);
  // const r = reducer;
  // const p = Math.pow(100, impact - 1);
  // return (Math.pow(100 - r * (impact - 1), impact)) / (p * (impact + 100))
}

export const getShardDropAmplifier = (quantity: number, allQuantity: number) => getShardAmplifier(quantity, allQuantity) * 6;

export const getShardTrapAmplifier = (quantity: number, allQuantity: number) => getShardAmplifier(quantity, allQuantity) / 6;

// @see https://docs.google.com/spreadsheets/d/1Vze5h6492TZL5gN8KHKPSS2ckDovCIrYgW4ylsVhmCk/edit#gid=676981276
export const getNearbyBuildingsAmplifier = (quantity: number) => 0.75 / Math.exp(quantity / 1.15 - 1) + 1;

export const hasBaseDamage = (shard: Shard) => true;
export const hasSlowing = (shard: Shard) => shard.blue > 0;
export const hasExplosive = (shard: Shard) => shard.red > 0;
export const hasPoison = (shard: Shard) => shard.green > 0;
export const hasLightning = (shard: Shard) => shard.aquamarine > 0;
export const hasShocking = (shard: Shard) => shard.violet > 0;

export const calculateSlowingParams = (shard: Shard) => {
  // const powerDivider = config.slowPowerDivider;
  // const powerMin = config.slowPowerMin;
  // const durationDivider = config.slowDurationDivider;
  // const durationMin = config.slowDurationMin;
  //
  // const quantity = getQuantity(shard);
  //
  // const reduceAmplifier = getReduceAmplifier(quantity - shard.blue, quantity, 1.08888);
  // const levelCoefficient = getLevel(quantity) * reduceAmplifier;
  // const amplifier = getShardAmplifier(shard.blue, quantity) * Math.pow(levelCoefficient, 2) / 12;
  //
  // const power = Math.sqrt(amplifier) / Math.log(shard.blue + 1) / powerDivider + powerMin;
  // const duration = durationMin + (Math.sqrt(amplifier) - 1) / durationDivider;
  //
  //
  const value = shard.blue;

  if (value <= 0) return {power: 0, duration: 0};

  const percent = value / 100;

  const quantity = getQuantity(shard);
  const level = getLevel(quantity);
  const lp = level / 15 + 1 / 1.875;

  const pa = value / quantity;
  const rMin = .05;
  const rMax = 1
  const r = range(Math.pow(pa, 0.75), rMin, rMax);

  const durationMin = 3;
  const durationMax = 20;
  const durationValue = range(bezier(percent, 1,.5,.95,.67) * (lp), durationMin, durationMax);
  const duration = durationValue * r;

  const powerMin = 0.1;
  const powerMax = 0.6;
  const powerValue = range(bezier(percent, 1,.11,.88,.78) * (lp), powerMin, powerMax);
  const power = powerValue * r;

  return {power, duration};
}

export const calculateBaseDamageParams = (shard: Shard, checkGreen = true, checkRed = true) => {
  const baseDamage = config.baseDamage;

  const greenFactor = checkGreen ? Math.sqrt(shard.green / 10) + 1 : 1;
  const redFactor = checkRed ? Math.sqrt(shard.red / 100) + 1 : 1;

  const quantity = getQuantity(shard);

  const levelModifier = 1 + Math.pow(getLevel(quantity), 3);
  let damage = levelModifier * Math.pow(quantity / 70.5, 2) / (redFactor * greenFactor) + baseDamage;

  damage *= baseDamage;

  return {damage};
}

export const getShardLevel = (shard: Shard | number) => {
  if (typeof shard == "number") {
    return getLevel(shard);
  }
  const quantity = getQuantity(shard);
  return getLevel(quantity);
}


export const calculateExplosiveParams = (shard: Shard) => {
  const damageReducer = config.explosiveDamageReducer;
  const radiusAdd = config.explosiveRadiusAdd;
  const fadingReducer = config.explosiveFadingReducer;

  const quantity = getQuantity(shard);
  const amplifier = getShardAmplifier(shard.red, quantity);

  const damage = amplifier / damageReducer;
  const diameter = Math.log(amplifier) + radiusAdd;
  const fading = diameter / Math.sqrt(shard.red * fadingReducer);

  return {damage, diameter, fading};
}

export const calculatePoisonParams = (shard: Shard) => {
  const minDuration = 2;
  const damageReducer = 2;
  const durationAmplifierReducer = 10;
  const durationReducer = 1.55;
  const impactOfReduceAmplifier = 1.01;

  const quantity = getQuantity(shard);

  const reduceAmplifier = getReduceAmplifier(quantity, quantity, impactOfReduceAmplifier);
  const levelCoefficient = getLevel(quantity) * reduceAmplifier;

  const allDamage = calculateBaseDamageParams(shard, false).damage / damageReducer;

  const interval = 1;

  const durationAmplifier = (Math.sqrt(shard.green) + 1) * Math.pow(levelCoefficient, 3) / durationAmplifierReducer;
  let duration = Math.sqrt(durationAmplifier) / durationReducer + minDuration;

  const damage = (allDamage / duration) * (shard.green / 100 + 1);

  duration = Math.floor(duration);

  return {damage, interval, duration};
}

export const calculateLightningParams = (shard: Shard) => {
  const chainReactionAmplifierReducer = 17.5;
  const minChainReaction = 3;
  const damageReduction = 0.75;
  const radiusReduction = 0.85;
  const radiusReducer = 100;

  const quantity = getQuantity(shard);

  const levelCoefficient = getLevel(quantity);

  const damage = calculateBaseDamageParams(shard).damage;

  const aquamarineAmplifier = getShardAmplifier(shard.aquamarine, quantity);

  const chainReactionAmplifier = Math.round(Math.sqrt(aquamarineAmplifier) / chainReactionAmplifierReducer) + 2;
  const chainReaction = chainReactionAmplifier / Math.sqrt(chainReactionAmplifier) + minChainReaction;

  const radius = (levelCoefficient / radiusReducer) * (Math.pow(aquamarineAmplifier, 0.75) / radiusReducer) + 3;

  // todo
  return {damage, damageReduction, chainReaction, radius, radiusReduction};
}

export const calculateShockingParams = (shard: Shard) => {
  // const probabilityDivider = 7;
  //
  // const durationDivider = 100;
  // const durationMin = 1;
  // const radiusMin = 1;
  // const radiusDivider = 2;
  //
  // const quantity = getQuantity(shard);
  //
  // const value = shard.violet;
  // const percent = value / 100;
  //
  // const durationAmplifierPow = 0.6;
  // const durationAmplifierPow2 = 0.3;
  // const durationAmplifier = (getShardAmplifier(value, quantity, durationAmplifierPow, durationAmplifierPow2) / getShardAmplifier(100, 100, durationAmplifierPow, durationAmplifierPow2))// * Math.pow(level / 15, 2);
  // const duration = durationMin + (percent * durationAmplifier / 100) * 2;
  // // const duration = durationMin + (Math.sqrt(durationAmplifier) - 1) / Math.log(shard.violet + 1) / durationDivider;
  // // const radius = radiusMin + (Math.sqrt(amplifier) - 1) / radiusDivider;
  //
  // const probabilityMin = 0.1;
  // const probabilityMax = 0.75;
  // const probabilityAmplifierPow = 1.25;
  // const probabilityAmplifier = (getShardAmplifier(value, quantity, probabilityAmplifierPow) / getShardAmplifier(100, 100, probabilityAmplifierPow))// * Math.pow(level / 15, 2);
  // const probability = probabilityMin + (percent * probabilityAmplifier) * (probabilityMax - probabilityMin);
  // // probability = Math.min(probabilityMax, Math.max(probabilityMin, probability));

  const value = shard.violet;

  if (value <= 0) return {duration: 0, probability: 0, radius: 0};

  const percent = value / 100;

  const quantity = getQuantity(shard);
  const level = getLevel(quantity);
  const lp = level / 15 + 1 / 1.875;

  const pa = value / quantity;
  const rMin = .15;
  const rMax = 1
  const r = range(bezier(pa, 0, 0, .5, 1), rMin, rMax);

  const durationMin = 1;
  const durationMax = 10;
  const durationValue = range(bezier(percent, .86, 0, .64, .74) * (lp), durationMin, durationMax);
  const duration = durationValue * r;

  const probabilityMin = 0.1;
  const probabilityMax = 0.75;
  const probabilityValue = range(bezier(percent, .82, .13, 1, .54) * (lp), probabilityMin, probabilityMax);
  const probability = probabilityValue * r;

  const radiusMin = 1;
  const radiusMax = 5;
  const radiusValue = range(bezier(percent, .46, .6, 1, .32) * (lp), radiusMin, radiusMax);
  const radius = radiusValue * r;

  return {duration, probability, radius};
}

const range = (percent: number, min: number, max: number) => percent * (max - min) + min;

export const maxSingleAmplifier = getShardAmplifier(100);
export const maxAmplifier = getShardAmplifier(800);

// pink - увеличивает скорострельность
export const getFireRate = (shard: Shard) => {
  const baseFireRate = config.fireRateBase;

  const quantity = getQuantity(shard)

  const pinkFactor = shard.pink > 0 ? Math.sqrt(shard.pink / 100 + (quantity / 800 + 1)) : 1;

  const levelModifier = Math.pow(getLevel(quantity) / 4, 1.25);
  let fireRate = levelModifier * (Math.log(Math.sqrt(quantity) + pinkFactor)) * pinkFactor + baseFireRate - 0.12253227;

  if (shard.pink > 0) {
    //   const pinkAmplifier = getIncreaseAmplifier(shard.pink, quantity, config.fireRateImpactOfPink);
    fireRate += 0.1;
  }

  return fireRate;
}

// yellow - увеличивает радиус
export const getTowerRadius = (shard: Shard) => {
  const baseRadius = config.radiusBase;
  const impactOfYellow = config.radiusImpactOfYellow;

  const quantity = getQuantity(shard);
  const levelCooficient = getLevel(quantity);
  const levelModifier = Math.pow(levelCooficient / 10, 2);

  let radius = levelModifier * Math.log10(Math.pow(quantity + 1, 2)) + baseRadius;

  if (shard.yellow > 0) {
    const yellowAmplifier = getShardAmplifier(shard.yellow, quantity);
    radius += Math.sqrt(yellowAmplifier * impactOfYellow) / Math.sqrt(quantity);
  }

  radius = Math.max(baseRadius, radius);

  return radius;
}

export const CalculateCost = (shard: Shard, singleCost: number) => {
  // ToDo добавить в рассчет цены каждого слияния
  const cost = singleCost;
  const quantity = getQuantity(shard);

  // todo
  const combineCost = calculateCombineCost(shard, shard, singleCost);

  return Math.round(cost * Math.pow(quantity, 2) + combineCost);
}

export const calculateCombineCost = (targetShard: Shard, sourceShard: Shard, baseCombineCost: number) => {
  // todo
  const quantityTarget = getQuantity(targetShard) - 1;
  const quantitySource = getQuantity(sourceShard) - 1;

  return Math.round(baseCombineCost * Math.sqrt(quantityTarget * quantitySource));
}

