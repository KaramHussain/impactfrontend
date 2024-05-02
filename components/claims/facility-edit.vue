<template>

  <table border="2" class="my-xs facility-table claim-table" style="width: 98%">
    <tr class="t-head w-100">
      <td colspan="2" class="text--dark">
        Facility
        <template>
          <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">save</button>
          <button class="btn btn--default btn--xs no-shadow" @click.prevent="$emit('cancel')">cancel</button>
        </template>
      </td>
    </tr>
    <tr>
      <td colspan="4">
        <p>Full Name, credentials, PMR</p>
        <p>Address</p>
      </td>
    </tr>
    <tr>
      <td class="text--dark">NPI:</td>
      <td>Some npi number</td>
    </tr>
  </table>

</template>

<script>
export default {

}
</script>

