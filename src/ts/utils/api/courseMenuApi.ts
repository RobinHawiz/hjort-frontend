import {} from "@ts/types";
import { CourseEntity, CourseMenuEntity } from "@ts/types/courseMenu";
import { fetchData } from "@ts/utils/api";

/**
 * Provides methods to interact with the Course Menu API.
 */
export class CourseMenuAPI {
  constructor(private readonly apiUrl = "http://localhost:4000/api/public") {}

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
