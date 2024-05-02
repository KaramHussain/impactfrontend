<template>
  <div>

    <select class="form-control form-control-sm d-inline" style="width:65%" v-model="type">
      <option value="0">Please choose</option>
      <option value="avoidable">Avoidable</option>
      <option value="compliance">Compliance</option>
      <option value="low_fruits">Low fruits</option>
    </select>

    <button style="width:34%" @click.prevent="$router.push({ name:'claims-remark-codes', query: { type } })" class="btn btn-primary btn-sm d-inline">
      view performance
    </button>

    
    <div class="clearfix"></div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      type: 0
    }
  }

}
</script>
