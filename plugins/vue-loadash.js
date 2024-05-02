import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import orderBy from 'lodash/orderBy'

// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: {lodash, orderBy} })
