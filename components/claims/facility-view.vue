<template>

  <table border="2" class="my-2 facility-table claim-table" style="width: 98%;">
    <tr class="t-head">
      <td colspan="2" class="text--dark">
        Facility
        <a href="#" @click.prevent="$emit('edit', 'facility')">
          <i class="fas fa-pen"></i>
        </a>
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
