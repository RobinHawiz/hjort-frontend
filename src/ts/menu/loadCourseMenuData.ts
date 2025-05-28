import { courseMenuObject } from "@ts/types";
import { getCourseEntries } from "./getCourseEntries";
import { getCourseMenuEntries } from "./getCourseMenuEntries";

export async function loadCourseMenuData(): Promise<Array<courseMenuObject>> {
  const output = Array<courseMenuObject>();
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
