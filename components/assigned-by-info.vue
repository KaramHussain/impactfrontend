<template>
  <div class="mb-2" v-if="user.created_by">
    Invited by
    <strong>{{user.created_by.name}}</strong>
    <div class="badge badge-primary">
      {{user.created_by_role}}
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
