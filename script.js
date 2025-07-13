//your code here
const images = [
  "img1",
  "img2",
  "img3",
  "img4",
  "img5"
];

const container = document.getElementById("tiles-container");
const para = document.getElementById("para");
const h = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

let selected = [];
let selectedElements = [];

// Shuffle function
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialize tiles
function initializeTiles() {
  container.innerHTML = "";
  selected = [];
  selectedElements = [];
  para.textContent = "";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  const allImages = [...images];
  const duplicate = allImages[Math.floor(Math.random() * allImages.length)];
  allImages.push(duplicate);

  const shuffled = shuffle(allImages);

  shuffled.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.dataset.class = imgClass;
    img.style.cursor = "pointer";

    img.addEventListener("click", () => handleClick(img));
    container.appendChild(img);
  });
}

function handleClick(img) {
  if (selected.length === 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selected.push(img.dataset.class);
  selectedElements.push(img);

  if (selected.length > 0) {
    resetBtn.style.display = "inline-block";
  }

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  selected = [];
  selectedElements.forEach((el) => el.classList.remove("selected"));
  selectedElements = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected[0] === selected[1]) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = initializeTiles;
