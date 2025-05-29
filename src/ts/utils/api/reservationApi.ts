import { ReservationPayload } from "@ts/types";
import { fetchData } from "@ts/utils/api";

/**
 * Provides methods to interact with the Reservation API.
 */
export class ReservationAPI {
  constructor(
    private readonly apiUrl = "https://hjort-backend.azurewebsites.net/api/public"
  ) {}

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
