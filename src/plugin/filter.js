import numeral from 'numeral'
import moment from 'moment'
import 'moment/locale/pt-br';
moment.locale('zh-cn');
export function currency(val, formatter) {
	formatter = formatter || '$0,0[.]0[00]'
	return numeral(val).format(formatter)
}

export function number(val, formatter) {
	formatter = formatter || '0,0'
	return numeral(val).format(formatter)
}

export function comma(val, formatter) {
	formatter = formatter || '0,0[.]0[00]'
	return numeral(val).format(formatter)
}

export function kmb(val, formatter) {
	formatter = formatter || '0a[.]0[00]'
	return numeral(val).format(formatter)
}

export function percent(val, formatter) {
	formatter = formatter || '0%[.]0[0]'
	return numeral(val).format(formatter)
}

export function date(val, formatter) {
	formatter = formatter || 'YYYY-MM-DD'
	return moment(val).format(formatter)
}

export function datetime(val, formatter) {
	if (!val) return '-';
	formatter = formatter || 'YYYY-MM-DD HH:mm:ss'
	return moment(val).format(formatter)
}

export function leftPrefix(value, len, symbol) {
	symbol = symbol || '*'
	let symbols = []
	for (let i = 0; i < len; i++) {
		symbols.push(symbol);
	}
	return (symbols.join('') + value).substr(value.length, len)
}

export default {
	install: function (Vue) {
		Vue.filter('comma', comma)
		Vue.filter('number', number)
		Vue.filter('currency', currency)
		Vue.filter('kmb', kmb)
		Vue.filter('percent', percent)
		Vue.filter('date', date)
		Vue.filter('datetime', datetime)
		Vue.filter('leftPrefix', leftPrefix)
		Vue.prototype.$filter = {
			currency,
			number,
			comma,
			kmb,
			percent,
			date,
			datetime,
			leftPrefix,
		}
	}
}
