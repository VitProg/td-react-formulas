type EasingFunction = (progress: number) => number;

interface EasingDictionary {
  [easing: string]: EasingFunction;
}

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

const bounceOut: EasingFunction = function (x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};

export const easings = {
  linear: (x: number) => x,
  easeInQuad: (x: number) => x * x,
  easeOutQuad: (x: number) => 1 - (1 - x) * (1 - x),


  easeInCubic: (x: number) => x * x * x,
  easeOutCubic: (x: number) => 1 - pow(1 - x, 3),

  easeInQuart: (x: number) => pow(x, 4),
  easeInPow: (x: number, p: number) => pow(x, p),
  easeOutQuart: (x: number) => 1 - pow(1 - x, 4),
  easeOutPow: (x: number, p: number) => 1 - pow(1 - x, p),

  easeInQuint: (x: number) => x * x * x * x * x,
  easeOutQuint: (x: number) => 1 - pow(1 - x, 5),

  easeInOutQuad: (x: number) => x < 0.5 ? 2 * pow(x, 2) : 1 - pow(-2 * x + 2, 2) / 2,
  easeInOutCubic: (x: number) => x < 0.5 ? 4 * pow(x, 3) : 1 - pow(-2 * x + 2, 3) / 2,
  easeInOutQuart: (x: number) => x < 0.5 ? 8 * pow(x, 4) : 1 - pow(-2 * x + 2, 4) / 2,
  easeInOutQuint: (x: number) => x < 0.5 ? 16 * pow(x, 5) : 1 - pow(-2 * x + 2, 5) / 2,

  easeInSine: (x: number) => 1 - cos((x * PI) / 2),
  easeOutSine: (x: number) => sin((x * PI) / 2),
  easeInOutSine: (x: number) => -(cos(PI * x) - 1) / 2,
  easeInExpo: (x: number) => x === 0 ? 0 : pow(2, 10 * x - 10),
  easeOutExpo: (x: number) => x === 1 ? 1 : 1 - pow(2, -10 * x),
  easeInOutExpo: function (x: number) {
    if (x === 0) {
      return 0;
    } else {
      if (x !== 1) {
        return x < 0.5
          ? pow(2, 20 * x - 10) / 2
          : (2 - pow(2, -20 * x + 10)) / 2;
      } else {
        return 1;
      }
    }
  },
  easeInCirc: (x: number) => 1 - sqrt(1 - pow(x, 2)),
  easeOutCirc: (x: number) => sqrt(1 - pow(x - 1, 2)),
  easeInOutCirc: (x: number) => x < 0.5
    ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
    : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2,
  easeInBack: (x: number) => c3 * x * x * x - c1 * x * x,
  easeOutBack: (x: number) => 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2),
  easeInOutBack: (x: number) => x < 0.5
    ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2,
  easeInElastic: function (x: number) {
    if (x === 0) {
      return 0;
    } else {
      return x === 1
        ? 1
        : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    }
  },
  easeOutElastic: function (x: number) {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: function (x: number) {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : x < 0.5
          ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
          : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
  },
  easeInBounce: function (x: number) {
    return 1 - bounceOut(1 - x);
  },
  easeOutBounce: bounceOut,
  easeInOutBounce: function (x: number) {
    return x < 0.5
      ? (1 - bounceOut(1 - 2 * x)) / 2
      : (1 + bounceOut(2 * x - 1)) / 2;
  },
  bezier: (t: number, initial: number, p1: number, p2: number, final: number) => (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  )
};

