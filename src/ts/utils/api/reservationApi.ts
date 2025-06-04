import { ReservationPayload } from "@ts/types";
import { fetchData } from "@ts/utils/api";
const DEFAULT_API_BASE_URL =
  "https://hjort-backend.azurewebsites.net/api/public";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

/**
 * Provides methods to interact with the Reservation API.
 */
export class ReservationAPI {
  constructor(private readonly apiUrl = baseUrl) {}

  /**
   * Sends a new reservation entry to the API via POST /api/public/reservations
   * @param payload - The reservation data to insert
   */
  async insert(payload: ReservationPayload): Promise<void> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    await fetchData<void>(`${this.apiUrl}/reservations`, options);
  }
}
