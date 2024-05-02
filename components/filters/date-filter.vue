<template>

  <form>

    <div class="form-group row">

      <div class="col mr-sm">
        <label for="fromDate" class="form-label">From D.O.S</label>
        <input type="date" class="form-control form-control-sm" id="fromDate" :value="from" @change="$emit('update:from', $event.target.value)">
      </div>

      <div class="col">
        <label for="toDate" class="form-label">To D.O.S</label>
        <input type="date" class="form-control form-control-sm" id="toDate" :value="to" @change="$emit('update:to', $event.target.value)">
      </div>

    </div>

  </form>

</template>

<script>
export default {
  
  props: [
    'from',
    'to'
  ]

}
</script>

