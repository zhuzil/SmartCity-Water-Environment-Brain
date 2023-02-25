import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import dataV from '@jiaminghi/data-view'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import echarts from 'echarts'

// import * as VueAMap from 'vue-amap'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(dataV)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// Vue.use(VueAMap);
// Vue.initAMapApiLoader({
//   key:'c45b8bff109f4651e2efe0793ca26521',
//   plugin:[
//     'AMap.Autocomplete',
//     'AMap.PlaceSearch',
//     'AMap.Scale',
//     'AMap.OverView',
//     'AMap.ToolBar',
//     'AMap.MapType',
//     'AMap.PolyEditor',
//     'AMap.CircleEditor',
//     'AMap.Geocoder'
//   ],
//   v:'2.0'
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
