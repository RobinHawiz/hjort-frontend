import { drinkMenuObject } from "@ts/types";
import { isHtmlElement } from "@ts/utils/dom";
import { createDrinkMenuHtml } from "./createDrinkMenuHtml";

/**
 * Renders a list of drink menu and drink entries into the DOM.
 *
 * If entries are available, they are appended to the element with the class "drink-menu-container".
 */
export function displayDrinkMenus(
  drinkMenuObjects: Array<drinkMenuObject>
): void {
  const DRINK_MENU_SELECTOR = ".drink-menu-container";
  const elemToAppend = document.querySelector(DRINK_MENU_SELECTOR);

  if (!isHtmlElement(elemToAppend, DRINK_MENU_SELECTOR)) return;

  let addDivider = true;
  drinkMenuObjects.forEach((obj, i) => {
    // Don't add a divider if we're rendering the last drink menu, otherwise keep adding dividers between menues.
    addDivider = i + 1 === drinkMenuObjects.length ? false : true;
    elemToAppend.appendChild(
      createDrinkMenuHtml(obj.menu, obj.drinks, addDivider)
    );
  });
  elemToAppend.classList.add("show");
}
