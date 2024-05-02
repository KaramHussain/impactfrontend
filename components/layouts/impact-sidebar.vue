<template>

  <main>
    <div class="main-menu menu-fixed menu-dark menu-accordion    menu-shadow " data-scroll-to-active="true">

      <div class="main-menu-content">
          <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

              <li :class="{active:$route.path === '/'}">
                <a href="javascript:void(0)" @click.prevent="redirectMember">
                  <i class="la la-home"></i>
                  <span class="menu-title" data-i18n="Dashboard">Dashboard
                  </span>
                </a>
              </li>

              <can I="view" a="claim">
                <li :class="{active:$route.path === `/file-tracker`, params: { id: this.$auth.user.id }}">
                  <nuxt-link :to="{path:'/file-tracker'}">
                    <i class="la la-folder-open"></i>
                    <span class="menu-title" data-i18n="Dashboard">File Tracker
                    </span>
                  </nuxt-link>
                </li>
              </can>

              <li :class="{active:$route.path == '/members'}" class="nav-item" @click.prevent="$router.push({path:'/members'})" v-if="isAllowedToAddMember() && isAllowedToViewMembers()">
                <a href="#" >
                  <i class="la la-user"></i>
                  <span class="menu-title" data-i18n="Appointment">Members</span>
                </a>
                <ul class="menu-content">

                    <li v-if="isAllowedToViewMembers()">
                      <nuxt-link :to="{path:'/members'}" class="menu-item" href="#">
                        <i></i>
                        <span>All</span>
                      </nuxt-link>
                    </li>

                    <template v-if="isAllowedToAddMember()">
                      <li>
                        <nuxt-link :to="{path:'/members/new'}" class="menu-item" href="#">
                          <i></i>
                          <span>Add new</span>
                        </nuxt-link>
                      </li>
                    </template>
                  </ul>
              </li>
              <!-- @click.prevent="$router.push({path:'/claims'})" -->
              <can I="view" a="claim">
                
                <li :class="{active:$route.path == '/claims'}" class="nav-item">
                
                  <nuxt-link class="menu-item" :to="{path:'/claims'}">
                  <i class="la la-calendar"></i>
                    Claims
                  </nuxt-link>    
                        
                </li>
                
              </can>

              <can I="add" a="claim">
                <li class="nav-item" :class="{active:$route.path == '/upload'}">
                  <nuxt-link :to="{path:'/upload'}">
                    <i class="la la-upload"></i>
                    <span class="menu-title" data-i18n="profile">Upload claim</span>
                  </nuxt-link>
                </li>
              </can>

              <li class="nav-item" :class="{active:$route.path == '/profile/edit'}">
                <nuxt-link :to="{path:'/profile/edit'}">
                  <i class="la la-unlock"></i>
                  <span class="menu-title" data-i18n="profile">Profile</span>
                </nuxt-link>
              </li>

              <li class="nav-item" :class="{active:$route.path == '/details'}">
                <nuxt-link :to="{path:'/details'}">
                  <i class="la la-file"></i>
                  <span class="menu-title" data-i18n="roi">ROI</span>
                </nuxt-link>
              </li>

          </ul>
      </div>

    </div>

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>
  </main>


</template>

<script>
export default {
  // mounted(){
  //   console.log(this.$auth.user.id)
  // },

  methods: {

    redirectMember() {
      if(this.user.roles.name == 'collector') {
        this.$router.push({path:'/dashboard'})
        return
      }
      this.$router.push({path:'/'})
    },

    isAllowedToAddMember() {
      let permissions = this.user.formattedPermissions.map(permission => {
        return permission.name
      })

      if(permissions.includes('add-collector') || permissions.includes('add-manager')) {
        return true
      }
      return false
    },

    isAllowedToViewMembers() {
      let permissions = this.user.formattedPermissions.map(permission => {
        return permission.name
      })

      if(permissions.includes('view-collector') || permissions.includes('view-manager')) {
        return true
      }
      return false
    }

  }

}
</script>

