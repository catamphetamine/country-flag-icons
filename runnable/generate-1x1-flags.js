// https://github.com/catamphetamine/country-flag-icons/issues/5

import path from 'path'
import fs from 'fs'

import countries from '../source/countries.json' assert { type: 'json' }

const FLAGS_PATH = path.resolve('./flags')

/**
 * `3:2` to `1:1` flag icons transform offsets:
 * https://codesandbox.io/s/thirsty-stallman-0pnlt
 * Originally submitted by @mindplay-dk:
 * https://github.com/mindplay-dk
 */
const OFFSETS = {
  AE: 30,
  AS: 100,
  AW: 0,
  AO: 59,
  AX: 23,
  BD: 29,
  BH: 36,
  BJ: 34,
  BM: 68,
  BN: 55,
  BQ: 9,
  BV: 33,
  BY: 2,
  BZ: 55,
  CC: 89,
  CD: 0,
  CF: 10,
  CN: 44,
  CU: 0,
  CV: 10,
  CW: 7,
  CX: 58,
  CZ: 3,
  DJ: 8,
  DK: 14,
  DZ: 52,
  ER: 13,
  FI: 22,
  FO: 22,
  GD: 44,
  GE: 53,
  GL: 53,
  GQ: 20,
  GR: 2,
  GW: 11,
  GY: 9,
  IS: 19,
  JO: 0,
  KM: 3,
  KP: 42,
  KW: 0,
  KY: 69,
  LI: 30,
  LK: 25,
  LR: 3,
  MG: 38,
  MN: 13,
  MS: 71,
  MZ: 0,
  NA: 19,
  NC: 12,
  NO: 22,
  NP: 0,
  NR: 26,
  NU: 0,
  NZ: 67,
  OM: 26,
  PH: 0,
  PK: 80,
  PN: 67,
  PR: 3,
  PS: 3,
  PT: 18,
  PW: 29,
  RS: 36,
  SB: 16,
  SC: 51,
  SD: 2,
  SE: 18,
  SG: 0,
  SH: 66,
  SJ: 24,
  SK: 39,
  SS: 3,
  SX: 2,
  TA: 59,
  TC: 67,
  TG: 0,
  TK: 11,
  TL: 0,
  TM: 48,
  TO: 7,
  TR: 45,
  TW: 4,
  US: 35,
  UY: 6,
  VG: 66,
  VU: 0,
  WF: 18,
  WS: 9,
  ZA: 21,
  ZM: 100,
  ZW: 8
}

for (const country of countries.concat('GE-AB', 'GE-OS')) {
  let svg = fs.readFileSync(path.join(FLAGS_PATH, `3x2/${country}.svg`), 'utf8')
  // viewBox="x y width height" -> viewBox="x+RoundMaybeUpToTwoDecimalPoints((width-height)*percent/100) y height height".
  svg = svg.replace(/ viewBox="([^"]+)"/, (_, viewBox) => {
    const [x, y, width, height] = viewBox.split(/\s/).map(parseFloat)
    return ` viewBox="${round(x + (width - height) * getOffset(country) / 100)} ${y} ${height} ${height}"`
  })
  fs.writeFileSync(path.join(FLAGS_PATH, `1x1/${country}.svg`), svg)
}

function round(number) {
  return Math.round(number * 1000) / 1000
}

function getOffset(country) {
  return OFFSETS[country] === undefined ? 50 : OFFSETS[country]
}