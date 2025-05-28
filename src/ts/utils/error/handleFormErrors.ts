import { ResponseError } from "@ts/types";
import { handleGlobalError, isGlobalError } from "@ts/utils/error";

/**
 * Handles both global and field-level errors for the reservation form.
 *
 * @param errors - An Array of structured API response errors
 */
export function handleFormErrors(errors: Array<ResponseError>): void {
  for (const err of errors) {
    if (isGlobalError(err)) {
      handleGlobalError(document.body, err);
    } else {
      console.log(`${err.field}: ${err.message}`);
    }
  }
}
