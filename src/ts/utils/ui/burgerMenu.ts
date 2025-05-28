import { isHtmlElement } from "@ts/utils/dom/isHtmlElement";
import { BurgerButton } from "@ts/utils/ui";

export function initBurgerMenu(): void {
  const BURGER_BUTTON_SELECTOR =
    ".burgare-gjord-på-100-procent-svenskt-viltkött";
  const BURGER_NAV_SELECTOR = "#burger-nav";

  const button = document.querySelector(
    `button${BURGER_BUTTON_SELECTOR}`
  ) as HTMLButtonElement | null;
  if (!isHtmlElement(button, BURGER_BUTTON_SELECTOR)) return;

  const nav = document.querySelector(BURGER_NAV_SELECTOR);
  if (!isHtmlElement(nav, BURGER_NAV_SELECTOR)) return;

  button.addEventListener("click", () => {
    const burgerButton = new BurgerButton(button);
    handleClickEvent(burgerButton, nav);
  });
}

function handleClickEvent(
  burgerButton: BurgerButton,
  burgerNav: HTMLElement
): void {
  burgerButton.toggleOpen();
  burgerNav.classList.toggle("opened");
}
