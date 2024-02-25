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
    errorAlert("Names can't be empty")
    return false
  }
  else if (data['firstName'].trim().length < 2 || data['lastName'].trim().length < 2) {
    errorAlert("Names can't be less than 2 characters")
    return false
  }
  else if (data['email'].trim() == "" || !validateEmail(data['email'].trim())) {
    errorAlert("Invalid email")
    return false
  }
  else if (data['phone'].trim() == "" || data['phone'].trim().length > 15 || !validatePhone(data['phone'].trim())) {
    errorAlert("Invalid phone number")
    return false
  }
  else if (data['pass'].trim().length < 8) {
    errorAlert("Password must be 8 characters or more")
    return false
  }
  else if (data['pass'].trim() !== confirmPass) {
    errorAlert("Passwords don't match")
    return false
  }
  else if (!data['profileImg']) {
    errorAlert("Select a profile picture")
    return false
  }

  return true;
}