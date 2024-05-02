<template>
  <div>
    <div class="form-group w-50 float-right">
      <label for="date" class="form-label">Search</label>
      <input v-bind="$attrs" type="search" class="form-control form-control-sm" @input="$emit('input', $event.target.value)">
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
