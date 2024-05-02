<template>

  <table class="table my-1 claim-table">

    <thead>
      <tr>
        <td>Item</td>
        <td>Icd</td>
        <td>
          Description
          <a href="#" @click.prevent="$emit('edit', 'patientIcdCodes')">
            <i class="fas fa-pen"></i>
          </a>
        </td>

      </tr>
    </thead>

    <!-- <tbody v-if="icds.length">
      <tr v-for="(icd, index) in icds" :key="index">
        <td>{{index + 1}}</td>
        <td>{{icd}}</td>
        <td></td>
      </tr>
    </tbody> -->

    <!-- <tbody v-if="icdClaimDetails.length > 0">
      <tr v-for="(icd, index) in icdClaimDetails" :key="index">
        <td>{{index + 1}}</td>
        <td>{{icd}}</td>
        <td></td>
      </tr>
    </tbody> -->

    <!-- <tbody v-if="icdClaimDetails.length > 0">
  <tr v-for="(icd, index) in icdClaimDetails" :key="index">
    <td>{{index + 1}}</td>
    <td>
      <table>
        <tr v-for="(value, key) in icd" :key="key" v-if="key.startsWith('dx')">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </table>
    </td>
  </tr>
</tbody> -->

<tbody v-if="icdClaimDetails.length > 0">
  <tr v-for="(icd, index) in icdClaimDetails" :key="index">
    <td>{{index + 1}}</td>
    <td>
      <table>
        <tr v-for="i in 1" :key="i">
          <!-- <td>{{ `dx${i}` }}</td> -->
          <td>{{ icd[`dx${i}`] || '' }}</td>
        </tr>
      </table>
    </td>
  </tr>
</tbody>
<!-- <tbody v-else>
  <tr>
    <td></td>
    <td>
      <table>
        <tr>
          <td></td>
        </tr>
      </table>
    </td>
  </tr>
</tbody> -->

  </table>

</template>

<script>
import {mapGetters} from 'vuex'
export default {

  data(){
    return{
      icdClaimDetails: []
    }
  },
  mounted(){
    let claimDetails= JSON.parse(localStorage.getItem('claimsDetails'))
    if(claimDetails != undefined){
      this.icdClaimDetails = claimDetails.icd_code
    console.log('claimdetails :::', this.icdClaimDetails)
    }
  },
  computed: {

    ...mapGetters('claims', {
      icds: 'icds'
    })

  }

}
</script>

