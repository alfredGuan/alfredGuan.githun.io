var Util= {
	tpl: function (id) {
		return document.getElementById(id).innerHTML;
	},
	ajax: function (url, fn) {
		// 创建xhr对象
		var xhr = new XMLHttpRequest();
		// 订阅事件
		xhr.onreadystatechange = function () {
			
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					// 将请求的数据传递给fn
					// 将返回的数据转化成json对象
					var data = JSON.parse(xhr.responseText)
					fn && fn(data)
				}
			}
		}
		// open方法
		xhr.open('GET', url, true)
		// send
		xhr.send(null);
	}
}

Util.ajax('data/home.json', function (data) {

})

var idx = 0;

// 定义组件
var HomComponent = Vue.extend({

	template: Util.tpl('tpl_home'),

	data: function () {
		return {
			types: [
				{id: 1,  url: '4.jpg'},
				{id: 2,  url: '5.jpg'},
				{id: 3,  url: '7.jpg'},
				{id: 4,  url: '9.jpg'},
				{id: 5,  url: '11.jpg'},
				{id: 6,  url: '12.jpg'}
				
				
			]
		}
	},	

	
	methods: {
		showbox: function () {
			this.$lis =  $(".pic ul li");			
			this.$lis.eq(idx).fadeOut(1000);
			idx++;
			console.log(idx)	
			if(idx > 5) idx = 0;
			this.$lis.eq(idx).fadeIn(1000);
		},
		
		
	},
	created: function () {
		  idx=0;
         setInterval(function(){
        $circleslis = $(".pro h1");
		idx++;
		if(idx > 6) idx = 0;
		this.$circleslis.eq(idx).addClass("cur").siblings().removeClass("cur");
		},2000)
    }

		
	

})
var ResumeComponent = Vue.extend({
	template: Util.tpl('tpl_resume')
})
// 注册组件
Vue.component('home', HomComponent)
Vue.component('resume', ResumeComponent)
// Vue实例化对象
var app = new Vue({
	el: '#app',
	data: {
		view: 'home',
		isShow:true 
	},
	methods: {
		
		goBack: function () {
			history.go(-1);
		},
		showox: function () {
			this.isShow = !this.isShow
		}

	}
})

// 路由函数
function router () {
	// 处理hash业务逻辑
	// 获取hash，根据hash不同决定渲染哪个页面
	// 当hash是空时候，我们要设置默认值，'#home'
	var str = location.hash;
	// 处理到#
	str = str.slice(1);
	// 处理第一个/ 也就是 #/
	str = str.replace(/^\//, '')
	// 获取 / 前面的字符串
	if (str.indexOf('/') > -1) {
		str = str.slice(0, str.indexOf('/'))
	}
	// 映射列表
	var map = {
		home: true,
		resume: true
	}
	// 判断str是否在map中，如果在，我们渲染页面，不在渲染home页面
	if (map[str]) {
		// 想渲染哪个页面我们只需要将app.view设置成改字符串就可以
		app.view = str;
	} else {
		app.view = 'home'
	}
	
}

// 页面进入的时候，会触发load事件，我们要根据hash来决定进入那个页面
window.addEventListener('load', router)

// hash改变时候的事件交hashChange事件
window.addEventListener('hashchange', router)