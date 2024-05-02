export default {

  SET_VALIDATION_ERRORS(state, errors) {
    return state.errors = errors;
  },

  ADD_ERRORS(state, data) {
    let key = data['key'];
    let value = data['value'];
    state.errors[key] = value;
    //errors:{first_name:['first_name is required']}
  },

  removeError(state, field) {
    delete state.errors[field];
    //force update errors
    var errors = Object.assign({}, errors, state.errors);
    state.errors = errors;

  }

}
