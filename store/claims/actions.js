

export default {

  async getInvoiceReport({commit,}, id) {
    commit('loading', true)
    await this.$axios.get(`reports/invoices/${id}`)
    .then(({data}) => {

      commit('fillClaim', data)
      commit('loading', false)
      Promise.resolve()
    })
    .catch((err) => {
      commit('loading', false)
    });

  },

  fillClaim({commit}, claim) {
    commit('fillClaim', claim)
    Promise.resolve()
  },

  updatePatientClaimInfo({commit}, data) {
    commit('updatePatientBasicInfo', data)
    Promise.resolve()
  },

  updateBillingProvider({commit}, data) {
    commit('updateBillingProvider', data)
    Promise.resolve()
  },

  setClaimInfo({commit}, data) {
    commit('setClaimInfo', data)
    Promise.resolve()
  },

  updatePayer({commit}, data) {
    commit('updatePayer', data)
    Promise.resolve()
  },

  addNewIcdCode({commit}, data) {
    commit('addNewIcdCode', data)
    Promise.resolve()
  },

  removeIcdCode({commit}, dx) {
    commit('removeIcdCode', dx)
    Promise.resolve()
  },

  updateExistingIcdCode({commit}, data) {
    commit('updateIcdCode', data)
    Promise.resolve()
  },

  saveLineItem({commit}, data) {
    commit('saveLineItem', data)
    Promise.resolve()
  },

  removeLineItem({commit}, data) {
    commit('removeNewLineItem', data)
    Promise.resolve()
  },


  getPosTos({commit}) {
    if(process.browser) {
      let data = JSON.parse(localStorage.getItem("place_of_services"))
      if(data) {
        commit('setPos', data)
        Promise.resolve()
        return
      }
    }
    this.$axios.get('/get-pos-tos')
    .then(({data}) => {
      commit('setPos', data)
      if(process.browser) {
        localStorage.setItem('place_of_serices', JSON.stringify(data))
      }
      Promise.resolve()
    })
  },

  changePos({commit}, data) {
    commit('changePos', data)
    Promise.resolve()
  },

  setPointersInLineItemsIndex({commit}, data) {
    commit('setPointers', data)
    Promise.resolve()
  },

  fetchSuggestions({dispatch}, {text, type}) {
    this.$axios.get('fetch-suggestions', {
      params: {
        text, type
      }
    })
    .then(({data}) => {
      dispatch('fillSuggestions', data)
    })
  },

  fillSuggestions({commit}, data) {
    commit('fillSuggestions', data)
  },

  fetchRevisions({commit, rootState}, id) {
    this.$axios.post(`provider/claim/revisions/all`, {
      claim_id: id,
      provider_id: rootState.user.id
    })
    .then(({data}) => {
      commit('fillRevisions', data)
    })
  }

}
