/**
 * Use only if the body has the preload class, which prevents transitions from running on page load.
 */
export function removePreloadClass(): void {
  window.addEventListener("load", () =>
    document.body.classList.remove("preload")
  );
}
