<template>

  <table border="2" class="my-1 claim-table">

    <tr class="t-head">
      <td colspan="4" class="text--dark">
        Billing Provider
        <button class="btn btn-primary btn-sm" @click.prevent="save">save</button>
        <button class="btn btn-light btn-sm bg-white" @click.prevent="$emit('cancel')">cancel</button>
      </td>
    </tr>

    <tr>
      <td colspan="4">
        <div>
          
          <div class="form-group">
            <input type="text" placeholder="first name" class="form-control form-control-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER FIRST NAME']">
            <input type="text" placeholder="middle name initial" class="form-control form-control-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER MIDDLE NAME OR INITIAL']">
            <input type="text" placeholder="last name" class="form-control form-control-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER LAST NAME']">
          </div>
          
          <div class="form-group">
            
            <input type="text" placeholder="street address 1" class="form-control form-control-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER ADDRESS LINE']">
            <input type="text" placeholder="Zipcode" class="form-control form-control-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER POSTAL ZONE OR ZIP CODE']">
            
            <select class="form-control form-contorl-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER STATE OR PROVINCE CODE']">
              <option value="null">Please select</option>
              
              <option :value="state.state" v-for="state in states" :key="state.id">
                {{state.state}}
              </option>
              
            </select>

             <select class="form-control form-contorl-sm w-50" v-model="billingProviderCity">
                <option value="null">Please select</option>
                <template v-if="cities.length">
                  <option :value="city.city.toLowerCase()" v-for="(city, index) in cities" :key="index">
                    {{city.city}}
                  </option>
                </template>
              </select>

          </div>

        </div>
      </td>
    </tr>

    <tr>
      <td class="text--dark">NPI:</td>
      <td colspan="3">
        <input type="text" placeholder="npi" class="form-control form-control-sm w-50" v-model="claimBillingProvider['BILLING PROVIDER NATIONAL PROVIDER IDENTIFIER']" />
      </td>
    </tr>

    <tr>
      <td class="text--dark">SSN:</td>
      <td>
        <input type="text" placeholder="ssn" class="form-control form-control-sm w-50">
      </td>

      <td class="text--dark">TAXID:</td>
      <td>
        <input type="text" placeholder="taxid" class="form-control form-control-sm w-50" />
      </td>
    </tr>

    <tr>
      <td class="text--dark">UPIN:</td>
      <td>
        <input type="text" placeholder="upin" class="form-control form-control-sm w-50">
      </td>

      <td class="text--dark">TaxonomyCode:</td>
      <td>
        <input type="text" placeholder="taxonomy code" class="form-control form-control-sm w-50" />
      </td>
    </tr>

    <tr>
      <td class="text--dark">Speciality:</td>
      <td colspan="3">
        <input type="text" placeholder="speciality" class="form-control form-control-sm w-50" />
      </td>
    </tr>

    <tr>
      <td class="text--dark">Provider Signature:</td>
      <td>Y</td>
      <td class="text--dark">Signature Date:</td>
      <td>Some date</td>
    </tr>

  </table>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {
    ...mapGetters({
      billingProvider: 'claims/billingProvider',
      states: 'states',
      cities: 'cities'
    }),
    
    claimBillingProvider() {
      return {...this.billingProvider}
    },

    billingProviderCity: {
      set(value) {
        this.$set(this.claimBillingProvider, 'BILLING PROVIDER CITY NAME', value)
      },
      get() {
        return this.claimBillingProvider['BILLING PROVIDER CITY NAME'].toLowerCase()
      } 
    }

  },

  methods: {

    ...mapActions({
      getStates: 'getStates',
      getCities: 'getCities',
      updateBillingProvider: 'claims/updateBillingProvider'
    }),

    save() {
      this.updateBillingProvider({...this.claimBillingProvider})
      .then(() => {
        this.$emit('cancel')
      })
    }
  },

  beforeMount() {
    this.getStates()
    this.getCities(0);
  }
}
</script>
