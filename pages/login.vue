<template>
  <div class="app-content content m-0 p-0" style="height:100%;">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
      <div class="content-header row"></div>
      <div class="content-body">
        <!-- <button @click.prevent="$router.push({path:'/'})" class="btn btn-primary">Index</button> -->
        <section class="row flexbox-container my-2 mt-4">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
              <div class="card border-grey border-lighten-3 px-1 py-1 m-0">
                <div class="card-header border-0">
                  <div class="card-title text-center">
                    <img
                      src="@/assets/app-assets/images/logo/logo-dark.png"
                      alt="branding logo"
                    />
                  </div>
                  <h6
                    class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"
                  >
                    <span>Easily Using</span>
                  </h6>
                </div>
                <div class="card-content">
                  <div class="text-center">
                    <a
                      href="#"
                      class="btn btn-social-icon mr-1 mb-1 btn-outline-facebook"
                      ><span class="la la-facebook"></span
                    ></a>
                    <a
                      href="#"
                      class="btn btn-social-icon mr-1 mb-1 btn-outline-twitter"
                      ><span class="la la-twitter"></span
                    ></a>
                  </div>
                  <p
                    class="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1"
                  >
                    <span>OR Using Account Details</span>
                  </p>

                  <div class="card-body">
                    <form
                      @submit.prevent="login"
                      class="form-horizontal"
                      action="#"
                      novalidate
                    >
                      <fieldset
                        class="form-group position-relative has-icon-left"
                      >
                        <input
                          v-model="provider.email"
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                        <div class="form-control-position">
                          <i class="la la-user"></i>
                        </div>
                        <span v-if="errors.email" class="text-danger">
                          {{ errors.email[0] }}
                        </span>
                      </fieldset>
                      <fieldset
                        class="form-group position-relative has-icon-left"
                      >
                        <input
                          v-model="provider.password"
                          type="password"
                          class="form-control"
                          id="user-password"
                          placeholder="Enter Password"
                          required
                          autocomplete="false"
                        />
                        <div class="form-control-position">
                          <i class="la la-key"></i>
                        </div>
                        <div v-if="errors.password" class="text-danger">
                          {{ errors.password[0] }}
                        </div>
                        <div
                          class="text-sm"
                          v-if="errors.email || errors.password"
                        >
                          Not received email?
                          <nuxt-link to="/account?action=resendActivationLink"
                            >resend</nuxt-link
                          >
                        </div>
                      </fieldset>
                      <div class="form-group row">
                        <div
                          class="col-sm-6 col-12 text-center text-sm-left pr-0"
                        >
                          <fieldset class="custom-control custom-checkbox">
                            <input
                              v-model="provider.remember"
                              type="checkbox"
                              id="remember-me"
                              class="custom-control-input"
                            />
                            <label
                              for="remember-me"
                              class="custom-control-label"
                            >
                              Remember Me</label
                            >
                          </fieldset>
                        </div>

                        <div
                          class="col-sm-6 col-12 float-sm-left text-center text-sm-right"
                        >
                          <nuxt-link
                            to="/account?action=password-reset"
                            class="card-link"
                          >
                            Forgot Password?
                          </nuxt-link>
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-outline-info btn-block"
                      >
                        <i class="ft-unlock"></i>
                        Login
                        <i
                          v-if="loading"
                          class="fas fa-circle-notch fa-spin"
                        ></i>
                      </button>
                    </form>
                  </div>
                  <p
                    class="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1"
                  >
                    <span>New to Impact Analysis ?</span>
                  </p>
                  <div class="card-body">
                    <a
                      @click.prevent="$router.push({ path: '/register' })"
                      href="#"
                      class="btn btn-outline-danger btn-block"
                      ><i class="la la-user"></i>
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "guest",
  layout: "one-column",
  head() {
    return {
      title: "Login",
      link: [
        { href: "/app-assets/css/pages/login-register.css", rel: "stylesheet" }
      ],
      script: [
        {
          src:
            "/app-assets/vendors/js/forms/validation/jqBootstrapValidation.js",
          body: true,
          async: false,
          defer: true
        },
        {
          src: "/app-assets/vendors/js/forms/icheck/icheck.min.js",
          body: true,
          async: false,
          defer: true
        },
        {
          src: "/app-assets/js/scripts/forms/form-login-register.js",
          body: true,
          async: false,
          defer: true
        }
      ]
    };
  },
  data() {
    return {
      provider: {
        email: null,
        password: null,
        remember: 0
      },
      loading: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      let myToast = this.$toast.show("Authenticating...");
      await this.$auth
        .login({
          data: this.provider
        })
        .then(({ data }) => {
          this.loading = false;
          myToast.text("Logged-in successfully").goAway(5000);
          this.updateUserAbilities();
          if (this.loggedin) {
            if (this.user.roles.name == "collector") {
              this.$router.push("/dashboard");
              return;
            }
            this.$router.push("/");
          }
        })
        .catch(e => {
          this.loading = false;
          myToast
            .text("Something went wrong. Please try again later")
            .goAway(5000);
        });
    },
    updateUserAbilities() {
      let permissions = [];
      if (this.$auth.loggedIn) {
        this.user.permissions.forEach(permission => {
          permissions.push({ actions: permission[0], subject: permission[1] });
        });
      }
      this.$ability.update([...permissions]);
    }
  }
};
</script>
