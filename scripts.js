const test = document.getElementById("email-input");

console.log(test);

const form = document.getElementById("form");

let isEmailInputValid = false;
let isCountryInputValid = false;
let isZipcodeInputValid = false;
let isPasswordInputValid = false;
let isPasswordConfirmationInputValid = false;

//Input listener

form.addEventListener("input", (event) => checkInput(event));

//Listens for which field id has been changed and with a switch loop checks for the relevant requirements for the input
const checkInput = (event) => {
  const currentInputId = event.target.id;
  const currentInputEle = event.target;
  const currentInputVal = event.target.value;
  console.log(currentInputId);
  console.log(currentInputEle);
  console.log(currentInputVal);

  const emailTipEle = document.getElementById("email-tip");
  //console.log(emailTipEle);
  /* console.log(emailTip);
  console.log(emailTip.innerHTML);
  emailTip.innerHTML = "Not this email";
  console.log(emailTip.innerHTML); */
  const countryTipEle = document.getElementById("country-tip");
  //console.log(countryTipEle);
  const zipCodeTipEle = document.getElementById("zip-tip");
  //console.log(zipCodeTipEle);
  const passwordTip = document.getElementById("password-tip");
  //console.log(passwordTip);
  const passwordConfirmationTip = document.getElementById(
    "password-confirmation-tip"
  );
  //console.log(passwordConfirmationTip);

  // const emailCnt = document

  const passwordCnt = document.getElementById("password-cnt");
  //console.log(passwordCnt);

  const passwordConfirmationCnt = document.getElementById(
    "password-confirmation-cnt"
  );
  console.log(passwordConfirmationCnt);

  switch (currentInputId) {
    case "email-input":
      //console.log("Its the email input: " + currentInput.value);
      if (currentInputEle.checkValidity()) {
        console.log("Yay its a valid email input!");
        currentInputEle.classList.remove("invalid");
        emailTipEle.classList.add("fade-out");
        emailTipEle.classList.remove("fade-in");
        setTimeout(removeFadeOut(emailTipEle), 300);
        isEmailInputValid = true;
      } else {
        console.log("Invalid email input!");
        emailTipEle.classList.add("fade-in");
        currentInputEle.classList.add("invalid");
        isEmailInputValid = false;
      }
      break;
    case "country-input":
      if (currentInputVal != "") {
        console.log("Yay country has been picked!");
        currentInputEle.classList.remove("invalid");
        countryTipEle.classList.add("fade-out");
        countryTipEle.classList.remove("fade-in");
        setTimeout(removeFadeOut(countryTipEle), 300);
        isCountryInputValid = true;
      } else {
        console.log("No country has been picked!");
        countryTipEle.classList.add("fade-in");
        console.log(currentInputEle);
        currentInputEle.classList.add("invalid");
        isCountryInputValid = false;
      }
      break;

    case "zip-input":
      const convertedVal = Number(currentInputVal);
      console.log(convertedVal);
      if (Number.isInteger(convertedVal)) {
        console.log("Yay its a number!");
        zipCodeTipEle.classList.add("fade-in");
        zipCodeTipEle.innerHTML = "Please add a 4 digit zip code";
        if (currentInputVal.length == 4) {
          console.log("Yay we have 4 digits!");
          console.log(zipCodeTipEle);
          zipCodeTipEle.classList.add("fade-out");
          zipCodeTipEle.classList.remove("fade-in");
          setTimeout(removeFadeOut(zipCodeTipEle), 300);
          currentInputEle.classList.remove("invalid");
          isZipcodeInputValid = true;
        } else {
          console.log("There are too few digits!");
          isZipcodeInputValid = false;
        }
      } else {
        console.log("Its not a number!");
        currentInputEle.classList.add("invalid");
        zipCodeTipEle.classList.add("fade-in");
        isZipcodeInputValid = false;
      }
      break;

    case "password-input":
      if (currentInputVal.length > 5) {
        console.log("yay the password length is above 6!");
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
        console.log("Yay the password is long enough!");
        if (firstPasswordInput == currentInputVal) {
          console.log("Yay the password is also identical to the first input!");
          passwordConfirmationTip.classList.add("fade-out");
          passwordConfirmationTip.classList.remove("fade-in");
          setTimeout(removeFadeOut(passwordConfirmationTip), 300);
          passwordConfirmationCnt.classList.remove("invalid");
          isPasswordConfirmationInputValid = true;
        } else {
          console.log("The passwords are not identical!");
        }
      } else {
        passwordConfirmationCnt.classList.add("invalid");
        passwordConfirmationTip.classList.add("fade-in");
        isPasswordConfirmationInputValid = false;
      }
      break;
  }
};

const removeFadeOut = (element) => {
  console.log("You are entering remove fadeout func");
  console.log(element);
  element.classList.remove("fade-out");
};

const submitButton = document.getElementById("button");

form.addEventListener("click", (event) => {
  const clickedElementId = event.target.id;
  switch (clickedElementId) {
    case "password-eye":
      console.log("The password eye was clicked!");
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
      console.log("The confirmation password eye was clicked!");
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

    case "button":
      console.log("Hey button has been clicked!");
      if (
        isEmailInputValid == true &&
        isCountryInputValid == true &&
        isZipcodeInputValid == true &&
        isPasswordInputValid == true &&
        isPasswordConfirmationInputValid == true
      ) {
        console.log("All inputs are valid! Sending form");
        finalTip.classList.add("fade-out");
        finalTip.classList.add("fade-in");
        setTimeout(removeFadeOut(finalTip), 300);
        form.onsubmit = sendForm;
      } else {
        console.log("Something went wrong");
        const finalTip = document.getElementById("final-tip");
        finalTip.classList.add("fade-in");
      }
      break;
  }
});

function sendForm() {
  form.action = console.log("Form has been sent!");
}
