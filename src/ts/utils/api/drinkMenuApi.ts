import {} from "@ts/types";
import { DrinkEntity, DrinkMenuEntity } from "@ts/types/drinkMenu";
import { fetchData } from "@ts/utils/api";
const DEFAULT_API_BASE_URL =
  "https://hjort-backend.azurewebsites.net/api/public";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

/**
 * Provides methods to interact with the Drink Menu API.
 */
export class DrinkMenuAPI {
  constructor(private readonly apiUrl = baseUrl) {}

  /**
   * Retrieves all drink menu entries via GET /api/public/drink-menu
   * @returns A parsed array containing DrinkMenuEntity objects
   */
  async getAllDrinkMenus(): Promise<Array<DrinkMenuEntity>> {
    const output = await fetchData<Array<DrinkMenuEntity>>(
      `${this.apiUrl}/drink-menu`
    );
    return output;
  }

  /**
   * Retrieves all drink entries via GET /api/public/drink/:id
   * @param drinkMenuId The ID of the drink menu to retrieve its associated drinks
   * @returns A parsed array containing DrinkEntity objects
   */
  async getAllDrinks(drinkMenuId: string): Promise<Array<DrinkEntity>> {
    const output = await fetchData<Array<DrinkEntity>>(
      `${this.apiUrl}/drink/${drinkMenuId}`
    );
    return output;
  }
}
