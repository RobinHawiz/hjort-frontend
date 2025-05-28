/**
 * Represents a single course menu entry stored in a database.
 */
export type CourseMenuEntity = {
  /** Unique identifier */
  id: string;
  title: string;
  priceTot: number;
};

/**
 * Represents a single course entry stored in a database.
 */
export type CourseEntity = {
  /** Unique identifier */
  id: string;
  courseMenuId: string;
  name: string;
  type: "starter" | "main" | "dessert";
};

/**
 * Represents both the course menu and it's associated courses.
 */
export type courseMenuObject = {
  menu: CourseMenuEntity;
  courses: Array<CourseEntity>;
};
