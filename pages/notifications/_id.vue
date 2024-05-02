<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">
          <div class="content-header row">
              <div class="content-header-left col-md-6 col-12 mb-2">
                  <nuxt-link class="btn btn-primary" :to="{path:'/notifications'}">
                    All notifications
                  </nuxt-link>
                  <h4 class="mt-2">Notification</h4>
              </div>
          </div>

          <div class="content-body">
            <div class="card">

              <div class="card-body" v-if="notification">

                <template v-if="notification.data">
                  <h4>{{notification.data.title}}</h4>
                  <p>{{notification.data.body}}
                    <small>
                      <i class="text-muted">
                        ({{$moment(notification.created).format('MMMM DD, YYYY HH:mm a')}})
                      </i>
                    </small>
                  </p>


                  <div class="" v-if="notification.data.details">
                    <hr>
                    <h4>Details</h4>
                    <p>Name: {{notification.data.details.name}}</p>
                    <p>Email: {{notification.data.details.email}}</p>
                    <p v-if="notification.data.details.roles">
                      Role : {{notification.data.details.roles[0].name}}
                    </p>
                  </div>
                  <hr>
                  <small>
                    <i class="text-muted">
                      {{$moment(notification.created).format('LL')}}
                    </i>
                  </small>
                </template>

              </div>

            </div>
          </div>

        </div>

    </div>

    <impactFooter />

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
      title:'Notification'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar
  },

  data() {
    return {
      notification:{}
    }
  },

  methods: {

    async getNotificationById() {
      if(!this.$route.params.id) {
        return this.$router.push('/notifications')
      }

      await this.$axios.get(`provider/notification-by-id?id=${this.$route.params.id}`)
      .then(({data}) => {
        this.notification = data;
      })
      .catch(e => {
        return this.$router.push('/notifications')
      });
    }

  },

  created() {
    this.getNotificationById();
  }

}

</script>

