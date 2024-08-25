import "bootstrap";
import "./style.css";

let arrayCartas = [];

window.onload = function() {
  document.getElementById("btn-draw").addEventListener("click", totalCards);
  document.getElementById("btn-sort").addEventListener("click", sortCards);
};

function totalCards() {
  const number = document.getElementById("numberInput").value;
  const cardsContainer = document.getElementById("cards-content");
  cardsContainer.innerHTML = "";
  arrayCartas = [];

  for (let i = 0; i < number; i++) {
    generateCard();
  }
}

const generateCard = () => {
  const palo = ["spade", "club", "heart", "diamond"];
  const paloIndex = palo[Math.floor(Math.random() * palo.length)];
  const simbolCard = generarPalo(paloIndex);
  const numberCard = generarNumero();

  const carta = {
    numero: numberCard,
    palo: paloIndex
  };
  arrayCartas.push(carta);

  displayCard(carta, "cards-content");
};

const generarNumero = () => {
  const numero = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const numeroIndex = Math.floor(Math.random() * numero.length);
  return numero[numeroIndex];
};

function generarPalo(icono) {
  switch (icono) {
    case "spade":
      return "♤";
    case "club":
      return "♧";
    case "heart":
      return "♡";
    case "diamond":
      return "♢";
  }
}

const bubbleSort = arr => {
  let wall = arr.length - 1;
  let cartasOrden = [];

  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      if (
        convertirValor(arr[index].numero) >
        convertirValor(arr[index + 1].numero)
      ) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }
      cartasOrden.push([...arr]);
      index++;
    }
    wall--;
  }
  return cartasOrden;
};

function convertirValor(numero) {
  switch (numero) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(numero);
  }
}

function sortCards() {
  const cartasOrden = bubbleSort(arrayCartas);
  const sortContainer = document.getElementById("sort-content");
  sortContainer.innerHTML = "";

  cartasOrden.forEach((step, index) => {
    const stepContainer = document.createElement("div");
    stepContainer.className = "step-container d-flex flex-row";
    stepContainer.innerHTML = `<h5 class="mt-auto mb-auto">${index + 1}</h5>`;
    step.forEach(carta => {
      displayCard(carta, stepContainer);
    });
    sortContainer.appendChild(stepContainer);
  });
}

function displayCard(carta, container) {
  const simbolCard = generarPalo(carta.palo);
  const cardHTML = `
    <div class="card bg-light m-2 ${carta.palo}" style="width: 70px; height: 100px;">
      <div class="d-flex flex-row h-100">
        <div class="col-3 d-flex align-items-start justify-content-center">
          <span class="display-2 fs-4">${simbolCard}</span>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-center">
          <span class="display-4 fs-2">${carta.numero}</span>
        </div>
        <div class="col-3 d-flex align-items-end justify-content-center">
          <span class="display-2 fs-4">${simbolCard}</span>
        </div>
      </div>
    </div>
  `;
  if (typeof container === "string") {
    document.getElementById(container).innerHTML += cardHTML;
  } else {
    container.innerHTML += cardHTML;
  }
}
