# country-flag-icons

[![npm version](https://img.shields.io/npm/v/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)
[![npm downloads](https://img.shields.io/npm/dm/country-flag-icons.svg?style=flat-square)](https://www.npmjs.com/package/country-flag-icons)

Vector country flag icons in `3:2` aspect ratio.

<!-- Also provides `1:1` crops of the `3:2` flags (not custom `1:1` flags). -->

* Optimized for small size on screen (little detail, minimalism).
* Small file size (generally `1 KB` per flag).
* Exports a React component for each flag (from `/react` subpackage).

[See the flags](http://catamphetamine.gitlab.io/country-flag-icons/3x2)

<!-- [See `1:1` flags](http://catamphetamine.gitlab.io/country-flag-icons/1x1) (just `1:1` crops of the `3:2` flags, not custom `1:1` flags) -->

## Use

The `.svg` files could be found in `/3x2/` subfolder of the `npm` package.

If you're a javascript developer:

```
npm install country-flag-icons --save
cd ./node_modules/country-flag-icons/3x2
```

If you are not a javascript developer, you could [download](https://unpkg.com/country-flag-icons/3x2/flags.zip) a `.zip` archive with all flags, or [browse](https://unpkg.com/country-flag-icons/3x2/) the `/3x2/` subfolder online for individual `.svg` files.

Those're the only valid options to get the `.svg` files. Don't download the `.svg` files from any other source. For example, don't download them from the [github repository](https://github.com/catamphetamine/country-flag-icons/) or the [gitlab repository](https://gitlab.com/catamphetamine/country-flag-icons/) because the `.svg` files are not "minified" there.

After obtaining the `.svg` files, you could include them in your apps or in your design mock-ups, etc. For web usage, if you'd prefer to not go through the hassle of hosting the `.svg` files yourself, consider using the [github mirror](https://purecatamphetamine.github.io/country-flag-icons/3x2/) or the [gitlab mirror](https://catamphetamine.gitlab.io/country-flag-icons/3x2/).

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

One could either manually host the `.svg` files or use the existing [github mirror](https://purecatamphetamine.github.io/country-flag-icons/3x2/) or [gitlab mirror](https://catamphetamine.gitlab.io/country-flag-icons/3x2/).

```html
<img
  alt="United States"
  src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"/>
```

Flags could also be used in the form of CSS classes imported from [`country-flag-icons/3x2/flags.css`](https://unpkg.com/country-flag-icons/3x2/flags.css) where all flag icons are inlined as `background-image` "data URLs" and the flag icon height could be set via `--CountryFlagIcon-height` [CSS variable](https://caniuse.com/#feat=css-variables).

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

### React

React components for all flags are available in the `/react/3x2` subpackage.

```js
import { US } from 'country-flag-icons/react/3x2'

<US title="United States" className="..."/>
```

Or they could be imported individually, if your bundler doesn't support "tree shaking":

```js
import US from 'country-flag-icons/react/3x2/US'

<US title="United States" className="..."/>
```

### Vue

There's an [experimental component](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/26) for Vue 3.

### String

The SVG code of all flags is available in the `/string/3x2` subpackage:

```js
import { US } from 'country-flag-icons/string/3x2'

console.log(US) // > '<svg xmlns="http://www.w3.org/2000/svg" ...</svg>'
```

Or each flag could be imported individually, if your bundler doesn't support "tree shaking":

```js
import US from 'country-flag-icons/string/3x2/US'

console.log(US) // > '<svg xmlns="http://www.w3.org/2000/svg" ...'
```

### Unicode

[Unicode flag icons](https://blog.emojipedia.org/emoji-flags-explained/) are available in the `/unicode` subpackage.

```js
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

getUnicodeFlagIcon('US') === '🇺🇸'
getUnicodeFlagIcon('ZZ') === '🇿🇿'
```

Unicode flag icons ("Regional Indicator Symbols") were [introduced](https://esham.io/2014/06/unicode-flags) in 2010 in Unicode version 6.0.

Older operating systems might not support Unicode flags, either rendering "missing" (rectangle) characters (if their system doesn't support country flags), or displaying two-letter country codes instead of emoji flag images. For example, Windows 10 currently (01.01.2020) doesn't support Unicode country flags, and displays two-letter country codes instead of emoji flag images.

## Country Code

This library includes the flags for all [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country codes such as `US`, `CA`, etc.

Additionally, this library includes the flags for the following ["exceptional reservations"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard, which are not official ISO-3166-1 country codes, but still there have been [requests](https://gitlab.com/catamphetamine/country-flag-icons/-/issues/4) to include them:
* `EU` — European Union
* `IC` — Canary Islands

Additionally, this library includes the flags for the "unofficial" two-letter codes used by [`libphonenumber-js`](https://www.npmjs.com/package/libphonenumber-js#country-code):
* `AC` — Ascension Island
  * `AC` is an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Ascension Island region [is](https://en.wikipedia.org/wiki/ISO_3166-2:SH) `SH-AC`.
* `TA` — Tristan da Cunha
  * `TA` is an ["exceptional reservation"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Reserved_code_elements) of the ISO-3166-1 standard.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Tristan da Cunha region [is](https://en.wikipedia.org/wiki/ISO_3166-2:SH) `SH-TA`.
* `XK` — Kosovo
  * `XK` is a ["user-assigned"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#User-assigned_code_elements) code in the ISO-3166-1 standard meaning that it can be freely assigned to any region by any application or organization for its own purposes.
  * This "user-assigned" code may potentially be changed or removed at any time.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Kosovo region [is](https://en.wikipedia.org/wiki/Autonomous_Province_of_Kosovo_and_Metohija) `RS-KM`.
* `XA` — Abkhazia
  * `XA` is a ["user-assigned"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#User-assigned_code_elements) code in the ISO-3166-1 standard meaning that it can be freely assigned to any region by any application or organization for its own purposes.
  * This "user-assigned" code may potentially be changed or removed at any time.
  * The last official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2) assigned to Abkhazia region [is](https://en.wikipedia.org/wiki/ISO_3166-2:GE) `GE-AB`.
* `XO` — South Ossetia
  * `XO` is a ["user-assigned"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#User-assigned_code_elements) code in the ISO-3166-1 standard meaning that it can be freely assigned to any region by any application or organization for its own purposes.
  * This "user-assigned" code may potentially be changed or removed at any time.
  * South Ossetia region has [not](https://en.wikipedia.org/wiki/ISO_3166-2:GE) ever been assigned any official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2).
* `XC` — [Northern Cyprus](https://github.com/catamphetamine/country-flag-icons/issues/22)
  * `XC` is a ["user-assigned"](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#User-assigned_code_elements) code in the ISO-3166-1 standard meaning that it can be freely assigned to any region by any application or organization for its own purposes.
  * This "user-assigned" code may potentially be changed or removed at any time.
  * Northern Cyprus region has [not](https://en.wikipedia.org/wiki/ISO_3166-2:CY) ever been assigned any official ISO-3166-2 ["subdivision code"](https://en.wikipedia.org/wiki/ISO_3166-2).

Additionally, this library includes the flags for certain official ISO-3166-2 [ "subdivision codes"](https://en.wikipedia.org/wiki/ISO_3166-2) because there have been requests to include them:

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
