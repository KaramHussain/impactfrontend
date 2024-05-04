
export default {
  mode: 'universal',
  // auth: false,
  /*
  ** Headers of the page
  */
  head: {

    title: process.env.npm_package_name || '',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],

    link: [

      { rel: "apple-touch-icon", href: "/app-assets/images/ico/apple-icon-120.png" },
      { rel: "shortcut icon", type: "image/x-icon", href: "/app-assets/images/ico/favicon.ico" },
      { href: "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700", rel: "stylesheet" },

      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' },

    ],

    script: [
      {
        hid: 'vendors',
        src: "/app-assets/vendors/js/vendors.min.js",
        body: true,
        defer: true,
        async: false
      },
      {
        hid: 'app',
        src: "/app-assets/js/core/app.js",
        body: true,
        defer: true,
        async: false
      },
      {
        hid: 'app-menu',
        src: "/app-assets/js/core/app-menu.js",
        body: true,
        defer: true,
        async: false
      },
      {
        hid: "popper",
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
        body: true,
        defer: true,
        async: true
      },
      {
        hid: "bootstrap-cdn",
        src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
        body: true,
        defer: true,
        async: false
      },
      {
        // src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjmzNlPIeeD5qk9ZxXz4ihXx5b1Wh9esk&libraries=places',
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBKKGOquRJaJKpo5XuSrlCD-cPtJgXXd24&libraries=places',
        defer: true
      }

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fc8049' },
  /*
  ** Global CSS
  */
  css: [
    "~/assets/app-assets/vendors/css/vendors.min.css", //jquery
    "~/assets/app-assets/css/bootstrap.css",
    "~/assets/app-assets/css/bootstrap-extended.css",
    "~/assets/app-assets/css/colors.css",
    "~/assets/app-assets/css/components.css",
    "~/assets/app-assets/css/core/menu/menu-types/vertical-menu.css",
    "~/assets/app-assets/css/core/colors/palette-gradient.css",
    "~/assets/app-assets/css/pages/hospital.css",

    "~/assets/app-assets/vendors/css/forms/icheck/icheck_copy.css",
    "~/assets/app-assets/vendors/css/forms/icheck/custom.css",

    //custom style
    "~/assets/assets/scss/style.scss",
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/moment.js',
    '~/plugins/mixins/user.js',
    '~/plugins/vue-script2.js',
    '~/plugins/vue-loadash.js',
    '~/plugins/mixins/utils.js',
    '~/plugins/vue-pagination.js',
    '~/plugins/mixins/validationErrors.js',
    '~/plugins/mixins/priceFormatter.js',
    '~/plugins/mixins/filteredData.js',
    //muskaan start
    '~/plugins/axiosPlugin.js',
  ],

  /*
  ** Router middleware
  */
  router: {
    middleware: ['clearValidationErrors'],
    },

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  /*
  ** Axios module
  */

  axios: {
    // baseURL: 'https://apis.carepays.com/public/api/'
    baseURL: 'https://backend.carebidsexchange.com/api/'
    // baseURL: 'https://apis.carebidsexchange.com/api/'
    // baseURL: 'http://192.168.1.5:8000/api/'
  },

  backend: {
    // baseURL : 'https://localhost/'
  },

  /*
  ** Auth module
  */

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'provider/login', method: 'post', propertyName: 'data.token'
          },

          user: {
            url: 'provider/me', method: 'get', propertyName: 'data'
          },

          logout: {
            url: 'provider/logout', method: 'post'
          }

        },

      }

    },

    plugins: [
      '~/plugins/roles.js'
    ],

    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },

    rewriteRedirects: true,
    fullPathRedirect: true

  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],

  /*
  ** Toast Config
  */

  toast: {
    position: 'bottom-right',
    iconPack: 'fontawesome',
    register: [ // Register custom toasts
      {
        name: 'my_error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },

    // vendor:['jquery'],
    // plugins:[
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery'
    //   })
    // ],
    // plugins: ['~plugins/jquery.js']

  }

}
