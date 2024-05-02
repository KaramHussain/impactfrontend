import Vue from 'vue'

import { Can, abilitiesPlugin } from '@casl/vue'
import { AbilityBuilder } from '@casl/ability'

Vue.component('can', Can)

export default (app) => {
  var abilities = AbilityBuilder.define((can) => {
    if(app.$auth.loggedIn) {
      app.$auth.user.permissions.forEach((permission) => {
        if(permission) {
          can(...permission)
        }
      })
    }
  })

  Vue.use(abilitiesPlugin, abilities);
}

