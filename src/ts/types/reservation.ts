/**
 * A payload representing a single reservation, intended for storage in a database.
 */
export type ReservationPayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
  guestAmount: number;
  reservationDate: string; // Expected format: ISO 8601
};
