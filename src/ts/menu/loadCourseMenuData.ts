import {
  CourseEntity,
  CourseMenuEntity,
  CourseMenuObject,
  ResponseError,
} from "@ts/types";
import { CourseMenuAPI } from "@ts/utils/api";
import { isResponseError, handleGlobalError } from "@ts/utils/error";

/**
 * Retrieves course menu data along with its associated course items from the backend.
 *
 * Combines both into an array containing single structured objects to simplify rendering logic
 * for DOM factories.
 *
 * @returns A Promise resolving to an array of CourseMenuObject entries.
 */
export async function loadCourseMenuData(): Promise<Array<CourseMenuObject>> {
  const output = Array<CourseMenuObject>();
  const courseMenues = await getCourseMenuEntries();
  if (!courseMenues) return [];
  else {
    await Promise.all(
      courseMenues.map(async (menu) => {
        const courses = await getCourseEntries(menu.id);
        if (!courses) return;
        else {
          output.push({ menu, courses });
        }
      })
    );
  }
  return output;
}

async function getCourseMenuEntries(): Promise<Array<CourseMenuEntity> | null> {
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

async function getCourseEntries(
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
