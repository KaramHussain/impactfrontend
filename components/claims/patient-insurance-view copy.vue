<template>

  <div class="card">
     <h4 class="card-header">
      Insurance
      <!-- <a href="#" @click.prevent="$emit('edit', 'patientInsurance')">
        <i class="fas fa-pen"></i>
      </a> -->
    </h4>

    <div class="card-body">

      <table class="w-100 claim-table" border="2">

        <tr>
          <td colspan="2">

            <div>
            <!-- <div v-if="hasPayer"> -->
              <p>{{payer['PAYER LAST NAME']}}</p>
              <p><span class="text--dark">Type:</span> {{payer.insurance_type}}</p>
              <p><span class="text--dark">PayerId:</span> {{payer['PAYER PAYOR IDENTIFICATION']}}</p>
              <p>
                <span class="text--dark">Address line:</span> 
                {{payer['PAYER ADDRESS LINE']}}, 
                {{payer['PAYER CITY NAME']}},
                {{payer['PAYER STATE OR PROVINCE CODE']}},
                {{payer['PAYER POSTAL ZONE OR ZIP CODE']}}
              </p>

            </div>

          </td>
        </tr>

        <tr>
          <td class="text--dark">Relation:</td>
          <td>
            <span v-if="hasPayer">
              {{payer.person}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Member:</td>
          <td>45678</td>
        </tr>

      </table>

    </div>


  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {

  data(){
    return{
      insuranceDetails : {},
    }
  },

  mounted(){
    this.insuranceDetails = JSON.parse(localStorage.getItem('insuranceDetails'))
    console.log("insuranceDetails",this.insuranceDetails)
  },

  computed: {

    ...mapGetters('claims', {
      payer: 'payer',
      hasPayer: 'hasPayer',
      claim: 'claim'
    })

  }

}
</script>
