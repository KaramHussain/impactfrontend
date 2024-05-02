import Vue from 'vue'
import {mapGetters} from 'vuex'

const user = {

  install(Vue, options) {

    Vue.mixin({

      computed: {
        ...mapGetters({
          ediUrl: 'ediUrl'
        })
      },

      methods: {
        
        AppDate(date, format = 'LL') {
            // console.log("app date",date, this.$moment(date).format(format))
            return this.$moment(date).format(format)
        },

        ucFirst(name) {
          if(name) {
            name = name.toString()
            return name.charAt(0) + name.slice(1).toLowerCase().trim()
          }
          return ''
        },

        formattedDesc(desc, len=80) {
          return desc.length > len ? desc.substring(0, len) + '...' : desc;
        }
  
      }

    })

  }

}

Vue.use(user)