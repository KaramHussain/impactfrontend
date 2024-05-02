<template>

</template>

<script>

import axios from 'axios'

export default {

  name:'activate',
  middleware:'guest',
  layout:'no-layout',

  methods: {

    activate() {
      this.$axios.get(`provider/activate?token=${this.$route.query.token}`)
      .then((res) => {
        this.$router.push('/login');
        this.$toast.show('Account activated! you can now log in').goAway(5000);
      })
      .catch((err) => {
        this.$router.push('/login');
      });

      //force redirecting
      this.$router.push('/login');
    }

  },

  created() {
    this.activate();
  }

}
</script>

