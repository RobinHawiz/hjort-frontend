import {} from "@ts/types";
import { CourseEntity, CourseMenuEntity } from "@ts/types/courseMenu";
import { fetchData } from "@ts/utils/api";
const DEFAULT_API_BASE_URL =
  "https://hjort-backend.azurewebsites.net/api/public";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

/**
 * Provides methods to interact with the Course Menu API.
 */
export class CourseMenuAPI {
  constructor(private readonly apiUrl = baseUrl) {}

  /**
   * Retrieves all course menu entries via GET /api/public/course-menu
   * @returns A parsed array containing CourseMenuEntity objects
   */
  async getAllCourseMenus(): Promise<Array<CourseMenuEntity>> {
    const output = await fetchData<Array<CourseMenuEntity>>(
      `${this.apiUrl}/course-menu`
    );
    return output;
  }

  /**
   * Retrieves all course entries via GET /api/public/course/:id
   * @param courseMenuId The ID of the course menu to retrieve its associated courses
   * @returns A parsed array containing CourseEntity objects
   */
  async getAllCourses(courseMenuId: string): Promise<Array<CourseEntity>> {
    const output = await fetchData<Array<CourseEntity>>(
      `${this.apiUrl}/course/${courseMenuId}`
    );
    return output;
  }
}
