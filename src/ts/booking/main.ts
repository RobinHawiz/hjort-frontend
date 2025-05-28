import "@styles/style.scss";
import { initBurgerMenu } from "@ts/utils/ui/burgerMenu";
import { removePreloadClass } from "@ts/utils/dom/removePreloadClass";
import { initSmoothScroll } from "@ts/utils/ui/scroll";
import flatpickr from "flatpickr";
import { Swedish } from "flatpickr/dist/l10n/sv.js";
import { initReservationForm } from "./initReservationForm";

function main(): void {
  removePreloadClass();
  initSmoothScroll();
  initBurgerMenu();
  initReservationForm();
  const inputDate = document.querySelector(
    "#reservationDate"
  )! as HTMLInputElement;
  //inputDate.min = new Date().toISOString().split("T")[0];
  flatpickr(inputDate, {
    locale: Swedish,
    minDate: new Date(),
    allowInput: true,
    disable: [
      function (date) {
        // Disable Sundays (0) and Mondays (1)
        return date.getDay() === 0 || date.getDay() === 1;
      },
    ],
    dateFormat: "Y-m-d",
  });
}

main();
