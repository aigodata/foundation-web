export function is(constructor, value) {
	return Object.prototype.toString.call(value) === '[object ' + constructor.name + ']';
}

export function getType(obj) {
	let toString = Object.prototype.toString;
	let map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	if (obj instanceof Element) {
		return 'element';
	}
	return map[toString.call(obj)];
}

export function deepClone(data) {
	let type = is(data);
	let obj;
	if (type === 'array') {
		obj = [];
	} else if (type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === 'array') {
		for (let i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (let key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
}

export function getTimeRange(interval) {
	let end = Date.now();
	let start = new Date();
	start.setHours(0);
	start.setMinutes(0);
	start.setSeconds(0);
	if (interval === 'month') {
		start.setDate(0);
	}
	return [start.getTime(), end];
}

export function randomUuid() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  