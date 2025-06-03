import { ReservationAPI } from "@ts/utils/api";
import { ResponseError } from "@ts/types";
import { isResponseError, handleFormErrors } from "@ts/utils/error";
import { SubmitButton } from "@ts/utils/ui";
import { createReservationPayload } from "./createReservationPayload";
import { isHtmlElement } from "@ts/utils/dom";
import { createConfirmationOverlay } from "./createConfirmationOverlay";

/**
 * Initializes the reservera page form by attaching a submit handler.
 * Responsible for wiring up form submission behavior for creating new reservations.
 */
export function initReservationForm(): void {
  const FORM_SELECTOR = "form";
  const form = document.querySelector(FORM_SELECTOR);

  if (!form) {
    console.error(`DOM-element ${FORM_SELECTOR} is missing.`);
    return;
  }

  form.addEventListener("submit", handleFormSubmit);
}

/**
 * Handles the submission of the reservation form.
 * On valid input, inserts the data and shows a confirmation.
 * On validation failure, displays a validation error messages.
 *
 * @param e - The form submission event
 */
async function handleFormSubmit(e: Event): Promise<void> {
  e.preventDefault();

  if (!validateForm(e)) return;
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const payload = createReservationPayload(formData);
  const SUBMIT_BUTTON_SELECTOR = `button[type="submit"]`;
  const submitBtn = document.querySelector(
    SUBMIT_BUTTON_SELECTOR
  ) as HTMLButtonElement | null;

  if (!isHtmlElement(submitBtn, SUBMIT_BUTTON_SELECTOR)) return;

  const btn = new SubmitButton(submitBtn);

  try {
    const api = new ReservationAPI();
    btn.disable();
    btn.showLoader();
    setTimeout(async () => {
      await api.insert(payload);
      btn.enable();
      btn.hideLoader();
      form.reset();
      const overlay = createConfirmationOverlay(formData);
      document.body.appendChild(overlay);
    }, 400);
  } catch (error) {
    btn.enable();
    btn.hideLoader();
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      handleFormErrors(resError);
    } else {
      console.error("Unexpected app error", error);
    }
  }
}

/**
 * Performs manual validation on all relevant form fields before submission.
 *
 * @param e The form submission event
 * @returns true if all fields are valid, otherwise false
 */

function validateForm(e: Event): boolean {
  e.preventDefault();

  const form: HTMLFormElement = document.querySelector("form")!;

  // Select form input and select elements.

  const guestAmountSelect = form.querySelector(
    "#guestAmount"
  ) as HTMLSelectElement | null;
  const reservationDateSelect = form.querySelector(
    "#reservationDate"
  ) as HTMLSelectElement | null;
  const timeSelect = form.querySelector("#time") as HTMLSelectElement | null;
  const firstNameInput = form.querySelector(
    "#firstName"
  ) as HTMLInputElement | null;
  const lastNameInput = form.querySelector(
    "#lastName"
  ) as HTMLInputElement | null;
  const phoneNumberInput = form.querySelector(
    "#phoneNumber"
  ) as HTMLInputElement | null;
  const emailInput = form.querySelector("#email") as HTMLInputElement | null;
  const messageInput = form.querySelector(
    "#message"
  ) as HTMLInputElement | null;

  // Typecheck form input and select elements.

  if (!isHtmlElement(guestAmountSelect, "#guestAmount")) return false;
  if (!isHtmlElement(reservationDateSelect, "#reservationDate")) return false;
  if (!isHtmlElement(timeSelect, "#time")) return false;
  if (!isHtmlElement(firstNameInput, "#firstName")) return false;
  if (!isHtmlElement(lastNameInput, "#lastName")) return false;
  if (!isHtmlElement(phoneNumberInput, "#phoneNumber")) return false;
  if (!isHtmlElement(emailInput, "#email")) return false;
  if (!isHtmlElement(messageInput, "#message")) return false;

  // Reset validation state as the user types or changes values.

  resetValidationState(guestAmountSelect);
  resetDateTimeValidationState(reservationDateSelect, timeSelect);
  resetValidationState(firstNameInput);
  resetValidationState(lastNameInput);
  resetValidationState(phoneNumberInput);
  resetValidationState(emailInput);
  resetValidationState(messageInput);

  let formIsValid: boolean = true; // Flag to track if the form is valid or not.

  // Enforce validation on select and input elements.

  if (
    !(
      Number(guestAmountSelect.value) >= 1 &&
      Number(guestAmountSelect.value) <= 6
    )
  ) {
    validateField(
      guestAmountSelect,
      "Antalet gäster per bokning måste vara mellan 1 och 6."
    );
    formIsValid = false;
  }

  if (isSelectedDateValid(reservationDateSelect.value)) {
    validateField(
      reservationDateSelect,
      "Bokningsdatumet får inte vara tidigare än dagens datum."
    );
    formIsValid = false;
  }

  if (isSelectedTimeValid(reservationDateSelect.value, timeSelect.value)) {
    validateField(
      timeSelect,
      "Den bokade tiden får inte vara tidigare än aktuell tidpunkt."
    );
    formIsValid = false;
  }

  if (
    !(firstNameInput.value.length >= 1 && firstNameInput.value.length <= 50)
  ) {
    validateField(
      firstNameInput,
      "Förnamnet får som högst vara 50 karaktärer långt."
    );
    formIsValid = false;
  }

  if (!(lastNameInput.value.length >= 1 && lastNameInput.value.length <= 50)) {
    validateField(
      lastNameInput,
      "Efternamnet får som högst vara 50 karaktärer långt."
    );
    formIsValid = false;
  }

  if (
    !(phoneNumberInput.value.length >= 1 && phoneNumberInput.value.length <= 20)
  ) {
    validateField(
      phoneNumberInput,
      "Telefonnummret får som högst vara 20 karaktärer långt."
    );
    formIsValid = false;
  }

  if (!(emailInput.value.length >= 1 && emailInput.value.length <= 128)) {
    validateField(
      emailInput,
      "E-postadressen får som högst vara 128 karaktärer långt."
    );
    formIsValid = false;
  }

  if (!(messageInput.value.length <= 1000)) {
    validateField(
      messageInput,
      "Meddelandet får som högst vara 1000 karaktärer långt."
    );
    formIsValid = false;
  }
  return formIsValid;
}

function resetValidationState(
  elem: HTMLInputElement | HTMLSelectElement
): void {
  elem.addEventListener("input", () => {
    validateField(elem, "");
  });
}

function resetDateTimeValidationState(
  dateElem: HTMLInputElement | HTMLSelectElement,
  timeElem: HTMLInputElement | HTMLSelectElement
): void {
  dateElem.addEventListener("input", () => {
    validateField(dateElem, "");
    validateField(timeElem, "");
  });
  timeElem.addEventListener("input", () => {
    validateField(dateElem, "");
    validateField(timeElem, "");
  });
}

function isSelectedDateValid(selectedDateStr: string): boolean {
  const selectedDate = new Date(selectedDateStr);
  selectedDate.setHours(0, 0, 0, 0);

  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  return selectedDate < todaysDate;
}

function isSelectedTimeValid(
  selectedDateStr: string,
  selectedTimeStr: string
): boolean {
  return new Date(`${selectedDateStr} ${selectedTimeStr}`) < new Date();
}

function validateField(
  elem: HTMLInputElement | HTMLSelectElement,
  message: string
): void {
  elem.setCustomValidity(message); // Set the custom validity message for the field
  elem.reportValidity(); // Display the validation message to the user
}
