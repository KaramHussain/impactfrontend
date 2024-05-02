<template>
  <div class="col-12" v-if="!assigned && isCollector">

    <div class="handle">

      <p class="d-inline-block">Will you handle this claim?</p>
      <fieldset class="radio d-inline-block">
          <label>
            <input type="radio" name="handle_claim" value="yes" v-model="handleClaim">
            Yes
          </label>
      </fieldset>

      <fieldset class="radio d-inline-block">
          <label>
            <input type="radio" name="handle_claim" value="no" v-model="handleClaim">
            No
          </label>
      </fieldset>

      <button class="btn btn-info btn-sm" @click.prevent="$emit('assign', handleClaim)" :disabled="loading || assigned">
        save
        <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
      </button>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    assigned: Boolean
  },

  data() {
    return {
      handleClaim: "yes"
    }
  },

  computed: {
    isCollector() {
      return this.user.roles && this.user.roles.name.toLowerCase() == 'collector'
    }
  }

}
</script>
