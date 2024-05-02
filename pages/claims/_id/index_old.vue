<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">

          <div class="content-header row">

              <handle-question :loading="loading" :assigned="assigned"  @assign="assignClaim($event)" />

              <div class="content-header-left col-md-6 col-12 mb-2">
                <h3 class="content-header-title mb-0 d-inline-block">
                  Claim details
                  <span v-if="assignedDate" style="font-size:12px;">Assigned date {{$moment().format('LL')}}</span>
                  <a href="#" class="text-dark" title="Claim Notes" data-toggle="modal" data-target="#notesModal">
                    <i class="far fa-clipboard"></i>
                  </a> 

                  <!--<nuxt-link :to="{path:`/claims/${claimId}/revisions`}" class="text-dark" title="See claim revisions">-->
                  <!--  <i class="fa fa-history"></i>-->
                  <!--</nuxt-link>  -->
                </h3>
              </div>

              <div class="content-header-right col-md-6 col-12 mb-2">
                <assigned-by-info class="float-right" />
                <div class="clearfix"></div>
              </div>
          </div>

          <div class="content-body">

            <div class="row">
                <div class="col-12">
                    <div class="card">

                      <!-- Content -->
                      <div class="card-content claim">

                        <div class="card-body">

                          <warningAlerts :status="Number(status)" :messages="messages" />

                          <claim-basic-info :claimStatus="claimStatus" />

                          <div class="row">
                            
                            <div class="col-md-6">

                              <patient-info-edit v-if="isEditing('patientInfo')" @cancel="cancelEdit" />
                              <patient-info-view v-else @edit="setEditing('patientInfo')" />

                            </div>

                            <div class="col-md-6">

                              <patient-insurance-edit v-if="isEditing('patientInsurance')" @cancel="cancelEdit" />
                              <patient-insurance-view v-else @edit="setEditing('patientInsurance')" />

                            </div>

                          </div>

                          <hr>

                          <icd-codes-edit v-if="isEditing('patientIcdCodes')" @cancel="cancelEdit" />
                          <icd-codes-view v-else @edit="setEditing('patientIcdCodes')" />

                          <div class="date my-1 text-dark font-weight-bold">
                            Date of service :
                            <span v-if="claim">
                              {{AppDate(claim['837 Date'])}}
                            </span>
                          </div>

                          <line-items-edit v-if="isEditing('patientLineItems')" @cancel="cancelEdit" />
                          <line-items-view v-else @edit="setEditing('patientLineItems')" />

                          <hr>

                          <div class="float-right total-bill w-25">
                            <table class="w--100 float--right claim-table">
                              <tr>
                                <td>Totals:</td>
                                <td>{{formatter(totalChargeAmount)}}</td>
                                <td>{{formatter(totalPatientResponsibility)}}</td>
                                <td>$0</td>
                              </tr>
                            </table>
                          </div>

                          <div class="clearfix"></div>

                          <hr>

                          <p class="text-dark">Referring UPIN: NPI:</p>

                          <div class="row">
                            
                            <div class="col">
                              <billing-provider-edit v-if="isEditing('billingProvider')" @cancel="cancelEdit" />
                              <billing-provider-view v-else @edit="setEditing('billingProvider')" />
                            </div>
                            <div class="col"> 
                              <rendering-provider-edit v-if="isEditing('renderingProvider')" @cancel="cancelEdit" />
                              <rendering-provider-view v-else @edit="setEditing('renderingProvider')" />
                            </div>

                          </div>

                       
                          <facility-edit v-if="isEditing('facility')" @cancel="cancelEdit" />
                          <facility-view v-else @edit="setEditing('facility')" />

                          <!-- payer info -->

                          <div class="row my-2">
                            
                            <div class="col-6">
                              <payer-contact-info :payer="payer" />
                            </div>

                            <div class="col-6 float-right">
                              <submit-wrapper />
                            </div>

                          </div>

                          <!-- claimStatus == 'accepted' -->
                          <button :disabled="!assigned || loading" class="btn btn-primary float-right clearfix ml-1" @click.prevent="submit">
                            Submit
                          </button>
                          
                          <!-- :disabled="!assigned ||  loading" -->
                          <button  class="btn btn-success float-right clearfix" @click.prevent="saveDraft">
                            Save Draft
                          </button>

                          <div class="clearfix"></div>

                        </div>

                      </div>

                    </div>
                </div>
            </div>

            <notes-modal :claimId="claimId" />

          </div>
        </div>

    </div>

    <impactFooter />

  </main>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'

