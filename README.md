# country-flag-icons

[![npm version](https://img.shields.io/npm/v/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)
[![npm downloads](https://img.shields.io/npm/dm/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)

Vector country flag icons in `3:2` aspect ratio.

<!-- Also provides `1:1` crops of the `3:2` flags (not custom `1:1` flags). -->

* Optimized for small size on screen (little detail, minimalism).
* Small file size.
* Comes with React components for all flags (exported from `/react` subpackage).

[See `3:2` flags](http://catamphetamine.gitlab.io/country-flag-icons/3x2)

<!-- [See `1:1` flags](http://catamphetamine.gitlab.io/country-flag-icons/1x1) (just `1:1` crops of the `3:2` flags, not custom `1:1` flags) -->

## Install

```
npm install country-flag-icons --save
```

## API

### `hasFlag(countryCode: string): boolean`

Tells whether there's a flag for a given [country code](#country-code).

```js
import { hasFlag } from 'country-flag-icons'

hasFlag('US') === true
hasFlag('ZZ') === false
```

### `countries: string[]`

The list of supported [country codes](#country-code).

```js
import { countries } from 'country-flag-icons'

countries.includes('US') === true
countries.includes('ZZ') === false
```

### Web

Flags can be linked directly from this library's [gitlab pages website](https://catamphetamine.gitlab.io/country-flag-icons), or from a [github pages mirror](https://purecatamphetamine.github.io/country-flag-icons), which seems a tiny bit faster.

```html
<img
  alt="United States"
  src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"/>
```

Flags can also be used in the form of CSS classes imported from [`country-flag-icons/3x2/flags.css`](https://unpkg.com/country-flag-icons/3x2/flags.css) where all flag icons are inlined as `background-image` data URLs. CSS flag icon height can be set via `--CountryFlagIcon-height` [CSS variable](https://caniuse.com/#feat=css-variables).

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
import { US } from 'country-flag-icons/react/3x2'

<US title="United States" className="..."/>
```

Or directly, if your bundler doesn't support tree shaking:

```js
import US from 'country-flag-icons/react/3x2/US'

<US title="United States" className="..."/>
```

### Vue

There's an [experimental component](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/26) for Vue 3.

### String

All flags can also be imported as strings:

```js
import { US } from 'country-flag-icons/string/3x2'

console.log(US) // > '<svg xmlns="http://www.w3.org/2000/svg" ...</svg>'
```

Or directly, if your bundler doesn't support tree shaking:

```js
import US from 'country-flag-icons/string/3x2/US'

console.log(US) // > '<svg xmlns="http://www.w3.org/2000/svg" ...'
```

## Country Code

This library includes the flags for all [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country codes such as `US`, `CA`, etc.

Additionally, this library includes the flags for the following ["exceptional reservations"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard, which are not official ISO-3166-1 country codes, but still there have been [requests](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/4) to include them:
* `EU` — European Union
* `IC` — Canary Islands

Additionally, this library includes two-letter codes to denote several territories that don't have their own official ISO-3166-1 code but still use a telephone numbering plan that is different from their ISO-3166-1 parent territory. In [accordance](https://www.npmjs.com/package/libphonenumber-js#country-code) with Google's `libphonenumber`, those are:
* `AC` — Ascension Island
  * `AC` is an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Ascension Island territory is `SH-AC`.
* `TA` — Tristan da Cunha
  * `TA` is an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Tristan da Cunha territory is `SH-TA`.
* `XK` — Kosovo
  * `XK` is not an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard, but it's being used by various organizations as a temporary "country code" for Kosovo.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Kosovo territory [is](https://en.wikipedia.org/wiki/Autonomous_Province_of_Kosovo_and_Metohija) `RS-KM`.
* `XA` — Abkhazia
  * `XA` is not an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard, but it's being used some organizations as a temporary "country code" for Abkhazia.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Abkhazia territory is `GE-AB`.
* `XO` — South Ossetia
  * `XO` is not an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard, but it's being used some organizations as a temporary "country code" for South Ossetia.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to South Ossetia territory is `GE-OS`.

Additionally, this library includes the flags for certain official [ISO-3166-2 "subdivision codes"](https://en.wikipedia.org/wiki/ISO_3166-2) because there have been requests to include them:

* [`BQ`](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/48) — Caribbean Netherlands
  * `BQ-BO` — Bonaire
  * `BQ-SA` — Saba
  * `BQ-SE` — Sint Eustatius
* [`GB`](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/47) — United Kingdom
  * `GB-ENG` — England
  * `GB-NIR` — Northern Ireland
  * `GB-SCT` — Scotland
  * `GB-WLS` — Wales
* `ES` — Spain
  * [`ES-CT`](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/46) — Catalonia

## GitHub

On March 9th, 2020, GitHub, Inc. silently [banned](https://medium.com/@catamphetamine/how-github-blocked-me-and-all-my-libraries-c32c61f061d3) my account (erasing all my repos, issues and comments) without any notice or explanation. Because of that, all source codes had to be promptly moved to GitLab. The [GitHub repo](https://github.com/catamphetamine/country-flag-icons) is now only used as a backup (you can star the repo there too), and the primary repo is now the [GitLab one](https://gitlab.com/catamphetamine/country-flag-icons). Issues can be reported in any repo.

## Alternatives

* [FlagKit](https://github.com/madebybowtie/FlagKit) — MIT licence
  - [`1.4x1`](https://github.com/madebybowtie/FlagKit/tree/master/Assets/SVG)
* [`flagpack`](https://github.com/jackiboy/flagpack) — MIT licence
  - [`4x3`](https://github.com/jackiboy/flagpack/tree/master/flags/4x3)
  - [`1x1`](https://github.com/jackiboy/flagpack/tree/master/flags/1x1)

## Credits

I used Google image search for flag references, and various country flag packs (including [FlagKit](https://github.com/madebybowtie/FlagKit) / [`flagpack`](https://github.com/jackiboy/flagpack)) for design ideas. Sometimes there was no need to re-draw a flag — usually in cases when a flag is just a set of colored stripes and there already is an SVG version of it somewhere at Wikipedia or some other free flag pack, so in those cases I simply copied those flags (because they look the same in every flag pack).

Some countries officially use their "mother" country flag (those used to be colonies). For example, `BV` (Bouvet Island) and `SJ` (Svalbard and Jan Mayen) use the flag of Norway; `GP` (Guadeloupe) and `RE` (Réunion) use the flag of France.

CSS flag icons feature has been submitted by [`@mindplay-dk`](https://github.com/mindplay-dk).

<!-- `3:2` to `1:1` flag icons transform offsets submitted by [`@mindplay-dk`](https://github.com/mindplay-dk). -->
