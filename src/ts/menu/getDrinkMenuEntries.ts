import { DrinkMenuAPI } from "@ts/utils/api";
import { ResponseError, DrinkMenuEntity } from "@ts/types";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Fetches all drink entries from the API.
 */
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
