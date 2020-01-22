# country-flag-icons

[![npm version](https://img.shields.io/npm/v/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)
[![npm downloads](https://img.shields.io/npm/dm/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)

Vector country flag icons in 3x2 aspect ratio.

* Optimized for small size on screen (little detail, minimalism).
* Small file size.
* Comes with React components for all flags (exported from `/react` subpackage).

[See the flags](http://catamphetamine.github.io/country-flag-icons/3x2) (3x2)

## Install

```
npm install country-flag-icons --save
```

## Use

### `hasFlag(country: string)`

Tells whether there's a flag for a country.

```js
import { hasFlag } from 'country-flag-icons'

hasFlag('US') === true
hasFlag('ZZ') === false
```

### Web

Flags can be linked directly from this library's github pages website.

```html
<img
  alt="United States"
  src="http://catamphetamine.github.io/country-flag-icons/3x2/US.svg"/>
```

### Unicode

[Unicode flag icons](https://blog.emojipedia.org/emoji-flags-explained/) are available under the `/unicode` export.

```js
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

getUnicodeFlagIcon('US') === '🇺🇸'
getUnicodeFlagIcon('ZZ') === '🇿🇿'
```

Unicode flag icons ("Regional Indicator Symbols") were [introduced](https://esham.io/2014/06/unicode-flags) in 2010 in Unicode version 6.0.

Older operating systems might not support Unicode flags, either rendering "missing" (rectangle) characters (if their system doesn't support country flags), or displaying two-letter country codes instead of emoji flag images. For example, Windows 10 currently (01.01.2020) doesn't support Unicode country flags, and displays two-letter country codes instead of emoji flag images.

### React

React components for all flags are available at `/react/3x2` export.

```js
import Flags from 'country-flag-icons/react/3x2'

<Flags.US title="United States" className="..."/>
```

## Alternatives

* [FlagKit](https://github.com/madebybowtie/FlagKit) ([`flagpack`](https://github.com/jackiboy/flagpack) npm package) — Simple and beautiful flag icons. `4x3` aspect ratio. MIT licence.

<!-- Doesn't have [`AC` and `TA` flags](https://github.com/jackiboy/flagpack/pull/4). -->

## Credits

* Some flags are from this [262 country flag icons pack](https://www.flaticon.com/packs/countrys-flags). The license reads, in short: "Free for personal and commercial purpose with attribution" (not [MIT](https://en.wikipedia.org/wiki/MIT_License)).

* Some flags ([`AC`](https://en.wikipedia.org/wiki/Flag_of_Ascension_Island#/media/File:Flag_of_Ascension_Island.svg), `AL`, [`AQ`](https://commons.wikimedia.org/wiki/File:Proposed_flag_of_Antarctica_(Graham_Bartram).svg), `AR`, `GF`, `GP`, [`GS`](https://en.wikipedia.org/wiki/File:Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg), `GY`, [`KI`](https://commons.wikimedia.org/wiki/File:Flag_of_Kiribati_(3-2).svg), [`MP`](https://commons.wikimedia.org/wiki/File:Flag_of_the_Northern_Mariana_Islands_(3-2).svg), `MY`, [`NC`](https://en.wikipedia.org/wiki/File:Flags_of_New_Caledonia.svg)), `OS`, [`SH`](https://en.wikipedia.org/wiki/Flag_of_Saint_Helena#/media/File:Flag_of_Saint_Helena.svg), [`SZ`](https://commons.wikimedia.org/wiki/File:Flag_of_Eswatini.svg), [`TA`](https://en.wikipedia.org/wiki/Flag_of_Tristan_da_Cunha#/media/File:Flag_of_Tristan_da_Cunha.svg), `TR`, `TV`, `US`, `VE`, `WF` were drawn by me in a vector graphics editor. I'm distributing these for free under [MIT](https://en.wikipedia.org/wiki/MIT_License) licence.

* Some countries use their "mother" countries' flag instead of using their own. For example, `BV` (Bouvet Island), `SJ` (Svalbard and Jan Mayen) use the flag of Norway; `GP` (Guadeloupe), `RE` (Réunion) use the flag of France.