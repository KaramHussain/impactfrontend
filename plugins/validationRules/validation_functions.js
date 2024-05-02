
export function myTrim(data) {
  return data.replace(/^\s+|\s+$/gm, '');
}

export function empty(data) {

  if(data === '' || data === null) {
    return true;
  }
  return false;

}

export function notIn(data) {
  //data = myTrim(data);
  if(data === '0' || data === 'none' || data === 0) {
    return true;
  }
  return false;
}

export function passwordsMatch(password, confirm_password) {

  //password = myTrim(password);
  //confirm_password = myTrim(confirm_password);

  if(password.trim() == confirm_password.trim()) {
    return true;
  }
  return false;

}

export function passwordIsValidated(password) {

  if(password.length >= 8 && password.length <= 25) {
    return true;
  }
  return false;
}

export function isNumber(data) {

  //data = myTrim(data);
  data = Number(data);
  if(typeof data === 'number' && !isNaN(data)) {
    return true;
  }
  return false;

}

export function standardLength(data, standardLength) {
  if(data.length != standardLength) {
    return false;
  }
  return true;
}

