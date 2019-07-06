/**
 * aes的加密key
 */

import CryptoJS from 'crypto-js';

const KEY = 'monitor123123456';
const IV = 'monitor123123456';

export default {
	//加密
	encrypt(value) {
		let key = CryptoJS.enc.Latin1.parse(KEY);
		let iv = CryptoJS.enc.Latin1.parse(IV);
		let encrypted = CryptoJS.AES.encrypt(value, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.ZeroPadding
		});
		return encrypted.toString()
	},
	// 解密
	decrypt(value) {
		let key = CryptoJS.enc.Latin1.parse(KEY);
		let iv = CryptoJS.enc.Latin1.parse(IV);
		let bytes = CryptoJS.AES.decrypt(value, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.ZeroPadding
		});
		let originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText
	}
}
