import Vue from 'vue'
import { countBy } from 'lodash';
export default {

  fillClaim(state, data) {
    state.claim = data;
    state.originalClaim = data
  },

  loading(state, val) {
    state.loading = val;
  },

  updatePatientBasicInfo(state, data) {
    Vue.set(state.claim, 'Subscriber Name', data)
  },

  updateBillingProvider(state, data) {
    Vue.set(state.claim, 'Billing Provider Name', data)
  },

  addNewIcdCode(state, dx) {
    dx.push('')
    Vue.set(state.claim['Claim Information'], 'dx', dx)
  },

  removeIcdCode(state, icd) {
    let dxs = state.claim['Claim Information']['dx'].filter(dx => dx !== icd)
    Vue.set(state.claim['Claim Information'], 'dx', dxs)
  },

  updateIcdCode(state, {value, icd, index}) {
    let dxs = state.claim['Claim Information']['dx'].filter(dx => dx !== icd)
    dxs.push(value)
    Vue.set(state.claim['Claim Information'], 'dx', dxs)
  },

  setClaimInfo(state, dx) {
    Vue.set(state.claim['Claim Information'], 'dx', dx)
  },


  saveLineItem(state, data) {
    Vue.set(state.claim, 'lines', data)  
  },


  removeNewLineItem(state, key) {
    Vue.delete(state.claim.lines, key)  
  },

  setPos(state, data) {
    state.pos_all = data
  },

  changePos(state, data) {
    Vue.set(state.claim['Claim Information'], 'PLACE OF SERVICE CODE', data) 
  },

  setPointers(state, {key, dxs, item}) {
    
    let dxPointers = {}
    
    dxs.forEach((dx, index) => {
      dxPointers[`DIAGNOSIS CODE POINTER ${parseInt(index) + 1}`] = dx.toString()
    })

    for(let i = 1; i <= 12; i++) {
      if(item.hasOwnProperty(`DIAGNOSIS CODE POINTER ${i}`)) {
        delete item[`DIAGNOSIS CODE POINTER ${i}`]
      }
    }

    item = {...item, ...dxPointers}
    Vue.set(state.claim.lines, key, item)

  },

  fillSuggestions(state, data) {
    state.suggestions = data
  },

  fillRevisions(state, data) {
    state.revisions = data
  }

}