//layout
import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'

//utits
import {makeid} from '@/plugins/logistics/uniqueIdGenerator';

//claim components

import assignedByInfo from '@/components/assigned-by-info'
import handleQuestion from '@/components/claims/handle-question'
import claimBasicInfo from '@/components/claims/claim-basic-info'
import patientInfoView from '@/components/claims/patient-info-view'
import patientInfoEdit from '@/components/claims/patient-info-edit'
import patientInsuranceView from '@/components/claims/patient-insurance-view'
import patientInsuranceEdit from '@/components/claims/patient-insurance-edit'
import icdCodesView from '@/components/claims/icd-codes-view'
import icdCodesEdit from '@/components/claims/icd-codes-edit'
import lineItemsView from '@/components/claims/line-items-view'
import lineItemsEdit from '@/components/claims/line-items-edit'
import billingProviderView from '@/components/claims/billing-provider-view'
import billingProviderEdit from '@/components/claims/billing-provider-edit'
import renderingProviderView from '@/components/claims/rendering-provider-view'
import renderingProviderEdit from '@/components/claims/rendering-provider-edit'
import facilityView from '@/components/claims/facility-view'
import facilityEdit from '@/components/claims/facility-edit'
import warningAlerts from '@/components/claims/warning-alerts'
import payerContactInfo from '@/components/claims/payer-contact-info'
import submitWrapper from '@/components/claims/submit-wrapper'
import notesModal from '@/components/claims/notes/notes-modal'

//dummy api for 837 sample data
// import claim837 from '@/api/837'


