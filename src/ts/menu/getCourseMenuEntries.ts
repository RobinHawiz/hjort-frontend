import { CourseMenuAPI } from "@ts/utils/api";
import { ResponseError, CourseMenuEntity } from "@ts/types";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Fetches all course menu entries from the API.
 */
export async function getCourseMenuEntries(): Promise<Array<CourseMenuEntity> | null> {
  try {
    const api = new CourseMenuAPI();
    return await api.getAllCourseMenus();
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
