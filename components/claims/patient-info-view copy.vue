<template>

  <div class="card">

    <h4 class="card-header">
      Patient
      <a href="#" @click.prevent="$emit('edit')">
        <i class="fas fa-pen"></i>
      </a>
    </h4>

    <div class="card-body">

      <!-- <table border=2 class="w-100 claim-table" v-if="patient">
        <tr>
          <td rowspan="4" colspan="2">
            <p v-if="hasPatient">
              Full Name:<br>
              {{patient['INSURED OR SUBSCRIBER FIRST NAME'] != null ? patient['INSURED OR SUBSCRIBER FIRST NAME'][0] : '' }}
              {{patient['INSURED OR SUBSCRIBER LAST NAME'] != null ? patient['INSURED OR SUBSCRIBER LAST NAME'][0] : ''}}
            </p>
            <p>
              Address: <br>
              {{patient['SUBSCRIBER ADDRESS LINE'] != null ? formattedDesc(patient['SUBSCRIBER ADDRESS LINE'], '10') : ''}},
              {{patient['SUBSCRIBER CITY NAME'] != null ? patient['SUBSCRIBER CITY NAME'][0] : ''}},
              {{patient['SUBSCRIBER STATE CODE']}},
            </p>
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
            <span v-if="hasPatient">
              {{AppDate(patient['SUBSCRIBER BIRTH DATE'])}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Gender:</td>
          <td>{{gender}}</td>
        </tr>

        <tr>
          <td class="text--dark">Emp:</td>
          <td>Other</td>
          <td class="text--dark">SSN:</td>
          <td></td>
        </tr>

        <tr>
          <td class="text--dark">Marital:</td>
          <td>Single</td>
          <td class="text--dark">Cell:</td>
          <td></td>
        </tr>

      </table> -->

      <!-- muskaan start -->
      <table border=2 class="w-100 claim-table" v-if="patient">
        <tr>
          <td rowspan="4" colspan="2">
            <p>
              Full Name:<br>
              {{patientDetails?.Full_Name}}
            </p>
            <p>
              Address: <br>
              {{ patientDetails?.Address }}
              <!-- {{patient['SUBSCRIBER POSTAL ZONE OR ZIP CODE']}} -->
            </p>
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
            <span>
              {{AppDate(patientDetails.Date_of_birth)}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Gender:</td>
          <td>{{patientDetails?.Gender}}</td>
        </tr>

        <tr>
          <td class="text--dark">Emp:</td>
          <td>Other</td>
          <td class="text--dark">SSN:</td>
          <td></td>
        </tr>

        <tr>
          <td class="text--dark">Marital:</td>
          <td>Single</td>
          <td class="text--dark">Cell:</td>
          <td></td>
        </tr>

      </table>

    </div>


  </div>

</template>

<script>

import {mapGetters} from 'vuex'

export default {
  // props: ['patientDetails'],

  data(){
    return{
      patientDetails:{}
    }
  },

  async mounted() {
    this.patientDetails = await JSON.parse(localStorage.getItem('patientDetails'));
    console.log('props: ',this);
    console.log("hey")
    console.log("hey2",JSON.parse(localStorage.getItem('patientDetails')) , this.patientDetails)
    console.log("local data :::")
  },

  computed: {
    ...mapGetters('claims', {
      patient: 'patient',
      order: 'order',
      hasPatient: 'hasPatient',
      hasPayer: 'hasPayer',
      payer: 'payer',
      claim: 'claim',
    }),

    gender() {
      return this.patient['SUBSCRIBER GENDER CODE'] === 'F' ? 'Female' : 'Male';
    },
  },
};
</script>