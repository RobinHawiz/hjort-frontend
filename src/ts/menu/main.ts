import "@styles/style.scss";
import { removePreloadClass } from "@ts/utils/dom";
import { initSmoothScroll, initBurgerMenu, removeLoader } from "@ts/utils/ui";
import { loadCourseMenuData } from "./loadCourseMenuData";
import { displayCourseMenus } from "./displayCourseMenu";
import { loadDrinkMenuData } from "./loadDrinkMenuData";
import { displayDrinkMenus } from "./displayDrinkMenu";

async function main(): Promise<void> {
  removePreloadClass();
  initSmoothScroll();
  initBurgerMenu();
  const [courseMenuData, drinkMenuData] = await Promise.all([
    loadCourseMenuData(),
    loadDrinkMenuData(),
  ]);
  displayCourseMenus(courseMenuData);
  displayDrinkMenus(drinkMenuData);
  removeLoader();
}

main();
