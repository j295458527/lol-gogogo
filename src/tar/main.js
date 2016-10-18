// that.update()
// 通过img的方式和后台通信，能否获得反馈

// var p = WeixinJSBridge.publish;
// WeixinJSBridge.publish = function(){console.log(arguments),p.apply(this,arguments);}
module.exports = (function () {

	var _obj2Params = function (obj, startTag) {
		var result = startTag
		for (var key in obj) {
			result += key + '=' + obj[key] + '&'
		}
		return result.slice(0, -1);
	}

	// this作为page的options方法
	var upLoadData = function (options) {
		this.setData({
			tarUploadSrc: "http://api.scrm.weisgj.com/wxtags/batchuntag?&random=" + Math.random() + _obj2Params('&')
		})
	}
	// this作为page的options方法
	var wrapActionHandle = (actionFuncName, eventParams) => {

		switch (actionFuncName) {
			case 'onLoad':
				upLoadData.call(this, {
					action: 'onLoad'
				})
				console.log('onLoad')
				break;
			case 'onReady':
				console.log('onReady')
				break;
			case 'onShow':
				console.log('onShow')
				break;
			case 'onHide':
				console.log('onHide')
				break;
			case 'onUnload':
				console.log('onUnload')
				break;
			case 'onPullDownRefreash':
				console.log('onPullDownRefreash')
				break;
			default:
				switch (eventParams.type) {
					case 'tap':
						console.log('tap', '=>', eventParams)
						break;
					case 'touchstart':
						console.log('touchstart', '=>', eventParams)
						break;
					case 'touchmove':
						console.log('touchmove', '=>', eventParams)
						break;
					case 'touchcancel':
						console.log('touchcancel', '=>', eventParams)
						break;
					case 'touchend':
						console.log('touchend', '=>', eventParams)
						break;
					case 'tap':
						console.log('tap', '=>', eventParams)
						break;
					case 'longtap':
						console.log('longtap', '=>', eventParams)
						break;
					default:
						console.log('default', '=>', eventParams)
						break;
				}
				break;
		}
	}

	const glPage = Page
	Page = (options) => {

		!options.onLoad && (options.onLoad = function onLoad() { }),
			!options.onReady && (options.onReady = function onReady() { }),
			!options.onShow && (options.onShow = function onShow() { }),
			!options.onHide && (options.onHide = function onHide() { }),
			!options.onUnload && (options.onUnload = function onUnload() { }),
			!options.onPullDownRefreash && (options.onPullDownRefreash = function onPullDownRefreash() { });

		for (var key in options) {
			if (typeof options[key] == 'function') {
				+(function () {
					var temp = options[key];

					options[key] = function () {

						wrapActionHandle.call(this, temp.name, arguments);
						temp.apply(this, arguments);
					}
				})();
			}
		}

		glPage(options)
	}

	const glWx = wx
	wx = (() => {

		var login = (options) => {
			console.log('login')
			return glWx.login(options);
		}

		var getUserInfo = (cb) => {
			console.log('getUserInfo')
			return glWx.getUserInfo(cb);
		}

		var getStorageSync = (key) => {
			console.log('getStorageSync')
			return glWx.getStorageSync(key);
		}

		var setStorageSync = (key) => {
			console.log('setStorageSync')
			return glWx.getStorageSync(key);
		}

		var navigateTo = (options) => {
			console.log('navigateTo')
			return glWx.navigateTo(options);
		}

		return {
			navigateTo,
			getUserInfo,
			getStorageSync,
			setStorageSync,
			login
		}
	})();

})();

