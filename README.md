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

Flags can also be used in the form of CSS classes imported from [`country-flag-icons/3x2/flags.css`](https://unpkg.com/country-flag-icons@1.0.6/3x2/flags.css) where all flag icons are inlined as `background-image` data URLs. CSS flag icon height can be set via `--CountryFlagIcon-height` [CSS variable](https://caniuse.com/#feat=css-variables).

<details>
<summary>What if my project doesn't use CSS variables?</summary>

####

In that case, the default flag icon height is `1em`, and to change it, just set a `font-size`:

```css
/* Set flag icon height to 24px. */
[class*=' flag:'], [class^='flag:'] {
  font-size: 24px;
}
```
</details>

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

* [FlagKit](https://github.com/madebybowtie/FlagKit) ([`flagpack`](https://github.com/jackiboy/flagpack) npm package) — `4x3` and `1x1` SVG flag icons. MIT licence.

<!-- Doesn't have [`AC` and `TA` flags](https://github.com/jackiboy/flagpack/pull/4). -->

## Credits

I used Google image search for flag references, and various country flag packs (including [FlagKit](https://github.com/madebybowtie/FlagKit) / [`flagpack`](https://github.com/jackiboy/flagpack)) for design ideas. Sometimes there was no need to re-draw a flag — usually in cases when a flag is just a set of colored stripes and there already is a 3x2 SVG version of it somewhere at Wikipedia or some other free flag pack, so in those cases I simply copied those flags (because they look the same in every flag pack).

Some countries officially use their "mother" country flag (those used to be colonies). For example, `BV` (Bouvet Island) and `SJ` (Svalbard and Jan Mayen) use the flag of Norway; `GP` (Guadeloupe) and `RE` (Réunion) use the flag of France.

CSS flag icons feature has been [submitted](https://github.com/catamphetamine/country-flag-icons/pull/4) by [`@mindplay-dk`](https://github.com/mindplay-dk).