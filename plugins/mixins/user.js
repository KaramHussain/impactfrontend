import Vue from 'vue'
import {mapGetters} from 'vuex'

const user = {

  install(Vue, options) {

    Vue.mixin({
      computed: {
        ...mapGetters('profile', {
          user : 'user',
          loggedin : 'loggedIn'
        })
      }
    })

  }

}

Vue.use(user)
