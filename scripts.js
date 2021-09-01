//Lets grab the form element
const form = document.getElementById("form");

//Set up our input checkers
let isEmailInputValid = false;
let isCountryInputValid = false;
let isZipcodeInputValid = false;
let isPasswordInputValid = false;
let isPasswordConfirmationInputValid = false;

//Lets disable the submit button for now
const submitButton = document.getElementById("button");
submitButton.disabled = true;

//Input listener that checks the data put in the active input field

form.addEventListener("input", (event) => checkInput(event));

//Listens for which field id has been changed and with a switch loop checks for the active input field for the relevant requirements for the input
const checkInput = (event) => {
  const currentInputId = event.target.id;
  const currentInputEle = event.target;
  const currentInputVal = event.target.value;

  const emailTipEle = document.getElementById("email-tip");

  const countryTipEle = document.getElementById("country-tip");

  const zipCodeTipEle = document.getElementById("zip-tip");

  const passwordTip = document.getElementById("password-tip");

  const passwordConfirmationTip = document.getElementById(
    "password-confirmation-tip"
  );

  const passwordCnt = document.getElementById("password-cnt");

  const passwordConfirmationCnt = document.getElementById(
    "password-confirmation-cnt"
  );

  switch (currentInputId) {
    case "email-input":
      if (currentInputEle.checkValidity()) {
        currentInputEle.classList.remove("invalid");
        emailTipEle.classList.add("fade-out");
        emailTipEle.classList.remove("fade-in");
        setTimeout(removeFadeOut(emailTipEle), 300);
        isEmailInputValid = true;
      } else {
        emailTipEle.classList.add("fade-in");
        currentInputEle.classList.add("invalid");
        isEmailInputValid = false;
      }
      break;

    case "country-input":
      if (currentInputVal != "") {
        currentInputEle.classList.remove("invalid");
        countryTipEle.classList.add("fade-out");
        countryTipEle.classList.remove("fade-in");
        setTimeout(removeFadeOut(countryTipEle), 300);
        isCountryInputValid = true;
      } else {
        countryTipEle.classList.add("fade-in");
        currentInputEle.classList.add("invalid");
        isCountryInputValid = false;
      }
      break;

    case "zip-input":
      const convertedVal = Number(currentInputVal);

      if (Number.isInteger(convertedVal)) {
        zipCodeTipEle.classList.add("fade-in");
        zipCodeTipEle.innerHTML = "Please add a 4 digit zip code";
        if (currentInputVal.length == 4) {
          zipCodeTipEle.classList.add("fade-out");
          zipCodeTipEle.classList.remove("fade-in");
          setTimeout(removeFadeOut(zipCodeTipEle), 300);
          currentInputEle.classList.remove("invalid");
          isZipcodeInputValid = true;
        } else {
          isZipcodeInputValid = false;
        }
      } else {
        currentInputEle.classList.add("invalid");
        zipCodeTipEle.classList.add("fade-in");
        isZipcodeInputValid = false;
      }
      break;

    case "password-input":
      if (currentInputVal.length > 5) {
        passwordTip.classList.add("fade-out");
        passwordTip.classList.remove("fade-in");
        setTimeout(removeFadeOut(passwordTip), 300);
        passwordCnt.classList.remove("invalid");
        isPasswordInputValid = true;
      } else {
        passwordCnt.classList.add("invalid");
        passwordTip.classList.add("fade-in");
        isPasswordInputValid = false;
      }
      break;

    case "password-confirmation-input":
      const firstPasswordInput =
        document.getElementById("password-input").value;
      if (currentInputVal.length > 5) {
        if (firstPasswordInput == currentInputVal) {
          passwordConfirmationTip.classList.add("fade-out");
          passwordConfirmationTip.classList.remove("fade-in");
          setTimeout(removeFadeOut(passwordConfirmationTip), 300);
          passwordConfirmationCnt.classList.remove("invalid");
          isPasswordConfirmationInputValid = true;
        } else {
          console.log("The passwords are not identical!");
          passwordConfirmationCnt.classList.add("invalid");
          passwordConfirmationTip.classList.add("fade-in");
          isPasswordConfirmationInputValid = false;
        }
      } else {
        passwordConfirmationCnt.classList.add("invalid");
        passwordConfirmationTip.classList.add("fade-in");
        isPasswordConfirmationInputValid = false;
      }
      break;
  }

  //After checking the newly entered input we now want to check if the all the input fields have valid data in them, and if they do, enable the button so the user can send the form
  if (
    isEmailInputValid == true &&
    isCountryInputValid == true &&
    isZipcodeInputValid == true &&
    isPasswordInputValid == true &&
    isPasswordConfirmationInputValid == true
  ) {
    submitButton.disabled = false;
    submitButton.classList.add("hover-effect");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("hover-effect");
  }
};

//Small function that removes the fade-out css class
const removeFadeOut = (element) => {
  element.classList.remove("fade-out");
};

//Hide or show password input event listener
form.addEventListener("click", (event) => {
  const clickedElementId = event.target.id;
  switch (clickedElementId) {
    case "password-eye":
      const passwordInput = document.getElementById("password-input");
      const passwordEyeIcon = document.getElementById("password-eye");
      if (passwordInput.type == "password") {
        passwordInput.type = "text";
        passwordEyeIcon.setAttribute("src", "./img/openeye.svg");
      } else {
        passwordInput.type = "password";
        passwordEyeIcon.setAttribute("src", "./img/closedeye.svg");
      }

      break;
    case "password-confirmation-eye":
      const passwordConfirmationInput = document.getElementById(
        "password-confirmation-input"
      );
      const passwordConfirmationEyeIcon = document.getElementById(
        "password-confirmation-eye"
      );
      if (passwordConfirmationInput.type == "password") {
        passwordConfirmationInput.type = "text";
        passwordConfirmationEyeIcon.setAttribute("src", "./img/openeye.svg");
      } else {
        passwordConfirmationInput.type = "password";
        passwordConfirmationEyeIcon.setAttribute("src", "./img/closedeye.svg");
      }
      break;
  }
});
