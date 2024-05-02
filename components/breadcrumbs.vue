<template>
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
                {{path}}
              </li>
          </ol>
      </div>
  </div>
</template>

<script>
export default {
    props: {
      path: {
        type: String,
        default: 'Members'
      }
    }
}
</script>

