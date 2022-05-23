import COUNTRIES from './countries.json.js'

export default function hasFlag(country) {
	return COUNTRIES.indexOf(country) >= 0
}