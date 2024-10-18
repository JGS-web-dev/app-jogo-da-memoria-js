const emojisArr = [
  { id: 1, content: "😀" },
  { id: 2, content: "😂" },
  { id: 3, content: "😁" },
  { id: 4, content: "😀" },
  { id: 5, content: "😂" },
  { id: 6, content: "😁" },
];
var countCards = [];
var countPlays = 0;
var isFlipping = false;

document.addEventListener("DOMContentLoaded", () => {
  const scoreBoard = document.querySelector(".scoreBoard");
  const playConuter = document.createElement("p");
    playConuter.id = "playCounter";

  emojisArr.forEach((element) => {
    createDynamicCards(element);
  });
  playConuter.textContent = `Played: ${countPlays}`;
  scoreBoard.appendChild(playConuter);
});

function flip(event, element) {
  let card = event.target.closest(".card");

  if(isFlipping) {

  // se isFlipping retorna imediatamente para que n possa virar outras
    console.log("Flipping is already in progress.");
    return;
  }

  // verifica se já foi virada duas cartas
  if (countCards.length == 1) {
    countPlays += 1; // Incrementa o número de jogadas

    // Atualiza o texto na tela
    const playCounter = document.getElementById("playCounter");
    playCounter.textContent = `Played: ${countPlays}`;
  }

  if (countCards.length < 2) {
    // adiciona a carta atual no array
    countCards.push(element);

    if (card) {
      card.classList.toggle("flipped");
    }

    if (countCards.length === 2) {
      isFlipping = true; // impossibilita que as cartas sejam viradas;
      const card1 = document.getElementById(countCards[0].id);
      const card2 = document.getElementById(countCards[1].id);

      setTimeout(() => {
        if (countCards[0].content === countCards[1].content) {
          card1.classList.add("fade-out");
          card2.classList.add("fade-out");

          setTimeout(() => {
            card1.classList.add("none");
            card2.classList.add("none");
          }, 740);
          countCards = [];
        } else {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
        }
        
        countCards = [];
        isFlipping = false; // Permite que as cartas sejam viradas novamente
      }, 1000)

    }
  }
}

function createDynamicCards(element) {
  const cardContainer = document.getElementById("cardContainer");

  cardContainer.insertAdjacentHTML(
    "afterbegin",
    `
        <div class="card" id="${element.id}">
          <div class="card-inner" id="cardInner">
            <div class="card-front">?</div>
            <div class="card-back"><p>${element.content}</p></div>
          </div>
        </div>
        `
  );

  const card = document.getElementById(element.id);
  card.addEventListener("click", () => flip(event, element));
}

function ArrayRandomizer(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Índice aleatório de 0 a i
    [array[i], array[j]] = [array[j], array[i]]; // Troca de elementos
  }
  return array;
}

function reload() {
  const cardContainer = document.getElementById("cardContainer");
  countPlays = 0;
  if (cardContainer) {

    // limpa o cardContainer para dar espaço para a nova geração
    cardContainer.innerHTML = "";

    // randomiza o array e adiciona eles ao cardContainer
    const randomizedArr = ArrayRandomizer(emojisArr);
    randomizedArr.forEach((element) => {
      createDynamicCards(element);
    });
  }
    // atualiza as jogdas na tela
    const playCounter = document.getElementById("playCounter");
    playCounter.textContent = `Played: ${countPlays}`;
}
