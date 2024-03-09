import { errorAlert } from "./alertMsg"


// email validation
const validateEmail = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

// phone validation
const validatePhone = (Phone) => {
  const regex = /^[0-9]*$/;
  return regex.test(Phone);
};

//register validator
export const dataValidator = (data, confirmPass, location) => {

  if (data['firstName'].trim() == "" || data['lastName'].trim() == "") {
    return errorAlert("Names can't be empty")
  }
  else if (data['firstName'].trim().length < 2 || data['lastName'].trim().length < 2) {
    return errorAlert("Names can't be less than 2 characters")
  }
  else if (data['email'].trim() == "" || !validateEmail(data['email'].trim())) {
    return errorAlert("Invalid email")
  }
  else if (data['phone'].trim() == "" || data['phone'].trim().length > 15 || !validatePhone(data['phone'].trim())) {
    return errorAlert("Invalid phone number")
  }
  else if(location == 1){
    if(data['sub1'] == "" || data['sub2'] == ""){
      return errorAlert("must pick two subjects")
    }
    if (data['sub1'] == data['sub2'] || data['sub2'] == data['sub1']) {
      return errorAlert("pick different subjects")
    }
  }
  else if (data['pass'].trim().length < 8) {
    return errorAlert("Password must be 8 characters or more")

  }
  else if (confirmPass.trim() == ""){
    return errorAlert("Confirm password empty")
  }
  else if (data['pass'].trim() !== confirmPass) {
    return errorAlert("Passwords don't match")
  }
  else if (!data['profileImg']) {
    return errorAlert("Select a profile picture")
  }

  return true;
}