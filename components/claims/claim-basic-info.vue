<template>

  <div class="claim">
    <table class="table claim-table">
      <tr>
        <td>
          <!-- <span class="text--dark" v-if="claimInfo">Claim Date: {{AppDate(claimInfo['837 Date'])}}</span>    -->
          <span class="text--dark" v-if="claimDate">Claim Date: {{AppDate(claimDate)}}</span>   
        </td>
        <td class="text--dark">Transaction Type: <span>{{transactionType}}</span></td>
        <td class="text--dark">{{insurancePlanName}}</td>
        <td class="text--dark">Group Health Plan</td>
        <td :class="claimStatusClass">{{claimStatus}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    claimStatus: String
  },

  data(){
    return{
      claimDate : null,
      insurancePlanName: null,
      transactionType : null,
    }
  },

  mounted(){
    let ediClaimDetails = localStorage.getItem('claimsDetails')
    let insurancePlanDetails = localStorage.getItem('insuranceDetails')
    // transactionType
    console.log("before if",ediClaimDetails)
    if (ediClaimDetails != undefined){
      console.log("in")
      console.log(JSON.parse(ediClaimDetails))

      // this.claim = JSON.parse(localStorage.getItem('claimsDetails'))
      this.claimDate = JSON.parse(ediClaimDetails)?.Claim_Date
      this.transactionType = JSON.parse(ediClaimDetails)?.transactionType
      this.insurancePlanName = JSON.parse(insurancePlanDetails).Insurance_plan
      console.log("::::::::::::::::: ***************",this.claimDate, this.insurancePlanName, this.transactionType)
    }else{
      console.log("else",{ediClaimDetails})
    }
  },

  computed: {

    ...mapGetters('claims', {
      claimInfo: 'claimInfo'
    }),

    claimStatusClass() {
      if(this.claimStatus == 'accepted') {
        return 'status-field status-field--sent'
      }
      else if(this.claimStatus == 'processing') {
        return 'status-field status-field--processing'
      }
      return 'status-field status-field--hold'
    }

  }

}

</script>

<style lang="scss" scoped>
  .status-field {
    text-align:center;
    color:#fff;
    text-transform: uppercase;
    font-weight:bold;
    border:0;
    outline:0;
    &--sent {
      background:green;
    }
    &--hold {
      background:red;
    }
    &--processing {
      background:rgb(73, 28, 28);
    }
  }
</style>
