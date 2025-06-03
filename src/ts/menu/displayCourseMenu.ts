import { CourseMenuObject } from "@ts/types";
import { isHtmlElement } from "@ts/utils/dom";
import { createCourseMenuHtml } from "./createCourseMenuHtml";

/**
 * Renders a list of course menu and course entries into the DOM.
 *
 * If entries are available, they are appended to the element with the class "course-menu-container".
 */
export function displayCourseMenus(
  courseMenuObjects: Array<CourseMenuObject>
): void {
  const COURSE_MENU_SELECTOR = ".course-menu-container";
  const elemToAppend = document.querySelector(COURSE_MENU_SELECTOR);

  if (!isHtmlElement(elemToAppend, COURSE_MENU_SELECTOR)) return;

  courseMenuObjects.forEach((obj) => {
    elemToAppend.appendChild(createCourseMenuHtml(obj.menu, obj.courses));
  });

  elemToAppend.classList.add("show");
}
