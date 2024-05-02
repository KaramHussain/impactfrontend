export default {

  loading: (state) => state.loading,

  claim: (state) => state.claim || [],

  originalClaim: (state) => state.originalClaim || [],

  billingProvider: state => state.claim['Billing Provider Name'] || '',

  patient: (state, getters) => getters.hasPatient ? state.claim['Subscriber Name'] : {},

  payer: (state, getters) => getters.hasPayer ? state.claim['Payer Name'] : {},

  pos: (state, getters) => getters.claimInfo['PLACE OF SERVICE CODE'],

  pos_all: state => state.pos_all,

  hasPayer: state => state.claim.hasOwnProperty('Payer Name'),

  hasPatient: state => state.claim.hasOwnProperty('Subscriber Name'),

  icds:(state, getters) => getters.claimInfo.dx || [],

  claimInfo: state => state.claim['Claim Information'] || {},

  lineItems: state => state.claim.lines || [],

  renderingProvider: state => state.claim['Rendering Provider Name'] || [],

  suggestions: state => state.suggestions,

  dxPointers(state, getters) {
    return function (index) {
      let dxPointers = []
      for(let i = 1; i <= 12; i++) {
        if(getters.lineItems[index].hasOwnProperty(`DIAGNOSIS CODE POINTER ${i}`)) {
          dxPointers.push(getters.lineItems[index][`DIAGNOSIS CODE POINTER ${i}`])
        }
      }
      return dxPointers
    }
  },

  patientResponsibility() {
    return function (item) {
      if(item['PATIENT RESPONSIBILITY AMOUNT']) {
        return item['PATIENT RESPONSIBILITY AMOUNT'] * item['SERVICE UNIT COUNT']
      }
      return 0
    }
   
  },

  chargeAmount() {
    return function (item) {
      if(item['LINE ITEM CHARGE AMOUNT']) {
        return item['LINE ITEM CHARGE AMOUNT'] * item['SERVICE UNIT COUNT']
      }
      return 0
    }
  },

  revisions: state => state.revisions

}