export default {

  middleware:['auth'],

  head() {
    return {
      title:'Claim details'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    assignedByInfo,
    handleQuestion,
    claimBasicInfo,
    patientInfoView,
    patientInfoEdit,
    patientInsuranceView,
    patientInsuranceEdit,
    icdCodesView,
    icdCodesEdit,
    lineItemsView,
    lineItemsEdit,
    billingProviderView,
    billingProviderEdit,
    renderingProviderView,
    renderingProviderEdit,
    facilityView,
    facilityEdit,
    warningAlerts,
    payerContactInfo,
    submitWrapper,
    notesModal
  },

  data() {
    return {
      loading: false,
      assigned: false,
      assignedDate: null,
      claimStatus: 'denied',
      sending: false,
      editing: true,
      editingId: '',
      status: 0,
      messages: []
    }
  },

  computed: {

    ...mapGetters('claims', {
      icds: 'icds',
      claim: 'claim',
      originalClaim: 'originalClaim',
      lineItems: 'lineItems',
      patientResponsibility: 'patientResponsibility',
      chargeAmount: 'chargeAmount',
      billingProvider: 'billingProvider',
      patient: 'patient',
      payer: 'payer',
      claimInfo: 'claimInfo'
    }),

    claimId() {
      return this.$route.params.id
    },

    totalChargeAmount() {
      return this.getTotal(this.chargeAmount)
    },

    totalPatientResponsibility() {
      return this.getTotal(this.patientResponsibility)
    },
  
  },

  methods: {

    ...mapActions('claims', {
      fillClaim: 'fillClaim'
    }),

    getTotal(callback) {
      if(this.lineItems.length) {
        return this.lineItems.map(item => callback(item))
        .reduce((acc, value) => acc + value)
      }
      return 0
    },

    fetchClaim() {
  
      this.loading = true
      
      if(!this.$route.params.id) {
        return this.$router.push({path:'/claims'})
      }

      this.$axios.post(`${this.ediUrl}/get_claim837`, {
        _id : this.$route.params.id
      })
      .then(({data}) => {
        this.fillClaim(data)
        this.loading = false
      })
      .catch((error) => {
        this.loading = false
        return this.$router.push({path:'/claims'})
      })

    },

    assignClaim(handle) {
      this.loading = true
      this.$axios.post(`provider/assign-claim`, {
        claim_id: this.$route.params.id,
        provider_id: this.user.id,
        handle_claim: handle
      })
      .then(({data}) => {
        this.loading = false
        if(data.status.toLowerCase() == 'assigned') {
          this.$toast.show('Claim saved in your assigned claims.').goAway(5000)
          this.assigned = true
          this.assignedDate = data.date_of_assigned
        }
      })
      .catch(() => {
        this.$toast.show('Something went wrong!').goAway(5000)
        this.loading = false
      })
    },

    checkStatusForProvider() {
      this.$axios.post(`provider/check-claim-status`, { claim_id: this.$route.params.id })
      .then(({data}) => {
        this.makeAssignments(data)
      })
      .catch(() => {
        this.$toast.show('Something went wrong!').goAway(5000)
      })
    },

    makeAssignments(data) {
      if(data.provider_id === this.user.id) {
        this.assignClaimToProvider(data)
      }
      if(data.provider_id !== this.user.id && data.status.toLowerCase() === 'assigned') {
        this.$toast.show('Claim is already assigned to someone else').goAway(5000)
        this.assigned = true
      }
      // if(data.status == 'submitted' || data.status == 'resolved') {
      //   this.$toast.show('Claim is already submitted').goAway(5000)
      //   this.assigned = true
      // }
      this.claimStatus = (data.claim_status == null || data.claim_status == '') ? 'denied' : data.claim_status
    },

    assignClaimToProvider(data) {
      this.assigned = true
      this.assignedDate = data.date_of_assigned
    },

    isEditing(id) {
      return this.editing && this.editingId === id
    },

    setEditing(id) {
      this.editingId = id
      this.editing = true
    },

    cancelEdit() {
      this.editing = false
      this.editingId = ''
    },

    isClaimSent() {
      return this.claimStatus == 'accepted' ? true : false;
    },

    async saveDraft() {
      
      await this.$axios.post(`provider/claim/revisions/store`, {
          'claim_id'    : this.claimId,
          'revision'    : this.claim,
          'provider_id' : this.user.id,
          'old_revision': this.originalClaim 
      })
      .then(({data}) => {
          if(!data.hasOwnProperty('id')) {
              this.$toast.show("Could not save Draft").goAway(5000)
          }
          else {
              this.$toast.show("Draft saved").goAway(5000)
          }
      })
      .catch(() => {
          this.$toast.show("Could not save Draft").goAway(5000)
      })  

    },

    async submit() {

      this.status = null;
      this.messages = [];
      this.sending = true;

      if(this.isClaimSent()) return false

      let response = this.getResponse()

      await this.$axios.post(`${this.ediUrl}/submit_edi`, {
        ...response
      })
      .then(({data}) => {

        if(data.result == 'Success' && data.Status == 1) {
          this.status = 1;
          this.$toast.show('Claim submitted succesfully!');
          this.updateClaim(response);
          this.scrollStart()
        }
        else {
          this.status = 0;

          this.fillErrors()
          
          this.scrollStart()
          this.$toast.show("Please fix some errors above").goAway(5000)
        }
        this.sending = false;

      })
      .catch((err) => {
        this.sending = false;
      });

    },

    getResponse() {
      let senderId = makeid(4);
      let receiverId = makeid(4);
      let claimId = makeid(9, 'numeric').toString();

      let response = {
        "Authorization Information Qualifier" : "00",
        "Authorization Information" : `${makeid(10)}`,
        "Security Information Qualifier" : "00",
        "Security Information" : `${makeid(10)}`,
        "Interchange ID Qualifier" : "ZZ",
        "Interchange Sender ID" : `${makeid(15)}`,
        "Interchange Receiver ID" : `${makeid(15)}`,
        "Interchange Date" : this.$moment().format('YYMMDD'),
        "Interchange Time" : this.$moment().format('HHmm'),
        "Interchange Control Standards Identifier" : '^',
        "Interchange Control Version Number" : '00501',
        "Interchange Control Number" : makeid(9, 'numeric').toString(),
        "Acknowledgment Requested" : '0',
        "Usage Indicator" : 'T',
        "Component Element Separator" :  ':',
        "Functional Identifier Code" : "HC",
        "Application Senders Code" : `${senderId}`,
        "Application Receivers Code": `${senderId}`,
        "Date" : this.$moment().format('YYYYMMDD'),
        "Time" : this.$moment().format('HHmm'),
        "Group Control Number" : "1",
        "Responsible Agency Code" : "X",
        "Version / Release / Industry Identifier Code" : "005010X222A1",
        "Transaction Set Identifier Code" : "837",
        "Transaction Set Control Number" : "0021",
        "Implementation Convention Reference" : "005010X222A1",
        "Hierarchical Structure Code" : "0019",
        "Transaction Set Purpose Code" : "00",
        "Originator Application Transaction Identifier" : "",
        "Transaction Set Creation Date" : this.$moment().format('YYYYMMDD'),
        "Transaction Set Creation Time" : this.$moment().format('HHmm'),
        "Claim or Encounter Identifier" : "CH",
        "submitter" : { 
          "Entity Identifier Code" : "41",
          "Entity Type Qualifier" : "2",
          "Name"  : "CarePays",
          "Identification Code Qualifier" : "46",
          "Identification Code" : `${this.provider_id}`, 
          "Contact Function Code" : "IC",
          "Submitter Contact Name" : "ART GELBER",
          "Communication Number Qualifier" : "TE",
          "Communication Number" : "4321457"
        },
        "receiver" : {
          "Entity Identifier Code"  : "40",
          "Entity Type Qualifier" : "2",
          "Name" : `${this.payer['PAYER LAST NAME']}`,
          "Identification Code Qualifier" : "46",
          "Identification Code" : `${this.payer['PAYER PAYOR IDENTIFICATION']}`
        },
        "billing_provider" : {
          "Hierarchical ID Number" : "1",
          "Hierarchical Parent ID Number" : "",
          "Hierarchical Level Code" : "20",
          "Hierarchical Child Code" : "1",
          "Entity Identifier Code" :"85",
          "Entity Type Qualifier" :  "1",
          "Name": this.billingProvider['BILLING PROVIDER FIRST NAME'] + " " + this.billingProvider['BILLING PROVIDER LAST NAME'],
          "First Name": `${this.billingProvider['BILLING PROVIDER FIRST NAME']}`,
          "Middle Name": `${this.billingProvider['BILLING PROVIDER MIDDLE NAME INITIAL']}`,
          "Identification Code Qualifier" : "XX",
          "Identification Code": `${this.billingProvider['BILLING PROVIDER NATIONAL PROVIDER IDENTIFIER']}`,
          "Address Line" : `${this.billingProvider['BILLING PROVIDER ADDRESS LINE']}`,
          "City": `${this.billingProvider['BILLING PROVIDER CITY NAME']}`,
          "State": `${this.billingProvider['BILLING PROVIDER STATE OR PROVINCE CODE']}`,
          "Zip": `${this.billingProvider['BILLING PROVIDER POSTAL ZONE OR ZIP CODE']}`,
          "Identification Qualifier" :"EI",
          "Identification" : `${this.billingProvider['BILLING PROVIDER NATIONAL PROVIDER IDENTIFIER']}`
        },

        "Provider Code" : "BI",
        "Reference Identification Qualifier" : "PXC",
        "Provider Taxonomy Code" : "",
        "referring provider secondary identifier" : "17312345600006351",
        "hierarchical parent ID number" : "2",
        "payer responsibility sequence number code" : "P",
        "insured group or policy number" : "",
        "claim filing indicator code" : "CI",
        "name first" : "TED",
        "date time Period format qualifier" : "D8",
        "patient birth date" : `${this.AppDate(this.patient['SUBSCRIBER BIRTH DATE'], 'YYYYMMDD')}`,
        "patient gender code" : `${this.patient['SUBSCRIBER GENDER CODE']}`,
        "individual relationship code" : "19",
        "Total Claim Charge Amount" : `${this.totalChargeAmount}`,
        "Provider or Supplier Signature Indicator" : "Y",
        "Assignment or Plan Participation Code" : "A",
        "Benefits Assignment Certification Indicator" : "Y",
        "Release of Information Code" : "Y",

        "Transaction Segment Count" : "",
        "Number of Transaction Sets Included" : "1",
        "Number of Included Functional Groups" : "1",

        "subscriber": {
          "Hierarchical ID Number": "2",
          "Hierarchical Parent ID Number": "1",
          "Hierarchical Level Code": "22",
          "Hierarchical Child Code": "0",

          "Entity Identifier Code" :"IL",
          "Entity Type Qualifier" :  "1",
          "Name": (this.patient['INSURED OR SUBSCRIBER FIRST NAME'] + ' ' + this.patient['INSURED OR SUBSCRIBER LAST NAME']).toString(),
          "First Name": `${(this.patient['INSURED OR SUBSCRIBER FIRST NAME'])}`,
          "Middle Name":`${ (this.patient['INSURED OR SUBSCRIBER LAST NAME'])}`,
          "Identification Code Qualifier" : "MI",
          "Identification Code": `${this.patient['INSURED OR SUBSCRIBER MEMBER IDENTIFICATION NUMBER']}`,
          "Address Line" : `${this.patient['SUBSCRIBER ADDRESS LINE']}`.substr(0, 55),
          "City": `${this.patient['SUBSCRIBER CITY NAME']}`,
          "State": `${this.patient['SUBSCRIBER STATE CODE']}`,
          "Zip": `${this.patient['SUBSCRIBER POSTAL ZONE OR ZIP CODE']}`,

          "Identification Qualifier" :"SY",
          "Identification" : `${this.patient['INSURED OR SUBSCRIBER MEMBER IDENTIFICATION NUMBER']}`,

        },
        "Payer Responsibility Sequence Number Code" : "P",
        "Individual Relationship Code": "18",
        "Subscriber Group or Policy Number": "2222-SV",
        "Claim Filing Indicator Code": "CI",

        "Date Time Period Format Qualifier": "D8",
        "Subscriber Birth Date": `${this.AppDate(this.patient['SUBSCRIBER BIRTH DATE'], 'YYYYMMDD')}`,
        "Subscriber Gender Code": `${this.patient['SUBSCRIBER GENDER CODE']}`,


        "payer": {
          "Entity Identifier Code" : "PR",
          "Entity Type Qualifier" : `${this.payer['ENTITY TYPE QUALIFIER']}`,
          "Name" : this.payer['PAYER LAST NAME'] + " " + this.payer['PAYER FIRST NAME'],
          "Identification Code Qualifier" : "PI",
          "Identification Code" : `${this.payer['PAYER PAYOR IDENTIFICATION']}`
        },

        "Claim ID": `${(this.claimInfo['835_ID'][0])}`,
        //new records
        "Originator Application Transaction Identifier": `${makeid(11)}`,
        "Provider Taxonomy Code": `${makeid(10)}`,

      };


      let diagnoses = this.icdsForResponse();
      response['diagnoses'] = diagnoses;
      response['no_of_proc'] = this.lineItems.length;

      let cpts = this.cptsForResponse();
      response['proc'] = cpts;

      return response

    },

    fillErrors() {
      let result = data.result;
      if(typeof result == 'string' && result.toLowerCase() == 'something wrong') {
        this.messages.push(data.result);
      }
      else {
        this.messages.push(...data.result);
      }
    },

    scrollStart(top = 20) {
      window.scrollTo({
        top,
        behavior:'smooth'
      })
    },

    icdsForResponse() {
      let diagnoses = {};
      if(this.icds) {

        this.icds.forEach((icd, index) => {
          let code = index == 0 ? 'BK' : 'BF';
          let indexKey = index + 1;
          let key = indexKey < 10 ? '0' + indexKey : indexKey.toString();

          diagnoses[(index+1).toString()] = {
            id:key,
            code:code,
            dx:icd
          };

        });

      }
      let diagnose = [];
      diagnose.push(diagnoses);
      return diagnose;
    },

    cptsForResponse() {

      let cpts = {};
      if(this.lineItems.length) {

        this.lineItems.forEach((item, index) => {

          cpts[(index+1).toString()] = {
            "cpt": item['PROCEDURE CODE'],
            "qualifier" : "HC",
            "mod1": item['PROCEDURE MODIFIER 1'] ? item['PROCEDURE MODIFIER 1'].toString() : '',
            "mod2": item['PROCEDURE MODIFIER 2'] ? item['PROCEDURE MODIFIER 2'].toString() : '',
            "mod3": item['PROCEDURE MODIFIER 3'] ? item['PROCEDURE MODIFIER 3'].toString() : '',
            "mod4": item['PROCEDURE MODIFIER 4'] ? item['PROCEDURE MODIFIER 4'].toString() : '',
            "charge_amount": `${this.chargeAmount(item)}`,
            "unit_qualifier": "UN",
            "units": `${item['SERVICE UNIT COUNT']}`,
            "dx1": item['DIAGNOSIS CODE POINTER 1'] ? item['DIAGNOSIS CODE POINTER 1'].toString() : '',
            "dx2": item['DIAGNOSIS CODE POINTER 2'] ? item['DIAGNOSIS CODE POINTER 2'].toString() : '',
            "dx3": item['DIAGNOSIS CODE POINTER 3'] ? item['DIAGNOSIS CODE POINTER 3'].toString() : '',
            "dx4": item['DIAGNOSIS CODE POINTER 2'] ? item['DIAGNOSIS CODE POINTER 4'].toString() : '',
            "date_qualifier": "472",
            "date_format": "D8",
            "date":this.$moment().format('YYYYMMDD')
          }

        })

      }
      let wrapper = [];
      wrapper.push(cpts);
      return wrapper;
    },

    async updateClaim(response) {

      await this.$axios.post(`provider/update-claim`, {

        claim_id : this.$route.params.id,
        provider_id : this.user.id

      })
      .then((res) => {
        this.claimStatus = 'processing';
      })

    }

  },

  created() {
    this.checkStatusForProvider()
    this.fetchClaim()
  }

}

</script>


<style lang="scss">

  .claim {

    &-table {
      border-collapse: collapse;

      &, tr, td {
        border: 2px solid #ccc;
      }

      th, td, tr {
        padding: .5rem !important;
      }

      tr:not(:first-child) {
        background: #fff;
      }

      .t-head {
        background: #e0dcdc !important;
      }

      textarea, input, select {
        font-size:13px;
        resize:none;
      }

    }

    a {
      &,
      &:link,
      &:visited {
        color:#222;
      }
      &:hover {
        color: #333;
      }
    }

    hr {
      border-bottom:3px solid #222;
    }

    thead {
      tr {
        td {
          color:#222 !important;
          font-weight:700 !important;
        }
      }
    }

    .total-bill {
      font-weight: bold;
      border-top:3px solid #222;
      padding-top:.6rem;
      display:block;
      margin-bottom:1rem;
    }
    .facility-table {
      width:40rem;
    }

    .text--dark {
      color:#000;
    }

    .bg-white {
      background:#fff !important;
      color:#000 !important;
      border:#fff;
      outline:none;
      -webkit-box-shadow: -1px 2px 2px rgba(0,0,0,0.4);
      -moz-box-shadow: -1px 2px 2px  rgba(0,0,0,0.4);
      box-shadow: -1px 2px 2px  rgba(0,0,0,0.4);
      &:hover {
        -webkit-box-shadow: -1px 4px 3px rgba(0,0,0,0.6);
        -moz-box-shadow: -1px 4px 3px  rgba(0,0,0,0.6);
        box-shadow: -1px 4px 3px  rgba(0,0,0,0.6);
      }
    }

    .suggestions-box {
        position: absolute;
        top:100%;
        left:0;
        height:auto;
        width:100%;
        color:#000;
        background:#fff;
        z-index:1;
        box-shadow: 2px 4px 3px rgba(0,0,0,0.4);
        ul {
          margin: 0;
          padding:0
        }
        li {
          padding: 5px 10px;
          border-bottom: 1px solid #ccc; 
          cursor: pointer;
          &:hover {
            background: #ddd;
          }
        }
    }    

  }
</style>


