<template>

  <div>

    <table border="2" class="claim-table">
      <tr class="t-head">
        <td colspan="4" class="text--dark">
          Billing Provider
          <a href="#" @click.prevent="$emit('edit', 'billingProvider')">
            <i class="fas fa-pen"></i>
          </a>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <div>
            <!-- <p>
              Full name: <br>
              {{billingProvider['BILLING PROVIDER FIRST NAME']}}
              {{billingProvider['BILLING PROVIDER MIDDLE NAME OR INITIAL']}},
              {{billingProvider['BILLING PROVIDER LAST NAME']}}

            </p> -->
            <p>
              Full name: <br>
              {{billingProviderDetails?.Billing_provider_name}}

            </p>
            <!-- <p>
              Address: <br>
              {{billingProvider['BILLING PROVIDER ADDRESS LINE']}},
              {{ucFirst(billingProvider['BILLING PROVIDER CITY NAME'])}},
              {{billingProvider['BILLING PROVIDER STATE OR PROVINCE CODE']}},
              {{billingProvider['BILLING PROVIDER POSTAL ZONE OR ZIP CODE']}}
            </p> -->
            <p>
              Address: <br>
              {{billingProviderDetails?.Billing_Address}}
            </p>
          </div>
        </td>
      </tr>

      <tr>
        <td class="text--dark">NPI:</td>
        <!-- <td colspan="3">{{billingProvider['BILLING PROVIDER NATIONAL PROVIDER IDENTIFIER']}}</td> -->
        <td colspan="3">{{billingProviderDetails?.Billing_NPI}}</td>
      </tr>

      <tr>
        <td class="text--dark">SSN:</td>
        <td></td>

        <td class="text--dark">TAXID:</td>
        <td></td>
      </tr>

      <tr>
        <td class="text--dark">UPIN:</td>
        <td></td>

        <td class="text--dark">TaxonomyCode:</td>
        <td></td>
      </tr>

      <tr>
        <td class="text--dark">Speciality:</td>
        <td colspan="3">
          
        </td>
      </tr>

      <tr>
        <td class="text--dark">Provider Signature:</td>
        <td>Y</td>
        <td class="text--dark">Signature Date:</td>
        <td>{{AppDate(date)}}</td>
      </tr>

    </table>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {

  data(){
    return{
      date: undefined,
      billingProviderDetails : null,
    }
  },

  mounted(){
    let billingProviderDetailsObject = localStorage.getItem('billingProviderDetails')
    if(billingProviderDetailsObject != undefined){
      this.billingProviderDetails = JSON.parse(billingProviderDetailsObject)
      console.log("billing provider details", this.billingProviderDetails)
    }else{
      console.log("billing provider is undefined", billingProviderDetailsObject)
    }
  },


  computed: {
    ...mapGetters('claims', {
      billingProvider: 'billingProvider'
    })
  }
}
</script>

