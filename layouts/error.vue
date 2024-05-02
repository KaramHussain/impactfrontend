<template>
  <div class="error-page">
    <template v-if="error.statusCode === 404">
      <div>
        <h1 class="heading-1 text--dark">{{ error.statusCode }}</h1>
        <p>
          Sorry, the page you are looking for cannot be found.
        </p>
        <nuxt-link :to="{ name: 'index' }" class="my-sm btn btn--default">
          Go Home
        </nuxt-link>
        <button
          @click="goBack()"
          type="button"
          class="my-sm btn btn--secondary"
        >
          Go Back
        </button>
      </div>
    </template>
    <template v-else-if="error.statusCode === 500">
      <h1 class="heading-1 text--dark">{{ error.statusCode }} Server error</h1>

      <div class="mb-sm">
        <nuxt-link :to="{ name: 'index' }" class="my-xs btn btn--default">
          Go Home
        </nuxt-link>
      </div>
    </template>

    <template v-else-if="error.statusCode === 401">
      <h1 class="heading-1 text--dark">
        {{ error.statusCode }} UnAuthenticated
      </h1>

      <div class="mb-sm">
        <nuxt-link :to="{ name: 'index' }" class="my-xs btn btn--default">
          Go Home
        </nuxt-link>
      </div>
    </template>

    <template v-else-if="error.statusCode === 403">
      <h1 class="heading-1 text--dark">{{ error.statusCode }} UnAuthorized</h1>

      <div class="mb-sm">
        <nuxt-link :to="{ name: 'index' }" class="my-xs btn btn--default">
          Go Home
        </nuxt-link>
      </div>
    </template>

    <template v-else>
      <h1 class="heading-1 text--dark">
        {{ error.statusCode }} Something went wrong
      </h1>

      <div class="mb-sm">
        <nuxt-link :to="{ name: 'index' }" class="my-xs btn btn--default">
          Go Home
        </nuxt-link>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["error"],
  methods: {
    goBack() {
      this.$router.push(history.go(-1));
    }
  }
};
</script>
