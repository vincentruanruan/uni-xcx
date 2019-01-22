import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        baseUrl: 'http://hidsy.maimaitoo.com',
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
    },
    mutations: {

        navGoto(state, stark) { // 页面跳转方法
            console.log(stark)

            let url = "/pages/";
            let goto = stark.goto
            let pages = stark.pages

            switch (goto) {
                case "home":
                    url += "index/index";
                    break;
                case "solve":
                    url += goto + "/index";
                    break;
                case "xiaochengxu":
                    url += goto + "/index";
                    break;
                case "dingzhi":
                    url += goto + "/index";
                    break;
                case "daili":
                    url += goto + "/index";
                    break;
                case "news":
                    url += goto + "/index";
                    break;
                case "about":
                    url += goto + "/index";
                    break;
                case "contact":
                    url += goto + "/index";
                    break;
                case "help":
                    url += goto + "/index";
                    break;

                default:
                    break;
            }
            let nowRoute = pages[pages.length - 1].route;
            let homeRoute = pages[0].route;
            // console.log('goto:' + goto);
            // console.log('url:' + url);
            // console.log('nowRoute:' + nowRoute)
            if (nowRoute == 'pages/index/index' && url != '/pages/index/index') {
                uni.navigateTo({
                    url
                });
            } else { // 不是首页 跳转去其他页面
                uni.navigateBack({
                    delta: 999
                });
            }

        },
    },
    actions: {

    }
});


export default store;