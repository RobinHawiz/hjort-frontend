import "@styles/style.scss";
import { initBurgerMenu } from "@ts/utils/ui/burgerMenu";
import { removePreloadClass } from "@ts/utils/dom/removePreloadClass";
import { initSmoothScroll } from "@ts/utils/ui/scroll";

function main(): void {
  removePreloadClass();
  initSmoothScroll();
  initBurgerMenu();
}

main();
