# country-flag-icons

[![npm version](https://img.shields.io/npm/v/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)
[![npm downloads](https://img.shields.io/npm/dm/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)

The best vector country flag icons, in 3x2 aspect ratio.

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

Older operating systems (having older system fonts) might not support Unicode flags, rendering "missing" (rectangle) characters instead.

Windows 10 currently (01.01.2020) doesn't support Unicode country flags, and displays two-letter country codes instead of emoji flag images.

### React

React components for all flags are available at `/react/3x2` export.

```js
import Flags from 'country-flag-icons/react/3x2'

<Flags.US title="United States" className="..."/>
```

## Alternatives

* [FlagKit](https://github.com/madebybowtie/FlagKit) — Simple and beautiful flag icons. `4x3` aspect ratio. MIT licence.

## Licence

* Most flags are from this [262 country flag icons pack](https://www.flaticon.com/packs/countrys-flags). The license quoted there requires "attribution" and doesn't allow "distributing" the icons, so this icon pack including the icons is most likely not legal, even if you have "Premium" subscription on their website, and even if the "attribution" text is included on a page.

* Some flags ([`AC`](https://en.wikipedia.org/wiki/Flag_of_Saint_Helena#/media/File:Flag_of_Saint_Helena.svg), [`SH`](https://en.wikipedia.org/wiki/Flag_of_Saint_Helena#/media/File:Flag_of_Saint_Helena.svg), [`TA`](https://en.wikipedia.org/wiki/Flag_of_Saint_Helena#/media/File:Flag_of_Saint_Helena.svg), [`AQ`](https://commons.wikimedia.org/wiki/File:Proposed_flag_of_Antarctica_(Graham_Bartram).svg), [`GS`](https://en.wikipedia.org/wiki/File:Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg), [`KI`](https://commons.wikimedia.org/wiki/File:Flag_of_Kiribati_(3-2).svg), [`MP`](https://commons.wikimedia.org/wiki/File:Flag_of_the_Northern_Mariana_Islands_(3-2).svg), [`SZ`](https://commons.wikimedia.org/wiki/File:Flag_of_Eswatini.svg), [`NC`](https://en.wikipedia.org/wiki/File:Flags_of_New_Caledonia.svg)) were drawn by me in a vector graphics editor.

* Some flags ([`GY`](https://commons.wikimedia.org/wiki/File:Flag_of_Guyana_(3-2).svg), [`OS`](https://commons.wikimedia.org/wiki/File:Flag_of_South_Ossetia_(3-2).svg), [`TV`](https://commons.wikimedia.org/wiki/File:Flag_of_Tuvalu_(3-2).svg), [`WF`](https://en.wikipedia.org/wiki/File:Flag_of_Wallis_and_Futuna.svg)) were downloaded from Wikipedia (which usually licences stuff under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) or "Public domain").