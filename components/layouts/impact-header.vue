<template>

  <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark bg-white navbar-shadow" id="header-navbar">

    <div class="navbar-wrapper">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mobile-menu d-md-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ft-menu font-large-1"></i></a></li>
                <li class="nav-item">
                  <nuxt-link class="navbar-brand" :to="{path:'/'}">
                  <img class="brand-logo" alt="modern admin logo" src="@/assets/app-assets/images/logo/logo.png">
                    <h3 class="brand-text">Impact Analysis</h3>
                  </nuxt-link>
                </li>
                <li class="nav-item d-md-none"><a class="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i class="la la-ellipsis-v"></i></a></li>
            </ul>
        </div>
        <div class="navbar-container content">
            <div class="collapse navbar-collapse" id="navbar-mobile">
                <ul class="nav navbar-nav mr-auto float-left">
                    <li class="nav-item d-none d-md-block">
                      <a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                        <i class="ft-menu"></i>
                      </a>
                    </li>
                </ul>
                <ul class="nav navbar-nav float-right">

                    <li class="dropdown dropdown-notification nav-item">
                      <a class="nav-link nav-link-label" href="#" data-toggle="dropdown">
                        <i class="ficon ft-bell"></i>
                        <span class="badge badge-pill badge-danger badge-up badge-glow">
                          {{notifications.length}}
                          <!-- {{notifications.length}} notification.length -->
                        </span>
                      </a>

                      <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                          <li class="dropdown-menu-header">
                              <h6 class="dropdown-header m-0">
                                <span class="grey darken-2">Notifications</span>
                              </h6>
                              <span class="notification-tag badge badge-danger float-right m-0">
                                {{notifications.length}} New 
                                <!-- {{notifications.length}} New notification.length New -->
                              </span>
                          </li>

                          <!-- <li class="scrollable-container media-list w-100">

                            <template v-if="notifications.length">

                              <a @click.prevent="$router.push(`/notifications/${notification.id}`)" href="javascript:void(0)" v-for="notification in notifications" :key="notification.id">

                                <div class="media">
                                    <div class="media-left align-self-center">
                                      <i class="ft-plus-square icon-bg-circle bg-cyan mr-0"></i>
                                    </div>
                                    <div class="media-body">
                                        <h6 class="media-heading">
                                          <span v-if="notification.data">
                                            {{notification.data.title}}
                                          </span>
                                        </h6>
                                        <p v-if="notification.data" class="notification-text font-small-3 text-muted">
                                          {{notification.data.body}}
                                        </p>
                                        <small>
                                          <time class="media-meta text-muted">
                                            {{$moment(notification.created_at).fromNow()}}
                                          </time>
                                        </small>
                                    </div>
                                </div>

                              </a>

                            </template>

                          </li> -->

                          <li class="dropdown-menu-footer">
                            <a @click.prevent="$router.push(`/notifications`)" href="javascript:void(0)" class="dropdown-item text-muted text-center">
                              Read all notifications
                            </a>
                          </li>
                      </ul>

                    </li>

                    <li class="dropdown dropdown-notification nav-item">
                      <a class="nav-link nav-link-label" href="#" data-toggle="dropdown">
                        <i class="ficon ft-mail"></i></a>
                        <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                            <li class="dropdown-menu-header">
                                <h6 class="dropdown-header m-0"><span class="grey darken-2">Messages</span></h6><span class="notification-tag badge badge-warning float-right m-0">4 New</span>
                            </li>
                            <li class="scrollable-container media-list w-100"><a href="javascript:void(0)">
                                    <div class="media">
                                        <div class="media-left"><span class="avatar avatar-sm avatar-online rounded-circle"><img src="" alt="avatar"><i></i></span></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">Margaret Govan</h6>
                                            <p class="notification-text font-small-3 text-muted">I like your portfolio, let's start.</p><small>
                                                <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Today</time></small>
                                        </div>
                                    </div>
                                </a><a href="javascript:void(0)">
                                    <div class="media">
                                        <div class="media-left"><span class="avatar avatar-sm avatar-busy rounded-circle"><img src="" alt="avatar"><i></i></span></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">Bret Lezama</h6>
                                            <p class="notification-text font-small-3 text-muted">I have seen your work, there is</p><small>
                                                <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Tuesday</time></small>
                                        </div>
                                    </div>
                                </a><a href="javascript:void(0)">
                                    <div class="media">
                                        <div class="media-left"><span class="avatar avatar-sm avatar-online rounded-circle"><img src="" alt="avatar"><i></i></span></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">Carie Berra</h6>
                                            <p class="notification-text font-small-3 text-muted">Can we have call in this week ?</p><small>
                                                <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Friday</time></small>
                                        </div>
                                    </div>
                                </a><a href="javascript:void(0)">
                                    <div class="media">
                                        <div class="media-left"><span class="avatar avatar-sm avatar-away rounded-circle"><img src="" alt="avatar"><i></i></span></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">Eric Alsobrook</h6>
                                            <p class="notification-text font-small-3 text-muted">We have project party this saturday.</p><small>
                                                <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">last month</time></small>
                                        </div>
                                    </div>
                                </a></li>
                            <li class="dropdown-menu-footer"><a class="dropdown-item text-muted text-center" href="javascript:void(0)">Read all messages</a></li>
                        </ul>
                    </li>

                    <li class="dropdown dropdown-user nav-item">

                      <a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                        <span class="mr-1 user-name text-bold-700"></span>
                        <!-- <span class="mr-1 user-name text-bold-700">{{user.name}}</span> -->
                        <span class="avatar avatar-online">
                          <!-- <img src="..\..\static\app-assets\images\carousel\16.jpg" alt="avatar"><i></i> -->
                          <img :src="user.image" alt="avatar"><i></i>
                        </span>
                      </a>

                      <div class="dropdown-menu dropdown-menu-right">
                        <nuxt-link :to="{path:'/profile/edit'}" class="dropdown-item" href="#">
                          <i class="ft-user"></i> Profile
                        </nuxt-link>
                          <a class="dropdown-item" href="#" @click.prevent="logout"><i class="ft-power"></i> Logout</a>
                      </div>

                    </li>

                </ul>
            </div>
        </div>
    </div>

  </nav>

</template>

<script>
import {mapGetters} from 'vuex'
export default {

  computed: {
    ...mapGetters({
      notifications : 'notifications'
    })
  },

  methods: {

    logout() {
      this.$auth.logout()
      .then(res => {
        this.$toast.show('You are Logged out successfully!').goAway(5000)
        this.$router.push({path:'/login'})
      });
    }

  }

}
</script>
