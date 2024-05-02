<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.table th,
.table td {
  border-bottom: 1px solid black !important;
}
body {
  padding-top: 0 !important;
  overflow-y: scroll !important;
}
</style>
<template>
  <section class="m-5">
    <h1><strong> Claim Details </strong></h1>
    <div class="row">
      <table>
        <tr>
          <td class="col-md-8 p-0">
            <div class="card-body w-100">
              <h5><strong> Patient Details </strong></h5>
              <table border="2" class="w-100">
                <tr>
                  <td rowspan="4" colspan="2">
                    <p>
                      Full Name:<br />
                      {{ ediDetails?.Patient_detail?.Full_Name }}
                    </p>
                    <p>
                      Address: <br />
                      {{ ediDetails?.Patient_detail?.Address }}
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
                      {{ ediDetails?.Patient_detail?.Date_of_birth }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="text--dark">Gender:</td>
                  <td>{{ ediDetails?.Patient_detail?.Gender }}</td>
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
          </td>
          <td class="col-md-4">
            <!-- mt Table -->
            <table class="border-0">
              <tr
                class="border-0"
                v-for="(edigendererror, index) in ediErrors.InvalidGender"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ edigendererror.reason }} for code
                  {{ edigendererror.procedureCode }}
                </td>
              </tr>
              <tr
                class="border-0"
                v-for="(ediageerror, index) in ediErrors.invalidAge"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ ediageerror.reason }} for code
                  {{ ediageerror.procedureCode }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="col-md-8">
            <div class="card-body w-100">
              <h5><strong> Insurance Details </strong></h5>
              <table border="2" class="w-100">
                <tr>
                  <td colspan="2">
                    <div>
                      <p class="mb-2">
                        {{ ediDetails?.Insurance?.Insurance_Name }}
                      </p>
                      <p class="mb-2"><span class="text--dark">Type:</span></p>
                      <p class="mb-2">
                        <span class="text--dark">PayerId:</span>
                        {{ ediDetails?.Insurance?.['Payer Payor Identification'] }}
                      </p>
                      <p class="mb-2">
                        <span class="text--dark">Address line:</span>
                        , , ,
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text--dark">Relation:</td>
                  <td><span> </span></td>
                </tr>
                <tr>
                  <td class="text--dark">Member:</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </td>
          <td class="col-md-4">
            <!-- mt Table -->
            <table class="border-0">
              <tr
                class="border-0"
                v-for="(
                  ediprocessingExpensiveERAerror, index
                ) in ediErrors?.processingExpensiveERA"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ ediprocessingExpensiveERAerror?.reason }} for code
                  {{ ediprocessingExpensiveERAerror?.procedureCode }}
                </td>
              </tr>
              <tr
                class="border-0"
                v-for="(
                  ediprocessingExpensiveEAerror, index
                ) in ediErrors?.processingExpensiveEA"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ ediprocessingExpensiveEAerror?.reason }} for code
                  {{ ediprocessingExpensiveEAerror?.procedureCode }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="col-md-8 p-3">
            <h5><strong> Insurance Claim Details </strong></h5>
            <table class="table my-1">
              <thead>
                <tr>
                  <td>Item</td>
                  <td>Icd</td>
                  <td>
                    Description
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(icd, index) in ediDetails?.Claims?.icd_code"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ icd.dx1 }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table class="table mt-4">
              <thead>
                <tr>
                  <td>Line</td>
                  <td>POS</td>
                  <td>CPT</td>
                  <td>Description</td>
                  <td>Diag</td>
                  <td>Units</td>
                  <td>Charged</td>
                  <td>Patient Responsibility</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(cpt, index) in ediDetails?.Claims?.cptcode"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{
                      cpt.place_of_service == "99"
                        ? "Other Place of Service"
                        : "Hospital"
                    }}
                  </td>
                  <td>{{ cpt.code }}</td>
                  <td></td>
                  <td>{{ cpt.Diagnosis_code_pointer[0] }}</td>
                  <td></td>
                  <!-- <td>$388,710.00</td> -->
                  <td>${{ cpt.Charge }}</td>
                  <td>$0.00</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="col-md-4">
            <!-- mt Table -->
            <table class="border-0">
              <!-- invalid pos -->
              <tr
                class="border-0"
                v-for="(ediInvalidPOSerror, index) in ediErrors?.InvalidPOS"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ ediInvalidPOSerror?.reason }} for code
                  {{ ediInvalidPOSerror?.procedureCode }}
                </td>
              </tr>

              <!-- cci edits -->
              <tr
                class="border-0"
                v-for="(edicciEditserror, index) in ediErrors?.cciEdits"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ edicciEditserror?.reason }} for code
                  {{ edicciEditserror?.procedureCode }}
                </td>
              </tr>

              <!-- cpt exists -->
              <tr
                class="border-0"
                v-for="(edicptExistserror, index) in ediErrors?.cptExists"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ edicptExistserror?.reason }} for code
                  {{ edicptExistserror?.procedureCode }}
                </td>
              </tr>

              <!-- cpt expired -->
              <tr
                class="border-0"
                v-for="(edicptExpirederror, index) in ediErrors?.cptExpired"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ edicptExpirederror?.reason }} for code
                  {{ edicptExpirederror?.procedureCode }}
                </td>
              </tr>

              <!-- cpt modifiers -->
              <tr
                class="border-0"
                v-for="(edicptModifierserror, index) in ediErrors?.cptModifiers"
                :key="index"
              >
                <td class="text-danger border-0 pt-2">
                  {{ edicptModifierserror?.reason }} for code
                  {{ edicptModifierserror?.procedureCode }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <div class="mt-3 text-center">
      <button class="btn btn-info text-white mx-4" @click="validateEDI">
        Validate EDI
      </button>
    </div>
  </section>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      ediErrors: [],
      ediDetails: {},
    };
  },

  mounted() {
    axios
      .post("http://192.168.1.60:5000/api/patient_information", {
        id: this.$route.params.id,
      })
      .then((response) => {
        console.log("Data fetched successfully:", response.data.Insurance['Payer Payor Identification']);
        this.ediDetails = response.data;
        console.log(this.ediDetails.Patient_detail.Full_Name);

      })
      .catch((error) => {
        console.log("error", error);
        alert("Oops! Server Error.");
        console.log("Oops! Server Error.");
      });
  },

  methods: {
    async validateEDI() {
      console.log("called");

      await axios
        .post("http://192.168.1.60:5000/api/test", {
          id: this.$route.params.id,
        })
        .then((response) => {
          this.ediErrors = response.data;
          console.log("File uploaded successfully", response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
      console.log("end")
    },
  },
};
</script>
