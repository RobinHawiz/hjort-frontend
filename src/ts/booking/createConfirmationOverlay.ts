export function createConfirmationOverlay(
  formData: FormData
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const confirmationOverlay = document.createElement("div");
  confirmationOverlay.classList.add("confirmation-overlay");

  const confirmationOverlayContent = document.createElement("div");
  confirmationOverlayContent.classList.add("confirmation-overlay-content");

  confirmationOverlayContent.innerHTML = `
  <p class="bold">Tack för din bokning!</p>
  <br>
  <p>Vi ser fram emot att välkomna dig till Hjort den <span class="bold">${formData.get(
    "reservationDate"
  )}</span> kl. <span class="bold">${formData.get("time")}</span>.</p>
  <p>Ditt sällskap på <span class="bold">${formData.get(
    "guestAmount"
  )}</span> personer är nu inbokat.</p>
  <br>
  <p>Middagen serveras som en fast avsmakningsmeny, tänk gärna på att vistelsen tar cirka 3 timmar.</p>
  <br>
  <p><span class="bold">Adress:</span> Rosendalsvägen 25, 115 21 Stockholm</p>
  <br>
  <p>Har du frågor eller behöver ändra något, kontakta oss gärna på <a href="mailto:kontakt@hjortrestaurant.se">kontakt@hjortrestaurant.se</a>.</p>
  <br>
  <p class="bold">Varmt välkommen,</p>
  <p class="italic">Robin, Simon & Tomas</p>
  <p class="italic">Restaurang Hjort</p>
  <br>
  <br>
`;
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "STÄNG";
  closeBtn.addEventListener("click", () => {
    confirmationOverlay.classList.add("close");
    setTimeout(() => {
      confirmationOverlay.remove();
    }, 400);
  });

  confirmationOverlayContent.appendChild(closeBtn);
  confirmationOverlay.appendChild(confirmationOverlayContent);

  fragment.appendChild(confirmationOverlay);

  return fragment;
}
