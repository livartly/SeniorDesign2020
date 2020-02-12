import validator from 'validator';
import isEmpty from 'is-empty';

const validateRegisterInput = function (data) {
  let error = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // validator.isEmpty is different from isEmpty
  // validator.isEmpty checks if string has length 0.
  if (validator.isEmpty(data.username)) {
    error.username = "Username field is required";
  } else if (/[@~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(data.username)) {
    error.username = "Username cannot contain symbols";
  }

  if (validator.isEmpty(data.email)) {
    error.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password1)) {
    error.password1 = "Password field is required";
  }

  if (validator.isEmpty(data.password2)) {
    error.password2 = "Confirm password field is required";
  }

  if (!validator.isLength(data.password1, {
    min: 6,
    max: 100
  })) {
    error.password1 = "Password must be between 6-100 characters long";
  }

  if (!validator.equals(data.password1, data.password2)) {
    error.password2 = "Passwords must match";
  }

  return {
    error,
    isValid: isEmpty(error)
  };

};

export default validateRegisterInput;