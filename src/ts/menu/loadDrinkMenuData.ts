import {
  DrinkEntity,
  DrinkMenuEntity,
  drinkMenuObject,
  ResponseError,
} from "@ts/types";
import { DrinkMenuAPI } from "@ts/utils/api";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Retrieves drink menu data along with its associated drink items from the backend.
 *
 * Combines both into a single structured object to simplify rendering logic
 * for DOM factories.
 *
 * @returns A Promise resolving to an array of DrinkMenuObject entries.
 */
export async function loadDrinkMenuData(): Promise<Array<drinkMenuObject>> {
  const drinkMenues = await getDrinkMenuEntries();
  if (!drinkMenues) return [];
  else {
    return (await Promise.all(
      drinkMenues.map(async (menu) => {
        const drinks = await getDrinkEntries(menu.id);
        if (!drinks) return;
        else {
          return { menu, drinks };
        }
      })
    )) as Array<drinkMenuObject>;
  }
}

export async function getDrinkMenuEntries(): Promise<Array<DrinkMenuEntity> | null> {
  try {
    const api = new DrinkMenuAPI();
    return await api.getAllDrinkMenus();
  } catch (error) {
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      for (const err of resError) {
        handleGlobalError(document.body, err);
      }
    } else {
      console.error("Unexpected app error", error);
    }
    return null;
  }
}

async function getDrinkEntries(
  drinkMenuId: string
): Promise<Array<DrinkEntity> | null> {
  try {
    const api = new DrinkMenuAPI();
    return await api.getAllDrinks(drinkMenuId);
  } catch (error) {
    if (Array.isArray(error) && error.every((err) => isResponseError(err))) {
      const resError = error as Array<ResponseError>;
      for (const err of resError) {
        handleGlobalError(document.body, err);
      }
    } else {
      console.error("Unexpected app error", error);
    }
    return null;
  }
}
