import { ReservationPayload } from "@ts/types";

/**
 * Creates a ReservationPayload object from submitted form data.
 *
 * @param formData - A FormData object containing user input values
 * @returns A typed payload object ready for API submission
 */
export function createReservationPayload(
  formData: FormData
): ReservationPayload {
  return {
    firstName: String(formData.get("firstName")),
    lastName: String(formData.get("lastName")),
    phoneNumber: String(formData.get("phoneNumber")),
    email: String(formData.get("email")),
    message: String(formData.get("message")),
    guestAmount: Number(formData.get("guestAmount")),
    reservationDate: new Date(
      `${String(formData.get("reservationDate"))} ${String(
        formData.get("time")
      )}`
    ).toISOString(),
  };
}
