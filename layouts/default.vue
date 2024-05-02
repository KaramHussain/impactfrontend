<template>
  <html lang="en" data-textdirection="ltr">
    <body
      class="vertical-layout vertical-menu 2-columns fixed-navbar"
      data-open="click"
      data-menu="vertical-menu"
      data-col="2-columns"
    >
      <nuxt />
    </body>
  </html>
</template>

<script>
import { mapActions } from "vuex";

export default {
  head() {
    return {
      titleTemplate: "%s - Impact Analysis",
      meta: [
        { charset: "utf-8" },
        {
          hid: "description",
          name: "description",
          content: "Carepays for Providers -  Impact Analysis"
        }
      ]
    };
  },

  methods: {
    ...mapActions({
      fillNotifications: "fillNotifications"
    }),

    fetchNotifications() {
      this.$axios
        .$get("provider/notifications", {
          headers: { __show_no_progress__: true }
        })
        .then(res => {
          this.fillNotifications(res);
        });
    }
  },

  created() {
    // if(this.$auth.loggedIn === true) {
    //   this.fetchNotifications()
    //   setInterval(function () {
    //     this.fetchNotifications()
    //   }.bind(this), 20000)
    // }
  }
};
</script>

<style>
.pace,
.pace-inactive {
  display: none;
}
</style>
