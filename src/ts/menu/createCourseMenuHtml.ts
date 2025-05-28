import { CourseEntity, CourseMenuEntity } from "@ts/types";

/**
 * A DOM factory for rendering course menu and course entries.
 *
 * @param courseMenu - The course menu entry to render.
 * @param courses - The course entries to render.
 * @returns A DocumentFragment containing the rendered elements.
 */
export function createCourseMenuHtml(
  courseMenu: CourseMenuEntity,
  courses: Array<CourseEntity>
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const article = document.createElement("article");

  const h1CourseMenuTitle = document.createElement("h1");
  h1CourseMenuTitle.innerText = courseMenu.title;

  const divStarters = document.createElement("div");
  divStarters.classList.add("starters");

  const divMains = document.createElement("div");
  divMains.classList.add("mains");

  const divDesserts = document.createElement("div");
  divDesserts.classList.add("desserts");

  const span1Divider = document.createElement("span");
  span1Divider.classList.add("divider");

  const span2Divider = document.createElement("span");
  span2Divider.classList.add("divider");

  courses.forEach((course) => {
    const pCourseName = document.createElement("p");
    pCourseName.innerText = course.name;

    switch (course.type) {
      case "starter":
        divStarters.appendChild(pCourseName);
        break;
      case "main":
        divMains.appendChild(pCourseName);
        break;
      case "dessert":
        divDesserts.appendChild(pCourseName);
        break;
    }
  });

  const pPriceTot = document.createElement("p");
  pPriceTot.classList.add("price-text");
  pPriceTot.innerText = `${courseMenu.priceTot.toString()},-`;

  article.appendChild(h1CourseMenuTitle);
  article.appendChild(divStarters);
  article.appendChild(span1Divider);
  article.appendChild(divMains);
  article.appendChild(span2Divider);
  article.appendChild(divDesserts);
  article.appendChild(pPriceTot);

  fragment.appendChild(article);

  return fragment;
}
