import Vue from 'vue'
import {mapGetters} from 'vuex'

const validationErrors = {

  install(Vue, options) {
    Vue.mixin({

      computed: {
        ...mapGetters('validation', {
          errors : 'errors'
        })
      }

    })
  }

}

Vue.use(validationErrors);
