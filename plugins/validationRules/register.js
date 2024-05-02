
import * as validations from "./validation_functions";


export function validate(store, data) {
  //default errors to empty
  var errors = {};
  var select_elements = ['state', 'city'];
  var fields = ['name', 'email', 'npi', 'company_name', 'address', 'password', 'confirm_password', 'state', 'city', 'zipcode', 'phone'];
  var nullables = ['npi'];

  //iterate to mandatory fields and check if empty
  fields.forEach((field) => {
    if (field === null || field === undefined) {
      errors[field] = [`${field} is required`];
    }

    let field_string = formatField(field);

    if(validations.empty(data[field]) && !field.includes(nullables)) {
      errors[field] = [`${field_string} is required`];
    }

    if(validations.notIn(data[field]) && select_elements.indexOf(field) != -1) {
      errors[field] = [`${field_string} is required`];
    }

  });

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }

  if(data && data.password && data.password.length < 8) {
    errors['password'] = [`Password cannot be less than 8 characters`];
  }

  if(data && data.confirm_password && data.confirm_password.length < 8) {
    errors['confirm_password'] = [`Password cannot be less than 8 characters`];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }


  if(!validations.passwordsMatch(data.password, data.confirm_password)) {
    errors['password'] = [`Passwords do not match`];
  }

  if(!validations.standardLength(data.zipcode, 5)) {
    errors['zipcode'] = ['Please enter valid 5 digit zipcode'];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }

  if(!validations.isNumber(data.npi) && !validations.empty(data.npi)) {
    errors['npi'] = ['Please enter valid npi'];
  }

  if(!validations.isNumber(data.zipcode)) {
    errors['zipcode'] = ['Please enter valid zipcode'];
  }

  if(!validations.isNumber(data.phone)) {
    errors['phone'] = ['Please enter valid phone no'];
  }

  //if not empty errors then fill global errors
  if(Object.entries(errors).length > 0) {
    store.dispatch('validation/setErrors', errors);
    return false;
  }

  return true;

}

export function formatField(field) {
  let field_string = field.charAt(0).toUpperCase() + field.slice(1)
  return field_string.replace('_', ' ');
}
