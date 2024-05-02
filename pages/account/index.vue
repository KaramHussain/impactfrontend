<template>

  <main class="app-content content p-0 m-0">

    <div class="content-overlay"></div>

    <div class="content-wrapper">

      <div class="content-body mt-5">

        <div class="row flexbox-container">
          <div class="col-12 d-flex justify-content-center align-items-center">

            <div class="card my-2  col-lg-4 col-md-8 col-10">

              <div class="card-body">

                <h4 class="heading-4 mb-2">Your Email</h4>
                <form class="form" @keydown="removeError($event.target.name)">

                  <div class="form-group">

                    <label for="" class="form-label" :class="{'text-danger':errors.email}">Email</label>

                    <input type="email" name="email" class="form-control" placeholder="please enter your email" :class="{'has-error':errors.email}" v-model="email">

                    <span class="error-message text-danger" v-if="errors.email">
                      {{errors.email[0]}}
                    </span>

                  </div>

                  <div class="form-group">

                    <template v-if="route=='resendActivationLink'">
                      <button @click.prevent="resend" class="btn btn-secondary btn-sm">
                        Resend
                      </button>
                    </template>

                    <template v-if="route == 'password-reset'">
                      <button @click.prevent="sendResetLink" class="btn btn-secondary btn-sm">
                        Send
                      </button>
                    </template>

                    <nuxt-link class="btn btn-primary btn-sm float-right clearfix" :to="{path:'/login'}">Back to login</nuxt-link>

                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>


      </div>

    </div>

  </main>

</template>

<script>

import {mapActions} from 'vuex';

export default {

  layout:'one-column',
  name:'account',
  middleware:'guest',

  data() {
    return  {
      email:null,
    };
  },

  computed: {
    route() {
      return this.$route.query.action;
    }
  },

  methods: {

    ...mapActions('validation', {
      removeError    : 'removeError',
      setErrors      : 'setErrors',
      clearErrors    : 'clearErrors',
    }),

    resend() {

      this.clearErrors();

      this.$axios.get(`provider/resend-activation-link?email=${this.email}`)

      .then((res) => {
        this.$toast.show('Email has been resent to your account').goAway(5000);
      })

    },

    sendResetLink() {

      this.$axios.get(`provider/forgot-password?email=${this.email}`)
      .then((res) => {
        this.$toast.show('Reset link has been sent to your account').goAway(5000)
        this.email = null
      })
    }

  }

}

</script>

