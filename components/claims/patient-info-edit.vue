<template>

  <div class="card">

     <h4 class="card-header">
      Patient
      <template>
        <button class="btn btn-primary btn-sm" @click.prevent="save">save</button>
        <button class="btn btn-light btn-sm bg-white" @click.prevent="$emit('cancel')">cancel</button>
      </template>
    </h4>

    <div class="card-body">
      <table border=2 class="w-100 claim-table" v-if="claimPatient">

        <tr>
          <td rowspan="4" colspan="2" class="form-group">
            <template v-if="hasPatient">
              <input type="text" class="form-control form-control-sm mb-1" v-model="claimPatient['INSURED OR SUBSCRIBER FIRST NAME']" placeholder="Patient first name">
              <input type="text" class="form-control form-control-sm mb-1" v-model="claimPatient['INSURED OR SUBSCRIBER LAST NAME']" placeholder="Patient last name">
            </template>

            <textarea class="form-control mt" placeholder="User address" v-model="claimPatient['SUBSCRIBER ADDRESS LINE']"></textarea>
            <select class="form-control mt-1" v-model="claimPatient['SUBSCRIBER STATE CODE']">
              <option value="0">Please choose</option>
              <option :value="state.state" :id="state.id" v-for="state in states" :key="state.id">{{state.state}}</option>
            </select>
            <select class="form-control mt-1" v-model="patientCity">
              <option value="0">Please choose</option>
              <option :value="city.city.toLowerCase()" v-for="city in cities" :key="city.id">{{city.city}}</option>
            </select>
            <input type="text" class="form-control form-control-sm mb-1 mt-1" v-model="claimPatient['SUBSCRIBER POSTAL ZONE OR ZIP CODE']" placeholder="zipcode">
          </td>
          <td class="text--dark">Status:</td>
          <td class="status-col"></td>
        </tr>

        <tr>
          <td class="text--dark">Account:</td>
          <td></td>
        </tr>

        <tr>
          <td class="text--dark">DOB:</td>
          <td>
            <template v-if="patient['SUBSCRIBER BIRTH DATE']">
              <select class="form-control form-control--sm" v-model="dobYear">
                <option value="0">Please select</option>
                <option v-for="year in years" :key="year" :value="year">{{year}}</option>
              </select>

              <select class="form-control form-control--sm" v-model="dobMonth">
                <option value="0">Please select</option>
                <option v-for="month in months" :key="month" :value="parseInt(month)">{{month}}</option>
              </select>

              <select class="form-control form-control--sm" v-model="dobDay">
                <option value="0">Please select</option>
                <option v-for="day in days" :key="day" :value="day">{{day}}</option>
              </select>
            </template>


          </td>
        </tr>

        <tr>
          <td class="text--dark">Gender:</td>
          <td>
            <select v-if="hasPatient" v-model="claimPatient['SUBSCRIBER GENDER CODE']" class="form-control form-control--sm">
              <option value="0">Please select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Emp:</td>
          <td></td>
          <td class="text--dark">SSN:</td>
          <td>
            <input class="form-control form-control-sm">
          </td>
        </tr>

        <tr>
          <td class="text--dark">Marital:</td>
          <td></td>
          <td class="text--dark">Cell:</td>
          <td>
            <input class="form-control form-control-sm">
          </td>
        </tr>

      </table>

    </div>

  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {

  computed: {
    ...mapGetters('claims', {
      patient: 'patient',
      hasPatient: 'hasPatient',
      hasPayer: 'hasPayer',
      payer: 'payer',
      claim: 'claim'
    }),


    ...mapGetters({
      years: 'years',
      months: 'monthsInDigits',
      days: 'days',
      states: 'states',
      cities: 'cities'
    }),

    claimPatient() {
      return {...this.patient};
    },

    patientCity: {
      set(value) {
        this.$set(this.claimPatient, 'SUBSCRIBER CITY NAME', value)
      },
      get() {
        return this.claimPatient ? this.claimPatient['SUBSCRIBER CITY NAME'].toLowerCase() : ''
      }
    },

    dobDay: {
      set(value) {
        this.setDob(value, 'day')
      },
      get() {
        return this.getDob().getDate()
      }
    },

    dobMonth: {
      set(value) {
        this.setDob(value, 'month')
      },
      get() {
        return this.getDob().getMonth() + 1
      }
    },

    dobYear: {
      set(value) {
        this.setDob(value, 'year')
      },
      get() {
        return this.getDob().getFullYear()
      }
    }

  },

  methods: {

    ...mapActions({
      updatePatientClaimInfo: 'claims/updatePatientClaimInfo',
      getStates             : 'getStates',
      getCities             : 'getCities'
    }),

    getDob() {
      return new Date(this.claimPatient['SUBSCRIBER BIRTH DATE'])
    },

    setDob(value = null, key = null) {
      console.log(value, key)
      
      let date = this.getDob()
      if(key == 'day') date.setDate(value)

      if(key == 'month') date.setMonth(parseInt(value) - 1)
      
      if(key == 'year') date.setFullYear(value)
      date = date.toString()
      this.$set(this.claimPatient, 'SUBSCRIBER BIRTH DATE', date)
    },

    save() {
      
      this.updatePatientClaimInfo({...this.claimPatient})
      .then(() => {
        this.$emit('cancel')
      })
      
    }

  },

  created() {
    this.getStates()
    this.getCities(0)
  },
}
</script>

