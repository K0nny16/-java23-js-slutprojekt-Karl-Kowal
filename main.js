import { handelSubmits } from "./JS/handelSubmits.js";

const btnTop10 = document.querySelector("#top10");
const btnPopular = document.querySelector("#popular");
const form = document.querySelector("form");

//Skapar eventlisteners för dom olika alternativen.
btnTop10.addEventListener("click", handelSubmits);
btnPopular.addEventListener("click", handelSubmits);
form.addEventListener("submit", handelSubmits);