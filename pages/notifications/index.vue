<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">
          <div class="content-header row">
              <div class="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                  <h3 class="content-header-title mb-0 d-inline-block">Notifications</h3>

                  <div class="row breadcrumbs-top d-inline-block">
                      <div class="breadcrumb-wrapper col-12">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item">
                                <span v-if="user.roles.name == 'collector'">
                                  <nuxt-link :to="{path:'/dashboard'}">Home</nuxt-link>
                                </span>
                                <span v-else>
                                  <nuxt-link :to="{path:'/'}">Home</nuxt-link>
                                </span>
                              </li>
                              <li class="breadcrumb-item active">
                                Notifications
                              </li>
                          </ol>
                      </div>
                  </div>

              </div>

          </div>

          <div class="content-body">

            <div class="card">

              <div class="card-body" v-if="allNotifications.length">

                <ul class="list-group">

                  <li :class="{'unread':notification.read_at == null }" class="list-group-item my-1" v-for="notification in allNotifications" :key="notification.id">
                    <nuxt-link :to="{path:`/notifications/${notification.id}`}">
                      <h4>{{notification.data.title}}</h4>
                      <p>{{notification.data.body}}</p>
                      <small>
                        <i class="text-muted">
                          {{$moment(notification.created).format('LL')}}
                        </i>
                      </small>
                    </nuxt-link>
                  </li>
                </ul>

              </div>

              <div class="card-body" v-else>
                <p>No new notification!</p>
              </div>

            </div>

          </div>

        </div>

    </div>

  </main>

</template>

<script>

import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'

export default {

  middleware:['auth'],

  head() {
    return {
      title:'All notifications',
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  data() {
    return {
      allNotifications:[]
    }
  },

  methods: {

    async getAllNotifications() {
      await this.$axios.get('provider/notifications/all')
      .then(({data}) => {
        this.allNotifications = data;
      })
    }

  },

  created() {
    this.getAllNotifications();
  }

}

</script>

<style scoped>
  .unread {
    background:#F0F0F0 !important
  }
</style>

