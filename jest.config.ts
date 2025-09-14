// export default {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.(js|jsx)$": [
//       "esbuild-jest",
//       {
//         jsxFactory: "m",
//         jsxFragment: '"["',
//       },
//     ]
//   },
// };
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
    "^.+\\.(js|jsx)$": ["esbuild-jest"],
  },
};
