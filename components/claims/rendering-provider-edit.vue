<template>

  <div>

    <table border="2" class="claim-table">

      <tr class="t-head">
        <td colspan="4" class="text--dark">Rendering Provider
          <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">
            save
          </button>
          <button class="btn btn-light btn-sm bg-white" @click.prevent="$emit('cancel')">
            cancel
          </button>
        </td>
      </tr>
      <tr>
        <td colspan="4" style="height: 125px">
          <p>Full Name and credentials</p>
          <p>Full Address</p>
        </td>
      </tr>

      <tr>
        <td class="text--dark">NPI:</td>
        <td colspan="3">npi number</td>
      </tr>

      <tr>
        <td class="text--dark">SSN:</td>
        <td></td>

        <td class="text--dark">TAXID:</td>
        <td>some tax id</td>
      </tr>

      <tr>
        <td class="text--dark">UPIN:</td>
        <td>A64817</td>

        <td class="text--dark">TaxonomyCode:</td>
        <td>20810000X</td>
      </tr>

      <tr>
        <td class="text--dark">Speciality:</td>
        <td colspan="3">25</td>
      </tr>

      <tr>
        <td class="text--dark">Provider Signature:</td>
        <td>Y</td>
        <td class="text--dark">Signature Date:</td>
        <td>Some date</td>
      </tr>

    </table>

  </div>

</template>

<script>
export default {

  methods: {
    save() {}
  }

}
</script>
