<template>

  <main class="app-content content p-0 m-0">

    <div class="content-overlay"></div>

    <div class="content-wrapper">

      <div class="content-body">

        <div class="row flexbox-container">
          <div class="col-12 d-flex justify-content-center align-items-center">

            <div class="my-2 col-lg-4 col-md-8 col-10">

              <div class="card">
                <div class="card-body">
                  <h4>Reset password</h4>

                  <form class="form mt-sm">

                    <div class="form-group">
                      <label for="" class="form-label">New password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="Enter new password">
                    </div>

                    <div class="form-group">
                      <label for="" class="form-label">Confirm password</label>
                      <input type="password" class="form-control" v-model="confirm_password" placeholder="Enter new password again">
                    </div>

                    <div class="form-group mt-xs">
                      <button class="btn btn-secondary btn-sm" @click.prevent="sendResetRequest">Reset</button>
                    </div>

                  </form>

                </div>
              </div>

            </div><!--register-->

          </div>
        </div>

      </div>

    </div>

  </main>

</template>

<script>

import axios from 'axios'

export default {

  name:'account-reset',
  middleware:'guest',

  data() {
    return {
      password:null,
      confirm_password:null
    }
  },

  methods: {

    sendResetRequest() {

      this.$axios.get(`provider/reset-password`, {
        params: {
          password:this.password,
          confirm_password:this.confirm_password,
          email:this.$route.query.email,
          token:this.$route.query.token
        }
      })
      .then((res) => {
        this.password = null;
        this.confirm_password = null;
        this.$toast.show('Password reset! you can now log in').goAway(5000);
        this.$router.push({name:'login'});
      })
      .catch((error) => {
         this.$toast.show("something went wrong")
      });
    },
    //reset request

    //check if token exists
    tokenExists() {

      let token = this.$route.query.token ? this.$route.query.token.trim() : null;
      let email = this.$route.query.email ? this.$route.query.email.trim() : null;

      if(token !== null || token !== '') {

        this.$axios.get(`provider/check-if-reset-token-exists?token=${token}&email=${email}`)
        .then(({data}) => {
          if(data === 401) {
            this.$router.push({name:'login'});
            this.$toast.show("Page not found").goAway("5000");
          }
        })
        .catch((err) => {
          this.$toast.show("Something went wrong").goAway("5000");
          this.$router.push({name:'login'});
        });

      }

    }
  },//methods

  created() {
    this.tokenExists();
  }

}
</script>

