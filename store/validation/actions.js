export default {

  setErrors({commit}, errors) {
    commit('SET_VALIDATION_ERRORS', errors);
  },

  clearErrors({commit}) {
    commit('SET_VALIDATION_ERRORS', {});
  },

  addErrors({commit}, data) {
    commit('ADD_ERRORS', data);
  },

  removeError({commit}, field) {
    commit('removeError', field);
  }

}
