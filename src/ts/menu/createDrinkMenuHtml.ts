import { DrinkEntity, DrinkMenuEntity } from "@ts/types";

/**
 * A DOM factory for rendering drink menu and drink entries.
 *
 * @param drinkMenu - The drink menu entry to render.
 * @param drinks - The drink entries to render.
 * @param addDivider - Whether to append a visual divider after the menu (use true when rendering multiple menus).
 * @returns A DocumentFragment containing the rendered elements.
 */
export function createDrinkMenuHtml(
  drinkMenu: DrinkMenuEntity,
  drinks: Array<DrinkEntity>,
  addDivider: boolean
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const article = document.createElement("article");

  const divDrinks = document.createElement("div");
  divDrinks.classList.add("drinks");

  drinks.forEach((drink) => {
    const pDrinkName = document.createElement("p");
    pDrinkName.innerText = drink.name;
    divDrinks.appendChild(pDrinkName);
  });

  const pPriceTot = document.createElement("p");
  pPriceTot.classList.add("price-text");
  pPriceTot.innerText = `${drinkMenu.priceTot.toString()},-`;

  if (drinkMenu.title !== "") {
    const h1DrinkMenuTitle = document.createElement("h1");
    h1DrinkMenuTitle.innerText = drinkMenu.title;
    article.appendChild(h1DrinkMenuTitle);
  }

  if (drinkMenu.subtitle !== "") {
    const h2DrinkMenuTitle = document.createElement("h2");
    h2DrinkMenuTitle.innerText = drinkMenu.subtitle;
    article.appendChild(h2DrinkMenuTitle);
  }

  article.appendChild(divDrinks);

  article.appendChild(pPriceTot);

  if (addDivider) {
    const spanDivider = document.createElement("span");
    spanDivider.classList.add("divider");
    article.appendChild(spanDivider);
  }

  fragment.appendChild(article);

  return fragment;
}
