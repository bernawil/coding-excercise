const removeFieldError = element => {
  element.classList.remove("has-error");
  element.parentElement.getElementsByClassName(
    "error-message"
  )[0].innerHTML = null;
};

const setFieldError = (element, message) => {
  element.classList.add("has-error");
  element.parentElement.getElementsByClassName(
    "error-message"
  )[0].innerHTML = message;
};

const bindConfirm = btn => {
  btn.addEventListener("click", () => {
    for (input of document.getElementsByTagName("input")) {
      switch (input.getAttribute("data-validate")) {
        case "alpha":
          if (null === input.value.match(/^[a-z]+$/i))
            setFieldError(input, "value is not alpha!");
          else removeFieldError(input);
          break;

        case "alphanumeric":
          if (null === input.value.match(/^[a-z0-9]+$/i))
            setFieldError(input, "value is not alphanumeric!");
          else removeFieldError(input);
          break;

        case "numeric":
          if (null === input.value.match(/^[0-9]+$/i))
            setFieldError(input, "value is not numeric!");
          else removeFieldError(input);
          break;

        default:
          break;
      }
    }
    for (select of document.getElementsByTagName("select")) {
      if (select.selectedIndex < 1) setFieldError(select, "no option selected!");
      else removeFieldError(select);
    }
  });
};

const bindCancel = btn => {
  btn.addEventListener("click", () => {
    for (input of document.getElementsByTagName("input")) {
      input.value = null;
      removeFieldError(input);
    }
    for (select of document.getElementsByTagName("select")) {
      select.selectedIndex = -1;
      removeFieldError(select);
    }
  });
};

bindConfirm(document.getElementById("ok"));
bindCancel(document.getElementById("cancel"));
