import { drinkMenuObject } from "@ts/types";
import { getDrinkEntries } from "./getDrinkEntries";
import { getDrinkMenuEntries } from "./getDrinkMenuEntries";

export async function loadDrinkMenuData(): Promise<Array<drinkMenuObject>> {
  const output = Array<drinkMenuObject>();
  const drinkMenues = await getDrinkMenuEntries();
  if (!drinkMenues) return [];
  else {
    await Promise.all(
      drinkMenues.map(async (menu) => {
        const drinks = await getDrinkEntries(menu.id);
        if (!drinks) return;
        else {
          output.push({ menu, drinks });
        }
      })
    );
  }
  return output;
}
