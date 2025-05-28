import { CourseMenuAPI } from "@ts/utils/api";
import { ResponseError, CourseEntity } from "@ts/types";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Fetches all course entries from the API.
 */
export async function getCourseEntries(
  courseMenuId: string
): Promise<Array<CourseEntity> | null> {
  try {
    const api = new CourseMenuAPI();
    return await api.getAllCourses(courseMenuId);
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
