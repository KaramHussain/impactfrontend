<template>

  <form>

    <div class="form-group row">

      <div class="col mr-sm">
        <label for="fromDate" class="form-label">From <span title="Date of Service">D.O.S</span></label>
        <input type="date" class="form-control form-control-sm" id="fromDate" v-model="from">
      </div>

      <div class="col">
        <label for="toDate" class="form-label">To <span title="Date of Service">D.O.S</span></label>
        <input type="date" class="form-control form-control-sm" id="toDate" v-model="to">
      </div>

    </div>

  </form>

</template>

<script>
export default {
  data() {
    return {
      from: null,
      to: null
    }
  }
}
</script>

<style>

</style>
