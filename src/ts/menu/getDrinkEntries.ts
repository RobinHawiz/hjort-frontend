import { DrinkMenuAPI } from "@ts/utils/api";
import { ResponseError, DrinkEntity } from "@ts/types";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Fetches all drink entries from the API.
 */
export async function getDrinkEntries(
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
