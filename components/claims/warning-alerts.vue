<template>
  <div>

    <div class="alert alert-success" v-if="status == 1">
      <strong>Success!</strong> Claim generated.
    </div>

    <div class="alert alert-danger" v-if="messages.length && status == 0">
      <li v-for="(message, index) in messages" :key="index">
        <strong>Error!</strong> {{message}}
      </li>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    status: {
      required: true,
      type: Number
    },
    messages: {
      required: true,
      type: Array
    }
  }
}
</script>
