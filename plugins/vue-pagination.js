const Paginate = process.client ? require('vuejs-paginate') : undefined
//import Paginate from 'vuejs-paginate'
import Vue from 'vue'
Vue.component('paginate', Paginate)
