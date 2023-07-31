// script.js
let projectTitle = "";
let cardIdCounter = 1;

function changeProjectTitle() {
  const titleInput = document.getElementById("project-title");
  const displayTitle = document.getElementById("project-display");
  projectTitle = titleInput.value.trim();
  displayTitle.textContent = projectTitle;
  titleInput.value = "";
}

function deleteCard(cardId) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    cardElement.remove();
  } else {
    alert("Card not found.");
  }
}

function createCardHtml(cardId, cardName, cardDesc, cardStatus) {
  return `
    <div class="card" id="card-${cardId}">
      <span class="card-id">${cardId}</span>
      <div class="card-info">
        <div class="card-info-entry">
          <span class="entry-label">Name:</span>
          <span class="entry-value">${cardName}</span>
        </div>
        <div class="card-info-entry">
          <span class="entry-label">Description:</span>
          <span class="entry-value">${cardDesc}</span>
        </div>
        <div class="card-info-entry">
          <span class="entry-label">Status:</span>
          <span class="entry-value">${cardStatus}</span>
        </div>
      </div>
      <button class="button button-red" onclick="deleteCard('card-${cardId}')">Delete</button>
      </div>
  `;
}

function createCard() {
  const cardName = document.getElementById("card-name").value.trim();
  const cardDesc = document.getElementById("card-desc").value.trim();
  const cardStatus = document.getElementById("card-status").value;

  if (!cardName || !cardDesc) {
    alert("Please enter both card name and description.");
    return;
  }

  const cardId = cardIdCounter++;

  const cardHtml = createCardHtml(cardId, cardName, cardDesc, cardStatus);

  const targetSection = document.getElementById(cardStatus);
  targetSection.insertAdjacentHTML("beforeend", cardHtml);

  document.getElementById("card-name").value = "";
  document.getElementById("card-desc").value = "";
}

function updateCard() {
  const cardId = parseInt(document.getElementById("update-card-id").value);
  const cardName = document.getElementById("update-card-name").value.trim();
  const cardDesc = document.getElementById("update-card-desc").value.trim();
  const cardStatus = document.getElementById("update-card-status").value;

  const cardElement = document.getElementById(`card-${cardId}`);
  if (!cardElement) {
    alert("Card not found.");
    return;
  }

  const cardInfoElement = cardElement.querySelector(".card-info");
  const cardNameElement = cardInfoElement.querySelector(".entry-value");
  const cardDescElement = cardInfoElement.querySelectorAll(".entry-value")[1];
  const cardStatusElement = cardInfoElement.querySelectorAll(".entry-value")[2];

  if (cardName) {
    cardNameElement.textContent = cardName;
  }

  if (cardDesc) {
    cardDescElement.textContent = cardDesc;
  }

  if (["todo", "inprocess", "done"].includes(cardStatus)) {
    cardStatusElement.textContent = cardStatus;
    // Move the card to the appropriate status section
    const targetSection = document.getElementById(cardStatus);
    targetSection.appendChild(cardElement);
  }

  alert("Card updated successfully.");
}